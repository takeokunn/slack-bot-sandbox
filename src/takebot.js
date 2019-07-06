const { postMessage } = require('./utils');

const handleTakebot = channel_id => postMessage(channel_id, "test");

module.exports = handleTakebot;
