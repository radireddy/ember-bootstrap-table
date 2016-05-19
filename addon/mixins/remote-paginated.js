import Ember from 'ember';
import PaginatedMixin from 'ember-bootstrap-table/mixins/paginated';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create(PaginatedMixin, {

    _paginatedContent: Ember.computed('page', 'pageSize', '_filteredContent', '_filteredContent.[]', function() {
        var content = get(this, '_filteredContent');
        return content;
    }),

    _pages: Ember.computed('totalRecords', 'pageSize', function() {
        return Math.ceil(get(this, 'totalRecords') / get(this, 'pageSize'));
    }),

    firstPage: function() {
        set(this, 'page', 0);
    },

    previousPage: function() {
        set(this, 'page', Math.max(get(this, 'page') - 1, 0));
    },

    nextPage: function() {
        set(this, 'page', Math.min(get(this, 'page') + 1, get(this, 'pages') - 1));
    },

    lastPage: function() {
        set(this, 'page', get(this, 'pages') - 1);
    },

    _first: Ember.computed('page', 'pageSize', 'totalRecords', function() {
        var length = get(this, 'totalRecords');
        if (typeof length === 'undefined' || length === 0) {
            return 0;
        }
        var page = get(this, 'page');
        var limit = get(this, 'pageSize');
        return page * limit + 1;
    }),

    _last: Ember.computed('page', 'pageSize', 'totalRecords', function() {
        var page = get(this, 'page');
        var limit = get(this, 'pageSize');
        var length = get(this, 'totalRecords');
        if (typeof length === 'undefined') {
            length = 0;
        }
        return Math.min(length, page * limit + limit);
    })

});
