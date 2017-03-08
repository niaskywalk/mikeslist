<h1>{{$ctrl.user.email}}</h1>
<p ng-if="$ctrl.user.admin">User is admin</p>
<a href="" ui-sref="root-state.edit-user-state({user: $ctrl.user})">Edit me</a>
<a href="" ng-click="$ctrl.deleteUser()" ng-if="$ctrl.authenticationBindings.email !== $ctrl.user.email">Delete me</a>