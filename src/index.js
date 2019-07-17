const { validateVerifyToken } = require('./utils');

const handleBusinesh = require('./businesh');
const handleKintone = require('./kintone');
const handleDocbase = require('./docbase');
const handleInstagram = require('./instagram');
const handleStocks = require('./stocks');
const handleTakebot = require('./takebot');
const handleTommy = require('./tommy');
const handleNuko = require('./nuko');
const handleDog = require('./dog');
const handleLgtm = require('./lgtm');
const handleOjichat = require('./ojichat');
const handleCowsay = require('./cowsay');
const handleNomlish = require('./nomlish');

module.exports = {
    validateVerifyToken,
    handleBusinesh,
    handleKintone,
    handleDocbase,
    handleInstagram,
    handleStocks,
    handleTakebot,
    handleTommy,
    handleNuko,
    handleDog,
    handleLgtm,
    handleOjichat,
    handleCowsay,
    handleNomlish
};
