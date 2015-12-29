var client = require('twilio')('AC865ec649a1314b3ddf4d064ad71a0310', '34c061a68f84bfed2ee2fa51e7fe33b3');

module.exports = function(router){
	//localhost:8080/auth/
	router.get('/', function(req, res){
		res.render('index.ejs');
	});

	router.get('/testtwilio', function(req, res){
		client.sendMessage({
			to: '+16047272498',
			from: '+16043300506',
			body: 'Hello World from twilio telecom service - jungyasu.com -'
		}, function(err, data){
			if(err)
				console.log(err);
			console.log(data);
			res.send("Message Sent");
		});
	});	
	
};
