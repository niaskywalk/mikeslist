<ul>
	<li ng-repeat="listing in $ctrl.listings"><a ui-sref="root-state.listing-state({listingId: listing._id})">{{listing.title}}</a></li>
</ul>
<div ng-if="$ctrl.listings.length === 0">This category is empty</div>