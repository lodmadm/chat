angular.module('chatApp.controller',[])
.controller('roomCtrl',function($scope,socket){
	$scope.messages = [];
	socket.emit('getAllMessages');
	socket.on('allMessages',function(messages){
		$scope.messages = messages;
	})
})
.controller('messageCreatorCtrl',function($scope,socket){
	$scope.newMessage = '';
	$scope.createMessage = function(){
		if($scope.newMessage!==''){
			socket.emit('createMessage',$scope.newMessage)
			$scope.newMessage = ''
		}
	}
})
.controller('loginCtrl',function($scope,$http,$location){
	$scope.login = function(){
		$http({
			url:'/api/login',
			method:'POST',
			data:{
				email:$scope.email
			}
		}).success(function(user){
			$scope.$emit('login',user)
			$location.path('/')
		}).error(function(data){
			$location.path('/login34')
		})
	}
})