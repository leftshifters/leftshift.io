
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var compression = require('compression');
var errorHandler = require('errorhandler');

var projects = require('./projects').get();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))
app.use(logger('dev'))
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression());

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler())
}

app.get('/', routes.index);
app.get('/love', routes.love);
app.get('/sitemap.xml', routes.sitemap);

for(x in projects) {
	app.get(projects[x].url, routes.projectCaseStudy);
}

app.get('/blog', routes.blog);
app.get('/blog/', routes.blog);
app.get('/blog/:page', routes.blog);
app.get('/tag/:tag', routes.tags);
app.get('/tag/:tag/', routes.tags);
app.get('/tag/:tag/:page', routes.tags);
app.get('/:post', routes.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
