const axios = require('axios');
const { postMessage } = require('./utils');

const fetchDog = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random';
    const res = await axios.get(url);
    return await res.data;
};

const handleDog = async channel_id => {
    const data = await fetchDog();
    const url = data.message;
    postMessage(channel_id, url);
};

module.exports = handleDog;
