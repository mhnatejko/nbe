const request = require('request');

const geocode = (address, cb) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWhuYXRlamtvIiwiYSI6ImNqd2kydjVuZjAzN2wzeW81Z2NubW1haHEifQ.iQOOulGSSoZ3RDtnJSFkiQ';

    request({ url: mapboxUrl, json: true }, (err, { body }) => {
        if(err){
            cb('unable to connect to location services:', undefined);
        }else if(body.length === 0){
            cb('unable ro fine location, tru another search', undefined);
        }else{
            cb(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        };
    });
};

module.exports = geocode;