(function(){
	"use strict";
	angular.module("mikeslist").
	component("categoriesComponent", {
		bindings: {
			categories: "<"
		},
		templateUrl: "js/app/components/categories-component.tpl"
	});
})();