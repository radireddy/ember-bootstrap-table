import Ember from 'ember';
import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

export default Ember.Controller.extend({

    sortProperties: ['firstName:desc'],
    totalUsers: 0,

    columns: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: true,
            contentPath: 'firstName',
            isSorted: true,
            sortOrder: 'desc'
        });

        var col2 = ColumnDefinition.create({
            header: 'Last Name',
            isSortable: true,
            contentPath: 'lastName'
        });

        var col3 = ColumnDefinition.create({
            header: 'Age',
            isSortable: true,
            contentPath: 'age',
            textAlign: 'center',
            hide: false,
            isFilterable: true
        });

        return [col1, col2, col3];

    }),

    actions: {
        onRowSelect: function(rows) {
            //alert(rows.length + ' row selected');
        },

        newButton: function() {
            alert('new');
        },

        deleteButton: function() {
            alert('delete');
        }
    }

});
