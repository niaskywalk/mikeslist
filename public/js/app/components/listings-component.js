//This component renders all listing titles for category
//The binding is resolved in state transition

(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingsComponent", {
		bindings: {
			category: "<"
		},
		templateUrl: "listings-component.tpl"
	});
})();