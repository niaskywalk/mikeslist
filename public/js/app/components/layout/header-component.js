//This is a component that renders the header of the site
//The header contains an admin mode switch (therefore bound to globals)
//Also it contains the login/logout widget

(function(){
	"use strict";
	angular.module("mikeslist").
	component("headerComponent", {
		bindings: {
			uncategorized: "<"
		},
		controller: ["globals", "authenticationService", function(globals, authenticationService){
			var vm = this;
			vm.globals = globals;
			vm.authenticationBindings = authenticationService.bindings;
			vm.toggleAdminEditMode = function() {
				globals.adminEditMode = !globals.adminEditMode;
			};
		}],
		templateUrl: "header-component.tpl"
	});
})();