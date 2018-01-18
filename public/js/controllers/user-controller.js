angular.module('UserController', [])

	// inject the Todo service factory into our controller
	.controller('userController', ['$scope','$http','userService', '$mdDialog', function($scope, $http, userService, $mdDialog) {
		$scope.formData = {};
		$scope.loading = false;

		$scope.qualificationList = ["SSC","INTERMEDIATE","DEGREE","BTECH"];

		$scope.casteList = ["OC", "SC","ST","BC-A","BC-B","BC-C","BC-D","BC-E"];

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

			$scope.loading = true;

			userService.registerUser(fd)
				.then(function(data) {
					$scope.loading = false;
					console.log('uploaded');
				}).catch(function(err, data) {
					console.log("error " + err);
					$scope.showError('Please try again').then(function(){
						$scope.resetForm();
					});
				}).finally(function(){
					$scope.showConfirm().then(function(){
						$scope.resetForm();
					});
				});

			
		}

		$scope.resetForm = function(){
			$scope.formData = {};
			$scope.userForm.$setPristine();
			$('#regForm').trigger("reset");
		}

		$scope.showConfirm = function(ev) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('UPDATED SUCCESSFULLY!!')
				.textContent('Thanks for the information provided')
				.ok('OK');

			return $mdDialog.show(confirm);
		};

		$scope.showError = function(msg) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.alert()
				.title('ERROR ENCOUNTERED')
				.textContent(msg)
				.ok('OK');

			return $mdDialog.show(confirm);
		};

		$scope.validateUser = function(fdata) {
			if(fdata.aadharNumber){
				$scope.validatingUser = true;
				userService.validateUser(fdata).then(function(res){

				}, function(err) {
					$scope.showError('User Already registered').then(function(){
						$scope.formData.aadharNumber = '';
					})
				}).finally(function(){
					$scope.validatingUser = false;
				});
			}
			
		}

	}]);