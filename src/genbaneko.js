const { postMessage } = require('./utils');
const genbanekoData = require('../assets/genbaneko.json');

const handleGenbaneko = async (channel_id, text) => {
    if (text === "help") {
        return await postMessage(channel_id, "ヨシ！");
    }
    const index = await Math.floor(Math.random() * genbanekoData.urls.length);
    const str =  await genbanekoData.urls[index];
    return await postMessage(channel_id, str);
};

module.exports = handleGenbaneko;
