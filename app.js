const dotenv = require('dotenv');
const express = require('express');
const { WebClient } = require('@slack/web-api');

dotenv.config();

const config = {
    slack_token: process.env.SLACK_TOKEN,
    slack_verify_token: process.env.SLACK_VERIFY_TOKEN
};

const app = express();
const web = new WebClient(config.slack_token);

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/webhook', async (req, res) => {
    // const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });
    await res.status(200).json();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
