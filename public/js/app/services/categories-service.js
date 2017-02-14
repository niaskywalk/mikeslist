(function(){
	"use strict";
	angular.module("mikeslist").
	service("categoriesService", ["$q", function($q){
		var vm = this;
		vm.getAllCategories = function() {
			return $q.when([
				{
					name: "Electronics"
				},
				{
					name: "Games"
				},
				{
					name: "Software"
				}
			]);
		};
	}]);
})();