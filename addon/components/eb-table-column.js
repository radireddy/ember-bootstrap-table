import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({

    tagName: 'td',
    row: null,
    column: null,
    layout: Ember.HTMLBars.compile('{{cellContent}}'),
    classNameBindings: ['textAlign'],
    templateName: 'components/table/column',
    attributeBindings: ['width', 'minWidth:min-width', 'title'],
    minWidth: '100px',

    width: Ember.computed('column.width', function() {
        return get(this, 'column.width');
    }),

    title: Ember.computed('cellContent', function() {
        return get(this, 'cellContent');
    }),

    textAlign: Ember.computed('column.textAlign', function() {
        var textAlign = get(this, 'column.textAlign');
        if (textAlign === 'left') {
            return 'table-text-left-align';
        } else if (textAlign === 'right') {
            return 'table-text-right-align';
        } else {
            return 'table-text-center-align';
        }
    }),

    cellContent: Ember.computed('column', 'row', 'value', {
        get: function() {
            var row = get(this, 'row');
            var column = get(this, 'column');
            return column.getFormatedCellContent(row);
        },
        set: function(key, value) {
            var row = get(this, 'row');
            var column = get(this, 'column');
            column.setCellContent(row, value);
            return value;
        }
    })
});
