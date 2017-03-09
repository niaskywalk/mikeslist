//This component shows a "create category" link which turns into a form
//when activated

//Clicking the link opens the create form and calls onBeginEdit binding

(function(){
  "use strict";
  angular.module("mikeslist").
  component("createCategoryWidgetComponent", {

    //binds to onBeginEdit function via attribute
    //to notify other forms to close
    bindings: {
      onBeginEdit: "&"
    },
    controller: createCategoryWidgetComponentController,
    templateUrl: "create-category-widget-component.tpl"
  });

  createCategoryWidgetComponentController.$inject = [
    "$scope",
    "$state",
    "$timeout",
    "categoriesService"    
  ];

  function createCategoryWidgetComponentController(
    $scope,
    $state,
    $timeout,
    categoriesService
  ) {
    var vm = this;

    //current error state
    vm.errors = {
      categoryExists: false,
      unknownError: false
    };

    //tracks the state of the form
    vm.formOpen = false;
    
    //new category name to be submitted
    vm.newCategoryName = "";

    //opens the edit form
    vm.beginEdit = function() {

      //send a signal to parent to dispatch a closing event to all widgets
      //except the current one
      vm.onBeginEdit({except: "new"});

      //open the form
      vm.formOpen = true;

      //focus the input field
      //timeout is necessary to allow the digest cycle time to refresh
      $timeout(function(){
        document.getElementById("category-create-field").focus();         
      });
    };

    //closes the form and resets the new category name
    //clears the errors
    vm.cancelEdit = function() {

      //close the form
      vm.formOpen = false;

      //revert newCategoryName back to existing category name
      vm.newCategoryName = "";

      //reset error state
      vm.resetErrors();
    };

    //reset error status
    vm.resetErrors = function() {
      for (var error in vm.errors) {
        vm.errors[error] = false;
      }
    };

    //attempts to create a new category via categoriesService
    vm.submitCategory = function() {
      categoriesService.createCategory(vm.newCategoryName).
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
          document.getElementById("category-create-field").focus();         
          document.getElementById("category-create-field").select();          
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
      if (except !== "new") {
        vm.cancelEdit();
      }
    });
  }
})();