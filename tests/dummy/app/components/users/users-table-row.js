import Ember from 'ember';
import VcaTableRow from 'ember-bootstrap-table/components/eb-table-row';

export default VcaTableRow.extend({
    classNames: ['user-row'], //for all rows
    classNameBindings: ['isSeniourCitizen:label-danger', 'isSeniourCitizen:text-bold'], //for selected rows

    isSeniourCitizen: Ember.computed('row', function(){
        return this.get('row.age') > 60 ? true : false;
    })

});
