<ul>
	<li ng-repeat="category in $ctrl.categories">
		<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>
	</li>
</ul>