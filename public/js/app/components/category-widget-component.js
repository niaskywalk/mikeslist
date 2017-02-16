(function(){
	"use strict";
	angular.module("mikeslist").
	component("categoryWidgetComponent", {
		bindings: {
			category: "<",
			onBeginEdit: "&"
		},
		controller: ["globals", "$timeout", "categoriesService", "$state", "$scope", function(globals, $timeout, categoriesService, $state, $scope) {
			var vm = this;
			vm.editing = false;
			vm.globals = globals;
			vm.$onInit = function() {
				vm.newValue = vm.category.name;	
			};
			vm.beginEdit = function() {
				vm.onBeginEdit({except: vm.category});
				vm.editing = true;
				$timeout(function(){
					document.getElementById("category-edit-field").focus();
				});
			};
			vm.cancelEdit = function() {
				vm.editing = false;
				vm.newValue = vm.category.name;
			};
			vm.submitForm = function() {
				categoriesService.editCategory(vm.category.name, {name: vm.newValue}).
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
				if (except._id !== vm.category._id) {
					vm.cancelEdit();
				}
			});
		}],
		templateUrl: "/js/app/components/category-widget-component.tpl"
	});
})();