const axios = require('axios');
const { postMessage } = require('./utils');

const session = process.env.TUNAG_SESSION;
const remember_user_token = process.env.TUNAG_REMEMBER_USER_TOKEN;

const url = "https://tunag.jp/api/v1/feeds?per_page=100&filter[menu][]=26706";

const handleTunag = async (channel_id, text) => {
    const config = {
        headers: {
            "Cookie": `remember_user_token=${remember_user_token}; _tunag_session=${session};`
        },
    };
    const res = await axios.get(url, config);
    const feeds = res.data.feeds;
    const user_feed = feeds.filter(feed => feed.data.user.name === text);
    if (user_feed.length === 0) return;
    const substances = user_feed[0].data.apply.substances;
    console.log(substances);
    const nippo_text = substances.reduce((accum, substance) => {
        return `${accum}
## ${substance.key}
${substance.value}
`;
    }, "");
    const post_text = `\`\`\`
投稿者: ${user_feed.data.user.name}
${nippo_text}
\`\`\``;
    postMessage(channel_id, post_text);
};

module.exports = handleTunag;
