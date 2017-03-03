(function(){
	"use strict";
	angular.module("mikeslist").
	component("userWidgetComponent", {
		bindings: {
			user: "<"
		},
		templateUrl: "user-widget-component"
	});
})();