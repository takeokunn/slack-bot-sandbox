const slack = require('slack');

const validateVerifyToken = (webhook_token) => {
    return process.env.SLACK_VERIFY_TOKEN === webhook_token;
};

const postMessage = (channel_id, text) => {
    const token =process.env.SLACK_TOKEN;
    slack.chat.postMessage({
        token: token,
        channel: channel_id,
        text: text
    });
};

export { postMessage, validateVerifyToken };
