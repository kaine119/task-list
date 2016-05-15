var app = angular.module("toDo", ['ngMaterial']);

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default')
		.primaryPalette("blue-grey")
		.accentPalette('orange')
})

app.controller("TaskController", ['$scope', '$mdToast', '$mdSidenav', function($scope, $mdToast, $mdSidenav){

	$scope.lists = [
		{
			name: "Homework",
			tasks:[
				{
					text: "Do this",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "fasd",
					dueDate: new Date(2016, 04, 01),
					done: false
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				},
				{
					text: "Blah",
					dueDate: new Date(2016, 04, 01),
					done: true
				}
			],
		},
		{
			name: "Random stuff",
			tasks:[
				{
					text: "Download more ram",
					dueDate: new Date(2016, 07, 03),
					done: true
				},
				{
					text: "Ram a car",
					dueDate: new Date(2016, 08, 21),
					done: true
				},
				{
					text: "Download CSI: Cyber",
					dueDate: new Date(2016, 07, 31),
					done: false
				}
			],
		}
	];
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
	$mdToast.show($mdToast.simple().textContent("Task saved.").hideDelay(400))
}

function toggleLeftNav($mdSidenav){
	$mdSidenav('left').toggle();
}