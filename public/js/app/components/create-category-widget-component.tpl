<a href="" ng-click="$ctrl.beginEdit()" ng-if="!$ctrl.editing">Add Category</a>

<div class="error-messages">
	<div class="error-message error-message-category-exists" ng-if="$ctrl.errors.categoryExists">
		Category with this name already exists
	</div>
	<div class="error-message error-message-unknown-error" ng-if="$ctrl.errors.unknownError">
		Unknown error has occured. Contact site administrator
	</div>
</div>

<form ng-if="$ctrl.editing" ng-submit="$ctrl.submitCategory()">
	<input id="category-create-field"
	       autofocus
	       type="text"
	       placeholder="new category"
	       ng-model="$ctrl.categoryName" 
	       required
	       ng-keydown="$ctrl.resetErrors()">
	<button type="submit">OK</button>
	<button type="button" ng-click="$ctrl.cancelEdit()">Cancel</button>
</form>