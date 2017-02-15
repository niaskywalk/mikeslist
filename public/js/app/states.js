(function(){
	"use strict";
	angular.module("mikeslist").
	config(["$stateProvider", "$locationProvider", "$urlRouterProvider",
		function($stateProvider, $locationProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");
			var rootState = {
				name: "root-state",
				abstract: true,
				component: "rootComponent"
			};
			var categoriesState = {
				name: "root-state.categories-state",
				url: "/",
				views: {
					"content-view": "categoriesComponent"
				},
				resolve: {
					categories: ["categoriesService", function(categoriesService){
						return categoriesService.getAllCategories();
					}]
				}
			};
			var listingsState = {
				name: "root-state.listings-state",
				url: "/category/{category}",
				views: {
					"content-view": "listingsComponent"
				},
				resolve: {
					listings: ["categoriesService", "$stateParams", function(categoriesService, $stateParams){
						return categoriesService.getListingsForCategory($stateParams.category);
					}]
				}
			};
			var listingState = {
				name: "root-state.listing-state",
				url: "/listing/{listingId}",
				views: {
					"content-view": "listingComponent"
				},
				resolve: {
					listing: ["listingsService", "$stateParams", function(listingsService, $stateParams){
						return listingsService.getListing($stateParams.listingId);
					}]
				}
			};
			$stateProvider.state(rootState);
			$stateProvider.state(categoriesState);
			$stateProvider.state(listingsState);
			$stateProvider.state(listingState);
			$locationProvider.html5Mode(true);
		}]);
})();