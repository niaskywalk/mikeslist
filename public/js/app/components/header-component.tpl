<h1>This is the Header</h1>
<a ui-sref="root-state.categories-state">Go home</a><br>
<a href="" ui-sref="root-state.new-listing-state">Post New Listing</a>
<a href="" ng-if="!$ctrl.globals.admin" ng-click="$ctrl.toggleAdmin()">Not Admin</a>
<a href="" ng-if="$ctrl.globals.admin" ng-click="$ctrl.toggleAdmin()">Admin</a>