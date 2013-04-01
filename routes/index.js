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
  res.render('index', { title: 'Make \'Em Laugh', brand: 'Idea Squad Brain Trust' });
};

exports.laughxml = function(req, res) {
  var call_id = req.params.id;
  console.log('POST /laughxml');
  console.log(req.body);
  console.log('CALL ID: ' + call_id);

  var path = currentDirectory() + 'public/twilio/laugh_'+call_id.toString()+'.xml';
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
  var from_name = req.query.from_name;
  
  getRandomLaugh( function(laugh) {
    var phone_message = "Hello, " + from_name + " has sent you a laugh";
    var laugh_path = global.domain[global.environment] + '/laughtracks/'+ laugh;
    writeCallInstructions({phone_message: phone_message, laugh_path : laugh_path}, function(call_instructions_path) {

      var call_instructions_path = call_instructions_path != null ? call_instructions_path : global.domain[global.environment] + '/twilio/laugh.xml';
      console.log('Number to Call: ' + number_to_call);
      console.log('Laugh File: ' + laugh);
      console.log('Call Instructions Path: ' + call_instructions_path);
      console.log("Laugh Path:" + laugh_path);
      console.log("From name:" + from_name);

      if(global.environment == "production") {
        client.makeCall({
          to: number_to_call, // Any number Twilio can call
          from: global.twilio[global.environment].number, // A number you bought from Twilio and can use for outbound communication
          url : call_instructions_path // A URL that produces an XML document (TwiML) which contains instructions for the call 
        }, function(err, responseData) {
          console.log('CALL HAS BEEN INITIATED');
          res.send({status: "success"});
        });
      } else {
        res.send({status: "success"});
      }
    });
 

  });
}

function getRandomLaugh(callback) {
  var path = currentDirectory() + 'public/laughtracks';
  fs.readdir(path, function(err, file_names) {
    //TODO handle err
    var laugh = file_names[Math.floor(Math.random()*file_names.length)];
    callback(laugh);
  });
}

function writeCallInstructions(params, callback) {
  var phone_message = params.phone_message;
  var laugh_path = params.laugh_path;
  var call_id = (new Date()).getTime();

  //Build XML with package xmlbuilder
  var call_instructions_path = null;
  var xml = builder.create('Response')
    .ele('Say', {'voice': 'woman','language':'en'}, phone_message)
    .up()
    .ele('Play', laugh_path)
    .end({ pretty: true});

  //Save XML to file\
  var file_path = currentDirectory() + 'public/twilio/laugh_'+call_id.toString()+'.xml';
  fs.writeFile(file_path, xml, function(err) {
    var call_instructions_path = null;
      if(err) {
          console.log(err);
      } else {
          call_instructions_path = global.domain[global.environment] + '/laughxml/' + call_id.toString();
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