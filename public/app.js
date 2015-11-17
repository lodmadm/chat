angular.module('chatApp',['ui.router','chatApp.controller','chatApp.service','chatApp.directive'])
.run(function($window,$rootScope,$http,$location){
	$http({
		url:'/api/validate',
		method:'GET'
	}).success(function(user){
		$rootScope.me = user;
		$location.path('/')
	}).error(function(data){
		$location.path('/login')
	})
	$rootScope.logout = function(){
		$http({
			url:'/ajax/logout',
			method:'GET'
		}).success(function(){
			$rootScope.me = null
			$location.path('/login')
		})
	}
	$rootScope.$on('login',function(evt,me){
		$rootScope.me = me;
	})
})
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('room',{
		url:'/room',
		templateUrl:'tmls/room.html'
	})
	.state('login',{
		url:'/login',
		templateUrl:'tmls/login.html',
		controller:'loginCtrl'
	})
	$urlRouterProvider.otherwise('/room');
})