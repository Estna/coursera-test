(function(){
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
.directive('foundItems', FoundItems);

function FoundItems() {
 var ddo = {
  // template: ''
  //restrict: 'A',
  templateUrl: 'foundItems.html',
  scope: {
    items: '<myItems',
    onRemove: '&'
  }
 };
 return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
console.log("here");


function NarrowItDownController(MenuSearchService){
var narrowDownCtrl = this;
narrowDownCtrl.SearchTerm = "";
narrowDownCtrl.name = "";
narrowDownCtrl.shortname = "";
narrowDownCtrl.description = "";

narrowDownCtrl.NarrowDown = function(){
narrowDownCtrl.prom = MenuSearchService.getMatchedMenuItems(narrowDownCtrl.SearchTerm);

narrowDownCtrl.prom.then(function (result) {
console.log(result);
narrowDownCtrl.found = [];
for (var i = 0; i < result.length; i++)
{
var item = {
    name: result[i].name,
    shortName: result[i].short_name,
    description: result[i].description
  };
  narrowDownCtrl.found.push(item);
}
var random = narrowDownCtrl.found.length;

});



narrowDownCtrl.smth = function(){
  console.log("aaa");
}
//narrowDownCtrl.found =  MenuSearchService.getMatchedMenuItems(narrowDownCtrl.SearchTerm);
 }

//narrowDownCtrl.found = MenuSearchService.getMatchedMenuItems(narrowDownCtrl.SearchTerm);
console.log(narrowDownCtrl.found);
//narrowDownCtrl.found = "";
console.log("aaa");

narrowDownCtrl.removeItem = function (itemIndex) {
  narrowDownCtrl.found.splice(itemIndex, 1);

}
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath){
var service = this;

service.getMatchedMenuItems =  function(searchTerm, myList){
return $http({
  method: "GET",
  url: (ApiBasePath + 'menu_items.json')
}).then(
  function (response){
    service.foundItems = [];
for (var i = 0; i < response.data.menu_items.length; i++)
{
  if (response.data.menu_items[i].description.indexOf(searchTerm)=== -1)
  {
    continue;
  }
  else {
/*var item = {
    name: response.data.menu_items[i].name,
    shortName: response.data.menu_items[i].short_name,
    description: response.data.menu_items[i].description
  };
    service.foundItems.push(item);
  }
  */
  service.foundItems.push(response.data.menu_items[i]);
}
}
return service.foundItems;
}
);
//myList = service.foundItems;

}

}

})();
