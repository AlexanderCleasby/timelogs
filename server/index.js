if (process.env.DOTENV){
	console.log('Loading variables off dot env')
	require('dotenv').config()
	console.log(process.env.FOO)
}
const express = require('express');
const passportSetup = require('./config/passport')
const keys = require('./config/keys')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const passport = require('passport')
const cookiesSession = require('cookie-session')
const bodyParser = require("body-parser");


//connect to db
mongoose.connect(keys.mlab.uri,()=>{
	console.log('connected to mongo db')
	
})

app.use(cookiesSession({
	maxAge:24*60*60*1000,
	keys:[keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth-routes'))
app.use('/trackerapi', require('./routes/tracker-api'))

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send(':/')
  })



if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.use('/manifest.json', express.static(path.join(__dirname, '../build/manifest.json')))
	app.use('/favicon.ico', express.static(path.join(__dirname, '../build//favicon.ico')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/index.html'))
	})
}

app.listen(port, () => console.log(`Listening on port ${port}`));