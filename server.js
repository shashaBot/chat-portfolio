require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const https = require('https')
const path = require('path')

// dialogflow init
const dialogflow = require('./dialogflow')
const dfClient = new dialogflow(process.env.GCLOUD_PROJECT)

// body-parser
app.use(bodyParser.json());

// logging
app.use(morgan('dev'));

// Whitelist owned domains or null/file domains and disallow others
var whitelist = ['null', 'file://', 'http://127.0.0.1:3000', 'http://localhost:3000'];
var corsOptions = {
	origin: function(origin, callback) {
		if (!origin) return callback(null, true);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'static')))

app.post('/api/detectTextIntent', (req, res) => {
	dfClient.detectTextIntent(req.body.text)
		.then( result => {
			res.json({success: true, result})
		})
		.catch( err => {
			console.log(err)
			res.statusMessage = err
			return res.status(500).end()
		})
})

// Start server on port in env (if given), else port 9000
const port = process.env.PORT || 9000
const server = app.listen(port, () => {
	console.log('Server started on port ' + port)
})
