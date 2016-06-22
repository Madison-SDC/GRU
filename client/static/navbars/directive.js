angular.module('navbars', ['categories'])

// Right Nav
.directive('rightnavbar', function() {
	return {
		restrict: 'E', //element
		transclude: true,
		templateUrl: 'static/navbars/right.html',
		controller: function($http, $scope) {
			$http.get('/get-users')
			.then(function(res) {
				$scope.users = res.data.users;
				console.log("Loading leaderboard.");
			}).catch(function() {
				console.log("Failed to load leaderboard.");
			});
		},
		controllerAs: 'rnavController'
	}
})

// Top Nav
.directive('navbar', function() {
	return {
		restrict: 'E', //element
		transclude: true,
		scope: true,
		templateUrl: 'static/navbars/top.html',
		controller: 'mainController'
	}
})

// Left Nav
.directive('leftnavbar',function() {
	return {
		restrict: 'E', //element
		transclude: true,
		templateUrl: 'static/navbars/left.html'

	}
});
