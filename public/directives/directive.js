angular.module('chatApp.directive',[])
.directive('ctrlEnterBreakLine',function(socket){
	return function(scope,element,attrs){
		var ctrlDown = false;
		element.bind('keydown',function(e){
			if(e.which === 17){
				ctrlDown = true;
				setTimeout(function(){
					ctrlDown = false;
				},1000)
			}
			if(e.which ===13){
				if(ctrlDown){
					element.val(element.val()+'\n')
				}else{
					scope.$apply(function(){
						scope.$eval(attrs.ctrlEnterBreakLine)
						socket.emit('getAllMessages');
					})
				}
			}
		})
	}
})
.directive('windowHeight',function(){
	return function(scope,element,attrs){
		element.css({
			'height':'300px',
			'overflow-y':'scroll'
		})
	}
})
.directive('autoScrollToBottom',function(){
	return {
		link:function(scope,element,attrs){
			scope.$watch(function(){
				return element.children().length;
			},function(){
				element.animate({
					scrollTop:element.prop('scrollHeight')
				})
			})
		}
	}
})