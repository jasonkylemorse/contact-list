// file: controller.js
// author: Jason Morse
// date: December 28, 2015

// connect the angular application/controller to the HTML document
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	// route GET request through server to obtain database info
	// on success, add the retrieved information to the scope
	var refresh = function() {
		$http.get('/contactlist').success(function (response) {
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	// initial refresh to populate the table
	refresh();

	// route POST request through server to add a contact to the db
	$scope.addContact = function() {
		$http.post('/contactlist', $scope.contact).success(function (response) {
			refresh();
		});
	};

	// route DELETE request through server to remove a contact from the db (pass ID of the contact)
	$scope.remove = function (id) {
		$http.delete('/contactlist/' + id).success(function (response) {
			refresh();
		});
	};

	// upon edit request, send server a GET request and populate textfields with corresponding info (record is now in the scope)
	$scope.edit = function (id) {
		$http.get('/contactlist/' + id).success(function (response) {
			$scope.contact = response;
		});
	};

	// route PUT request through server to update information for the contact in the scope
	$scope.update = function () {
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
			refresh();
		});
	};

	// clear all textfields
	$scope.deselect = function () {
		$scope.contact = '';
	};

}]);