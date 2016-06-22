var username = "";

angular.module('main', [])
.controller('mainController', function($scope) {
  $scope.alert = true;
  $scope.login = function() {
    $scope.alert = false;
    username = $scope.current_user;
    profilePage();
  }
})
.directive('voting', function() {
  return {
    restrict: 'E',
    templateUrl: 'modules/main/templates/voting.html'
  }
})
.directive('customGallery', function() {
  return {
    restrict: 'E',
    templateUrl: 'modules/main/templates/gallery.html'
  }
});

function profilePage() {
  location.href= '/#/user/' + username;
}

function logout() {
  //console.log("test");
  //$scope.alert = true;
  location.href = "/#/";
}
