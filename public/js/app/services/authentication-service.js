//This service maintains information about loggedIn state
//and checks the browser's local storage for login information
//
//The service does not verify the credentials with the backend
//it assumes user is logged in if the token is present

(function(){
	"use strict";
	angular.module("mikeslist").
	service("authenticationService", ["$window", function($window){
		var vm = this;

		//bindings are placed into an object to be bound to the DOM
		vm.bindings = {
			loggedIn: false,
		};

		//this function checks the local storage to see if login information is present
		//if it is, it is written into the bindings above
		//if not the bindings are reset
		//the function is called by the intercepror on page load
		vm.check = function() {
			if ($window.localStorage.email && $window.localStorage.token) {
				vm.bindings.loggedIn = true;
				vm.bindings.email = $window.localStorage.email;
				vm.bindings.admin = JSON.parse($window.localStorage.admin);
			} else {
				vm.bindings.loggedIn = false;
				delete vm.bindings.email;
			}
		};
	}]);
})();