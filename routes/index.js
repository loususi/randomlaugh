var global = require('../global');
var fs = require('fs');

//require the Twilio module and create a REST client
var account_sid = global.twilio[global.environment].account_sid;
console.log(account_sid);
var auth_token = global.twilio[global.environment].auth_token;
console.log(auth_token);
var client = require('twilio')(account_sid, auth_token);

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Make \'Em Laugh' });
};


// fires off request to Twilio API to call customer with random laugh track
exports.laugh = function(req, res){
  
  var number_to_call = '+' + req.query.phone;
  
  getRandomLaugh( function(laugh) {
    console.log(laugh);
  });
  
  console.log(global.twilio[global.environment].number);
  console.log(global.domain[global.environment] + '/twilio/laugh.xml');
  
  //Place a phone call, and respond with TwiML instructions from the given URL
  client.makeCall({

      to: number_to_call, // Any number Twilio can call
      from: global.twilio[global.environment].number, // A number you bought from Twilio and can use for outbound communication
      // url: global.domain[global.environment] + '/twilio/laugh.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call
      url : 'http://randomlaugh.herokuapp.com/twilio/laugh.xml'
  }, function(err, responseData) {

      //executed when the call has been initiated.
      console.log(responseData); // outputs "+14506667788"

  });
  
}

function getRandomLaugh(callback) {
  // read laughtracks
  var folders = __dirname.split("/");
  var path = "";
  for(var i=0;i<folders.length-1;i++) {
    path += folders[i] + "/";
  }
  path += 'laughtracks';
  fs.readdir(path, function(err, file_names) {
    console.log(err);
    var laugh = file_names[Math.floor(Math.random()*file_names.length+1)];
    callback(laugh);
  });
}