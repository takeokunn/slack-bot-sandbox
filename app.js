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
    handleLgtm,
    handleOjichat,
    handleCowsay,
    handleNomlish,
    handleGenbaneko,
    handleMozy,
    handleOkite,
    handleOkiteYaburi,
    handleXNinja,
    handleDbt,
    handleTiktok,
    handleMidtown,
    handleTunag
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
    case '/ojichat':
        handleOjichat(channel_id, text);
        break;
    case '/cowsay':
        handleCowsay(channel_id, text);
        break;
    case '/nomlish':
        handleNomlish(channel_id, text);
        break;
    case '/genbaneko':
        handleGenbaneko(channel_id, text);
        break;
    case '/mozy':
        handleMozy(channel_id);
        break;
    case '/okite':
        handleOkite(channel_id);
        break;
    case '/okite_yaburi':
        handleOkiteYaburi(channel_id, text);
        break;
    case '/x-ninja':
        handleXNinja(channel_id);
        break;
    case '/dbt':
        handleDbt(channel_id);
        break;
    case '/tiktok':
        handleTiktok(channel_id, text);
        break;
    case '/midtown':
        handleMidtown(channel_id);
        break;
    case '/tunag-nippo':
        handleTunag(channel_id, text);
        break;
    }
    return res.status(200).send('running...');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
