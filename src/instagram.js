const axios = require('axios');
const { postMessage } = require('./utils');

const fetchDetailByName = (name, success, failure) => {
    const url = `https://www.instagram.com/${name}`;
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
        const followed = user.edge_followed.count;

        const text = `インスタグラム検索: ${text}
id: ${id}
名前: ${username}
bio: ${biography}
フォロー数: ${follow}
フォロワー数: ${followed}`;
        postMessage(channel_id, text);
    };
    const failure = _ => {
        const text = `インスタグラム検索: ${text}
not found`;
        postMessage(channel_id, text);
    };
    fetchDetailByName(text, success, failure);
};

module.exports = handleInstagram;
