define([], function() {
  var config = {};

  // Google Developer API settings
  //config.apiKey = '';
  //config.scopes = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile';
  //config.clientId = '';



  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  return config;
});