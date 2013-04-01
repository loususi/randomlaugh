module.exports = {
  environment : "development",
  twilio : {
    production : {
      account_sid : "ACb6254063b085751ec6d90eb22934fe7d",
      auth_token : "b32287b15bc876d3aeb8baf369f0775c",
      number : "+16179342282"
    },
    development : {
      account_sid : "ACb6254063b085751ec6d90eb22934fe7d",
      auth_token : "b32287b15bc876d3aeb8baf369f0775c",
      number : "+16179342282"
    },
   test : {
     account_sid : "AC58edc13ad7c0014fbc5d97d20016d56f",
     auth_token : "d9ae246c11dc81a25e6956968ea8b8c7",
     number : "+15005550000"
   }
 },
 domain : {
   production : "http://randomlaugh.herokuapp.com",
   development : "http://randomlaugh-dev.herokuapp.com"
 }
}