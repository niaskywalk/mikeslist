//This component renders a single listing
//It receives the listing binding resolved in state transition
//Template contains edit and delete links which show up when admin mode is on

(function(){
	"use strict";
	angular.module("mikeslist").
	component("listingComponent", {
		bindings: {
			listing: "<"
		},
		controller: ["authenticationService", "listingsService", "$state", "$stateParams", function(authenticationService, listingsService, $state, $stateParams){
			var vm = this;
			vm.authenticationBindings = authenticationService.bindings;
			vm.deleteListing = function() {
				if (window.confirm("Are you sure you want to permanently delete this listing?")) {
					listingsService.deleteListing(vm.listing._id).
					then(function(){
						if ($stateParams.category.name) {
							$state.go("root-state.listings-state", {category: $stateParams.category.name}, {reload: true});
						} else {
							$state.go("root-state.categories-state", {}, {reload: true});
						}
					}).
					catch(function(err){

						//in case of error, display alert message and output error to console
						window.alert(err.data.error);
						console.error(err);

						//them reload current state
						$state.go($state.current, {}, {reload: true});
					});
				}
			};
		}],
		templateUrl: "listing-component.tpl"
	});
})();