const chalk = require("chalk");
const moment = require("moment");

exports.log = (content, type = "log") => {
    const timestamp = `[${chalk.cyan(moment().format("dddd, MMMM DD YYYY hh:mm:ss A"))}]:`

    switch (type) {
        case "log": return console.log(`${timestamp} ${chalk.gray(type.toUpperCase())} ${content}`);
        case "warn": return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} ${content}`);
        case "error": return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} ${content}`);
        case "debug": return console.log(`${timestamp} ${chalk.magenta(type.toUpperCase())} ${content}`);
        case "cmd": return console.log(`${timestamp} ${chalk.white(type.toUpperCase())} ${content}`);
        case "ready": return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
        default: throw new TypeError("Logger type must be either log, warn, error, debug, cmd, and ready.");
    }
};

exports.error = (...args) => this.log(...args, "error");
exports.warn = (...args) => this.log(...args, "warn");
exports.debug = (...args) => this.log(...args, "debug");
exports.cmd = (...args) => this.log(...args, "cmd");
exports.ready = (...args) => this.log(...args, "ready");