const { Auth, Connection, Record, App } = require('@kintone/kintone-js-sdk');

const { postMessage } = require('./utils');

const handleKintoneAuth = () => {
    const username = process.env.KINTONE_USERNAME;
    const password = process.env.KINTONE_PASSWORD;
    const auth = new Auth();
    auth.setPasswordAuth(username, password);
    return auth;
};

const fetchSearchLatestRecord = (record, app_id, query, success, failure) => {
    record.getRecords(app_id, query)
        .then((rsp) => {
            success(rsp);
        })
        .catch((err) => {
            // This SDK return err with KintoneAPIExeption
            failure(err);
        });
};

const handleKintone = async (text, channel_id) => {
    const domain = process.env.KINTONE_DOMAIN;
    const app_id = process.env.KINTONE_APP_ID;

    const auth = handleKintoneAuth();
    const conn = new Connection(domain, auth);
    const record = new Record(conn);
    const app = new App(conn);

    const success = data => {

    };
    const failure = err => {
        console.log(err.get());
    };
    await fetchSearchLatestRecord(record, app_id);
};

module.exports = handleKintone;
