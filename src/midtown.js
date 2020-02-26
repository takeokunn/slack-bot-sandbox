const { postMessage } = require('./utils');

const handleMidtown = channel_id => {
    const image_url = "https://raw.githubusercontent.com/takeokunn/slack-bot-sandbox/master/assets/midtown29.jpg";
    postMessage(channel_id, image_url);
};

module.exports = handleMidtown;
