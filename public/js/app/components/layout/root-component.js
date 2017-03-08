//This is a root component, it simply renders header and footer components
//and provides a placeholder for current content component

(function(){
	"use strict";
	angular.module("mikeslist").
	component("rootComponent", {

		//receives 'uncategorized' category object from route resolve
		//it will be passed to header component and all child components
		bindings: {
			uncategorized: "<"
		},
		templateUrl: "root-component.tpl"
	});
})();