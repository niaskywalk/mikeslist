(function(){
	"use strict";
	angular.module("mikeslist").
	service("listingsService", ["$http", function($http){
		var vm = this;
		vm.getListing = function(listingId) {
			return $http.get("/api/v1/listing/" + listingId).then(function(data){
				return data.data;
			});
		};
	}]);
})();