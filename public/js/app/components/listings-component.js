(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingsComponent", {
		bindings: {
			category: "<"
		},
		templateUrl: "js/app/components/listings-component.tpl"
	});
})();