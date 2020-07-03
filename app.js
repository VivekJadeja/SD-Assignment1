var express = require('express');
var session = require('express-session');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var db = require('./server/db.js');
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
var functions = require('./assets/js/functions.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//used to get the correct directory which is the root directory 
app.use(express.static(path.join(__dirname, './')));

//allows us to use data send from html forms using req.body.name
app.use(express.urlencoded({ extended: false }));

//each user has a different session so we can keep track of them no matter where they are on the site
app.use(session({ secret: "SecretKey" }));

//redefine views folder to the right path
app.set('views', path.join(__dirname, './views'));

function user(email, f_name, has_requested_quote, has_filled_out_profile) {
    this.email = email;
    this.f_name = f_name;
    this.has_requested_quote = has_requested_quote;
    this.has_filled_out_profile = has_filled_out_profile;
}

// ----------------------------- ROUTES -------------------------------- //
// HOME ROUTE
app.get('/', function(req, res) {
    if (!req.session.user)
        res.sendFile(path.join(__dirname, 'main.html'));
    else if (req.session.user.has_filled_out_profile)
        res.redirect('/userHome');
    else
        res.redirect('registerProfile');
});

// LOGIN MODULE
app.get('/login', function(req, res) {
    if (req.session.user)
        res.render('errorPage', { message: "You are already logged in" });
    else
        res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.post('/login', function(req, res) {
    var data = {
        email: req.body.email,
        password: req.body.password ? passwordHash.generate(req.body.password) : undefined
    };
    //enforcing validation for email and password, making sure if they are empty or not and if the email is in right format
    if (functions.validateInput(data.email, data.password)) {
        // this function will just get required info from db (has requested quote, has filled out profile where username=email and pw = hashed pw)
        // db.loginAndGetInfo(data, function(err, info)
        // {
        //     if(err)
        //         res.render('errorPage', {message: "Something went wrong. Please try again"});
        //     else
        //     {
        //         if(!info)
        //             res.render('errorPage', { message: "The email or password is incorrect"});
        //         else
        //         {
        //             var filledOut = info.fullName == ""? false:true; //if info.FullName is equal to blank string, filledOut is false, if not, then true
        //             req.session.user = new user(data.email, info.fullName, info.historyExists, filledOut);
        //             res.redirect('/');
        //         }
        //     }
        // });
        res.redirect('/'); // DELETE THIS
    } else {
        res.render('errorPage', { message: "The email or password is incorrect" });
    }
});

app.get('/logout', function(req, res) {
    if (!req.session.user)
        res.render('errorPage', { message: "You are not logged in" });
    else {
        req.session.destroy(function() {
            res.redirect('/login');
        });
    }
});


// SIGN UP MODULE
app.get('/signup', function(req, res) {

    //validation for checking if any of fields are empty
    if (req.session.user)
        res.render('errorPage', { message: "You are already signed up" });
    else
        res.sendFile(path.join(__dirname, 'views/signup.html'));
});


app.post('/signup', function(req, res) {
    var data = {
        email: req.body.email,
        password: req.body.password ? passwordHash.generate(req.body.password) : undefined
    };
    //enforcing validation for email and password, making sure if they are empty or not and if the email is in right format
    if (functions.validateInput(data.email, data.password)) {
        // db.signUp(data, function(err)
        // {
        //     if(err)
        //         res.render('errorPage', {message: "Something went wrong. Please try again"});
        //     else
        //         res.redirect('/login');
        // });
        res.redirect('/login'); // DELETE THIS ONCE DB FUNCTIONS ARE WRITTEN
    } else {
        res.render('errorPage', { message: "Please enter a vaild email or password" });
    }
});

// checks if email exists when signing up
app.get('/emailCheck/:email', function(req, res) {
    //enforcing validation for email 
    /*     if (validateEmail(req.params.email)) {
            // db.emailCheck(req.params.email, function(err, exists){
            //     if(err)
            //         res.json({exists: true}); // might need to discuss what happens when connection to db fails
            //     else
            //         res.json({exists : exists});
            // });
        } else {
            res.render('errorPage', { message: "Please enter a vaild email or password" });
        } */
    if (req.params.email === "daniel.evans17@outlook.com")
        res.json({ exists: true });
    else
        res.json({ exists: false });
});

// PROFILE MANAGEMENT MODULE
app.get('/registerProfile', function(req, res) {
    // if(!req.session.user)
    //     res.render('errorPage', "You need to be logged in");
    // else if(req.session.user.has_filled_out_profile)
    //     res.render('errorPage', "You have already provided your information");
    // else
    res.sendFile(path.join(__dirname, '/views/registerProfile.html'));
});


app.post('/registerProfile', function(req, res) {
    var data = {
            fullName: req.body.fullName,
            address1: req.body.streetAddress1,
            address2: req.body.streetAddress2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipCode,
            email: req.session.user ? req.session.user.email : undefined
        }
        //validating the profile information of the user
    var _message = functions.validateRegisterProfile(data)
    if (_message === "true") { //hello
        // db.saveInfo(data, function(err)
        // {
        //     if(err)
        //         res.render('errorPage', {message: "Something went wrong. Please try again"});
        //      else
        //      {
        //         req.session.user.has_filled_out_profile = true;
        //         res.redirect('/userHome');
        //      }
        // });
        res.redirect('/userHome'); // DELETE THIS
    } else {
        res.render('errorPage', { message: _message });
    }
});


// FUEL QUOTE/ PRICING MODULE
app.get('/requestQuote', function(req, res) {
    // if(!req.session.user)
    //     res.render('errorPage', {message: "You need to be logged in"});
    // else
    {
        // get this data from db later
        var cuDate = new Date();
        var date = cuDate.getFullYear() + "-";
        var month = cuDate.getMonth() + 1;
        if (month.toString().length === 1)
            month = '0' + month;
        var day = cuDate.getDate();
        if (day.toString().length == 1)
            day = '0' + day;
        date += month + "-" + day;
        var customer = {
                address1: "1234 Main St",
                address2: "#100",
                city: "Houston",
                state: "TX",
                zipcode: "77089",
                cuDate: date
            }
            // db.getCustomerAddrress(req.session.user.email, function(err, info)
            // {
            //     if(err)
            //         res.render('errorPage', {message: "Something went wrong. Please try again"});
            //     else
            //     {
            //         var customer = {
            //             address1 : info.address1,
            //             address2 : info.address2,
            //             city : info.city,
            //             state : info.state,
            //             zipcode : info.zipCode,
            //             cuDate : date
            //         }
            //         res.render('quoteRequest', {customer:customer});
            //     }
            // });
        res.render('quoteRequest', { customer: customer });
    }
});


app.post('/requestQuote', function(req, res) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var data = {
        gallons: req.body.gallons,
        deliveryDate: req.body.date,
        requestedDate: data,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        price: req.body.price,
        total: Number(req.body.price) * Number(req.body.gallons)
    }
    if (functions.validQouteRequested(data.gallons, data.deliveryDate))
    // db.requestQuote(data, function(err)
    // {
    //     if(err)
    //         res.render('errorPage', {message: "Something went wrong. Please try again"});
    //     else
    //     {
    //         req.session.user.has_requested_quote = true;
    //         res.redirect('/userHome');
    //     }
    // });
        res.redirect('/userHome'); // DELETE LATER
    else {
        res.render('errorPage', { message: "Please enter all fields" });
    }
});

// QUOTE HISTORY MODULE
app.get('/userHome', function(req, res) {
    // if(!req.session.user)
    //     res.render('errorPage', {message: "You need to be logged in"});
    // else if(!req.session.user.has_filled_out_profile)
    //     res.render('errorPage', {message: "You need to be fill out your profile info"});
    // else
    {
        // get this data from db later
        // only for users 
        // db.getCustomerHistory(req.session.user.email, function(err, history)
        // {   
        //     if(err)
        //         res.render('errorPage', {message: "Something went wrong. Please try again"});
        //     else
        //     {
        //         var customer = {
        //             name : req.session.user.f_name,
        //             history : history
        //         }
        //         res.render('userHome.ejs', {customer: customer});
        //     }
        // });
        var history = [{
                gallonsRequested: 5,
                quoteDate: "06/16/2020",
                dueDate: "06/26/2020",
                address1: "1234 Main St.",
                address2: "#100",
                city: "Houston",
                state: "TX",
                zipcode: 77089,
                price: 5,
                total: 25
            },
            {
                gallonsRequested: 5,
                quoteDate: "06/16/2020",
                dueDate: "06/26/2020",
                address1: "1234 Main St.",
                address2: "#100",
                city: "Houston",
                state: "TX",
                zipcode: 77089,
                price: 5,
                total: 25
            },
            {
                gallonsRequested: 5,
                quoteDate: "06/16/2020",
                dueDate: "06/26/2020",
                address1: "1234 Main St.",
                address2: "#100",
                city: "Houston",
                state: "TX",
                zipcode: 77089,
                price: 5,
                total: 25
            }
        ];

        var customer = {
            name: "Daniel",
            history: history
        }
        res.render('userHome.ejs', { customer: customer }); // DELETE THIS LATER
    }
});

app.get('*', function(req, res) {
    res.render('errorPage', { message: "This page doesn't exist." });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
module.exports = app