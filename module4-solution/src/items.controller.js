(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['menuItems'];
  

  function MenuItemsController(menuItems) {
var menu = this;
    menu.menuItems = menuItems;
  }


})();
