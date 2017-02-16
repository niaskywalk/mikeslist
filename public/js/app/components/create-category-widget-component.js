(function(){
	"use strict";
	angular.module("mikeslist").
	component("createCategoryWidgetComponent", {
		controller: ["categoriesService", "globals", "$state", "$timeout", function(categoriesService, globals, $state, $timeout){
			var vm = this;
			vm.globals = globals;
			vm.editing = false;
			vm.category = "";
			vm.cancelEdit = function() {
				vm.editing = false;
				vm.category = "";
			};
			vm.beginEdit = function() {
				vm.editing = true;
				$timeout(function(){
					document.getElementById("category-name-field").focus();					
				});
			};
			vm.submitCategory = function() {
				categoriesService.createNewCategory(vm.category).
				then(function(){
					vm.editing = false;
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err){
					window.alert(err.data.error);
					vm.editing = false;
					console.error(err);
					$state.go($state.current, {}, {reload: true});
				});
			};
		}],
		templateUrl: "/js/app/components/create-category-widget-component.tpl"
	});
})();