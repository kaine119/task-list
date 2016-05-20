var app = angular.module("toDo", ['ngMaterial']);

app.config(function($mdThemingProvider){
	$mdThemingProvider.theme('default')
		.primaryPalette("blue-grey")
		.accentPalette('orange')
})