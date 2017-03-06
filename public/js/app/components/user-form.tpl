<form name="userForm" ng-submit="userForm.$valid && $ctrl.submitForm()" novalidate>
	<div class="error-messages">
		<div class="error-message error-message-email-required" ng-if="userForm.$submitted && userForm.email.$error.required">
			Email address is required
		</div>
	</div>
	<input id="email-field" ng-model="$ctrl.user.email"
		   type="email"
		   placeholder="user@example.com"
		   required
		   name="email">
	<br>
	<label for="admin-checkbox">User is admin: </label>
	<input type="checkbox" ng-model="$ctrl.user.admin" ng-disabled="$ctrl.email && $ctrl.authenticationBindings.email === $ctrl.email">
	<br>
	<input type="password" ng-model="$ctrl.user.password" ng-required="!$ctrl.email" placeholder="password">
	<br>
	<input type="password" ng-model="$ctrl.user.passwordConfirmation" ng-required="!$ctrl.email" placeholder="confirm password">
	<br>
	<button type="submit">Submit Form</button>
</form>