!function(){"use strict";angular.module("mikeslist",["ui.router"])}();
!function(){"use strict";angular.module("mikeslist").config(["$stateProvider","$locationProvider","$urlRouterProvider",function(e,t,o){o.otherwise("/");var r={name:"root-state",abstract:!0,component:"rootComponent"},i={name:"root-state.categories-state",url:"/",views:{"content-view":"categoriesComponent"},resolve:{categories:["categoriesService",function(e){return e.getAllCategories()}]}};e.state(r),e.state(i),t.html5Mode(!0)}])}();
!function(){"use strict";angular.module("mikeslist").component("categoriesComponent",{bindings:{categories:"<"},templateUrl:"js/app/components/categories-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("footerComponent",{templateUrl:"js/app/components/footer-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("headerComponent",{templateUrl:"js/app/components/header-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").component("rootComponent",{templateUrl:"js/app/components/root-component.tpl"})}();
!function(){"use strict";angular.module("mikeslist").service("categoriesService",["$q",function(e){var n=this;n.getAllCategories=function(){return e.when([{name:"Electronics"},{name:"Games"},{name:"Software"}])}}])}();
//# sourceMappingURL=main.js.map
