<form name="postListingForm" ng-submit="$ctrl.submitForm()">
	<input ng-model="$ctrl.listing.title"
		   type="text"
		   placeholder="title"
		   required>
	<br>
	<textarea ng-model="$ctrl.listing.body"
			  required></textarea>
	<br>
	<input ng-model="$ctrl.listing.posterEmail"
		   type="email"
		   placeholder="email@example.com"
		   required>
	<br>
	<label for="{{category.name + '_checkbox'}}"
	       ng-repeat-start="category in $ctrl.categories">{{category.name}}</label>
	<input id="{{category.name + '_checkbox'}}"
	       ng-model="$ctrl.checkboxesState[$index]"
		   ng-repeat-end
		   ng-true-value="'{{category._id}}'"
		   type="checkbox">
	<br>
	<button type="submit">Submit Form</button>
</form>