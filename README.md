# Ember-bootstrap-table

Table component built using Ember 2.5. It is built as ember component and available as ember-cli addon.
It support both in memory operations and server side operations to support large data. it also allows you to handle very large data by only rendering the rows that are being displayed.

### Supported features

Supports all features of Bootstrap Table with below additional features

* Column sorting, both ascending and decending.
* Default column sorting, sort table by a column when table is rendered
* Free text filter, can be extended to add customised filter
* Default filter is supported, filters table rows by default key when table is rendered
* Navigation buttons, rendered using block content and  hence can be customizable as needed
* Row selection, single and multiple
* Pagination, page size is configurable
* Customizable as needed like to add action buttons in column cells, to highlight a row or a cell
* Server side pagination, sorting and filtering

## Dependencies

* Ember 2.5.0
* Ember-cli 2.5.0
* Twitter Bootstrap 3.3.6, only CSS


## Instalation

* `ember install ember-bootstrap-table`
* include ember template compiler in ember-cli-build.js

    ```javascript
    app.import('bower_components/ember/ember-template-compiler.js');
    ```
* install bootstrap if you not yet installed `bower install bootstrap --save`

## Developing or setting up this project on your computer

* `git clone https://github.com/radireddy/ember-bootstrap-table.git`
* `npm install`
* `bower install`
* `bower install bootstrap`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests (no test cases added as of now)

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

## Looking for help?

