import Ember from 'ember';
import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

export default Ember.Controller.extend({

    sortProperties: ['age:desc'],
    sortProperties5: ['age:desc'],
    selectedRow3: null,

    columns1: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: false,
            contentPath: 'firstName',
            isFilterable: true
        });

        var col2 = ColumnDefinition.create({
            header: 'Last Name',
            isSortable: false,
            contentPath: 'lastName',
            isFilterable: true
        });

        var col3 = ColumnDefinition.create({
            header: 'Age',
            isSortable: false,
            contentPath: 'age',
            textAlign: 'center',
            isFilterable: true
        });

        return [col1, col2, col3];

    }),

    columns3: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: true,
            contentPath: 'firstName'
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
            isFilterable: true,
            isSorted: true,
            sortOrder: 'desc'
        });

        return [col1, col2, col3];

    }),

    columns4: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: true,
            contentPath: 'firstName'
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
            isFilterable: true,
            isSorted: true,
            sortOrder: 'desc'
        });

        return [col1, col2, col3];

    }),

    columns5: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: true,
            contentPath: 'firstName'
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
            isFilterable: true,
            isSorted: true,
            sortOrder: 'desc',
            columnComponentName: 'users.users-table-column',
        });

        return [col1, col2, col3];

    }),

    columns6: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: true,
            contentPath: 'firstName'
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
            isFilterable: false
        });

        var col4 = ColumnDefinition.create({
            header: 'Action',
            isSortable: false,
            contentPath: '',
            textAlign: 'center',
            isFilterable: false,
            columnComponentName: 'users.users-table-delete-column',
        });

        return [col1, col2, col3, col4];

    }),

    columns7: Ember.computed(function() {

        var col1 = ColumnDefinition.create({
            header: 'First Name',
            isSortable: true,
            contentPath: 'firstName'
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
            isFilterable: false
        });

        return [col1, col2, col3];

    }),

    disableButtons3: Ember.computed('selectedRow3', function() {
        return this.get('selectedRow3') ? false : true;
    }),

    actions: {
        onRowSelect3: function(rows) {
            //alert(rows.length + ' row selected');
            this.set('selectedRow3', rows[0]);
        },

        onRowSelect4: function(rows) {
            //alert(rows.length + ' row selected');
            //this.set('selectedRow3', rows[0]);
        },

         onRowSelect7: function(rows) {
            //alert(rows.length + ' row selected');
            console.log(rows.length + ' rows selected');
            rows.forEach(function(row){
                console.log(Ember.get(row, 'firstName'));
            });
        },

        newButton3: function() {
            alert('new');
        },

        deleteButton3: function() {
            this.get('users').removeObject(this.get('selectedRow3'));
            this.set('selectedRow3', null);
        },

        deleteUser: function(user){
            console.log(user);
            alert('delete user '+ Ember.get(user, 'firstName'));
        }
    }

});
