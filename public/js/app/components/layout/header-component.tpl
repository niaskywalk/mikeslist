<h1>This is the Header</h1>

<pre>Development testing data
Admin user: msemko@gmail.com
Password:   warcraft</pre>

<a ui-sref="root-state.categories-state">
	Go home
</a>

<br>

<a href=""
   ng-if="$ctrl.authenticationBindings.loggedIn"
   ui-sref="root-state.new-listing-state">
   Post New Listing
</a>

<a href=""
   ng-click="$ctrl.toggleAdminEditMode()"
   ng-if="$ctrl.authenticationBindings.loggedIn &&
          $ctrl.authenticationBindings.admin && 
          !$ctrl.globals.adminEditMode">
    Edit Mode Off
</a>

<a href=""
   ng-click="$ctrl.toggleAdminEditMode()"
   ng-if="$ctrl.authenticationBindings.loggedIn &&
   		  $ctrl.authenticationBindings.admin &&
   		  $ctrl.globals.adminEditMode">
   	Edit Mode On
</a>

<login-logout-widget-component></login-logout-widget-component>

<a ng-if="$ctrl.authenticationBindings.loggedIn && 
          $ctrl.authenticationBindings.admin"
   ui-sref="root-state.users-state">
   Users
</a>

<a ng-if="$ctrl.authenticationBindings.loggedIn && 
          $ctrl.authenticationBindings.admin"
   ui-sref="root-state.listings-state({category: 'uncategorized'})">
   	uncategorized ({{$ctrl.uncategorized.listingCount}})
</a>