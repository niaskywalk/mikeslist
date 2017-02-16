(function(){
	"use strict";
	angular.module("mikeslist").
	service("categoriesService", ["$http", function($http){
		var vm = this;
		vm.getAllCategories = function() {
			return $http.get("/api/v1/categories").then(function(data){
				return data.data;
			});
		};
		vm.getListingsForCategory = function(category) {
			return $http.get("/api/v1/category/" + category).then(function(data){
				return data.data;
			});
		};
		vm.createNewCategory = function(name) {
			return $http.post("/api/v1/category", {name: name}).then(function(data){
				return data.data;
			});
		};
	}]);
})();