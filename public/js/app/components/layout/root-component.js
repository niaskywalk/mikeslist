//This is a root component, it simply renders header and components
//and provides a placeholder for current content component

(function(){
	"use strict";
	angular.module("mikeslist").
	component("rootComponent", {
		bindings: {
			uncategorized: "<"
		},
		templateUrl: "root-component.tpl"
	});
})();