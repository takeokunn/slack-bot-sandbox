const axios = require('axios');
const { postMessage } = require('./utils');

const nippo = `
\`\`\`
# 本日の業務

## atams 実装
* Rails new でテンプレ生成
* mysql2導入
* DBをmysqlに変更完了
* slim-rails導入
* slim化した
* ridgepole導入
* SchemafileのUserテーブルを作成中 x
* dotenv-rails導入
* ENV周りの設定完了
* robocop導入
* robocopの設定ファイルを作成中 x
* devise 導入
* 管理画面トップページの作成
* 管理画面デバッグログインの実装
* ログアウトの実装
* ログイン周りテストの実装 x
* プルリクエスト用テンプレートの追加
* dockerfile 作成
* docker-compose.yml 作成
* Docker化完了

* coda との連携部分 あらjと話し合い

## その他
* インフラ定例

# 明日の予定

* データベースの内容考える
* 実装ガリガリ進める
*

# 一言
今日の進捗、意外と驚異的なのでは???
\`\`\`
`;

const fetchNuko = async () => {
    const url = 'https://api.thecatapi.com/v1/images/search';
    const res = await axios.get(url);
    return await res.data;
};

const handleMozy = async channel_id => {
    postMessage(channel_id, nippo);
};

module.exports = handleMozy;
