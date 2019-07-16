require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const {
    handleBusinesh,
    handleKintone,
    handleDocbase,
    handleInstagram,
    handleStocks,
    handleTakebot,
    handleTommy,
    handleNuko,
    handleDog,
    handleLgtm
} = require('./src');

const app = express();

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
    case '/kintone':
        handleKintone(text, channel_id);
        break;
    case '/stocks':
        handleStocks(channel_id);
        break;
    case '/docbase':
        handleDocbase(channel_id, text);
        break;
    case '/tommy':
        handleTommy(channel_id);
        break;
    case '/instagram':
        handleInstagram(channel_id, text);
        break;
    case '/nuko':
        handleNuko(channel_id);
        break;
    case '/dog':
        handleDog(channel_id);
        break;
    case '/lgtm':
        handleLgtm(channel_id);
        break;
    }
    return await res.status(200).send('running...');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
