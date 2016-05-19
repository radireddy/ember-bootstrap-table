/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-bootstrap-table',

  included: function(app) {
    this._super.included(app);

    //app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
    app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
  }
};
