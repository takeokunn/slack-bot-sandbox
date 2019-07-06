const axios = require('axios');
const { postMessage } = require('./utils');

const fetchDocbase = async query => {
    const token = process.env.DOCBASE_TOKEN;
    const team_name = process.env.DOCBASE_TEAM_NAME;
    const url = await `https://api.docbase.io/teams/${team_name}/posts?q=${encodeURI(query)}&per_page=5`;
    const headers = {
        headers: {
            "Content-Type": "application/json",
            "X-DocBaseToken": token
        }
    };
    const res = await axios.get(url, headers);
    return await res.data;
};

const handleDocbase = async (channel_id, query) => {
    const items = await fetchDocbase(query);
    const text = await items.posts.reduce((accum, item) => {
        return `
${accum}
記事: ${item.title}
URL: ${item.url}
`;
    }, `検索: ${query}`);
    await postMessage(channel_id, text);
};


module.exports = handleDocbase;
