<h2>{{$ctrl.listing.title}}</h2>
<p>{{$ctrl.listing.body}}</p>
<p ng-if="$ctrl.listing.posterEmail">{{$ctrl.listing.posterEmail}}</p>
<p>This listing can be found in these categories:</p>
<ul>
	<li ng-repeat="category in $ctrl.listing.categories">
		<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>
	</li>
</ul>
<p ng-if="$ctrl.globals.admin">You are currently admin</p>
<a ng-if="$ctrl.globals.admin" href="" ui-sref="root-state.edit-listing-state({listing: $ctrl.listing})">edit me</a>
<a ng-if="$ctrl.globals.admin" href="" ng-click="$ctrl.deleteListing()">delete me</a>