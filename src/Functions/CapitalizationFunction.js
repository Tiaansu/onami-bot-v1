module.exports = {
    CapitalizedFirstLetter: function(str) {
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return capitalized;
    }
}