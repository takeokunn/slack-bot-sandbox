const { validateVerifyToken } = require('./utils');

const handleBusinesh = require('./businesh');
const handleKintone = require('./kintone');
const handleDocbase = require('./docbase');
const handleStocks = require('./stocks');
const handleTakebot = require('./takebot');
const handleTommy = require('./tommy');

module.exports = {
    validateVerifyToken,
    handleBusinesh,
    handleKintone,
    handleDocbase,
    handleStocks,
    handleTakebot,
    handleTommy,
};
