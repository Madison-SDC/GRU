angular.module('user', [])
  .controller('userController', function($scope, $http, $routeParams) {
  if ($routeParams.alias) {
    var alias = $routeParams.alias;
    $scope.current_alias = alias;
    $http.get('/get-user/'+alias).then(function(res) {
      $scope.user = res.data.user;
    });
    getThreads();
  }

  function getThreads() {
    var alias = $scope.current_alias;
    $http.get('/get-user-threads/'+alias).then(function(res) {
      $scope.user_threads = res.data.threads;
    });
  }
});
