//This service provides the basic listing CRUD api access
//any updates or deletion of listings will be reflected on the categories

(function(){
	"use strict";
	angular.module("mikeslist").
	service("listingsService", ["$http", function($http){
		var vm = this;
		vm.getListing = function(listingId){
			return $http.get("/api/v1/listing/" + listingId).then(function(data){
				return data.data;
			});
		};
		vm.postListing = function(listing) {
			return $http.post("/api/v1/listing", listing).then(function(data){
				return data.data;
			});
		};
		vm.editListing = function(listingId, listing) {
			return $http.put("/api/v1/listing/" + listingId, listing).then(function(data){
				return data.data;
			});
		};
		vm.deleteListing = function(listingId) {
			return $http.delete("/api/v1/listing/" + listingId).then(function(data){
				return data.data;
			});
		};
	}]);
})();