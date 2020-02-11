const { coupon } = require('burger-king-api');
const { postMessage } = require('./utils');

const generateMessage = coupons => {
    const message = coupons.reduce((accum, coupon) => {
        return `
            ${accum}
            ------------------------------------------------------------
            商品名: ${coupon.NM_CUP_MENU}
            価格: ${coupon.REAL_CUP_PRICE}円 → ${coupon.SALE_CUP_PRICE}円
            クーポン番号: ${coupon.CD_COUPON}
        `;
    })
    return `\`\`\`
今日のバーキンクーポン情報
${message}
\`\`\``;
};

const handleDbt = channel_id => {
    coupon(process.env.BURGER_KING_AUTH_TOKEN)
        .then(data => {
            const message = generateMessage(data.body.couponList);
            postMessage(channel_id, message)
        });
};

module.exports = handleDbt;
