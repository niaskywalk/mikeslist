(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingComponent", {
		bindings: {
			listing: "<"
		},
		controller: ["globals", "listingsService", "$state", function(globals, listingsService, $state){
			var vm = this;
			vm.globals = globals;
			vm.deleteListing = function() {
				if (window.confirm("Are you sure you want to permanently delete this listing?")) {
					listingsService.deleteListing(vm.listing._id).
					then(function(){
						$state.go("root-state.categories-state");
					});
				}
			};
		}],
		templateUrl: "js/app/components/listing-component.tpl"
	});
})();