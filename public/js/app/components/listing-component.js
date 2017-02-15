(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingComponent", {
		bindings: {
			listing: "<"
		},
		templateUrl: "js/app/components/listing-component.tpl"
	});
})();