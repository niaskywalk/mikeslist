(function(){
	"use strict";
	angular.module("mikeslist").
	component("editListingFormComponent", {
		bindings: {
			categories: "<"
		},
		controller: ["listingsService", "$state", "$scope", "$stateParams", "$timeout", function(listingsService, $state, $scope, $stateParams, $timeout) {
			var vm = this;

			//prepare listing model
			vm.listing = {
				categories: []
			};

			Object.assign(vm.listing, $stateParams.listing);

			//this array reflects the current state of checkboxes
			vm.checkboxesState = [];

			vm.$onInit = function(){
				var allCategoryIds = vm.categories.map(function(category){
					return category._id;
				});
				var currentCategoryIds = vm.listing.categories.map(function(category){
					return category._id;
				});					
				vm.checkboxesState = allCategoryIds.map(function(categoryId){
					return currentCategoryIds.indexOf(categoryId) !== -1 ? categoryId : false;
				});
			}


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
					listingsService.editListing($stateParams.listing._id,vm.listing).
					then(function(data){
						$state.go("root-state.listing-state", {listingId: vm.listing._id}, {reload: true});
					}).
					catch(function(err){
						window.alert("An error has occured while saving listing");
						console.error(err);
						$state.go("root-state.listing-state", {listingId: $stateParams.listing._id}, {reload: true});
					});
				}
			};
		}],
		templateUrl: "/js/app/components/post-listing-form-component.tpl"
	});
})();