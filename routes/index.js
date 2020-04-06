var posts = require("../blog");
var marked = require("marked");
var fs = require("fs");
var _ = require("underscore");

var clients = require("../clients");
var projects = require("../projects").get();
var team = require("../team").get();

exports.healthcheck = function (req, res) {
  const healthCheckResponse = {
    status: "UP",
  };
  res.status(200).json(healthCheckResponse);
};

exports.index = function (req, res) {
  res.render("index", {
    title: "LeftShift | we create loveable apps for ios, android and the web",
    description:
      "Leftshift helps clients create loveable mobile applications for iOS, Android and the web",
    clients: clients.get(),
    projects: projects,
    team: team,
  });
};

exports.sitemap = function (req, res) {
  res.render("sitemap");
};

exports.blog = function (req, res) {
  var page = req.params.page;
  if (_.isUndefined(page)) page = 1;
  if (isNaN(page)) res.redirect("/blog");
  if (page < 0) res.redirect("/blog");

  var articlesPerPage = 8;
  var startPostNumber = (page - 1) * articlesPerPage;

  var previous = "";
  var next = "";

  if (page > 0) next = Number(page) + 1;
  if (page > 1) previous = Number(page) - 1;

  var tempPosts = posts.get().slice();
  var list = tempPosts.splice(startPostNumber, articlesPerPage);

  if (list.length < articlesPerPage) next = "";

  if (_.isEmpty(list)) {
    res.render("404");
  } else {
    res.render("bloghome", {
      posts: list,
      title: "Home | Page " + page,
      description: "The leftshift blog",
      next: next,
      previous: previous,
    });
  }
};

exports.post = function (req, res) {
  var tempPosts = posts.get().slice();
  var post = _.find(tempPosts, function (selected) {
    return selected.slug === req.params.post;
  });

  if (!_.isEmpty(post)) {
    fs.readFile(__dirname + "/../posts/" + post.file, "utf8", function (
      err,
      data
    ) {
      if (err) console.log(err);
      else {
        res.render(post.render, {
          title: post.title,
          description: post.description,
          author: post.author,
          date: post.date,
          data: post.prepend + marked(data) + post.append,
          tags: post.tags,
        });
      }
    });
  } else {
    res.render("404");
  }
};

exports.tags = function (req, res) {
  var tag = req.params.tag;

  var page = req.params.page;
  if (_.isUndefined(page)) page = 1;
  if (isNaN(page)) res.redirect("/blog");
  if (page < 0) res.redirect("/blog");

  var articlesPerPage = 4;
  var startPostNumber = (page - 1) * articlesPerPage;

  var previous = "";
  var next = "";

  if (page > 0) next = Number(page) + 1;
  if (page > 1) previous = Number(page) - 1;

  var tempPosts = posts.get().slice();
  tempPosts = _.filter(tempPosts, function (post) {
    var indexOf = _.indexOf(post.tags, tag);
    return indexOf >= 0;
  });
  var list = tempPosts.splice(startPostNumber, articlesPerPage);

  if (list.length < articlesPerPage) next = "";

  if (_.isEmpty(list)) {
    res.render("404");
  } else {
    res.render("taghome", {
      tag: tag,
      posts: list,
      title: "Home | Page " + page,
      description: "The leftshift blog",
      next: next,
      previous: previous,
    });
  }
};

exports.love = function (req, res) {
  res.render("love", {
    title:
      "What has love got to do with making apps? | LeftShift | we create loveable apps for ios, android and the web",
    description:
      "There is only one way to make amazing software. Love is what turns a good app into a piece of art.",
  });
};

// Create pages for each projects
exports.projectCaseStudy = function (req, res) {
  var thisProject = {};
  for (y in projects) {
    // We don't have trailing backslash, I'm just too lazy
    if (projects[y].url == req.url) {
      thisProject = projects[y];
    }
  }
  res.render("project", thisProject);
};
