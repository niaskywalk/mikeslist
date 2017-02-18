<ul>
	<li ng-repeat="category in $ctrl.categories">
		<category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)" category="category"></category-widget-component>
	</li>
	<li ng-if="$ctrl.globals.admin && $ctrl.uncategorizedListingsCount > 0">
		<a ui-sref="root-state.listings-state({category: 'uncategorized'})">uncategorized ({{$ctrl.uncategorizedListingsCount}})</a>
	</li>
	<create-category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)"></create-category-widget-component>
</ul>