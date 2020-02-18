const axios = require('axios');
const { postMessage } = require('./utils');

const fetchTiktokData = async (unique_id) => {
    const url = `https://www.tiktok.com/@${unique_id}?lang=ja`;
    const user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.<OS build number>";
    const res = await axios.get(url, { headers: { 'User-Agent': user_agent } });
    const raw = await res.data.split('<script id="__NEXT_DATA__" type="application/json" crossorigin="anonymous">')[1].split('</script>')[0];
    const user_data = await JSON.parse(raw).props.pageProps.userData;
    const message = `\`\`\`
${user_data.nickName} @${user_data.uniqueId}
フォロー: ${user_data.following}
フォロワー: ${user_data.fans}
いいね: ${user_data.heart}\`\`\``;
    return await message;
};

const handleTiktok = async (channel_id, text) => {
    const unique_ids = await text.split(",");
    const messages = await unique_ids.map(id => fetchTiktokData(id));
    Promise.all(messages).then(values => {
        const message = values.reduce((accum, msg) => accum + msg, "");
        postMessage(channel_id, message);
    });
};

module.exports = handleTiktok;
