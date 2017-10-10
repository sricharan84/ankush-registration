angular.module('UserService', [])
	.factory('userService', ['$http',function($http) {

		var params = {
						transformRequest: angular.identity,
						headers: {
							'Content-type': undefined
						}
					};

		return {
			get : function() {
				return $http.get('/api/todos');
			},
			registerUser : function(userData) {
				return $http.post('/api/register', userData, params);
			},
			validateUser : function(AadharNumber) {
				//TODO: check if the user is already registered based on the Aadhar number
			}
		}
	}]);