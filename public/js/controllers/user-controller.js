angular.module('UserController', [])

	// inject the Todo service factory into our controller
	.controller('userController', ['$scope','$http','userService', function($scope, $http, userService) {
		$scope.formData = {};
		$scope.loading = false;

		$scope.registerUser = function() {
			
			var fd = new FormData();

			for(key in $scope.formData){
				fd.append(key, $scope.formData[key])
			}
			var file = $('#file')[0].files[0];
			fd.append('file', file);

			$scope.loading = true;

			userService.registerUser(fd)
				.success(function(data) {
					console.log('uploaded');
				}).error(function(err, data) {
					console.log("error " + err);
				}).finally(function(){
					$scope.loading = false;
					$scope.formData = {};
				});
		}

	}]);