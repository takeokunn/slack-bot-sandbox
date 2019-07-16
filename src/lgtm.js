const axios = require('axios');
const { postMessage } = require('./utils');

const fetchLgtm = async () => {
    const url = 'https://www.lgtm.app/api/images/random';
    const res = await axios.get(url);
    return await res.data;
};

const handleLgtm = async channel_id => {
    const data = await fetchLgtm();
    const url = data.imageURL;
    postMessage(channel_id, url);
};

module.exports = handleLgtm;
