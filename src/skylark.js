const axios = require('axios');
const { postMessage } = require('./utils');

const URL = "https://app-data.skylark-app.net/coupon/normals.json";

const brand  = {
    gusto: {
        id: 1,
        name: "ガスト"
    },
    bamiyan: {
        id: 2,
        name: "バーミヤン"
    },
    jonathan: {
        id: 3,
        name: "ジョナサン"
    }
};

const filterUniqueArrayById =  (arr) =>  {
    const ids = arr.map(item => item.display_number);
    return arr.filter((item, index) => ids.indexOf(item.display_number) === index);
};

const sort_fn = (a, b) => {
    const a_num = parseInt(a.display_number);
    const b_num = parseInt(b.display_number);
    return (a_num > b_num) ? 1 : (b_num > a_num) ? -1 : 0;
};

const reduce_fn = (accum, item) => (`${accum}\n[${item.display_number}]: ${item.name.replace(/\r\n/g, "")} ${item.before_price} → ${item.after_price}`);

const handleRequest = async (brand, cb) => {
    try {
        const res = await axios.get(URL);
        const msg = await filterUniqueArrayById(res.data)
              .filter((item) => item.bland_id === brand.id)
              .sort(sort_fn)
              .reduce(reduce_fn, "");
        cb(msg);

    } catch (error) {
        console.log(error);
    }
};

const handleSkylark = async (brand) => (channel_id) => {
    const cb = (msg) => postMessage(channel_id, `\`\`\`
本日の${brand.name}クーポン情報
--------------------------------------------
${msg}
\`\`\``);

    handleRequest(brand, cb);
};

module.exports = {
    gusto: handleSkylark(brand .gusto),
    bamiyan: handleSkylark(brand .bamiyan),
    jonathan: handleSkylark(brand .jonathan),
};
