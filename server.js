
var express = require('express');
var app = express();
var port = process.env.PORT || 80;
// var client = require('twilio')('AC865ec649a1314b3ddf4d064ad71a0310', '34c061a68f84bfed2ee2fa51e7fe33b3');

var path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
// var upload = multer({ dest: './uploads' });
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);


var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);
require('./server/config/passport.js')(passport);


app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname + '/client', 'views'));


app.use(express.static(__dirname + '/client'));
app.use(multer({dest: './uploads/'}).single('file'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true,
				 store: new MongoStore({ mongooseConnection: mongoose.connection,
				 							ttl: 2 * 24 * 60 * 60 })}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// app.get('/testtwilio', function(req, res){
//     client.sendSms({
//       to: '+16047272498',
//       from: '+16043300506',
//       body: 'Hello World from twilio telecom service - jungyasu.com -'
//     }, function(err, data){
//       if(err)
//         console.log(err);
//       console.log(data);
//       res.send("Message Sent");
//     });
//   }); 

// app.get('/', function(req, res){
//     res.render('index.ejs');
//   });

// var public_router = express.Router();
// require('./app/routes/public.js')(public_router);
// app.use('/public', public_router);

var api = express.Router();
require('./server/routes/api.js')(api, passport);
app.use('/api', api);

var auth = express.Router();
require('./server/routes/auth.js')(auth, passport);
app.use('/auth', auth);

var secure = express.Router();
require('./server/routes/secure.js')(secure);
app.use('/', secure);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  //Test messages by sending a message every 1 second.
  var i = 0;
  setInterval(function(){
  	socket.emit('message', {
  		message: i
  	});
  	i++;
  }, 1000);
});



// app.listen(port);
// console.log('Server running on port: ' + port);

http.listen(port, function(){
  console.log('listening on *: ' + port);
  console.log(process.env.PORT);
});


