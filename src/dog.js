const axios = require('axios');
const { postMessage } = require('./utils');

const fetchNuko = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const res = await axios.get(url);
    return await res.data;
};

const handleDog = async channel_id => {
    const data = await fetchNuko();
    const url = data.message;
    postMessage(channel_id, url);
};

module.exports = handleDog;
