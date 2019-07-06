const { postMessage } = require('./utils');
const tommyData = require('../assets/tommy.json');

const handleTommy = async channel_id => {
    const index = await Math.floor(Math.random() * tommyData.words.length);
    const text =  await tommyData.words[index];
    await postMessage(channel_id, text);
};

export default handleTommy;
