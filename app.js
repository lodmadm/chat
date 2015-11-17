
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var routes = require('./routes')
var socket = require('./socket')
// var parseSignedCookie = require('connect').utils.parseSignedCookie
var MongoStore = require('connect-mongo')(express)
var Cookie = require('cookie')
var sessionStore = new MongoStore({
	url:'mongodb://localhost/chat'
})
var app = express();

// all environments
var port =  process.env.PORT || 80;
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret:'chat',
	cookie:{
		maxAge:60*1000
	},
	store:sessionStore
}));
// var io = require('socket.io').listen(app.listen(port))
// io.set('authorization',function(handshakeData,accept){
// 	handshakeData.cookie = Cookie.parse(handshakeData.headers.cookie)
// 	var connectSid = handshakeData.cookie['connect.sid']
// 	connectSid = parseSignedCookie(connectSid,'chat')

// 	if(connectSid){
// 		sessionStore.get(connectSid,function(error,session){
// 			if(error){
// 				accept(error.message,false)
// 			}else{
// 				handshakeData.session = session
// 				if(session._userId){
// 					accept(null,true)
// 				}else{
// 					accept('No login')
// 				}
// 			}
// 		})
// 	}else{
// 		accept('No session')
// 	}
// })

routes(app)
socket(app,port)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + port);
});
