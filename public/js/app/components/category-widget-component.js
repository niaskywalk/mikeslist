(function(){
	"use strict";
	angular.module("mikeslist").
	component("categoryWidgetComponent", {
		bindings: {
			category: "<",
			onBeginEdit: "&"
		},
		controller: ["$scope", "$state", "$timeout", "categoriesService", "globals", function($scope, $state, $timeout, categoriesService, globals) {
			var vm = this;

			//flag indicating the current widget state
			vm.editing = false;

			//enables the template to check whether in admin mode or not
			vm.globals = globals;

			//placeholder for new category name
			vm.newValue = "";

			//when category is bound set the new value to same name as category
			vm.$onInit = function() {
				vm.newValue = vm.category.name;
			};

			vm.beginEdit = function() {

				//send a signal to parent to dispatch a closing event to all widgets except the current one
				vm.onBeginEdit({except: vm.category});
				vm.editing = true;

				//focus the input field
				$timeout(function(){
					document.getElementById("category-edit-field").focus();
				});
			};

			vm.cancelEdit = function() {
				vm.editing = false;
				vm.newValue = vm.category.name;
			};

			vm.submitCategory = function() {
				categoriesService.editCategory(vm.category.name, {name: vm.newValue || ""}).
				then(function(){
					vm.editing = false;
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err){
					document.getElementById("category-edit-field").focus();
					window.alert(err.data.error);
					console.error(err);
				});
			};

			vm.deleteCategory = function() {
				categoriesService.removeCategory(vm.category.name).
				then(function() {
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err){
					window.alert(err.data.error);
					console.error(err);
				});
			};

			//if closing event received, check to make sure the current widget was not the sender
			$scope.$on("close:forms", function(event, except){
				if (except._id !== vm.category._id) {
					vm.cancelEdit();
				}
			});
		}],
		templateUrl: "/js/app/components/category-widget-component.tpl"
	});
})();