import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create({

    page: 0,
    pageSize: 10,

    _offset: Ember.computed('page', 'pageSize', function() {
        return get(this, 'page') * get(this, 'pageSize');
    }),

    _paginatedContent: Ember.computed('page', 'pageSize', '_filteredContent.[]', function() {
        if (get(this, 'page') >= get(this, 'pages')) {
            set(this, 'page', 0);
        }
        var content = get(this, '_filteredContent');
        if (Ember.isEmpty(content)) {
            return content;
        } else {
            var pageContent = content.slice(get(this, '_offset'), get(this, '_offset') + get(this, 'pageSize'));
            return Ember.A(pageContent);
        }

    }),

    _pages: Ember.computed('_filteredContent.length', 'pageSize', function() {
        return Math.ceil(get(this, '_filteredContent.length') / get(this, 'pageSize'));
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

    _first: Ember.computed('page', 'pageSize', '_filteredContent.length', function() {
        var length = get(this, '_filteredContent.length');
        if (typeof length === 'undefined' || length === 0) {
            return 0;
        }
        var page = get(this, 'page');
        var pageSize = get(this, 'pageSize');
        return page * pageSize + 1;
    }),

    _last: Ember.computed('page', 'pageSize', '_filteredContent.length', function() {
        var page = get(this, 'page');
        var pageSize = get(this, 'pageSize');
        var length = get(this, '_filteredContent.length');
        if (typeof length === 'undefined') {
            length = 0;
        }
        return Math.min(length, page * pageSize + pageSize);
    })

});
