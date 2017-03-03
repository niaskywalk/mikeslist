//This service provides access to the "categories" api
//The following functions are exposed:
//
//getAllCategories: gets an array of category objects with _id, name, and listing id array
//listingCount virtual field is also available, the listing contents are NOT populated
//the 'uncategorized' category is deliberately omitted, it can only be retrieved
//using the 'getListingsForCategory' function
//
//getListingsForCategory: gets a single category object by name, includes all of the above
//fields and also populates all listing content
//
//createCategory: creates a category with a given name
//
//editCategory: updates category with a given name by assigning the category object (second parameter)
//
//removeCategory: removes category with a given name, if it contains listings
//the category will be removed from each listing
//all orphaned listings will be added to the 'uncategorized' category

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
		vm.createCategory = function(name) {
			return $http.post("/api/v1/category", {name: name}).then(function(data){
				return data.data;
			});
		};
		vm.editCategory = function(name, category) {
			return $http.put("/api/v1/category/" + name, category).then(function(data){
				return data.data;
			});
		};
		vm.removeCategory = function(name) {
			return $http.delete("/api/v1/category/" + name).then(function(data){
				return data.data;
			});
		};
	}]);
})();