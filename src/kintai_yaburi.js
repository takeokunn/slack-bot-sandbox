const { postMessage } = require('./utils');

const kintai_yaburi = iiwake => {
    return `
${iiwake}ため、緊急リリース致します。
しょうがないんです、中橋さん。
`
};

const handleKintaiYaburi = async (channel_id, text) => {
    const iiwake = text || "母が急病の";
    postMessage(channel_id, kintai_yaburi(iiwake));
};

module.exports = handleKintaiYaburi;
