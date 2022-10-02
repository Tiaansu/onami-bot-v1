const chalk = require('chalk');
const moment = require('moment');

exports.log = (content, type = "log") => {
    const timestamp = `[${chalk.cyan(moment().format("LLLL"))}]:`

    const ColorLog = chalk.gray;
    const ColorWarn = chalk.yellow;
    const ColorError = chalk.red;
    const ColorDebug = chalk.magenta;
    const ColorCMD = chalk.cyan;
    const ColorReady = chalk.green;

    switch (type) {
        case "log": return console.log(`${timestamp} ${ColorLog(type.toUpperCase())} ${content}`);
        case "warn": return console.log(`${timestamp} ${ColorWarn(type.toUpperCase())} ${content}`);
        case "error": return console.log(`${timestamp} ${ColorError(type.toUpperCase())} ${content}`);
        case "debug": return console.log(`${timestamp} ${ColorDebug(type.toUpperCase())} ${content}`);
        case "cmd": return console.log(`${timestamp} ${ColorCMD(type.toUpperCase())} ${content}`);
        case "ready": return console.log(`${timestamp} ${ColorReady((type.toUpperCase()))} ${content}`);
        default: throw new TypeError("Logger type must be either log, warn, error, debug, cmd, and ready.");
    }
};

exports.error = (...args) => this.log(...args, "error");
exports.warn = (...args) => this.log(...args, "warn");
exports.debug = (...args) => this.log(...args, "debug");
exports.cmd = (...args) => this.log(...args, "cmd");
exports.ready = (...args) => this.log(...args, "ready");