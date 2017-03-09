<ul>

  <li ng-repeat="category in $ctrl.categories">
    <category-widget-component
      category="category"
      on-begin-edit="$ctrl.broadcastCloseAllOthers(except)">
    </category-widget-component>
  </li>

  <li ng-if="$ctrl.globals.adminEditMode &&
             $ctrl.uncategorized.listingCount > 0">
    <a ui-sref="root-state.listings-state({category: 'uncategorized'})">      uncategorized ({{$ctrl.uncategorized.listingCount}})</a>
  </li>
  
  <li ng-if="$ctrl.globals.adminEditMode">
    <create-category-widget-component
      on-begin-edit="$ctrl.broadcastCloseAllOthers(except)">
    </create-category-widget-component>
  </li>
  
</ul>