(function(){
	"use strict";
	angular.module("mikeslist").
	component("categoriesComponent", {
		bindings: {
			categories: "<"
		},
		controller: ["$scope", function($scope){
			var vm = this;
			vm.broadcastCloseAllOthers = function(except){
				$scope.$broadcast("close:forms", except);
			};
		}],
		templateUrl: "js/app/components/categories-component.tpl"
	});
})();