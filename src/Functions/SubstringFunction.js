module.exports = {
    substring: function(length, value) {
        const replaced = value.replace(/\n/g, "--");
        const regex = `.{1,${length}}`;
        const lines = replaced
            .match(new RegExp(regex, "g"))
            .map((line) => line.replace(/--/g, "\n"));

        return lines;
    }
}