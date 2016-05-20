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
		$scope.currentTask.listID = $scope.lists[$scope.selectedIndex]._id;
		$http({
			method: "POST",
			url: "http://localhost:3000/api/post/newTask",
			data: $scope.currentTask
		})
		.then(function successCallback(res) {			
			callDoneToast($mdToast)
		}, function errorCallback(err) {
			console.error(err);
		})


		$scope.lists[$scope.selectedIndex].tasks.push($scope.currentTask);
		$scope.currentTask = {
			text: '',
			dueDate: null,
			done: false
		};

		$scope.addTaskForm.$setUntouched();
	};

	

	$scope.toggleLeft = function(){
		toggleLeftNav($mdSidenav);
	};

}]);

function callDoneToast($mdToast){
	$mdToast.show($mdToast.simple().textContent("Task saved").hideDelay(400))
}

