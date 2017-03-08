//This component provides a listing of categories

//The component renders a category widget for every category
//and one for the 'uncategorized' category if not empty and admin mode is on

//Also renders a 'create category' widget if admin mode on

(function(){
  "use strict";
  angular.module("mikeslist").
  component("categoriesComponent", {

    //receives an array of category objects from state resolve
    //also receives the 'uncategorized' category object
    //from root-state via inheritance
    bindings: {
      categories: "<",
      uncategorized: "<"
    },
    controller: categoriesComponentController,
    templateUrl: "categories-component.tpl"
  });

  categoriesComponentController.$inject = ["$scope", "globals"];

  function categoriesComponentController($scope, globals) {
    var vm = this;

    //bind globals to be able to access the adminEditMode status
    vm.globals = globals;

    //dispatches the event to signal close to all widgets except
    //the one identified by the "except parameter"
    //the function is passed as behavior binding (&) to all form widgets
    vm.broadcastCloseAllOthers = function(except){
      $scope.$broadcast("close:forms", except);
    };    
  }
})();