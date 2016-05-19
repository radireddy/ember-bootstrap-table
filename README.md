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
* Twitter Bootstrap 3.3.4, only CSS


## Instalation

bower install ember-bootstrap-table --save

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

## Contributing

Interested in contributing to this addon, please contact me on adireddyravindra@gmail.com

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).


# Developer Guide

## Table Options

| Option Name  | Required | Default Value | Desctiption |
| ------------------ | ------------------ | ---------------- | ------------ |
| content | true | Ember.A() | An array of row objects, or a promise that resolves to an array of row objects. Usually each row is a object where the keys are column names (column headers) and the values are the column values. |
| columns  | true  | Ember.A() | An array of column definitions: see  Column Definition options below. Allows each column to have its own configuration. |
| pageSize | false | 10 | Positive integer, number of rows shown in each page depends on page size |
| page | false | 1 | current page |
| filterKey | false | '' | String, used to filter rows. By default all columns value is matched with filterKey and row is shown only if any column value matches with filterKey. Whether to iclude column in filter or not can be configured using Column Defination shown below. |
| rowSelection | false | null | Can be 'single' or 'multiple'. |
| sortProperties | false | [] | Array of colums that are sorted. This can be used to supplay default column sort to table. For example ['firstName:asc'] will sort table data by First Name column in ascending order when table is rendered. ['firstName:desc'] withh sort in descending order |
| emptyMessage | false | No records found | String, this message is shown when there are no rows in table |
| loadingMessage | false | Loading... | String, this message is shown when data is fetched from server |
| responsiveTable | false | true | Boolean, if true adds bootstrap 'table-responsive' class to table. Makes table responsive. For more info http://getbootstrap.com/css/#tables-responsive |
| condensedTable | false | false | Boolean, if true adds bootstrap 'table-condensed' class to table. Reduces table row height. For more info http://getbootstrap.com/css/#tables-condensed |
| borderedTable | false | true | Boolean, if true adds bootstrap 'table-bordered' class to table. Adds border to table, for more info http://getbootstrap.com/css/#tables-bordered. |
| nowrapTable | false | true | Boolean, if true adds bootstrap 'table-nowrap' class to table. If falsewraps cell content if it exceds available width. |
| tableStriped | false | false | Boolean, if true adds bootstrap 'table-striped' class to table. Adds zebra-striping to table rows. For more info http://getbootstrap.com/css/#tables-striped |
| rowComponentName | false | eb-table-row | String, table row component name. If you need to customize table row (for ex: if you need to highlight row on certain condition), extend eb-table-row  to add your own extension logic and then provide extended component name through this property. |

