<a href="" ng-click="$ctrl.beginEdit()" ng-if="!$ctrl.editing">Add Category</a>
<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">
	<input id="category-create-field" autofocus type="text" placeholder="new category" ng-model="$ctrl.categoryName" required>
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>