import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({

    tagName: 'tr',
    columns: null,
    row: null,
    layout: Ember.HTMLBars.compile('{{#each columns as |column|}}{{#unless column.hide}}{{component column.columnComponentName row=row column=column}}{{/unless}}{{/each}}'),
    isSelected: false,
    isHovered: false,
    classNameBindings: ['isHovered:table-row-hovered', 'isSelected:table-row-selected', 'rowSelectionEnabled:table-row-hover'],
    table: Ember.computed.alias('parentView.parentView.parentView'),

    rowSelectionEnabled: Ember.computed('rowSelection', function() {
        var sel = get(this, 'rowSelection');
        if (sel && (sel === 'single' || sel === 'multiple')) {
            return true;
        } else {
            return false;
        }
    }),

    mouseEnter: function() {
        if (get(this, 'rowSelectionEnabled')) {
            return set(this, 'isHovered', true);
        }
    },

    mouseLeave: function() {
        return set(this, 'isHovered', false);
    },

    click: function() {
        if (get(this, 'rowSelectionEnabled')) {
            var select = !get(this, 'isSelected');
            this.toggleProperty('isSelected');
            var table = get(this, 'table');
            table.trigger('selectRow', get(this, 'row'), select);
            set(this, 'parentView.currentRow', get(this, 'row'));
        }
    },

    onRowSelect: Ember.observer('parentView.currentRow', function() {
        if (get(this, 'rowSelection') === 'single') {
            //clear previous row selection
            var recentlySelectedRow = get(this, 'parentView.currentRow');
            if (get(this, 'row') !== recentlySelectedRow) {
                set(this, 'isSelected', false);
            }
        }
    }),

    rowSelection: Ember.computed('table.rowSelection', function() {
        return get(this, 'table').get('rowSelection');
    })
});
