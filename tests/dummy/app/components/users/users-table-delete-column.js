import Ember from 'ember';
import VcaTableColumn from 'ember-bootstrap-table/components/eb-table-column';
const { getOwner } = Ember;

export default VcaTableColumn.extend({
    layout: Ember.HTMLBars.compile('<button type="button" class="btn btn-primary btn-sm" id="delete" {{action "deleteRow" row target="controller"}}> Delete </button>'),
    actions: {
        deleteRow: function(row) {
            console.log(row);
            getOwner(this).lookup('controller:table').send('deleteUser', row);
        }
    }
});
