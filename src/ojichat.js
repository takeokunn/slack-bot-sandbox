const util = require('util');
const childProcess = require('child_process');

const { postMessage } = require('./utils');

const exec = util.promisify(childProcess.exec);

const handleOjichat = async (channel_id, text) => {
    const { stdout } = await exec(`./binary/ojichat ${text}`);
    postMessage(channel_id, stdout);
};

module.exports = handleOjichat;
