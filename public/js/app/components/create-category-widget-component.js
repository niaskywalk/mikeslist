(function(){
	"use strict";
	angular.module("mikeslist").
	component("createCategoryWidgetComponent", {
		bindings: {
			onBeginEdit: "&"
		},
		controller: ["categoriesService", "globals", "$state", "$timeout", "$scope", function(categoriesService, globals, $state, $timeout, $scope){
			var vm = this;
			vm.globals = globals;
			vm.editing = false;
			vm.category = "";
			vm.cancelEdit = function() {
				vm.editing = false;
				vm.category = "";
			};
			vm.beginEdit = function() {
				vm.onBeginEdit({except: "new"});
				vm.editing = true;
				$timeout(function(){
					document.getElementById("category-create-field").focus();					
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
					console.error(err);
				});
			};
			$scope.$on("close:forms", function(event, except){
				if (except !== "new") {
					vm.cancelEdit();
				}
			});
		}],
		templateUrl: "/js/app/components/create-category-widget-component.tpl"
	});
})();