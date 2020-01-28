const axios = require('axios');
const { postMessage } = require('./utils');

const okite = `
\`\`\`
## 本番環境リリース
月曜から木曜（翌日が休日でない日）の 15:00 まで

## ルール時間外にリリースする場合
ルールを超えたものに関しては @system @bito_m をつけて group-dev で報告

## ステージング環境リリース
本番ほど気にする必要はないが、大きめの反映はプロダクトチーム内（システムとビジネス側）が把握できるようにする

https://uuum.docbase.io/posts/265545
\`\`\`
`;

const handleOkite = async channel_id => {
    postMessage(channel_id, okite);
};

module.exports = handleOkite;
