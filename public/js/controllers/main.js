angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', 'Upload', '$timeout', '$location', function($scope, $http, Todos, Upload, $timeout, $location) {
		$scope.formData = {};
		$scope.inputData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.absoluteUrl = function() {
			return $location.protocol() + "://" + $location.host() + ":" + $location.port();
		}

		$scope.uploadPic = function(file) {

			Todos.create($scope.formData);


			// file.upload = Upload.upload({
			// url: $scope.absoluteUrl() + '/api/todos',
			// data: { text: $scope.formData.text, file: file},
			// });

			// file.upload.then(function (response) {
			// $timeout(function () {
			// 	file.result = response.data;
			// });
			// }, function (response) {
			// if (response.status > 0)
			// 	$scope.errorMsg = response.status + ': ' + response.data;
			// }, function (evt) {
			// // Math.min is to fix IE which reports 200% sometimes
			// file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			// });
		}

		$scope.addUser = function() {
			
			var fd = new FormData();

			for(key in $scope.formData){
				fd.append(key, $scope.formData[key])
			}
			var file = $('#file')[0].files[0];
			fd.append('image', file);

			$http.post('/api/todos', fd, {
					transformRequest: angular.identity,
					headers: {
						'Content-type': undefined
					}
				})
				.success(function(data) {
					console.log('uploaded');
				}).error(function(err, data) {
					console.log("error " + err);
				});
		}

	}]);