//This is a component that renders the header of the site
//The header contains an edit mode switch (therefore bound to globals)
//Also it contains the login/logout widget

(function(){
	"use strict";
	angular.module("mikeslist").
	component("headerComponent", {

		//receives 'uncategorized' category object as an attribute
		//to display number of items in this category to the admin user
		bindings: {
			uncategorized: "<"
		},
		controller: headerComponentController,
		templateUrl: "header-component.tpl"
	});

	headerComponentController.$inject = ["authenticationService", "globals"];

	function headerComponentController(authenticationService, globals) {
		var vm = this;

		//bind authentication bindings to have access to the currently
		//logged-in user information
		//(has properties: loggedIn(boolean), email(string), and admin(boolean))
		vm.authenticationBindings = authenticationService.bindings;
		
		//bind globals to be able to access the adminEditMode status
		vm.globals = globals;

		//toggles the admin edit mode
		vm.toggleAdminEditMode = function() {
			globals.adminEditMode = !globals.adminEditMode;
		};
	}
})();