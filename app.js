
/**
 * Module dependencies.
 */

var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');
// var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.engine('html', consolidate.handlebars);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var user = "gregbenner",
    story_slug = "first-story";

// public api for now
var api_key = "";
var username = "";
var _token = "";

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req,res) {

  superagent.get("http://api.storify.com/v1/stories/" + user + "/" + story_slug)
    .query({
      api_key: api_key,
      username: username,
      _token: _token
    })
    .set({
      Accept: 'application/json'
    })
    .end(function(e, storifyResponse){
      //if(e) next(e);
      return res.render('index', storifyResponse.body.content);
    });
  
});

//app.listen(3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
