const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Bartek Bartek'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'info section'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Yourname',
        text: 'help help help help help I will help you if you will help me then i will help you more'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return req.send({
            error: 'give me an address'
        });
    };
    
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if(err){
            return req.send({ error: err });
        };

        return forecast(latitude, longitude, (error, forcastData) => {
            if(err){
                return req.send({ error: error });
            };

            res.send({
                forecast: forcastData,
                location: location,
                address: req.query.address
            });
        });
    });    
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'must provide search'
        });
    } 
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page not found'
    });
});

app.listen(port, () => {
    console.log('server is up on port' + port)
});

        // app.get('', (req, res) => {
        //     res.send('<h1>hello express</h1>');
        // });
        
        // app.get('/help', (req, res) => {
        //     res.send([{
        //         a: 1
        //     },{
        //         b: 2
        //     }]);
        // });
        
        // app.get('/about', (req, res) => {
        //     res.send('<h1>About</h1><p>its about section</p>');
        // });