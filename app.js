
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

var projects = require('./projects').get();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
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
