module.exports = {
    normalizeEntityName: function() {},

    afterInstall: function(options) {
        // We assume that handlebars, ember, and jquery already exist
        return this.addBowerPackagesToProject([{
            'name': 'bootstrap',
            'target': '~3.3.6'
        }]);
    }
};
