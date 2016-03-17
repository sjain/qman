var test = require('./test');
var angular = require('angular');
require('./app.module');
require('./layout/layout.module');
require('./layout/shell_controller');

$(document).ready(function() {
  test.sayHello();

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['qman'], {
      strictDi: false
    })
  });
});

