<ul>
	<li ng-repeat="category in $ctrl.categories">
		<category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)" category="category"></category-widget-component>
	</li>
	<create-category-widget-component on-begin-edit="$ctrl.broadcastCloseAllOthers(except)"></create-category-widget-component>
</ul>