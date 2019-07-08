const request = require('request');

const forecast = (latitude, longitude, cb) => {
    const darkskyUrl = 'https://api.darksky.net/forecast/1e93fceafa8e03fd97319032999b810e/'+latitude+','+longitude+'?lang=pl';
    request({ url: darkskyUrl, json: true}, (err, { body }) => {
        if(err){
            cb('unable to connect to weather service', undefined);
        }else if(body.error){
            cb('unable to find location', undefined);
        }else{
            cb(undefined, {
                data: body.daily.data[0].summary
            });
        };
    });
};

module.exports = forecast;