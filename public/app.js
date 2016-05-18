var app = angular.module("toDo", ['ngMaterial']);

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default')
		.primaryPalette("blue-grey")
		.accentPalette('orange')
})

app.controller("TaskController", ['$scope', '$mdToast', '$mdSidenav', '$http', function($scope, $mdToast, $mdSidenav, $http){

	$scope.lists = [];

	$http({
		method: "GET",
		url: 'http://localhost:3000/api/get/lists'
	})
	.then(function successCallback(res){
		console.log(res.data)
		$scope.lists = res.data;
	}, function errorCallback(err){
		console.error(err);
	});

	$scope.selectedIndex = 0;
	$scope.changeIndex = function(x){
		$scope.selectedIndex = x;
	};

	$scope.currentTask = {
		text: '',
		dueDate: null,
		done: false
	};

	$scope.addTask = function(){
		$scope.addTaskForm.$setPristine();
		$scope.lists[$scope.selectedIndex].tasks.push($scope.currentTask);
		$scope.currentTask = {
			text: '',
			dueDate: null,
			done: false
		};

		$scope.addTaskForm.$setUntouched();
		callDoneToast($mdToast)
	};

	$scope.addList =

	$scope.toggleLeft = function(){
		toggleLeftNav($mdSidenav);
	};

}]);

app.controller("SideNavController", ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.toggleLeft = function(){
		toggleLeftNav($mdSidenav)
	}
}])

function callDoneToast($mdToast){
	$mdToast.show($mdToast.simple().textContent("Task saved").hideDelay(400))
}

function toggleLeftNav($mdSidenav){
	$mdSidenav('left').toggle();
}
