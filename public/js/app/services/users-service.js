(function(){
	"use strict";
	angular.module("mikeslist").
	service("usersService", ["$http", function($http){
		var vm = this;
		vm.getAllUsers = function() {
			return $http.get("/api/v1/users").then(function(data){
				return data.data;
			});
		};
		vm.getSingleUser = function(email) {
			return $http.get("/api/v1/user/" + email).then(function(data){
				return data.data;
			});
		};
		vm.createUser = function(user) {
			return $http.post("/api/v1/user", user).then(function(data){
				return data.data;
			});
		};
		vm.updateUser = function(email, user) {
			return $http.put("/api/v1/user/" + email, user).then(function(data){
				return data.data;
			});
		};
		vm.deleteUser = function(email) {
			return $http.delete("/api/v1/user/" + email).then(function(data){
				return data.data;
			});
		};
	}]);
})();