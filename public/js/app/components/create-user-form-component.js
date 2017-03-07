(function(){
	"use strict";
	angular.module("mikeslist").
	component("createUserFormComponent", {
		controller: ["$state", "$timeout", "$scope", "usersService", function($state, $timeout, $scope, usersService){
			var vm = this;
			vm.user = {};
			vm.errors = {
				passwordMismatched: false
			};
			vm.submitForm = function() {
				if (!vm.user.password ||
					!vm.user.passwordConfirmation ||
					vm.user.password !== vm.user.passwordConfirmation) {
					//window.alert("Passwords do not match!");
				    vm.errors.passwordMismatched = true;
				    $scope.userForm.$setPristine();
					vm.user.password = "";
					vm.user.passwordConfirmation = "";
					return;
				}
				usersService.createUser(vm.user).
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