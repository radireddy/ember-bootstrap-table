import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({
    tagName: 'table',
    classNames: ['table'],
    classNameBindings: ['table.condensedTable:table-condensed', 'table.borderedTable:table-bordered', 'table.nowrapTable:table-nowrap', 'rowSelection:table-hover', 'table.tableStriped:table-striped'],
    rowSelection: Ember.computed('table.rowSelection', function() {
        return get(this, 'table.rowSelection') === 'single' || get(this, 'table.rowSelection') === 'multiple';
    }),
    table: Ember.computed.alias('parentView'),
    layout: Ember.HTMLBars.compile('{{yield}}')
});
