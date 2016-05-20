app.controller("SideNavController", ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.toggleLeft = function(){
		toggleLeftNav($mdSidenav)
	}
}]);

function toggleLeftNav($mdSidenav){
	$mdSidenav('left').toggle();
}
