!function(){"use strict";angular.module("mikeslist",["ui.router"])}();
!function(){"use strict";angular.module("mikeslist").config(["$stateProvider","$locationProvider","$urlRouterProvider",function(t,e,o){o.otherwise("/");var r={name:"root-state",abstract:!0,component:"rootComponent"},n={name:"root-state.categories-state",url:"/",views:{"content-view":"categoriesComponent"}};t.state(r),t.state(n),e.html5Mode(!0)}])}();
!function(){"use strict";angular.module("mikeslist").component("categoriesComponent",{templateUrl:"js/app/components/categories-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("footerComponent",{templateUrl:"js/app/components/footer-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("headerComponent",{templateUrl:"js/app/components/header-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("rootComponent",{templateUrl:"js/app/components/root-component.tpl"})}();
//# sourceMappingURL=main.js.map
