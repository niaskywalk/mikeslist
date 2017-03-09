(function(){
	"use strict";
	angular.module("mikeslist").
	component("editUserFormComponent", {
		controller: ["$state", "$timeout", "$stateParams", "$scope", "usersService", "authenticationService", function($state, $timeout, $stateParams, $scope, usersService, authenticationService){
			var vm = this;
			vm.user = {};
			vm.errors = {
				passwordMismatched: false,
				emailExists: false,
				weakPassword: false
			};
			vm.resetErrors = function() {
				for (var error in vm.errors) {
					vm.errors[error] = false;
				}
			};
			vm.email = "";
			vm.authenticationBindings = authenticationService.bindings;
			vm.$onInit = function() {
				vm.email = $stateParams.user.email;
				Object.assign(vm.user, $stateParams.user);
			};
			vm.submitForm = function() {
				if (vm.user.password !== vm.user.passwordConfirmation) {
					vm.errors.passwordMismatched = true;
					$scope.userForm.$setPristine();
					delete vm.user.password;
					delete vm.user.passwordConfirmation;
					return;
				}
				usersService.updateUser(vm.email, vm.user).
				then(function(data){
					$state.go("root-state.user-state", {email: data.email}, {reload: true});
				}).
				catch(function(err){
					if (err.status === 409) {
						vm.errors.emailExists = true;
					} else if (err.status === 400)  {
						vm.errors.weakPassword = true;
					} else {
						vm.errors.unknownError = true;
						console.error(err);
					}
					$scope.userForm.$setPristine();
					vm.user.password = "";
					vm.user.passwordConfirmation = "";
					$timeout(function(){
						document.getElementById("email-field").focus();
						document.getElementById("email-field").select();
					});
				});
			};
		}],
		templateUrl: "user-form.tpl"
	});
})();