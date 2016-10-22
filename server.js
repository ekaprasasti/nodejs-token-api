/*
	# The Actual Node Application (server.js)

	In this file, we will:

	Grab All the Packages This will include the packages we installed earlier (express, body-parser, morgan, mongoose, and jsonwebtoken) and also we’ll be grabbing the model and config that we created.

	Configure Our Application We will set our important variables, configure our packages, and connect to our database here.

	Create Basic Routes These are the unprotected routes like the home page (http://localhost:8080). We’ll also create a /setup route here so that we can create a sample user in our new database.

	Create API Routes This includes the following routes:

	POST http://localhost:8080/api/authenticate Check name and password against the database and provide a token if authentication successful. This route will not require a token because this is where we get the token.
	GET http://localhost:8080/api Show a random message. This route is protected and will require a token.
	GET http://localhost:8080/api/users List all users. This route is protected and will require a token.
	With those things in our mind, let’s start our server.js file:
*/

// get package we need
var express		= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var morgan		= require('morgan');
var mongoose	= require('mongoose');

var jwt 		= require('jsonwebtoken');		// used to create, sign, and verify tokens
var config 		= require('./config');			// get our config file
var User 		= require('./app/models/users');	// get our mongoose model

// configuration
var port = process.env.PORT || 8080;	// used to create, sign, and verify tokens
mongoose.connect(config.database);		// connect to database
app.set('superSecret', config.secret);	// secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log request to the console
app.use(morgan('dev'));

// routes
app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// create a sample user
app.get('/setup', function(req, res) {

	// create a sample user
	var nick = new User({
		name: 'Eka Prasasti',
		password: 'password',
		admin: true
	});

	// save the sample user
	nick.save(function(err) {
		if (err)
			throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});

	/*
		Go ahead and visit your application at http://localhost:8080/setup. You should see the message ‘User saved successfully’ logged to your console and the JSON object with { success: true } in your browser.
	*/
});

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

	// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user){
		if (err)
			throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		}
		else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			}
			else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 1440 // expired in 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

	// check header or url parameters or post parameters for tokes
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			}
			else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	}
	else {

		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

















