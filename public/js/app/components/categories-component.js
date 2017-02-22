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

			vm.globals = globals;

			//this function dispatches the event to signal close to all widgets except
			//the one identified by the "except parameter"
			//the function is passed as behavior binding (&) to all form widgets
			vm.broadcastCloseAllOthers = function(except){
				$scope.$broadcast("close:forms", except);
			};
		}],
		templateUrl: "js/app/components/categories-component.tpl"
	});
})();