(function(){
	"use strict";
	angular.module("mikeslist").
	component("usersComponent", {
		bindings: {
			users: "<"
		},
		templateUrl: "users-component.tpl"
	});
})();