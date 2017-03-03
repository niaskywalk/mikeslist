<h1>This is the Header</h1>
<a ui-sref="root-state.categories-state">Go home</a><br>
<a ng-if="$ctrl.authenticationBindings.loggedIn" href="" ui-sref="root-state.new-listing-state">Post New Listing</a>
<a href="" ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin && !$ctrl.globals.adminEditMode" ng-click="$ctrl.toggleAdminEditMode()">Edit Mode Off</a>
<a href="" ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin && $ctrl.globals.adminEditMode" ng-click="$ctrl.toggleAdminEditMode()">Edit Mode On</a>
<login-logout-widget-component></login-logout-widget-component>
<a ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin" ui-sref="root-state.users-state">Users</a>
<a ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin" ui-sref="root-state.listings-state({category: 'uncategorized'})">uncategorized ({{$ctrl.uncategorized.listingCount}})</a>