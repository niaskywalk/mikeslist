(function(){
	"use strict";
	angular.module("mikeslist").
	service("categoriesService", ["$http", function($http){
		var vm = this;
		vm.getAllCategories = function() {
			return $http.get("/api/v1/categories").then(function(data){
				return data.data.filter(function(category){
					return category.name !== "uncategorized";
				});
			});
		};
		vm.getListingsForCategory = function(name) {
			return $http.get("/api/v1/category/" + name).then(function(data){
				return data.data;
			});
		};
		vm.createNewCategory = function(name) {
			return $http.post("/api/v1/category", {name: name}).then(function(data){
				return data.data;
			});
		};
		vm.editCategory = function(name, category) {
			return $http.put("/api/v1/category/" + name, category).then(function(data){
				return data.data;
			});
		};
		vm.getUncategorizedCount = function() {
			return $http.get("/api/vi/categories/uncat").then(function(data){
				return data.data;
			});
		};
	}]);
})();