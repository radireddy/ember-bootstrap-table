import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Object.extend({
    header: null,
    isSortable: false,
    textAlign: 'left',
    isFilterable: true,
    contentPath: null,
    width: null,
    hide: false,
    isSorted: false,
    sortOrder: 'asc',
    columnComponentName: 'eb-table-column',

    filter: function(filterKey, value) {
        if (value.toString().toLowerCase().indexOf(filterKey.toLowerCase()) !== -1) {
            return true;
        }
        return false;
    },

    getCellContent: function(row) {
        var path = get(this, 'contentPath');
        Ember.assert('You must either provide a contentPath or override ' + 'getCellContent in your column definition', path != null);
        var value = Ember.get(row, path);
        if (Ember.isArray(value)) { //is Array
            return value.join(', ');
        } else {
            return value;
        }
    },

     /**
     * This method is used to show cell value on table,
     * Overide this method if you need to return formated value like date, currency etc
     */
    getFormatedCellContent: function(row){
        return this.getCellContent(row);
    },

    setCellContent: function(row, value){
        var path = get(this, 'contentPath');
        Ember.set(row, path, value);
    }

});
