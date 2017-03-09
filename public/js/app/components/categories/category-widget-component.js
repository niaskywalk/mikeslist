//This component displays a name for the category with the listing count
//as well as the delete and edit links (if logged in as admin)

//Clicking the edit link opens the edit form and calls onBeginEdit binding

(function(){
  "use strict";
  angular.module("mikeslist").
  component("categoryWidgetComponent", {

    //receives category object as an attribute
    //binds to onBeginEdit function via attribute
    //to notify other forms to close
    bindings: {
      category: "<",
      onBeginEdit: "&"
    },
    controller: categoryWidgetComponentController,
    templateUrl: "category-widget-component.tpl"
  });

  categoryWidgetComponentController.$inject = [
    "$scope",
    "$state",
    "$timeout",
    "categoriesService",
    "globals"
  ];

  function categoryWidgetComponentController(
    $scope,
    $state,
    $timeout,
    categoriesService,
    globals   
  ) {
    var vm = this;

    //current error state
    vm.errors = {
      categoryExists: false,
      unknownError: false
    };

    //tracks the state of the form
    vm.formOpen = false;

    //bind globals to be able to access the adminEditMode status
    vm.globals = globals;

    //new category name to be submitted
    vm.newCategoryName = "";

    //runs automatically when controller is initialized
    //when category is bound to controller sets the new category name
    //to bound category name
    vm.$onInit = function() {
      vm.newCategoryName = vm.category.name;
    };

    //opens the edit form
    vm.beginEdit = function() {

      //send a signal to parent to dispatch a closing event to all widgets
      //except the current one
      vm.onBeginEdit({except: vm.category});

      //open the form
      vm.formOpen = true;

      //focus and highlight the input field
      //timeout is necessary to allow the digest cycle time to refresh
      $timeout(function(){
        document.getElementById("category-edit-field").focus();
        document.getElementById("category-edit-field").select();
      });
    };

    //closes the form and resets the new category name
    //clears the errors
    vm.cancelEdit = function() {

      //close the form
      vm.formOpen = false;

      //revert newCategoryName back to existing category name
      vm.newCategoryName = vm.category.name;

      //reset error state
      vm.resetErrors();
    };

    //attempts to delete category via categoriesService
    vm.deleteCategory = function() {
      categoriesService.removeCategory(vm.category.name).
      then(function() {

        //if deletion successful, reload current state
        $state.go($state.current, {}, {reload: true});
      }).
      catch(function(err){

        //in case of error, output error to console
        console.error(err);
      });
    };

    //reset error status
    vm.resetErrors = function() {
      for (var error in vm.errors) {
        vm.errors[error] = false;
      }
    };

    //attempts to update category name via categoriesService
    vm.submitCategory = function() {
      categoriesService.editCategory(vm.category.name, {name: vm.newCategoryName || ""}).
      then(function(){

        //if successful, close the form and reload current state
        vm.formOpen = false;
        $state.go($state.current, {}, {reload: true});
      }).
      catch(function(err){

        //in case of error keep the form open

        //focus and highlight the input field
        //timeout is necessary to allow the digest cycle time to refresh
        $timeout(function(){
          document.getElementById("category-edit-field").focus();
          document.getElementById("category-edit-field").select();
        });

        //set appropriate error status
        if (err.status === 409) {
          vm.errors.categoryExists = true;
        } else {
          vm.errors.unknownError = true;
          console.error(err);
        }
      });
    };

    //listen for 'close:forms' event
    //when received, check to make sure the current widget was not the sender
    //if not - close this form
    $scope.$on("close:forms", function(event, except){
      if (except._id !== vm.category._id) {
        vm.cancelEdit();
      }
    });   
  }
})();