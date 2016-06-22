angular.module('thread', [])
  .controller('threadController', function($scope, $http, $routeParams) {
    var loadcomments = function() {
      $http.get('/get-thread/'+$routeParams.id).then(function(res) {
        $scope.comments = res.data.comments;
        $scope.thread = res.data.thread;
        //console.log(res.data)
      }).catch(function() {
        console.log("Failed get");
      });
    }
    loadcomments()
    // for creating new threads
    $scope.sendGet = function() {
      console.log("func")
      var getString = '/new-comment/' + username +
      '?thread=' + $scope.thread.Id + '&body=' + $scope.comment_name;
      var query =  encodeURI(getString);
      console.log(query);
      $http.get(query).then(function(res) {
        console.log(res.data);
        loadcomments();
      }).catch(function() {
        console.log("Failed to add Thread to " + $scope.current_category);
      });
    };
  });
