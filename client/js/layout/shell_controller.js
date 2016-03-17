(function () {
  'use strict';

  angular
    .module('qman.layout')
    .controller('ShellController', ShellController);

  /* @ngInject */
  function ShellController($rootScope) {

    var vm = this;
    loadData();

    function loadData() {
      vm.hello = "Hello from shell controller";
    }

  }
})();
