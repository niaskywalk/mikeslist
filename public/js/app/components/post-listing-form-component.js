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

					//attempt to post the listing
					listingsService.postListing(vm.listing).
					then(function(data){

						//if successful, load listing state with the saved state id
						$state.go("root-state.listing-state", {listingId: data._id}, {reload: true});
					}).
					catch(function(err){

						//if failed, display alert box with message
						//and output error to console
						window.alert("An error has occured while saving listing");
						console.error(err);

						//then reload the categories state
						$state.go("root-state.categories-state", {}, {reload: true});
					});
				}
			};
		}],
		templateUrl: "/js/app/components/post-listing-form-component.tpl"
	});
})();