const { postMessage } = require('./utils');

const handleMidtown = channel_id => {
    const image_url = "https://raw.githubusercontent.com/takeokunn/slack-bot-sandbox/master/assets/floor_map_29.png";
    postMessage(channel_id, image_url);
};

module.exports = handleMidtown;
