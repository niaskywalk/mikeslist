<a href=""
   ng-click="$ctrl.formOpen = true"
   ng-if="!$ctrl.formOpen &&
          !$ctrl.authenticationBindings.loggedIn">
  Login</a>

<span ng-if="$ctrl.authenticationBindings.loggedIn">
  Logged in as: {{$ctrl.authenticationBindings.email}}</span>

<a href=""
   ng-click="$ctrl.logout()"
   ng-if="$ctrl.authenticationBindings.loggedIn">
  Logout</a>

<form ng-if="$ctrl.formOpen"
      ng-submit="$ctrl.login()">

  <div class="error-messages">

    <div class="error-message error-message-login-invalid"
         ng-if="$ctrl.errors.invalidLogin">
      Invalid email or password
    </div>

    <div class="error-message error-message-unknown-error"
         ng-if="$ctrl.errors.unknownError">
      Unknown error has occured. Contact site administrator
    </div>

  </div>
    
  <input ng-keydown="$ctrl.resetErrors()"
         ng-keydown="$ctrl.resetErrors()" 
         ng-model="$ctrl.email"
         type="text">

  <input ng-keydown="$ctrl.resetErrors()"
         ng-model="$ctrl.password"
         type="password">

  <button type="submit">Login</button>

  <button type="button"
          ng-click="$ctrl.cancelLogin()">
          Cancel
  </button>
</form>
