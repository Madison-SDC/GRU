angular.module('categories', [])
  .controller('categoriesController', function($scope, $http) {

  $scope.categories = [];

  // load all categories
  var load_categories = function() {
    $http.get('/get-categories').then(function(res) {
      $scope.categories = res.data.categories;
      console.log(res.data);
    }).catch(function() {
      console.log("Failed to fetch categories.");
    });
  }
  load_categories();
});
