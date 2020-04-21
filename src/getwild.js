const { postMessage } = require('./utils');

const handleGetWild = channel_id => {
    postMessage(channel_id, "https://www.youtube.com/watch?v=LgBxze0ye94");
};

module.exports = handleGetWild;
