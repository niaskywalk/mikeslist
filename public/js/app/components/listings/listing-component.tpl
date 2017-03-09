<h2>{{$ctrl.listing.title}}</h2>
<p>{{$ctrl.listing.body}}</p>
<p>{{$ctrl.listing.posterEmail}}</p>
<p>This listing can be found in these categories:</p>
<ul>
	<li ng-repeat="category in $ctrl.listing.categories">
		<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>
	</li>
</ul>
<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ui-sref="root-state.edit-listing-state({listing: $ctrl.listing})">edit me</a>
<a ng-if="$ctrl.authenticationBindings.email === $ctrl.listing.posterEmail || $ctrl.authenticationBindings.admin" href="" ng-click="$ctrl.deleteListing()">delete me</a>