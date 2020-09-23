const request = require('request-promise');
module.exports.serveBackend = async function callBackend (){
    const options = {
        uri: `http://localhost:8080/`,
        json: true,
        resolveWithFullResponse: true,
        method: 'GET'
    };

    return request(options).then((response) => {
        return response.body
    }).catch((err) => {
        console.log(err);
        console.log('Superstate:' + err.statusCode)
    })
};