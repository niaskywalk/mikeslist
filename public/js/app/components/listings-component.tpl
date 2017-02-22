<ul>
	<li ng-repeat="listing in $ctrl.category.listings"><a ui-sref="root-state.listing-state({listingId: listing._id})">{{listing.title}}</a></li>
</ul>
<div ng-if="$ctrl.category.listingCount === 0">This category is empty</div>