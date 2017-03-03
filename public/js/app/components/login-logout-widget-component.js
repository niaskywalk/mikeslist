//This component widget is placed in the header and controls login and logout functionality
//via the userLoginService and authenticationService
//the bindings is an object containing login information and is bound via
//authentication service
//When login link is clicked the form is displayed
//
//The service exposes the following functions
//
//login: sends the login information to the backend via userLoginService
//in case of successful login, cancel login function is called to clear the username and password
//in case of login failure form remains open and username and password is cleared
//
//logout: sends the logout request to userLoginService
//in case of failure the message is displayed (should never fail)
//
//cancelLogin: clears the username and password and closes the login form

(function(){
	"use strict";
	angular.module("mikeslist").
	component("loginLogoutWidgetComponent", {
		controller: ["$window", "$state", "userLoginService", "authenticationService", function($window, $state, userLoginService, authenticationService) {
			var vm = this;
			vm.formOpen = false;
			vm.bindings = authenticationService.bindings;

			vm.login = function() {
				userLoginService.login(vm.email, vm.password).
				then(function(){
					vm.cancelLogin();
				}).
				catch(function(err) {
					vm.email = "";
					vm.password = "";
					if (err.status === 403) {
						vm.error = "Invalid email or password";
					} else {
						vm.error = "Error logging in, contact site owner";
						console.error(err);
					}
				});
			};

			vm.logout = function() {
				userLoginService.logout().
				then(function(){
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err) {
					console.error(err.data.error);
					console.error(err);
				});
			};

			vm.cancelLogin = function() {
				vm.email = "";
				vm.password = "";
				vm.formOpen = false;
				vm.error = "";
			};
		}],
		templateUrl: "login-logout-widget-component.tpl"
	});
})();