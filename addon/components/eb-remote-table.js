import Ember from 'ember';
import Table from 'ember-bootstrap-table/mixins/table';
import PaginatedMixin from 'ember-bootstrap-table/mixins/remote-paginated';
import QueryMixin from 'ember-bootstrap-table/mixins/remote-query';

var get = Ember.get;
var set = Ember.set;

/**
 * table componet, supports server
 *     1. server side sorting, default sorting
 *     2. row selection, single and multiple
 *     3. column filter
 *     4. custome templates, customization
 *     5. server side pagination
 */
export default Ember.Component.extend(Table, QueryMixin, PaginatedMixin, {

    totalRecords: 0,
    dataFetchHandler: null,
    _sortProperty: null,
    _sortAscending: true,

    /* init: function() {
         this._super();
         //this.setDefaultSort();
     },*/

    didInsertElement: function(){
        this._super();
        this._fetchData();
    },

    // _resolvedContent is an intermediate property between content and rows
    // This allows content to be a plain array or a promise resolving to an array
    _resolvedContent: Ember.A(),

    onContentChange: Ember.observer('content', function() {
        var _this = this;
        var content = get(this, 'content');
        if (content.then) {
            set(this, '_isLoading', true);
            set(this, '_resolvedContent', Ember.A());
            // content is a promise
            content.then(function(resolvedContent) {
                // when the promise resolves, set this property so it gets cached
                set(_this, '_resolvedContent', resolvedContent);

                // if the promise resolves immediately, set `value` so we return
                // the resolved value and not []
                set(_this, '_isLoading', false);
            });

            // returns [] if the promise doesn't resolve immediately, or
            // the resolved value if it's ready
            //return value;
        } else {
            // content is not a promise
            set(this, '_isLoading', false);
            set(this, '_resolvedContent', content);
        }
    }),

    _sortedContent: Ember.computed.alias('_resolvedContent'),

    pageNum: Ember.computed('page', function(key, value) {
        // setter
        if (arguments.length > 1) {
            set(this, 'page', value - 1);
        }

        // getter
        return get(this, 'page') + 1;
    }),

    /*setDefaultSort: function() {
        var columns = this.get('columns');
        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            if (col.isSorted) {
                this.set('_sortProperty', col.contentPath);
                this.set('_sortAscending', col.sortAscending);
                break;
            }
        }
    },*/

    isRemote: function() {
        return true;
    },

    _fetchData: Ember.observer('page', 'pageSize', function() {
        var filterText = get(this, 'filterText');
        //fetch data from server on pagination
        this.sendAction('dataFetchHandler', get(this, 'page') + 1, get(this, 'pageSize'), get(this, '_sortProperty'), get(this, '_sortAscending'), filterText);
    }),

    onFilter: Ember.observer('_filterText', function() {
        this._removeAllRows(); //clear row selection on filter
        if (get(this, 'page') > 0) { //not in first page
            set(this, 'page', 0); //reset current page, set to first page
            //no need to call fetch data as page change will call it
        } else {
            //no page change, call fetch data
            var filterText = get(this, '_filterText');
            this.sendAction('dataFetchHandler', get(this, 'page') + 1, get(this, 'pageSize'), get(this, '_sortProperty'), get(this, '_sortAscending'), filterText);
        }
    }),

    actions: {
        sortBy: function(col, sortAscending) {
            //fetch data from server on sorting
            this._removeAllRows(); //clear row selection on sort
            set(this, '_sortProperty', col.get('contentPath'));
            set(this, '_sortAscending', sortAscending);
            if (get(this, 'page') > 0) { //not in first page
                set(this, 'page', 0); //reset current page, set to first page
                //no need to call fetch data as page change will call it
            } else {
                //no page change, call fetch data
                var filterText = get(this, 'filterText');
                this.sendAction('dataFetchHandler', get(this, 'page') + 1, get(this, 'pageSize'), get(col, 'contentPath'), sortAscending, filterText);
            }
        },
    }
});
