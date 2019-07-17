const nomlish = require("nomlish");
const { postMessage } = require('./utils');

const handleNomlish = async (channel_id, text) => {
    const message = await nomlish.translate(text);
    postMessage(channel_id, message);
};

module.exports = handleNomlish;
