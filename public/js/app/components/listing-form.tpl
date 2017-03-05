<form name="postListingForm" ng-submit="postListingForm.$valid && $ctrl.submitForm()" novalidate>
	<div class="error-messages">
		<div class="error-message error-message-min-title-length" ng-if="postListingForm.$submitted && postListingForm.title.$error.minlength">
			Title must be longer than 3 characters
		</div>
		<div class="error-message error-message-title-required" ng-if="postListingForm.$submitted && postListingForm.title.$error.required">
			Title is required
		</div>
		<div class="error-message error-message-body-required" ng-if="postListingForm.$submitted && postListingForm.body.$error.required">
			Listing cannot be empty
		</div>
		<div class="error-message error-message-category-required" ng-if="
		$ctrl.errors.categoryRequired">
			You must pick at least 1 category
		</div>
	</div>
	<input ng-model="$ctrl.listing.title"
		   type="text"
		   placeholder="title"
		   required
		   minlength="3"
		   maxlength="255"
		   name="title"
		   ng-change="postListingForm.$valid && postListingForm.$setPristine()">
	<span ng-if="255 - $ctrl.listing.title.length <= 20">{{255 - $ctrl.listing.title.length}}</span>
	<br>
	<textarea ng-model="$ctrl.listing.body"
			  name="body"
			  required
			  ng-change="postListingForm.$valid && postListingForm.$setPristine()"></textarea>
	<br>
	<label for="{{category.name + '_checkbox'}}"
	       ng-repeat-start="category in $ctrl.categories">{{category.name}}</label>
	<input id="{{category.name + '_checkbox'}}"
	       ng-model="$ctrl.checkboxesState[$index]"
		   ng-repeat-end
		   ng-true-value="'{{category._id}}'"
		   ng-change="$ctrl.errors.categoryRequired = false"
		   type="checkbox">
	<br>
	<button type="submit">Submit Form</button>
</form>