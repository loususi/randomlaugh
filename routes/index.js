var global = require('../global');
var fs = require('fs');
var builder = require('xmlbuilder');


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

exports.laughxml = function(req, res) {
  var call_id = req.params.id;
  console.log('POST /laughxml');
  console.log(req.body);
  console.log('CALL ID: ' + call_id);

  var path = currentDirectory() + '/twilio/laugh_'+call_id.toString()+'.xml';
  console.log(path);
  fs.readFile(path, function (err, data) {
    console.log(err);
    console.log(data.toString());
    if (err) throw err;
    res.send(data.toString());
  });
  
}

// fires off request to Twilio API to call customer with random laugh track
exports.laugh = function(req, res){
  
  var number_to_call = '+' + req.query.phone;
  var twilio_xml_url = req.query.xmlurl;
  var from_name = req.query.from_name;
  
  getRandomLaugh( function(laugh) {
    var phone_message = "Hello, " + from_name + "has sent you a laugh";
    writeCallInstructions(phone_message, function(call_instructions_path) {

      var call_instructions_path = call_instructions_path != null ? call_instructions_path : global.domain[global.environment] + '/twilio/laugh.xml';
      console.log('Number to Call: ' + number_to_call);
      console.log('Laugh File: ' + laugh);
      console.log('Twilio XML URL: ' + twilio_xml_url);
      console.log("From name:" + call_instructions_path);

        // Place a phone call, and respond with TwiML instructions from the given URL
        client.makeCall({
            to: number_to_call, // Any number Twilio can call
            from: global.twilio[global.environment].number, // A number you bought from Twilio and can use for outbound communication
            url : call_instructions_path // A URL that produces an XML document (TwiML) which contains instructions for the call 
        }, function(err, responseData) {
            console.log('CALL HAS BEEN INITIATED');
            res.send({status: "success"});
        });
    });

  });
}

function getRandomLaugh(callback) {
  var path = currentDirectory() + 'laughtracks';
  fs.readdir(path, function(err, file_names) {
    //TODO handle err
    var laugh = file_names[Math.floor(Math.random()*file_names.length+1)];
    callback(laugh);
  });
}

function writeCallInstructions(phone_message, callback) {

  var call_id = Math.floor(Math.random()*10^8+1);

  //Build XML with package xmlbuilder
  var call_instructions_path = null;
  var xml = builder.create('Response')
    .ele('say', {'voice': 'woman','language':'en'}, phone_message)
    .end({ pretty: true});

  //Save XML to file\
  var file_path = currentDirectory() + 'public/twilio/test'+call_id.toString()+'.xml';
  fs.writeFile(file_path, xml, function(err) {
    var call_instructions_path = null;
      if(err) {
          console.log(err);
      } else {
          call_instructions_path = global.domain[global.environment] + '/laughxml/' + call_id.toString();
          console.log('Call Instructions Path: ' + call_instructions_path);
      }
      callback(call_instructions_path);
  }); 
}


function currentDirectory() {
  var folders = __dirname.split("/");
  var path = "";
  for(var i=0;i<folders.length-1;i++) {
    path += folders[i] + "/";
  }
  return path;
}