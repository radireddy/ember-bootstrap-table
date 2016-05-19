import Ember from 'ember';
import QueryMixin from 'ember-bootstrap-table/mixins/query';

var get = Ember.get;
var set = Ember.set;

export default Ember.Mixin.create(QueryMixin, {

    _filteredContent: Ember.computed('_filterText', '_sortedContent.[]', '_sortedContent', function() {
        if (get(this, '_isLoading')) {
            return Ember.A();
        }
        var ac = this.get('_sortedContent');
        return ac;
    }),

});
