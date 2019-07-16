const axios = require('axios');
const { postMessage } = require('./utils');

const fetchNuko = async () => {
    const url = 'https://api.thecatapi.com/v1/images/search';
    const res = await axios.get(url);
    return await res.data;
};

const handleNuko = async channel_id => {
    const data = await fetchNuko();
    const url = data[0].url;
    postMessage(channel_id, url);
};

module.exports = handleNuko;
