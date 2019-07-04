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
    slack_verify_token: process.env.SLACK_VERIFY_TOKEN
};

const fetchStockPrice = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://minkabu.jp/stock/3990');
    await page.waitFor(".stock_price");
    const elem = await page.$(".stock_price");
    const text = await page.evaluate(element => element.textContent, elem);
    const price = await text.replace(/\n/g, '').replace(/ /g, '');
    await browser.close();
    return price;
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

const handleStocks = async (channel_id) => {
    const price = await fetchStockPrice();
    postMessage(channel_id, `
現在のUUUM株価: ${price}
山口さんの資産: n円
`);
};

app.use(bodyParser());

app.get('/', (_, res) => res.send('Hello World!'));

app.post('/webhook', async (req, res) => {
    const text = await req.body.text;
    const token = await req.body.token;
    const command = await req.body.command;
    const channel_id = await req.body.channel_id;
    switch(command) {
    case '/takebot':
        await handleTakebot(channel_id);
        break;
    case '/businesh':
        await handleBusinesh(text, channel_id);
        break;
    case '/stocks':
        await handleStocks(channel_id);
        break;
    }
    await res.status(200).send('good');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
