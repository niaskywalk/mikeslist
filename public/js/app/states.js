(function(){
	"use strict";
	angular.module("mikeslist").
	config(["$stateProvider", "$locationProvider", "$urlRouterProvider",
		function($stateProvider, $locationProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise("/");
			var rootState = {
				name: "root-state",
				abstract: true,
				component: "rootComponent",
				resolve: {
					uncategorized: ["categoriesService", function(categoriesService){
						return categoriesService.getListingsForCategory("uncategorized");
					}],
				}
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
					category: ["categoriesService", "$stateParams", function(categoriesService, $stateParams){
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
				},
				params: {
					category: {}
				}
			};
			var newListingState = {
				name: "root-state.new-listing-state",
				views: {
					"content-view": "postListingFormComponent"
				},
				resolve: {
					categories: ["categoriesService", function(categoriesService){
						return categoriesService.getAllCategories();
					}]
				},
				data: {
					protected: "user"
				}
			};
			var editListingState = {
				name: "root-state.edit-listing-state",
				views: {
					"content-view": "editListingFormComponent"
				},
				resolve: {
					categories: ["categoriesService", function(categoriesService){
						return categoriesService.getAllCategories();
					}]
				},
				params: {
					listing: {}
				},
				data: {
					protected: "user"
				}
			};
			var usersState = {
				name: "root-state.users-state",
				url: "/users",
				resolve: {
					users: ["usersService", function(usersService){
						return usersService.getAllUsers();
					}]
				},
				views: {
					"content-view": "usersComponent"
				}
			};
			var userState = {
				name: "root-state.user-state",
				url: "/user/{email}",
				resolve: {
					user: ["usersService", "$stateParams", function(usersService, $stateParams){
						return usersService.getSingleUser($stateParams.email);
					}]
				},
				views: {
					"content-view": "userComponent"
				}
			};
			var newUserState = {
				name: "root-state.new-user-state",
				views: {
					"content-view": "createUserFormComponent"
				}
			};
			var editUserState = {
				name: "root-state.edit-user-state",
				views: {
					"content-view": "editUserFormComponent"
				},
				params: {
					user: {}
				}
			};
			$stateProvider.state(rootState);
			$stateProvider.state(categoriesState);
			$stateProvider.state(listingsState);
			$stateProvider.state(listingState);
			$stateProvider.state(newListingState);
			$stateProvider.state(editListingState);
			$stateProvider.state(usersState);
			$stateProvider.state(userState);
			$stateProvider.state(newUserState);
			$stateProvider.state(editUserState);
			$locationProvider.html5Mode(true);
		}]);
})();