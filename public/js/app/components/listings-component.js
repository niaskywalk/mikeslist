(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingsComponent", {
		bindings: {
			listings: "<"
		},
		templateUrl: "js/app/components/listings-component.tpl"
	});
})();