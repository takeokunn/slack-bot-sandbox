const cowsay = require("cowsay");
const { postMessage } = require('./utils');

const handleCowsay = (channel_id, text) => {
    const say = cowsay.say({ text : text  });
    postMessage(channel_id, "```" + say + "```");
};

module.exports = handleCowsay;
