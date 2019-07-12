const axios = require('axios');
const { postMessage } = require('./utils');

const fetchDetailByName = (name, success, failure) => {
    const url = `https://www.instagram.com/${name}/`;
    axios.get(url)
        .then(res => success(JSON.parse(res.data.split("window._sharedData = ")[1].split(";</script>")[0])))
        .catch(err => failure(err));
};

const handleInstagram = (channel_id, text) => {
    const success = detail => {
        const user = detail.entry_data.ProfilePage[0].graphql.user;
        const id = user.id;
        const username = user.username;
        const biography = user.biography;
        const follow = user.edge_follow.count;
        const followed = user.edge_followed_by.count;

        const message = `\`\`\`
instagram

id       : ${id}
名前      : ${username}
bio      : ${biography}
follow   : ${follow}
follower : ${followed}
\`\`\``;
        postMessage(channel_id, message);
    };
    const failure = _ => {
        const message = `\`\`\`instagram
検索: ${text}
not found
\`\`\``;
        postMessage(channel_id, message);
    };
    fetchDetailByName(text, success, failure);
};

module.exports = handleInstagram;
