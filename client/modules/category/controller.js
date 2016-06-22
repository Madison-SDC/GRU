angular.module('category', [])
  .controller('categoryController', function($scope, $http, $routeParams) {

    // for getting category threads
    if ($routeParams.id) {
        var id = $routeParams.id;
       // load category by ID
        getThreads(id);
    }

    function getThreads(id) {
      $http.get('/get-category/' + id).then(function(res) {
          $scope.current_category = res.data.category;
          $scope.threads = res.data.threads;
          console.log(res.data);
      }).catch(function() {
          console.log("Failed to fetch category.");
      });
    }

    // for creating new threads
    $scope.sendGet = function() {
      var getString = '/new-thread/' + username +
      '?category=' + $scope.current_category.Category_ID + '&body=' + $scope.thread_name;
      var query =  encodeURI(getString);
      console.log(query);
      $http.get(query).then(function(res) {
        console.log(res.data);
      }).catch(function() {
        console.log("Failed to add Thread to "+$scope.current_category);
      });
      getThreads($scope.current_category.Category_ID);
    };
  });
