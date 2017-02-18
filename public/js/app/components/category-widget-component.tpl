<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a> <a href="" ng-if="!$ctrl.editing && $ctrl.globals.admin" ng-click="$ctrl.beginEdit()">Edit</a>
<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">
	<input id="category-edit-field" type="text" ng-model="$ctrl.newValue" required>
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>