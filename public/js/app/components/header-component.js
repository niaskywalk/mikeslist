(function(){
	"use strict";
	angular.module("mikeslist").
	component("headerComponent", {
		controller: ["globals", function(globals){
			var vm = this;
			vm.globals = globals;
			vm.toggleAdmin = function() {
				globals.admin = !globals.admin;
			};
		}],
		templateUrl: "js/app/components/header-component.tpl"
	});
})();