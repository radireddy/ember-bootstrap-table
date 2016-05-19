import Ember from 'ember';
import VcaTableColumn from 'ember-bootstrap-table/components/eb-table-column';

export default VcaTableColumn.extend({
    classNames: ['user-column'], //for all columns
    classNameBindings: ['isSeniourCitizen:label-danger', 'isSeniourCitizen:text-bold'], //for selected columns

    isSeniourCitizen: Ember.computed('cellContent', function(){
        return this.get('cellContent') > 60 ? true : false;
    })

});