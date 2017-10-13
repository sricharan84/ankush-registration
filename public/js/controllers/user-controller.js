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
			
			var imageFile = $('#photoUpload')[0].files[0],
				tenthFile = $('#tenthUpload')[0].files[0],
				aadharFile = $('#aadharUpload')[0].files[0];

			fd.append('imageFile', imageFile);
			fd.append('tenthFile', tenthFile);
			fd.append('aadharFile', aadharFile);

			console.log($scope.formData);

			$scope.loading = true;

			userService.registerUser(fd)
				.success(function(data) {
					console.log('uploaded');
				}).error(function(err, data) {
					console.log("error " + err);
				}).finally(function(){
					$scope.loading = false;
					$scope.resetForm();
				});

			
		}

		$scope.resetForm = function(){
			$scope.formData = {};
			$scope.userForm.$setPristine();
			$('#regForm').trigger("reset");
		}

	}]);