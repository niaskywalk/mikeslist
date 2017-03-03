(function(){
	"use strict";
	angular.module("mikeslist").
	component("editUserFormComponent", {
		controller: ["$state", "$timeout", "$stateParams", "usersService", "authenticationService", function($state, $timeout, $stateParams, usersService, authenticationService){
			var vm = this;
			vm.user = {};
			vm.email = "";
			vm.authenticationBindings = authenticationService.bindings;
			vm.$onInit = function() {
				vm.email = $stateParams.user.email;
				Object.assign(vm.user, $stateParams.user);
			};
			vm.submitForm = function() {
				if (vm.user.password &&
					vm.user.passwordConfirmation &&
					vm.user.password !== vm.user.passwordConfirmation) {
					window.alert("Passwords do not match!");
					delete vm.user.password;
					delete vm.user.passwordConfirmation;
					return;
				}
				usersService.updateUser(vm.email, vm.user).
				then(function(data){
					$state.go("root-state.user-state", {email: data.email}, {reload: true});
				}).
				catch(function(err){
					window.alert(err.data.error);
					console.log(err);
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