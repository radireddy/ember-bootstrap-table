import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({

    tagName: 'tfoot',

    classNames: ['table-footer'],
    table: Ember.computed.alias('parentView.parentView'),
    columns: Ember.computed.alias('table.columns'),
    layout: Ember.HTMLBars.compile('<tr> <td colspan="{{columnCount}}"><div class="table-page pull-left">Showing {{table._first}} - {{table._last}} from {{table.totalRecords}}</div>' +
        ' <div class="pull-right">{{eb-pagination page=table.page numPages=table._pages}}</div></td></tr>'),

    columnCount: Ember.computed('columns.length', function() {
        return get(this, 'columns.length');
    }),

});
