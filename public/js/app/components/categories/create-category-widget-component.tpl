<a href="" ng-click="$ctrl.beginEdit()" ng-if="!$ctrl.editing">Add Category</a>

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
	<input id="category-create-field"
	       autofocus
	       type="text"
	       placeholder="new category"
	       ng-model="$ctrl.categoryName" 
	       required
	       ng-keydown="$ctrl.resetErrors()"
	       ng-change="categoryForm.$valid && categoryForm.$setPristine()"
	       name="category">
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>