module.exports = function(app,port){
var messages = [];
var io = require('socket.io').listen(app.listen(port))
io.sockets.on('connection',function(socket){
	socket.emit('connected');
	socket.on('getAllMessages',function(){
		if(messages.length>10)messages=[];
		socket.emit('allMessages',messages)
	})
	socket.on('createMessage',function(message){
		messages.push(message)
		socket.emit('messageAdded',message)
	})
})
}