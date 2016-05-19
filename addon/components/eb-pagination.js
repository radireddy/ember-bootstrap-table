import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Component.extend({

    tagName: 'ul',
    classNames: ['pagination', 'pagination', 'pagination-sm', 'table-pagination'],
    _pages: Ember.A(),
    visiblePages: 3,
    page: 0,
    numPages: 0,
    layoutName: 'components/pagination',

    init: function() {
        this._super();
        this.createPages();
    },

    createPages: function() {
        var page = get(this, 'page');
        var numPages = get(this, 'numPages');
        var pagesFrom = Math.max(0, page - get(this, 'visiblePages'));
        var pagesTo = Math.min(numPages, page + (get(this, 'visiblePages') + 1));
        var pages = Ember.A();
        for (var i = pagesFrom; i < pagesTo; i++) {
            pages.pushObject({
                index: i,
                page: i + 1,
                isActive: (i === page)
            });
        }
        set(this, '_pages', pages);
    },

    didPagesChanged: Ember.observer('numPages', 'page', function() {
        this.createPages();
        var pages = get(this, 'numPages');
        var page = get(this, 'page');
        //this.set('_pagesCount', pages);
        set(this, '_hasNextPage', (page + 1 < pages));
        set(this, '_hasPrevPage', (page > 0));
        set(this, '_hasFirstPage', (page > 0));
        set(this, '_hasLastPage', (page + 1 < pages));
    }),

    actions: {
        setPage: function(context) {
            set(this, 'page', context.index);
        },

        firstPage: function() {
            if (!get(this, '_hasFirstPage')) {
                return;
            }
            set(this, 'page', 0);
        },

        lastPage: function() {
            if (!get(this, '_hasLastPage')) {
                return;
            }
            set(this, 'page', (get(this, 'numPages') - 1));
        },

        prevPage: function() {
            if (!get(this, '_hasPrevPage')) {
                return;
            }
            set(this, 'page', (get(this, 'page') - 1));
        },

        nextPage: function() {
            if (!get(this, '_hasNextPage')) {
                return;
            }
            set(this, 'page', (get(this, 'page') + 1));
        }
    }

});
