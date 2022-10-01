module.exports = {
    addCommas: function(num) {
        if (typeof num !== 'number') {
            throw new TypeError('Expected a number!');
        }

        const characters = parseInt(num, 10).toString();
        let output = '';
        for (let offset = characters.length; offset > 0; offset -= 3) {
            output = characters.slice(Math.max(offset - 3, 0), offset) + (output ? ',' + output : '');
        }
        return output;
    }
}