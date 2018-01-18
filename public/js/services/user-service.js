angular.module('UserService', [])
	.directive('capitalize', function() {
		return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function(inputValue) {
			if (inputValue == undefined) inputValue = '';
			var capitalized = inputValue.toUpperCase();
			if (capitalized !== inputValue) {
				modelCtrl.$setViewValue(capitalized);
				modelCtrl.$render();
			}
			return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]); // capitalize initial value
		}
		};
	})
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
				return $http.post('/api/validate', AadharNumber)
			}
		}
	}]);