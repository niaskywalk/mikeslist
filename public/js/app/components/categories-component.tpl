<ul>
	<li ng-repeat="category in $ctrl.categories">
		<a ui-sref="root-state.listings-state({category: category.name})">{{category.name}}</a>
	</li>
	<create-category-widget-component></create-category-widget-component>
</ul>