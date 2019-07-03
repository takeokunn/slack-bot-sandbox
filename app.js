const slack = require('slack');
const dotenv = require('dotenv');
const express = require('express');
const businesh = require('businesh');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const config = {
    slack_token: process.env.SLACK_TOKEN,
    slack_verify_token: process.env.SLACK_VERIFY_TOKEN
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
        .then(res => postMessage(channel_id, res));
};


app.use(bodyParser());

app.get('/', (_, res) => res.send('Hello World!'));

app.post('/webhook', async (req, res) => {
    const text = await req.body.text;
    const token = await req.body.token;
    const command = await req.body.command;
    const channel_id = await req.body.channel_id;
    switch(command) {
    case 'takebot':
        await handleTakebot(channel_id);
        break;
    case '/businesh':
        await handleBusinesh(text, channel_id);
        break;
    }
    await res.status(200).send('good');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
