//Created by mkafr on 12/18/2017.


exports.sleep = function (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

exports.constrain = function (value, min, max) {
    return Math.max(min, Math.min(value, max));
};

exports.log = function (msg) {
    let date = new Date().toLocaleString();
    console.log(`[${date}]: ${msg}`)
};

exports.logDebug = function (msg) {
    let date = new Date().toLocaleString();
    console.error('\x1b[96m%s\x1b[0m', `[${date}] Debug: ${msg}`)
};

exports.logError = function (msg) {
    let date = new Date().toLocaleString();
    console.error('\x1b[91m%s\x1b[0m', `[${date}] ${msg}`)
};

exports.isConfigValid = function () {
    const config = require('../config/config.json');
    let modes = ['breatheCycle', 'colorLoop', 'flashLights'];

    let months = config.months["12"] >= 0 && config.months["12"] <= 65535
        && config.months["24"] >= 0 && config.months["24"] <= 65535
        && config.months["36"] >= 0 && config.months["36"] <= 65535;

    let specials = true;
    for(let special in config.cheerSpecials.specials) {
        if(!Number(special) || config.cheerSpecials.specials[special] < 0 || config.cheerSpecials.specials[special] >= 65535) {
            specials = false;
            break;
        }
    }

    return config.bridgeIP !== "" && config.apiUsername !== "" && config.channel !== "" && config.group !== ""
        && modes.includes(config.mode) && months && specials;
};

exports.parseBool = function (input) {
    return input === "true";
};

exports.cleanExit = function () {
    require('readline')
        .createInterface(process.stdin, process.stdout)
        .question("Press [Enter] to exit...", function () {
            process.exit();
        });
};