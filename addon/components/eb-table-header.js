import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'thead',
    table: Ember.computed.alias('parentView.parentView'),
    columns: Ember.computed.alias('table.columns'),
    layout: Ember.HTMLBars.compile('{{eb-table-header-row columns=columns}}'),
});
