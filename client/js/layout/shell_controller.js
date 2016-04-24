require('./layout.module');

(function () {
  'use strict';

  angular
    .module('qman.layout')
    .controller('ShellController', ShellController);

  /* @ngInject */
  function ShellController($rootScope, $http) {

    var vm = this;
    loadData();

    function loadData() {
      vm.hello = "Hello from ShellController";
      $http({
        method: 'GET',
        url: '/users/json'
      }).then(function(response) {
        vm.users = response.data;
      }, function() {
        console.log("error fetching users");
      });
    }
  }
})();
