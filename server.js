require('dotenv').config(); 
const express = require('express')
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
const app = express()

const {engine} = require('express-handlebars');

app.use(cookieParser());
app.use(checkAuth);
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        ifeq: (one, two, options) => {
            if (one === two) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

require('./controllers/posts')(app);
require('./data/reddit-db');
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
// require('./controllers/replies.js')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
}); 

module.exports = app;