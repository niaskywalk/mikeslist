//This component displays a name for the category with the listing count
//as well as (if admin) the delete and edit links
//
//Clicking the edit link opens the edit form and calls onBeginEdit binding
//
//category binding is passed down from categories component as a category object
//without resolving the listings
//
//onBeginEdit received a callback to notify parent to close other edit forms
//when this edit form is open

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
					document.getElementById("category-edit-field").select();

				});
			};

			vm.cancelEdit = function() {

				//set editing to false and revert the newValue back to
				//existing category name
				vm.editing = false;
				vm.newValue = vm.category.name;
				vm.resetErrors();
			};

			vm.submitCategory = function() {
				categoriesService.editCategory(vm.category.name, {name: vm.newValue || ""}).
				then(function(){

					//if successful, set editing flag to false
					//and reload current state
					vm.editing = false;
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err){

					//in case of error remain in editing state, focus the
					//input field, display error message alert box,
					//and output error to console
	
					$timeout(function(){
						document.getElementById("category-edit-field").focus();
						document.getElementById("category-edit-field").select();
					});
					if (err.status === 409) {
						vm.errors.categoryExists = true;
					}
				});
			};

			vm.deleteCategory = function() {
				categoriesService.removeCategory(vm.category.name).
				then(function() {

					//if deletion successful, reload current state
					$state.go($state.current, {}, {reload: true});
				}).
				catch(function(err){

					//in case of error, display message alert box
					//and output error to console
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
		templateUrl: "category-widget-component.tpl"
	});
})();