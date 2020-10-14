const { postMessage } = require('./utils');

const handleKintai = channel_id => {
    const message = `\`\`\`
エンジニア @所属TL, @所属PM, @kintai
TL（エンジニア） @所属GL, @所属PM, @kintai
PM @system, @kintai
\`\`\`
https://uuum.docbase.io/posts/303896#%E5%8B%A4%E6%80%A0%E9%80%A3%E7%B5%A1%E3%81%AE%E3%83%A1%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6`;
    postMessage(channel_id, message);
};

module.exports = handleKintai;
