const axios = require('axios');
const slack = require('slack');
const dotenv = require('dotenv');
const express = require('express');
const businesh = require('businesh');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const config = {
    slack_token: process.env.SLACK_TOKEN,
    slack_verify_token: process.env.SLACK_VERIFY_TOKEN,
    docbase_token: process.env.DOCBASE_TOKEN,
    docbase_team: process.env.DOCBASE_TEAM_NAME
};

const fetchStockPrice = async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://minkabu.jp/stock/3990');
    await page.waitFor(".stock_price");
    const elem = await page.$(".stock_price");
    const text = await page.evaluate(element => element.textContent, elem);
    const price = await text.replace(/\n/g, '').replace(/ /g, '');
    await browser.close();
    return price;
};

const fetchDocbase = async query => {
    const url = await `https://api.docbase.io/teams/${config.docbase_team}/posts?q=${query}&per_page=5`;
    const headers = {
        headers: {
            "Content-Type": "application/json",
            "X-DocBaseToken": config.docbase_token
        }
    };
    const res = await axios.get(url, headers);
    return await res.data;
};

const postMessage = (channel_id, text) => {
    slack.chat.postMessage({
        token: config.slack_token,
        channel: channel_id,
        text: text
    });
};

const handleTakebot = channel_id => postMessage(channel_id, "test");

const handleBusinesh = (before_text, channel_id) => {
    businesh.translate(before_text)
        .then(res => postMessage(channel_id, `
before: ${before_text}
after: ${res}
`));
};

const handleStocks = async channel_id => {
    const price = await fetchStockPrice();
    postMessage(channel_id, `現在のUUUM株価: ${price}`);
};

const handleDocbase = async (channel_id, query) => {
    const items = await fetchDocbase(query);
    const text = await items.posts.reduce((accum, item) => {
        return `
${accum}
記事: ${item.title}
URL: ${item.url}
`;
    }, `検索: ${query}`);
    await postMessage(channel_id, text);
};

app.use(bodyParser());

app.get('/', (_, res) => res.send('Hello World!'));

app.post('/webhook', async (req, res) => {
    const text = await req.body.text;
    const command = await req.body.command;
    const channel_id = await req.body.channel_id;

    switch(command) {
    case '/takebot':
        handleTakebot(channel_id);
        break;
    case '/businesh':
        handleBusinesh(text, channel_id);
        break;
    case '/stocks':
        handleStocks(channel_id);
        break;
    case '/docbase':
        handleDocbase(channel_id, text);
        break;
    }
    await res.status(200).send('good');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
