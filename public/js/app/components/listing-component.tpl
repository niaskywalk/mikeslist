<h2>{{$ctrl.listing.title}}</h2>
<p>{{$ctrl.listing.body}}</p>
<p ng-if="$ctrl.listing.posterEmail">{{$ctrl.listing.posterEmail}}</p>
<p>This listing can be found in these categories:</p>
<ul>
	<li ng-repeat="category in $ctrl.listing.categories">
		<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>
	</li>
</ul>