import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create({

    tagName: 'div',
    classNameBindings: ['responsiveTable:table-responsive'],
    emptyMessage: 'No records found',
    loadingMessage: 'Loading...',
    columns: Ember.A(),
    content: Ember.A(),
    rowSelection: null,
    selectedRows: Ember.A(),
    sortProperties: ['abc'],
    _isLoading: true,
    _visibleColumnCount: 0,
    rowComponentName: 'eb-table-row',
    responsiveTable: true,
    condensedTable: false,
    borderedTable: true,
    nowrapTable: true,
    tableStriped: false,

    layout: Ember.computed(function() {
        return Ember.HTMLBars.compile('{{yield}}{{#eb-table-content}}{{eb-table-header}}{{eb-table-body}}{{eb-table-footer}}{{/eb-table-content}}');
    }),

    init: function() {
        this._super();
        if (!Ember.$) {
            throw 'Missing dependency: jquery';
        }
    },

    setVisibleColumnCount: Ember.observer('columns', 'columns.[]', function() {
        var columns = get(this, 'columns');
        var count = 0;
        for (var i = 0; i < columns.length; i++) {
            if (!columns[i].hide) {
                count++;
            }
        }
        this.set('_visibleColumnCount', count);
    }),

    onFilter: Ember.observer('_filterText', function() {
        this._removeAllRows(); //clear row selection on filter
        // reset page to first page
        set(this, 'page', 0);
    }),

    onPagination: Ember.observer('page', function() {
        this._removeAllRows(); //clear row selection on pagination
    }),

    selectRow: function(row, isSelect) {
        if (!get(this, 'rowSelection')) {
            return;
        }
        if (get(this, 'rowSelection') === 'single') {
            if (isSelect) {
                set(this, 'selectedRows', Ember.A()); //remove all previous rows, dont send notification
                this._addRow(row);
            } else {
                this._removeRow(row);
            }
        } else if (get(this, 'rowSelection') === 'multiple') {
            if (isSelect) {
                this._addRow(row);
            } else {
                this._removeRow(row);
            }
        } else {
            return;
        }
    },

    _notifyRowSelectionHandler: function() {
        this.sendAction('rowSelectionHandler', get(this, 'selectedRows'));
    },

    _removeAllRows: function() {
        set(this, 'selectedRows', Ember.A()); //remove all selected rows
        this._notifyRowSelectionHandler();
    },

    _removeRow: function(row) {
        get(this, 'selectedRows').removeObject(row);
        this._notifyRowSelectionHandler();
    },

    _addRow: function(row) {
        get(this, 'selectedRows').pushObject(row);
        this._notifyRowSelectionHandler();
    },

    willDestroyElement: function() {

    }

});
