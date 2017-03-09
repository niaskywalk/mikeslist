(function(){
  "use strict";
  angular.module("mikeslist", ["ui.router"]).
  
  config(["$httpProvider", function($httpProvider){

    //insert an interceptor into all $http calls
    $httpProvider.interceptors.push("tokenInterceptor");
  }]).

  run(["$transitions", "$state", function($transitions, $state){
    
    //if error in transition, change to the categories state (home page)
    $transitions.onError({}, function(){
      $state.go("root-state.categories-state");
    });
  }]).

  run(["authenticationService", function(authenticationService){

    //check if logged in
    authenticationService.check();
  }]).

  value("globals", {

    //set admin edit mode to false
    adminEditMode: false
  });
})();