(function(){
	"use strict";
	angular.module("mikeslist").
	component("editListingFormComponent", {
		bindings: {
			categories: "<"
		},
		controller: ["$scope", "$state", "$stateParams", "$timeout", "listingsService", function($scope, $state, $stateParams, $timeout, listingsService) {
			var vm = this;

			//prepare listing model
			vm.listing = {
				categories: []
			};

			//this array reflects the current state of checkboxes
			vm.checkboxesState = [];

			vm.$onInit = function(){
				var allCategoryIds = vm.categories.map(function(category){
					return category._id;
				});
				var currentCategoryIds = vm.listing.categories.map(function(category){
					return category._id;
				});
				Object.assign(vm.listing, $stateParams.listing);			
				vm.checkboxesState = allCategoryIds.map(function(categoryId){
					return currentCategoryIds.indexOf(categoryId) !== -1 ? categoryId : false;
				});
			};


			//watch the state of checkbox and synchronize with listing model
			//which will be submitted by filtering out null values
			//(as checkboxes are checked and unchecked they leave behind null values)
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

					//attempt to update the listing
					listingsService.editListing($stateParams.listing._id, vm.listing).
					then(function(){

						//if successful - redirect to listing state for the saved listing
						$state.go("root-state.listing-state", {listingId: vm.listing._id}, {reload: true});
					}).
					catch(function(err){

						//in case of error, display alert message and output error to console
						window.alert("An error has occured while saving listing");
						console.error(err);

						//them redirect to the listing state for the original listing
						$state.go("root-state.listing-state", {listingId: $stateParams.listing._id}, {reload: true});
					});
				}
			};
		}],
		templateUrl: "/js/app/components/post-listing-form-component.tpl"
	});
})();