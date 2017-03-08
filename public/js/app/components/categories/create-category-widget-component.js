//This component shows a "create category" link which turns into a form
//when activated
//It attempts to create a new category
//Clicking the link calls the onBeginEdit binding to close all other forms on the page

(function(){
	"use strict";
	angular.module("mikeslist").
	component("createCategoryWidgetComponent", {
		bindings: {
			onBeginEdit: "&"
		},
		controller: ["$scope", "$state", "$timeout", "categoriesService", "globals", function($scope, $state, $timeout, categoriesService, globals) {
			var vm = this;

			//flag indicating the current widget state
			vm.editing = false;
			
			//placeholder for new category name
			vm.categoryName = "";

			vm.errors = {
				categoryExists: false
			};

			vm.resetErrors = function() {
				for (var error in vm.errors) {
					vm.errors[error] = false;
				}
			};			

			//enables the template to check whether in admin mode or not
			vm.globals = globals;

			vm.beginEdit = function() {

				//send a signal to parent to dispatch a closing event to all widgets except the current one
				vm.onBeginEdit({except: "new"});
				vm.editing = true;

				//focus the input field
				$timeout(function(){
					document.getElementById("category-create-field").focus();					
				});
			};

			vm.cancelEdit = function() {
				vm.editing = false;
				vm.categoryName = "";
				vm.resetErrors();
			};

			vm.submitCategory = function() {
				categoriesService.createCategory(vm.categoryName).
				then(function(){
					vm.editing = false;
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err){
					//focus the input field
					$timeout(function(){
						document.getElementById("category-create-field").focus();					
						document.getElementById("category-create-field").select();					
					});
					if (err.status === 409) {
						vm.errors.categoryExists = true;
					} else {
						vm.errors.unknownError = true;
						console.error(err);
					}
				});
			};

			//if closing event received, check to make sure the current widget was not the sender
			$scope.$on("close:forms", function(event, except){
				if (except !== "new") {
					vm.cancelEdit();
				}
			});
		}],
		templateUrl: "create-category-widget-component.tpl"
	});
})();