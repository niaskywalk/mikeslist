<div nf-if="$ctrl.error" class="error-message">{{$ctrl.error}}</div>
<a href="" ng-if="!$ctrl.formOpen && !$ctrl.bindings.loggedIn" ng-click="$ctrl.formOpen = true">Login</a>
<span ng-if="$ctrl.bindings.loggedIn">Logged in as: {{$ctrl.bindings.email}}</span>
<a href="" ng-if="$ctrl.bindings.loggedIn" ng-click="$ctrl.logout()">Logout</a>
<form ng-if="$ctrl.formOpen" ng-submit="$ctrl.login()">
	<input type="text" ng-model="$ctrl.email" ng-change="$ctrl.error = ''">
	<input type="password" ng-model="$ctrl.password" ng-change="$ctrl.error = ''">
	<button type="submit">Login</button>
	<button type="button" ng-click="$ctrl.cancelLogin()">Cancel</button>
</form>
