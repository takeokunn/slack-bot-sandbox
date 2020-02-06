const { postMessage } = require('./utils');
const xNinjaData = require('../assets/x-ninja.json');

const handleXNinja = async channel_id => {
    const index = await Math.floor(Math.random() * xNinjaData.words.length);
    const text =  await xNinjaData.words[index];
    await postMessage(channel_id, text);
};

module.exports = handleXNinja;
