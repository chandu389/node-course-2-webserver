const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+"/views/partials");

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `Date : ${now} : ${req.method} ${req.url} `
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) => {
        console.log('testing..');
    });
    next();
});

// app.use((req,res,next) => {
//     res.render("maintenance.hbs",{
//
//     });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
    res.render("home.hbs",{
        pageTitle : 'About Page',
        welcomeMsg: 'Welcome Chandra'
    });
});

app.get('/about',(req,res) => {
    res.render("about.hbs",{
        pageTitle : 'About Page',
    });
});

app.listen(port,() => {
    console.log(`Server is up on ${port}`);
});
