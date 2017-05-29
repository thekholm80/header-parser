var express = require('express');
var app = express();

function cleanIP(ip) {
  return ip.replace(/^.*:/, '');
}

function getLanguage(request) {
  return request.headers['accept-language'].split(',')[0];
}

function getSoftware(request) {
  return request.headers['user-agent'].split('(')[1].split(')')[0];
}

function buildResponse(request) {
  var ip = cleanIP(request.connection.remoteAddress);
  var language = getLanguage(request);
  var userOS = getSoftware(request);
  var json = {
    'ipaddress': ip,
    'language': language,
    'software': userOS
  };

  return json;
}

app.set('port', (process.env.PORT || 8000));

app.get('/', function (request, response) {
  response.send(buildResponse(request));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
