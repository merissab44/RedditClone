const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('home');
});

app.listen(3000);
