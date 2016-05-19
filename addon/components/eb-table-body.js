import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({

    tagName: 'tbody',
    table: Ember.computed.alias('parentView.parentView'),
    columns: Ember.computed.alias('table.columns'),
    rows: Ember.computed.alias('table._paginatedContent'),
    layout: Ember.HTMLBars.compile('{{#each rows as |row|}}{{component table.rowComponentName row=row columns=columns}}{{else}}'+
                                    '<tr><td colspan="{{columnCount}}"><span style="padding: 10px;">{{emptyMessage}}</span>'+
                                    '</td></tr>{{/each}}'),
    classNameBindings: ['rowSelection:table-hover'],
    currentRow: null,

    columnCount: Ember.computed('columns.length', function() {
        return get(this, 'columns.length');
    }),

    emptyMessage: Ember.computed('table.emptyMessage', 'table._isLoading', function() {
        var loading = get(this, 'table._isLoading');
        if (loading) {
            return get(this, 'table.loadingMessage');
        } else {
            return get(this, 'table.emptyMessage');
        }
    }),

    rowSelection: Ember.computed('table.rowSelection', function() {
        return get(this, 'table').get('rowSelection');
    })
});
