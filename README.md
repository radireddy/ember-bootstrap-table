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

* Twitter Bootstrap, both CSS and JS


## Instalation

bower install ember-bootstrap-table --save

## Developing or setting up this project on your computer

* `git clone https://github.com/radireddy/ember-bootstrap-table.git'
* `npm install`
* `bower install`
* 'bower install bootstrap'

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

Interested in contributing this addon, please contact me on adireddyravindra@gmail.com

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
