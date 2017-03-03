//This service contacts controls the login/logous functionality
//it exposes two functions
//
//login: this function takes and email and password, contacts the backend,
//and passes along the authentication information
//in case of successful login it sets the user email and token on local storage
//and switches the authentication service status to loggedIn
//
//logout: this function does not contact the backend
//it simply erases the token and email from local storage,
//and sets the loggedIn status to false

(function(){
	"use strict";
	angular.module("mikeslist").
	service("userLoginService", ["$http", "$window", "$q", "authenticationService", function($http, $window, $q, authenticationService){
		var vm = this;
		vm.login = function(email, password) {
			return $http.post("/login", {email: email, password: password}).then(function(data){
				$window.localStorage.email = data.data.email;
				$window.localStorage.admin = data.data.admin;
				$window.localStorage.token = data.data.token;
				authenticationService.bindings.loggedIn = true;
				authenticationService.bindings.email = data.data.email;
				authenticationService.bindings.admin = data.data.admin;
				return $q.resolve({result: "success"});
			});
		};
		vm.logout = function() {
			delete $window.localStorage.token;
			delete $window.localStorage.email;
			delete $window.localStorage.admin;
			delete authenticationService.bindings.email;
			delete authenticationService.bindings.admin;
			authenticationService.bindings.loggedIn = false;
			return $q.resolve({result: "success"});
		};
	}]);
})();