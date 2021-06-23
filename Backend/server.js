const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const fs = require('fs');

const cookieSession = require('cookie-session');
const LocalStrategy = require('passport-local').Strategy
//mapování rout
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});



// parse requests of content-type: application/json


// parse requests of content-type: application/x-www-form-urlencoded
app.use(passport.initialize());


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



app.use(passport.initialize());
app.use(passport.session());




require("./routes/categories.routes")(app);
require("./routes/subCategories.routes")(app);
require("./routes/product.routes")(app);
require("./routes/attributes.routes")(app);
let users = [
    {
        id: 1,
        name: "Jude",
        email: "user@email.com",
        password: "h"
    }];

app.post("/api/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, "Cannot log in", info])
        }

        req.login(user, (err) => {
            res.send("Logged in")
        })
    })(req, res, next)
})

app.get('/api/logout', function(req, res){
    req.logout();
    console.log("logged out")
    return res.send();
});



passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        let user = users.find((user) => {
            return user.email === username && user.password === password
        })

        if (user) {
            done(null, user)
        } else {
            done(null, false, {message: 'Incorrect username or password'})
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    let user = users.find((user) => {
        return user.id === id
    })

    done(null, user)
})


app.get('/settingsJson/:category',function(req,res){
    fs.readFile(req.params.category+'.json', 'utf8', function (err,data) {
        if (err) {
            res.status(404).send({message:err.message ||"data not found"});
            return console.log(err);
        }
        res.send(data);
    });
})

app.post('/settingsJson',function(request,response){
response.send(request.body);
var receivedData = request.body;
let data = JSON.stringify(receivedData);
fs.writeFile(receivedData.category.toString()+'.json',data,(err => {
    if(err){throw err;}
    console.log("data saved");})
)
});

// simple route

app.get("/", (req, res) => {
    res.json({ message: "Welcome to api " });
});

// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});