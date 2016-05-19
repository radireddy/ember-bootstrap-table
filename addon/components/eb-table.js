import Ember from 'ember';
import Table from 'ember-bootstrap-table/mixins/table';
import PaginatedMixin from 'ember-bootstrap-table/mixins/paginated';
import QueryMixin from 'ember-bootstrap-table/mixins/query';

var get = Ember.get;
var set = Ember.set;

/**
 * table componet, supports
 *     1. sorting, default sorting
 *     2. row selection, single and multiple
 *     3. column filter
 *     4. custome templates, customization
 *     5. pagination
 */
export default Ember.Component.extend(Table, QueryMixin, PaginatedMixin, {

    _sortedContent: Ember.computed.sort('_resolvedContent', 'sortProperties'),

    // _resolvedContent is an intermediate property between content and rows
    // This allows content to be a plain array or a promise resolving to an array
    _resolvedContent: Ember.computed('content', function(key, value) {
        if (arguments.length > 1) {
            return value;
        } else {
            var _this = this;
            value = Ember.A();

            var content = this.get('content');
            if (content.then) {
                // content is a promise
                content.then(function(resolvedContent) {
                    // when the promise resolves, set this property so it gets cached
                    set(_this, '_resolvedContent', resolvedContent);
                    set(_this, 'content', resolvedContent);
                    //console.log(content._results);

                    // if the promise resolves immediately, set `value` so we return
                    // the resolved value and not []
                    //value = resolvedContent;
                    set(_this, '_isLoading', false);
                });

                // returns [] if the promise doesn't resolve immediately, or
                // the resolved value if it's ready
                return value;
            } else {
                // content is not a promise
                set(this, '_isLoading', false);
                return content;
            }
        }
    }),

    isRemote: function() {
        return false;
    },

    totalRecords: Ember.computed('_filteredContent.length', function() {
        return get(this, '_filteredContent.length');
    }),



    actions: {
        sortBy: function(col, sortAscending) {
            this._removeAllRows(); //clear row selection on sort
            // reset page to first page
            set(this, 'page', 0);
            //this.get('tableControllerInstance').send('sortBy', col, sortAscending);
            var order = sortAscending ? 'aesc' : 'desc';
            set(this, 'sortProperties', [col.contentPath + ':' + order]);
            //this.set('sortAscending', sortAscending);
        }
    }

});
