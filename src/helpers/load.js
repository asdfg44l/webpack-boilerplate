module.exports = function(object, dataName) {
    Object.assign(object, require(`../assets/data/${dataName}.js`));
}