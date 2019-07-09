const { Auth, Connection, Record, App } = require('@kintone/kintone-js-sdk');

const { postMessage } = require('./utils');

const username = process.env.KINTONE_USERNAME;
const password = process.env.KINTONE_PASSWORD;
const domain = process.env.KINTONE_DOMAIN;
const app_id = process.env.KINTONE_APP_ID;

const handleKintoneAuth = () => {
    const auth = new Auth();
    auth.setPasswordAuth(username, password);
    return auth;
};

const fetchSearchLatestRecord = (record, app_id, query, success, failure) => {
    record.getRecords(app_id, query)
        .then(res => success(res.records[0]))
        .catch(err => failure(err));
};

const handleKintone = (text, channel_id) => {
    const auth = handleKintoneAuth();
    const conn = new Connection(domain, auth);
    const record = new Record(conn);
    const success = data => {
        const message = "```" + data.content.value + "```";
        postMessage(channel_id, message)
    };
    const failure = err => console.log(err.get().errors);
    const query = `Owner in ("${text}") limit 1`;
    fetchSearchLatestRecord(record, app_id, query, success, failure);
};

module.exports = handleKintone;
