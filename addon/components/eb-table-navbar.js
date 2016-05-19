import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'div',
    classNames: ['table-toolbar'],
    table: Ember.computed.alias('parentView.parentView'),
    layout: Ember.HTMLBars.compile('{{yield}}')
});