const businesh = require('businesh');
const { postMessage } = require('./utils');

const handleBusinesh = (before_text, channel_id) => {
    businesh.translate(before_text)
        .then(res => postMessage(channel_id, `
before: ${before_text}
after: ${res}
`));
};

export default handleBusinesh;
