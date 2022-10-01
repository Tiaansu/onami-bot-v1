module.exports = {
    ConvertToHex: function(dec) {
        let code = dec.toString(16);
        return `#${code}`;
    }
}