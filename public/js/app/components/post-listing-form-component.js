(function(){
	"use strict";
	angular.module("mikeslist").
	component("postListingFormComponent", {
		bindings: {
			categories: "<"
		},
		controller: ["listingsService", "$state", "$scope", function(listingsService, $state, $scope) {
			var vm = this;

			//prepare listing model
			vm.listing = {
				categories: []
			};

			//this array reflects the current state of checkboxes
			vm.checkboxesState = [];

			//watch the state of checkbox and synchronize with listing model
			//by filtering out null values
			$scope.$watch(function(){
				return vm.checkboxesState;
			},function(){
				vm.listing.categories = vm.checkboxesState.filter(function(categoryId){
					return categoryId; //nulls will be ignored
				});
			}, true);

			//verify at least one category has been selected and submit the form
			vm.submitForm = function() {
				if (vm.listing.categories.length === 0) {
					window.alert("You must pick at least 1 category");
				} else {
					listingsService.postListing(vm.listing).
					then(function(data){
						$state.go("root-state.listing-state", {listingId: data._id}, {reload: true});
					}).
					catch(function(err){
						window.alert("An error has occured while saving listing");
						console.error(err);
						$state.go("root-state.categories-state", {}, {reload: true});
					});
				}
			};
		}],
		templateUrl: "/js/app/components/post-listing-form-component.tpl"
	});
})();