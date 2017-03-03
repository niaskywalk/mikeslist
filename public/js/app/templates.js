(function(){angular.module('mikeslist').run(['$templateCache', function($templateCache) {$templateCache.put('categories-component.tpl','<ul>\r\n\r\n\t<li ng-repeat="category in $ctrl.categories">\r\n\t\t<category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)" category="category"></category-widget-component>\r\n\t</li>\r\n\r\n\t<li ng-if="$ctrl.globals.adminEditMode && $ctrl.uncategorized.listingCount > 0">\r\n\t\t<a ui-sref="root-state.listings-state({category: \'uncategorized\'})">uncategorized ({{$ctrl.uncategorized.listingCount}})</a>\r\n\t</li>\r\n\t\r\n\t<li ng-if="$ctrl.globals.adminEditMode">\r\n\t\t<create-category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)"></create-category-widget-component>\r\n\t</li>\r\n</ul>');
$templateCache.put('category-widget-component.tpl','<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.deleteCategory()">X</a>\r\n\r\n<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>\r\n\r\n<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.beginEdit()">Edit</a>\r\n\r\n<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">\r\n\t<input id="category-edit-field" type="text" ng-model="$ctrl.newValue" required>\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>');
$templateCache.put('create-category-widget-component.tpl','<a href="" ng-click="$ctrl.beginEdit()" ng-if="!$ctrl.editing">Add Category</a>\r\n<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">\r\n\t<input id="category-create-field" autofocus type="text" placeholder="new category" ng-model="$ctrl.categoryName" required>\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>');
$templateCache.put('footer-component.tpl','<h1>This is the Footer</h1>');
$templateCache.put('header-component.tpl','<h1>This is the Header</h1>\r\n<a ui-sref="root-state.categories-state">Go home</a><br>\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn" href="" ui-sref="root-state.new-listing-state">Post New Listing</a>\r\n<a href="" ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin && !$ctrl.globals.adminEditMode" ng-click="$ctrl.toggleAdminEditMode()">Edit Mode Off</a>\r\n<a href="" ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin && $ctrl.globals.adminEditMode" ng-click="$ctrl.toggleAdminEditMode()">Edit Mode On</a>\r\n<login-logout-widget-component></login-logout-widget-component>\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin" ui-sref="root-state.users-state">Users</a>\r\n<a ng-if="$ctrl.authenticationBindings.loggedIn && $ctrl.authenticationBindings.admin" ui-sref="root-state.listings-state({category: \'uncategorized\'})">uncategorized ({{$ctrl.uncategorized.listingCount}})</a>');
$templateCache.put('listing-component.tpl','<h2>{{$ctrl.listing.title}}</h2>\r\n<p>{{$ctrl.listing.body}}</p>\r\n<p>{{$ctrl.listing.posterEmail}}</p>\r\n<p>This listing can be found in these categories:</p>\r\n<ul>\r\n\t<li ng-repeat="category in $ctrl.listing.categories">\r\n\t\t<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>\r\n\t</li>\r\n</ul>\r\n<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ui-sref="root-state.edit-listing-state({listing: $ctrl.listing})">edit me</a>\r\n<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ng-click="$ctrl.deleteListing()">delete me</a>');
$templateCache.put('listing-form.tpl','<form name="postListingForm" ng-submit="$ctrl.submitForm()">\r\n\t<input ng-model="$ctrl.listing.title"\r\n\t\t   type="text"\r\n\t\t   placeholder="title"\r\n\t\t   required>\r\n\t<br>\r\n\t<textarea ng-model="$ctrl.listing.body"\r\n\t\t\t  required></textarea>\r\n\t<br>\r\n<!-- \t<input ng-model="$ctrl.listing.posterEmail"\r\n\t\t   type="email"\r\n\t\t   placeholder="email@example.com"\r\n\t\t   required>\r\n\t<br> -->\r\n\t<label for="{{category.name + \'_checkbox\'}}"\r\n\t       ng-repeat-start="category in $ctrl.categories">{{category.name}}</label>\r\n\t<input id="{{category.name + \'_checkbox\'}}"\r\n\t       ng-model="$ctrl.checkboxesState[$index]"\r\n\t\t   ng-repeat-end\r\n\t\t   ng-true-value="\'{{category._id}}\'"\r\n\t\t   type="checkbox">\r\n\t<br>\r\n\t<button type="submit">Submit Form</button>\r\n</form>');
$templateCache.put('listings-component.tpl','<ul>\r\n\t<li ng-repeat="listing in $ctrl.category.listings"><a ui-sref="root-state.listing-state({listingId: listing._id, category: $ctrl.category})">{{listing.title}}</a></li>\r\n</ul>\r\n<div ng-if="$ctrl.category.listingCount === 0">This category is empty</div>');
$templateCache.put('login-logout-widget-component.tpl','<div nf-if="$ctrl.error" class="error-message">{{$ctrl.error}}</div>\r\n<a href="" ng-if="!$ctrl.formOpen && !$ctrl.bindings.loggedIn" ng-click="$ctrl.formOpen = true">Login</a>\r\n<span ng-if="$ctrl.bindings.loggedIn">Logged in as: {{$ctrl.bindings.email}}</span>\r\n<a href="" ng-if="$ctrl.bindings.loggedIn" ng-click="$ctrl.logout()">Logout</a>\r\n<form ng-if="$ctrl.formOpen" ng-submit="$ctrl.login()">\r\n\t<input type="text" ng-model="$ctrl.email" ng-change="$ctrl.error = \'\'">\r\n\t<input type="password" ng-model="$ctrl.password" ng-change="$ctrl.error = \'\'">\r\n\t<button type="submit">Login</button>\r\n\t<button type="button" ng-click="$ctrl.cancelLogin()">Cancel</button>\r\n</form>\r\n');
$templateCache.put('root-component.tpl','<header class="site-header"><header-component uncategorized="$ctrl.uncategorized"></header-component></header>\r\n<main class="site-main" ui-view="content-view"></main>\r\n<footer class="site-footer"><footer-component></footer-component></footer>');
$templateCache.put('user-component.tpl','<h1>{{$ctrl.user.email}}</h1>\r\n<p ng-if="$ctrl.user.admin">User is admin</p>\r\n<a href="" ui-sref="root-state.edit-user-state({user: $ctrl.user})">Edit me</a>\r\n<a href="" ng-click="$ctrl.deleteUser()" ng-if="$ctrl.authenticationBindings.email !== $ctrl.user.email">Delete me</a>');
$templateCache.put('user-form.tpl','<form name="postListingForm" ng-submit="$ctrl.submitForm()">\r\n\t<input id="email-field" ng-model="$ctrl.user.email"\r\n\t\t   type="email"\r\n\t\t   placeholder="user@example.com"\r\n\t\t   required>\r\n\t<br>\r\n\t<label for="admin-checkbox">User is admin: </label>\r\n\t<input type="checkbox" ng-model="$ctrl.user.admin" ng-disabled="$ctrl.email && $ctrl.authenticationBindings.email === $ctrl.email">\r\n\t<br>\r\n\t<input type="password" ng-model="$ctrl.user.password" ng-required="!$ctrl.email" placeholder="password">\r\n\t<br>\r\n\t<input type="password" ng-model="$ctrl.user.passwordConfirmation" ng-required="!$ctrl.email" placeholder="confirm password">\r\n\t<br>\r\n\t<button type="submit">Submit Form</button>\r\n</form>');
$templateCache.put('user-widget-component.tpl','<a href="" ng-if="!$ctrl.editing && $ctrl.globals.admin" ng-click="$ctrl.deleteUser()">X</a>\r\n\r\n<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>\r\n\r\n<a href="" ng-if="!$ctrl.editing && $ctrl.globals.admin" ng-click="$ctrl.beginEdit()">Edit</a>\r\n\r\n<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">\r\n\t<input id="category-edit-field" type="text" ng-model="$ctrl.newValue" required>\r\n\t<button type="submit">OK</button>\r\n\t<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>\r\n</form>');
$templateCache.put('users-component.tpl','<ul>\r\n\t<li ng-repeat="user in $ctrl.users">\r\n\t\t<a ui-sref="root-state.user-state({email: user.email})">{{user.email}}</a>\r\n\t</li>\r\n\t<li>\r\n\t\t<a href="" ui-sref="root-state.new-user-state">Create new user</a>\r\n\t</li>\r\n</ul>');}]);})();