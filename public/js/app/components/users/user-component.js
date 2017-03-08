(function(){
	"use strict";
	angular.module("mikeslist").
	component("userComponent", {
		bindings: {
			user: "<"
		},
		controller: ["usersService", "authenticationService", "$state", function(usersService, authenticationService, $state){
			var vm = this;
			vm.authenticationBindings = authenticationService.bindings;
			vm.deleteUser = function() {
				if (window.confirm("Are you sure you want to permanently delete this user?")) {
					usersService.deleteUser(vm.user.email).
					then(function(){
						$state.go("root-state.users-state");
					});
				}
			};
		}],
		templateUrl: "user-component.tpl"
	});
})();