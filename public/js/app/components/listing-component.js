(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingComponent", {
		bindings: {
			listing: "<"
		},
		controller: ["globals", function(globals){
			var vm = this;
			vm.globals = globals;
		}],
		templateUrl: "js/app/components/listing-component.tpl"
	});
})();