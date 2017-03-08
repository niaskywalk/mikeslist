<div class="error-messages">
	<div class="error-message error-message-category-exists" ng-if="$ctrl.errors.categoryExists">
		Category with this name already exists
	</div>
	<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">
		Unknown error has occured. Contact site administrator
	</div>
</div>

<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.deleteCategory()">X</a>

<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>

<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.beginEdit()">Edit</a>

<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">
	<input id="category-edit-field"
	       type="text"
	       ng-model="$ctrl.newValue"
	       required
	       ng-keydown="$ctrl.resetErrors()">
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>