import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'tr',
    table: Ember.computed.alias('parentView.parentView.parentView'),
    layout: Ember.HTMLBars.compile('{{#each columns as |column|}}{{#unless column.hide}}{{eb-table-header-column column=column}}{{/unless}}{{/each}}'),
    classNames: ['table-header-row'],
    sortedColumn: ''
});