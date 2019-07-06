const puppeteer = require('puppeteer');
const { postMessage } = require('./utils');

const fetchStockPrice = async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://minkabu.jp/stock/3990');
    await page.waitFor(".stock_price");
    const elem = await page.$(".stock_price");
    const text = await page.evaluate(element => element.textContent, elem);
    const price = await text.replace(/\n/g, '').replace(/ /g, '');
    await browser.close();
    return price;
};

const handleStocks = async channel_id => {
    const price = await fetchStockPrice();
    postMessage(channel_id, `現在のUUUM株価: ${price}`);
};

module.exports = handleStocks;
