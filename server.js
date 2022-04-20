require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
// Set db
require('./data/reddit-db');


app.engine('handlebars', engine({defaultLayout: 'main'}));


app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

require('./controllers/posts')(app);
// require('./data/reddit-db');

app.get('/', (req, res) => {
    res.render('home');
})
app.get('/posts/new', (req, res) => {
    res.render('posts-new');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port 3000!')
});

module.exports = app;
