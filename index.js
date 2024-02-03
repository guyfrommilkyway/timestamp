// packages
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// utils
const isUnixTimestamp = require('./utils/isUnixTimestamp');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
	const { date } = req.params;

	if (!date) {
		const now = new Date();

		res.json({ unix: now.getTime(), utc: now });

		return; // terminate function
	}

	const isValidUnix = isUnixTimestamp(+date);
	const isInvalid = isNaN(new Date(date)) && !isValidUnix;

	if (isInvalid) {
		res.json({ error: 'Invalid Date' });

		return; // terminate function
	}

	const convertedDate = isValidUnix ? new Date(date * 1000) : new Date(date);

	res.json(
		isValidUnix
			? {
					unix: date,
					utc: convertedDate.toUTCString(),
			  }
			: {
					unix: convertedDate.getTime(),
					utc: convertedDate.toUTCString(),
			  }
	);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