If it is a bug please [open an issue on GitHub](https://github.com/radireddy/ember-bootstrap-table/issues).


## Contributing

We welcome anyone interested to contribute to this library. We are always looking to improve this library. Please see our [Contribution Guidelines](CONTRIBUTING.md) on how to properly submit issues and pull requests.
You can also reach me on adireddyravindra@gmail.com if you need any help.

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## Versioning

This library follows [Semantic Versioning](http://semver.org/)


# Developer Guide

## Usage

To create simple table, do following,
 * In your template use component as below

    ```html
       {{#eb-table
            pageSize=10
            content=users
            columns=columns}}
        {{/eb-table}}
    ```

* In your controller define columns and users array as below

    ```javascript
    import Ember from 'ember';
    import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

    export default Ember.Controller.extend({

        users: [{firstName: 'James', lastName: 'Carter', age: 30},
                    {firstName: 'Steven', lastName: 'Smith', age: 35}]

        columns: Ember.computed(function() {
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
        })
    });
    ```
* Table looks like this

![Alt text](/images/simple-table.png?raw=true)


## Table Options

| Option Name  | Required | Default Value | Desctiption |
| ------------------ | ------------------ | ---------------- | ------------ |
| content | true | Ember.A() | An array of row objects, or a promise that resolves to an array of row objects. Usually each row is a object where the keys are column names (column headers) and the values are the column values. |
| columns  | true  | Ember.A() | An array of column definitions: see  Column Definition options below. Allows each column to have its own configuration. |
| pageSize | false | 10 | Positive integer, number of rows shown in each page depends on page size. |
| filterKey | false | '' | String, used to filter rows. By default all columns value is matched with filterKey and row is shown only if any column value matches with filterKey. Whether to iclude column in filter or not can be configured using Column Defination shown below. |
| rowSelection | false | null | Can be 'single' or 'multiple'. |
| rowSelectionHandler | false | null | JavaScript function, call back funtion. This function will be called when a table row is selected or unselected. It passes array of rows selected as an argument. If no row is selected, array will be empty. |
| sortProperties | false | [] | Array of colums that are sorted. This can be used to supplay default column sort to table. For example ['firstName:asc'] will sort table data by First Name column in ascending order when table is rendered. ['firstName:desc'] with sort in descending order. |
| emptyMessage | false | No records found | String, this message is shown when there are no rows in table. |
| loadingMessage | false | Loading... | String, this message is shown when data is fetched from server. |
| responsiveTable | false | true | Boolean, if true adds bootstrap 'table-responsive' class to table. Makes table responsive. For more info http://getbootstrap.com/css/#tables-responsive |
| condensedTable | false | false | Boolean, if true adds bootstrap 'table-condensed' class to table. Reduces table row height. For more info http://getbootstrap.com/css/#tables-condensed |
| borderedTable | false | true | Boolean, if true adds bootstrap 'table-bordered' class to table. Adds border to table, for more info http://getbootstrap.com/css/#tables-bordered |
| nowrapTable | false | true | Boolean, if true adds bootstrap 'table-nowrap' class to table. If falsewraps cell content if it exceds available width. |
| tableStriped | false | false | Boolean, if true adds bootstrap 'table-striped' class to table. Adds zebra-striping to table rows. For more info http://getbootstrap.com/css/#tables-striped |
| rowComponentName | false | eb-table-row | String, table row component name. If you need to customize table row (for ex: if you need to highlight row on certain condition), extend eb-table-row  to add your own extension logic and then provide extended component name through this property. |

## Column Options

Column options are passed to table as an array of 'column-definition' model. Each column need to extend 'column-definition' model and override column options if required.

| Option Name  | Required | Default Value | Desctiption |
| ------------------ | ------------------ | ---------------- | ------------ |
| header | true | null | String, Column header. |
| contentPath | true | null | String, row key name. It should exactly match with key name of an object. This property will be used to get value from object. |
| isSortable | false | false | Boolean, if true, sorting is enabled on this column. |
| isFilterable | false | true | Boolean, if true, filter is enabled on this column. |
| textAlign | false | 'left' | String, column align order. Available options are 'left', 'right' and 'center' |
| width | false | null | String, column width ex: '100px'. If no width is provided, no width is mentioned on column. |
| isSorted | false | false | Boolean, used to indicate  default column sort on table column header. If true sort order icon appears on table column header. Use table 'sortProperties' option to enable default sort.|
| sortOrder | false | 'asc' | String, used to indicate  default column sort order on table column header. Up or down  icon appears on table column header. Use table 'sortProperties' option to enable default sort.|
| columnComponentName | false | eb-table-column | String, table column component name. If you need to customize table column (for ex: if you need to highlight column cell on certain condition), extend eb-table-column  to add your own extension logic and then provide extended component name through this property. |
| hide | false | false | Boolean, if true, hids column from table. This can be used if u dont want to show column on table but need to filter rows based on this column. |

## Remote Table Options

All options mentioned above are applicable along with some additional options mentioned below.

| Option Name  | Required | Default Value | Desctiption |
| ------------------ | ------------------ | ---------------- | ------------ |
| totalRecords | true | 0 | Positive integer, total number of records found in DB. Exact value is required for pagination to work properly. |
| dataFetchHandler | true | null | JavaScript function, call back function. Table depends on this function to get data. Table calls this method when ever new data is required, on sorting, pagination, filteretc. It passes current page, page size, sort property, sort order and filter key as arguments. |

## Table Examples

### Simple table with pagination

```html
  {{#eb-table
                    pageSize=5
                    content=users
                    columns=columns}}
    {{/eb-table}}
  ```

  ```javascript
    import Ember from 'ember';
    import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

    export default Ember.Controller.extend({

        users: [{firstName: 'James', lastName: 'Carter', age: 30},
                    {firstName: 'Steven', lastName: 'Smith', age: 35}]

        columns: Ember.computed(function() {
            var col1 = ColumnDefinition.create({
                header: 'First Name',
                contentPath: 'firstName'
            });
            var col2 = ColumnDefinition.create({
                header: 'Last Name',
                contentPath: 'lastName'
            });
            var col3 = ColumnDefinition.create({
                header: 'Age',
                contentPath: 'age',
                textAlign: 'center'
            });
            return [col1, col2, col3];
        })
    });
 ```

![Alt text](/images/simple-table.png?raw=true)


### Table with navigation bar,  filter and pagination

  ```html
    {{#eb-table
        rowSelection='none'
        pageSize=5
        content=users
        columns=columns
        filterKey=filterKey}}

        {{#eb-table-navbar}}
            <button type="button" class="btn btn-primary btn-sm" id="new" {{action 'newButton'}}> New </button>
            <button type="button" class="btn btn-primary btn-sm" id="delete" {{action 'deleteButton'}}> Delete </button>
             <div class="table-search input-group pull-right">
                {{input class="form-control table-search" type='text' value=filterKey placeholder="Filter..." size=40}}
            </div>
            <div style="clear:both;"></div>
        {{/eb-table-navbar}}
    {{/eb-table}}
```

```javascript
    import Ember from 'ember';
    import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

    export default Ember.Controller.extend({

        users: [{firstName: 'James', lastName: 'Carter', age: 30},
                    {firstName: 'Steven', lastName: 'Smith', age: 35}]

        columns: Ember.computed(function() {
            var col1 = ColumnDefinition.create({
                header: 'First Name',
                contentPath: 'firstName',
                isFilterable: true
            });
            var col2 = ColumnDefinition.create({
                header: 'Last Name',
                contentPath: 'lastName',
                isFilterable: true
            });
            var col3 = ColumnDefinition.create({
                header: 'Age',
                contentPath: 'age',
                textAlign: 'center',
                isFilterable: true
            });
            return [col1, col2, col3];
        })
    });
 ```

 ![Alt text](/images/navigationbar.png?raw=true)



 ### Table condensed, stripped and conten wraped

  ```html
        {{#eb-table
            rowSelection='none'
            pageSize=5
            content=users
            columns=columns
            responsiveTable=true
            condensedTable=true
            borderedTable=true
            nowrapTable=false
            tableStriped=true}}
    {{/eb-table}}
```

![Alt text](/images/table-stripped.png?raw=true)


### Table with default sorting, column sorting, filtering and row selection

```
 {{#eb-table
        rowSelection='single'
        rowSelectionHandler='onRowSelect'
        pageSize=5
        content=users
        columns=columns
        sortProperties= sortProperties
        filterKey=filterKey}}

        {{#eb-table-navbar}}
            <button type="button" class="btn btn-primary btn-sm" id="new" {{action 'newButton3'}}> New </button>
            <button type="button" class="btn btn-primary btn-sm" id="new" disabled={{disableButtons3}}> Edit </button>
            <button type="button" class="btn btn-primary btn-sm" id="delete" {{action 'deleteButton3'}} disabled={{disableButtons3}}> Delete </button>
             <div class="table-search input-group pull-right">
                {{input class="form-control table-search" type='text' value=filterKey placeholder="Filter..."}}
            </div>
            <div style="clear:both;"></div>
        {{/eb-table-navbar}}
{{/eb-table}}
```

```javascript
    import Ember from 'ember';
    import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

    export default Ember.Controller.extend({

        sortProperties: ['age:desc'],
        selectedRow: null,

        users: [{firstName: 'James', lastName: 'Carter', age: 30},
                    {firstName: 'Steven', lastName: 'Smith', age: 35}]

        columns: Ember.computed(function() {
            var col1 = ColumnDefinition.create({
                header: 'First Name',
                isSortable: true,
                contentPath: 'firstName',
                isFilterable: true
            });
            var col2 = ColumnDefinition.create({
                header: 'Last Name',
                isSortable: true,
                contentPath: 'lastName',
                isFilterable: true
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
        actions:{
             onRowSelect: function(rows) {
                this.set('selectedRow', rows[0]);
            }
        }
    });
 ```

 ![Alt text](/images/column-sorting.png?raw=true)



### Table with multiple row selection

 ```html
    {{#eb-table
        rowSelection='multiple'
        pageSize=5
        content=users
        columns=columns}}
    {{/eb-table}}
```

![Alt text](/images/multiple-row-selection.png?raw=true)



### Customized table, highlight table cells

 ```
 {{#eb-table
        pageSize=5
        content=users
        columns=columns}}
{{/eb-table}}
 ```
 ```
import Ember from 'ember';
import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

export default Ember.Controller.extend({
    columns: Ember.computed(function() {
            var col1 = ColumnDefinition.create({
                header: 'First Name',
                contentPath: 'firstName'
            });
            var col2 = ColumnDefinition.create({
                header: 'Last Name',
                contentPath: 'lastName'
            });
            var col3 = ColumnDefinition.create({
                header: 'Age',
                contentPath: 'age',
                textAlign: 'center',
                columnComponentName: 'users-table-column',
            });
            return [col1, col2, col3];
        }),
});
 ```
 ```
//users-table-column.js
import Ember from 'ember';
import TableColumn from 'ember-bootstrap-table/components/eb-table-column';

export default TableColumn.extend({
    classNames: ['user-column'], //for all columns
    classNameBindings: ['isSeniourCitizen:label-danger', 'isSeniourCitizen:text-bold'], //for selected columns
    isSeniourCitizen: Ember.computed('cellContent', function(){
        return this.get('cellContent') > 60 ? true : false;
    })
});
 ```

![Alt text](/images/column-hilight.png?raw=true)


### Customized table, actions in table cells

```
 {{#eb-table
        pageSize=5
        content=users
        columns=columns}}
{{/eb-table}}
 ```
 ```
import Ember from 'ember';
import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

export default Ember.Controller.extend({
    columns: Ember.computed(function() {
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
            columnComponentName: 'users-table-delete-column',
        });
        return [col1, col2, col3, col4];
    }),

    actions:{
        deleteRow: function(row){
            //model.removeObject(row);
        }
    }
});
 ```
 ```
//users-table-delete-column.js
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
 ```

![Alt text](/images/cell-actions.png?raw=true)


### Customized table, row highlight

```
 {{#eb-table
        pageSize=5
        content=users
        columns=columns
        rowComponentName='users-table-row'}}
{{/eb-table}}
 ```
 ```
import Ember from 'ember';
import ColumnDefinition from 'ember-bootstrap-table/models/column-definition';

export default Ember.Controller.extend({
    columns: Ember.computed(function() {
        var col1 = ColumnDefinition.create({
            header: 'First Name',
            contentPath: 'firstName'
        });
        var col2 = ColumnDefinition.create({
            header: 'Last Name',
            contentPath: 'lastName'
        });
        var col3 = ColumnDefinition.create({
            header: 'Age',
            contentPath: 'age',
            textAlign: 'center'
        });
        return [col1, col2, col3];
    })
});
 ```
 ```
//users-table-row.js
import Ember from 'ember';
import VcaTableRow from 'ember-bootstrap-table/components/eb-table-row';

export default VcaTableRow.extend({
    classNames: ['user-row'], //for all rows
    classNameBindings: ['isSeniourCitizen:label-danger', 'isSeniourCitizen:text-bold'], //for selected rows

    isSeniourCitizen: Ember.computed('row', function(){
        return this.get('row.age') > 60 ? true : false;
    })

});
 ```

![Alt text](/images/row-hilight.png?raw=true)



### Server side pagination, sorting and filtering

```
 {{#eb-remote-table
        rowSelection='single'
        rowSelectionHandler='onRowSelect'
        pageSize=5
        content=model
        columns=columns
        sortProperties= sortProperties
        filterKey=filterKey
        totalRecords=totalUsers
        loadingMessage='Loading users ...'
        dataFetchHandler='fetchData'}}

        {{#eb-table-navbar}}
            <button type="button" class="btn btn-primary btn-sm" id="new" {{action 'newButton'}}> New </button>
            <button type="button" class="btn btn-primary btn-sm" id="delete" {{action 'deleteButton'}}> Delete </button>
             <div class="table-search input-group pull-right">
                {{input class="form-control table-search" type='text' value=filterKey placeholder="Filter..."}}
            </div>
            <div style="clear:both;"></div>
        {{/eb-table-navbar}}
{{/eb-remote-table}}
 ```
 ```
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
 ```
 ```
import Ember from 'ember';
export default Ember.Route.extend({

    model: function() {
        return Ember.A();
    },

    getUsers: function() {
        var controller = this.controllerFor(this.routeName);
        var users = Ember.A();
        var self = this;
        var sortOrder = this.get('sortAsc') ? 'asc' : 'desc';
        var promise = new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                type: 'GET',
                url: '/api/remote-table?pageNum=' + self.get('pageNum') + '&pageSize=' + self.get('pageSize') + '&sortBy=' + self.get('sortBy') + '&sortOrder=' + sortOrder,
                headers: {
                    'Accept': 'application/json; charset=utf-8'
                }
            }).done(function(resp) {
                var urs = resp.users;
                controller.set('totalUsers', resp.count);
                for (var i = 0; i < urs.length; i++) {
                    users.pushObject(urs[i]);
                }
                resolve(users);
            }).fail(function() {
                reject(users);
            });
        });
        return promise;
    },

    actions: {
        fetchData: function(pageNum, pageSize, sortBy, sortAsc) {
            var controller = this.controllerFor(this.routeName);
            this.set('pageNum', pageNum);
            this.set('pageSize', pageSize);
            this.set('sortBy', sortBy);
            this.set('sortAsc', sortAsc);
            controller.set('model', this.getUsers());
        }
    }
});
 ```