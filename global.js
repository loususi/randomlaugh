module.exports = {
  environment : "development",
  twilio : {
    production : {
      account_sid : "AC32a3c49700934481addd5ce1659f04d2",
      auth_token : "b32287b15bc876d3aeb8baf369f0775c"
    },
    development : {
      account_sid : "AC32a3c49700934481addd5ce1659f04d2",
      auth_token : "b32287b15bc876d3aeb8baf369f0775c"
    },
   test : {
     account_sid : "AC58edc13ad7c0014fbc5d97d20016d56f",
     auth_token : "d9ae246c11dc81a25e6956968ea8b8c7"
   }
 },
 domain : {
   production : "http://randomlaugh.herokuapp.com",
   development : "http://localhost:3000"
 }
}