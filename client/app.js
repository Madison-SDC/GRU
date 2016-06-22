angular.module('sfhackday', [
  'main',
  'ngRoute',
  'ui.bootstrap',
  'ngAnimate',
  'categories',
  'navbars',
  'category',
  'user',
  'thread'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'modules/main/templates/main.html',
    controller: 'mainController',
    controllerAs: 'main'
  })
  .when('/category/:id', {
    templateUrl: 'modules/category/templates/category.html',
    controller: 'categoryController',
    controllerAs: 'category'
  })
  .when('/user/:alias', {
    templateUrl: 'modules/user/templates/user.html',
    controller: 'userController',
    controllerAs: 'user'
  })
  .when('/thread/:id', {
    templateUrl: 'modules/thread/templates/thread.html',
    controller: 'threadController',
    controllerAs: 'thread'
  })
  .when('/about', {
    templateUrl: 'modules/about.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});
