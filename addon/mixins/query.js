import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create({
    filterKey: '',
    _filterText: '',

    filterContent: function(row, filterKey) {
        var match;
        match = false;
        var columns = get(this, 'columns');
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            if (get(column, 'isFilterable')) {
                var columnValue = column.getCellContent(row);
                if (columnValue && column.filter(filterKey, columnValue)) {
                    match = true;
                    break;
                }
            }
        }
        return match;
    },

    _filteredContent: Ember.computed('_filterText', '_sortedContent.[]', function() {
        var ac = get(this, '_sortedContent');
        if (ac && !Ember.isEmpty(ac)) {
            if (!this.get('_filterText')) {
                return ac;
            }
            var content = ac.filter((function(_this) {
                return function(row) {
                    if (get(_this, '_filterText')) {
                        return _this.filterContent(row, get(_this, '_filterText'));
                    } else {
                        return true;
                    }
                };
            })(this));
            if (Ember.isEmpty(content)) {
                return Ember.A(); // content will be javascript array, return ember array
            } else {
                return content;
            }
        } else {
            return ac;
        }
    }),

    onFilterKeyChange: Ember.observer('filterKey', function() {
        var self = this;
        this.delay(function() {
            var trimedValue = Ember.$.trim(get(self, 'filterKey'));
            set(self, '_filterText', trimedValue);
        }, 400);
    }),

    delay: (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })()
});
