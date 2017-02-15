(function(){
	"use strict";
	angular.module("mikeslist", ["ui.router"]).
	run(["$transitions", "$state", function($transitions, $state){
		$transitions.onError({}, function(){
			$state.go("root-state.categories-state");
		});
	}]);
})();