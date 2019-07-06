const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const {
    handleBusinesh,
    handleDocbase,
    handleStocks,
    handleTakebot,
    handleTommy
} = require('./src');

dotenv.config();

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
    case '/stocks':
        handleStocks(channel_id);
        break;
    case '/docbase':
        handleDocbase(channel_id, text);
        break;
    case '/tommy':
        handleTommy(channel_id);
        break;
    }
    await res.status(200).send('good');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Node app is running at localhost: ${port}`));
