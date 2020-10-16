const { postMessage } = require('./utils');

const kintai_yaburi = iiwake => {
    return `
${iiwake}ため、急遽お休み頂きます。
しょうがないんです、中橋さん。
`;
};

const handleKintaiYaburi = async (channel_id, text) => {
    const iiwake = text || "お腹が空いた";
    postMessage(channel_id, kintai_yaburi(iiwake));
};

module.exports = handleKintaiYaburi;
