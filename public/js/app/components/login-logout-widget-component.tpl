
<a href="" ng-if="!$ctrl.formOpen && !$ctrl.bindings.loggedIn" ng-click="$ctrl.formOpen = true">Login</a>
<span ng-if="$ctrl.bindings.loggedIn">Logged in as: {{$ctrl.bindings.email}}</span>
<a href="" ng-if="$ctrl.bindings.loggedIn" ng-click="$ctrl.logout()">Logout</a>
<form ng-if="$ctrl.formOpen" ng-submit="$ctrl.login()">
	<input type="text" ng-model="$ctrl.email">
	<input type="password" ng-model="$ctrl.password">
	<button type="submit">Login</button>
	<button type="button" ng-click="$ctrl.cancelLogin()">Cancel</button>
</form>
