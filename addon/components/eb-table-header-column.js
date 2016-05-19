import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({

    tagName: 'th',
    table: Ember.computed.alias('parentView.parentView.parentView.parentView'),
    headerRow: Ember.computed.alias('parentView'),
    layout: Ember.HTMLBars.compile('{{column.header}}<span></span>'),
    classNames: ['table-header-cell'],
    classNameBindings: ['isSortable:table-sortable', 'column.isSorted:table-sorted', 'isSortedAscending', 'textAlign'],
    attributeBindings: ['width', 'minWidth:min-width'],
    minWidth: '100px',

    onSort: Ember.observer('headerRow.sortedColumn', function() {
        if (this === get(this, 'headerRow.sortedColumn')) {
            set(this, 'column.isSorted', true);
        } else {
            set(this, 'column.isSorted', false);
        }
    }),

    width: Ember.computed(function() {
        return get(this, 'column.width');
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

    style: Ember.computed(function() {
        return 'width:' + get(this, 'column.width') + '; min-width: 100px; border-bottom: 0px;';
    }),

    isSortedAscending: Ember.computed('column.isSorted', 'column.sortOrder', function() {
        if (get(this, 'column.isSorted')) {
            if (get(this, 'column.sortOrder') === 'asc') {
                return 'table-sorted-asc';
            } else {
                return 'table-sorted-desc';
            }
        } else {
            return '';
        }
    }),

    isSortable: Ember.computed('column.isSortable', function() {
        return get(this, 'column.isSortable');
    }),

    click: function() {
        if (get(this, 'isSortable')) {
            if (get(this, 'column.isSorted')) {
                set(this, 'column.isSorted', true);
                set(this, 'column.sortOrder', get(this, 'column.sortOrder') === 'asc' ? 'desc' : 'asc');
            } else {
                set(this, 'column.isSorted', true);
                set(this, 'column.sortOrder', 'asc');
                //this.set('column.sortOrder', this.get('sortAscending') ? 'asc' : 'desc');
            }
            set(this, 'headerRow.sortedColumn', this);
            var table = get(this, 'table');
            table.send('sortBy', get(this, 'column'), get(this, 'column.sortOrder') === 'asc' ? true : false);
        }
    }
});
