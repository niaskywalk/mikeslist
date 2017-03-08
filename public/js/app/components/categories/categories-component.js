//This component provides a listing of categories
//The two bindings are resolved using the categoriesService
//categories binding gets an array of category objects
//uncategorized binding gets the 'uncategorized' category object with listings populated
//
//The component renders a category widget for every category
//and one for the 'uncategorized' category if not empty and admin mode is on
//
//Also renders a 'create category' widget if admin mode on

(function(){
	"use strict";
	angular.module("mikeslist").
	component("categoriesComponent", {
		bindings: {
			categories: "<",
			uncategorized: "<"
		},
		controller: ["$scope", "globals", function($scope, globals){
			var vm = this;

			//this is bound to detect admin (edit mode) state
			vm.globals = globals;

			//this function dispatches the event to signal close to all widgets except
			//the one identified by the "except parameter"
			//the function is passed as behavior binding (&) to all form widgets
			vm.broadcastCloseAllOthers = function(except){
				$scope.$broadcast("close:forms", except);
			};
		}],
		templateUrl: "categories-component.tpl"
	});
})();