var Controllers = require('../controllers/user')

module.exports = function(app){
app.get('/api/validate',function(req,res){
	_userId = req.session._userId
	if(_userId){
		Controllers.findUserById(_userId,function(err,user){
			if(err){
				res.json(401,{msg:err})
			}else{
				res.json(user)
			}
		})
	}else{
		res.json(401,null)
	}
})

app.post('/api/login',function(req,res){
	email = req.body.email;
	if(email){
		Controllers.findByEmailOrCreate(email,function(err,user){
			if(err){
				res.json(500,{msg:err})
			}else{
				req.session._userId = user._id
				res.json(user)
			}
		})
	}else{
		res.json(403)
	}
})

app.get('/api/logout',function(req,res){
	res.session._userId = null
	res.json(401)
})

app.use(function(req,res){
	res.sendfile('./public/index.html')
});

};