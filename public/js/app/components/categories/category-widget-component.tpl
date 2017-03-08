<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.deleteCategory()">X</a>

<a ng-if="!$ctrl.editing" ui-sref="root-state.listings-state({category: $ctrl.category.name})">{{$ctrl.category.name}} ({{$ctrl.category.listingCount}})</a>

<a href="" ng-if="!$ctrl.editing && $ctrl.globals.adminEditMode" ng-click="$ctrl.beginEdit()">Edit</a>

<form ng-if="$ctrl.editing" ng-submit="categoryForm.$valid && $ctrl.submitCategory()" name="categoryForm" novalidate>
	<div class="error-messages">
		<div class="error-message error-message-category-required" ng-if="categoryForm.$submitted && categoryForm.category.$error.required">
			Category name is required
		</div>
		<div class="error-message error-message-category-exists" ng-if="$ctrl.errors.categoryExists">
			Category with this name already exists
		</div>
		<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">
			Unknown error has occured. Contact site administrator
		</div>
	</div>
	<input id="category-edit-field"
	       type="text"
	       ng-model="$ctrl.newValue"
	       required
	       ng-keydown="$ctrl.resetErrors()"
	       ng-change="categoryForm.$valid && categoryForm.$setPristine()"
	       name="category">
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>