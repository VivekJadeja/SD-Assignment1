var express = require('express');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var db = require('./server/db.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//used to get the correct directory which is the root directory 
app.use(express.static(path.join(__dirname, './')));

//allows us to use data send from html forms using req.body.name
app.use(express.urlencoded({ extended: false }));

//each user has a different session so we can keep track of them no matter where they are on the site
app.use(session({secret: "SecretKey"}));

//redefine views folder to the right path
app.set('views', path.join(__dirname, './views'));

function user(email, f_name, has_requested_quote)
{
    this.email = email;
    this.f_name = f_name;
    this.has_requested_quote = has_requested_quote;
}

// ----------------------------- ROUTES -------------------------------- //
// home page
app.get('/', function(req, res){
    res.sendFile('index.html');
});

// new customers sign up form
app.get('/signup', function(req, res){
    if(req.session.user)
        res.render('errorPage', {message: "You are already signed up"});
    else
        res.sendFile(path.join(__dirname, 'views/signup.html'));
});

app.post('/signup', function(req, res){
    var data = {
        email : req.body.email,
        password : req.body.password 
    };
    db.signUp(data, function(err)
    {
        if(err)
            res.render('errorPage', {message: "Something went wrong. Please try again"});
        else
            res.redirect('/login');
    });
});

app.get('/login', function(req, res){
    if(req.session.user)
        res.render('errorPage', {message: "You are already logged in"});
    else
        res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.post('/login', function(req, res){

});


app.get('*', function(req, res){
    res.render('errorPage', {message: "This page doesn't exist"});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
