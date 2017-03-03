<ul>
	<li ng-repeat="user in $ctrl.users">
		<a ui-sref="root-state.user-state({email: user.email})">{{user.email}}</a>
	</li>
	<li>
		<a href="" ui-sref="root-state.new-user-state">Create new user</a>
	</li>
</ul>