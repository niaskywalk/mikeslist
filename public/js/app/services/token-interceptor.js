//This service acts as an interceptor for all $http requests
//It appends a token to every request if the token exists

(function(){
	"use strict";
	angular.module("mikeslist").
	factory("tokenInterceptor", tokenInterceptor);

	tokenInterceptor.$inject = ["$window"];

	function tokenInterceptor($window) {
		return {
			request: function(config) {
				if ($window.localStorage.token) {
					config.headers["x-access-token"] = $window.localStorage.token;
				}
				return config;
			}
		};
	}
})();