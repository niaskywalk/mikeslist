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
			$stateProvider.state(rootState);
			$stateProvider.state(categoriesState);
			$locationProvider.html5Mode(true);
		}]);
})();