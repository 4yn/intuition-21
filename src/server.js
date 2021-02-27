import sirv from 'sirv';
import express from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
var bodyParser = require('body-parser')

var session = require('express-session')

express() // You can also use Express
	.use(
		session({secret: 'ssshhhhh'}),
		bodyParser.json(),
		bodyParser.urlencoded({extended:true}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
/*

const app = express()
 
// Configures the express session.
app.use(session({secret: 'ssshhhhh'}));
 
// Setting default values and for debugging purposes
app.use(function(req, res, next) {
    console.log(req.session.user);
    console.log(req.session.refresh_token);
    if (typeof req.session.user === 'undefined') {
        req.session.user = false;
    }
    next()
})
 
// Initiates Sapper and adds the session variable to the Store.
app.use(
    sapper.middleware({
        session: (req, res) => ({
            user: req.session.user
        })
    })
)
*/