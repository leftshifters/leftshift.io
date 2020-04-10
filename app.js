/**
 * Module dependencies.
 */

const express = require("express");

const http = require("http");
const path = require("path");

const app = express();
const favicon = require("serve-favicon");
const logger = require("morgan");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const compression = require("compression");
const errorHandler = require("errorhandler");

const routes = require("./routes");
const projects = require("./content/projects").get();

// all environments
app.set("port", process.env.PORT || 8080);
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(favicon(path.join(__dirname, "/public/images/favicon.ico")));
app.use(logger("dev"));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(compression());

// development only
if (app.get("env") === "development") {
  app.use(errorHandler());
}

app.get("/healthcheck", routes.healthcheck);
app.get("/", routes.index);
app.get("/love", routes.love);
app.get("/sitemap.xml", routes.sitemap);

const keys = Object.keys(projects);
keys.forEach((project) => {
  app.get(projects[project].url, routes.projectCaseStudy);
});

app.get("/blog", routes.blog);
app.get("/blog/", routes.blog);
app.get("/blog/:page", routes.blog);
app.get("/tag/:tag", routes.tags);
app.get("/tag/:tag/", routes.tags);
app.get("/tag/:tag/:page", routes.tags);
app.get("/:post", routes.post);

http.createServer(app).listen(app.get("port"), () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${app.get("port")}`);
});
