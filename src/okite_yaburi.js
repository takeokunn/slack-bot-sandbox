const axios = require('axios');
const { postMessage } = require('./utils');

const okite_yaburi = `
母が急病のため、緊急リリースを致します。
しょうがないんです、中橋さん。
`;

const handleOkiteYaburi = async channel_id => {
    postMessage(channel_id, okite_yaburi);
};

module.exports = handleOkiteYaburi;
