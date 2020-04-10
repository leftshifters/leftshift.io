const marked = require("marked");
const fs = require("fs");
const _ = require("underscore");

const posts = require("../content/posts");
const clients = require("../content/clients");
const projects = require("../content/projects").get();
const team = require("../content/team").get();

exports.healthcheck = (req, res) => {
  const healthCheckResponse = {
    status: "UP",
  };
  res.status(200).json(healthCheckResponse);
};

exports.index = (req, res) => {
  res.render("index", {
    title: "LeftShift | we create loveable apps for ios, android and the web",
    description:
      "Leftshift helps clients create loveable mobile applications for iOS, Android and the web",
    clients: clients.get(),
    projects,
    team,
  });
};

exports.sitemap = (req, res) => {
  res.render("sitemap");
};

exports.blog = (req, res) => {
  let { page } = req.params;
  if (_.isUndefined(page)) page = 1;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(page)) res.redirect("/blog");
  if (page < 0) res.redirect("/blog");

  const articlesPerPage = 8;
  const startPostNumber = (page - 1) * articlesPerPage;

  let previous = "";
  let next = "";

  if (page > 0) next = Number(page) + 1;
  if (page > 1) previous = Number(page) - 1;

  const tempPosts = posts.get().slice();
  const list = tempPosts.splice(startPostNumber, articlesPerPage);

  if (list.length < articlesPerPage) next = "";

  if (_.isEmpty(list)) {
    res.render("404");
  } else {
    res.render("bloghome", {
      posts: list,
      title: `Home | Page ${page}`,
      description: "The leftshift blog",
      next,
      previous,
    });
  }
};

exports.post = (req, res) => {
  const tempPosts = posts.get().slice();
  const post = _.find(tempPosts, (selected) => {
    return selected.slug === req.params.post;
  });

  if (!_.isEmpty(post)) {
    fs.readFile(
      `${__dirname}/../content/markdown/${post.file}`,
      "utf8",
      (err, data) => {
        // eslint-disable-next-line no-console
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
      }
    );
  } else {
    res.render("404");
  }
};

exports.tags = (req, res) => {
  const { tag } = req.params;

  let { page } = req.params;
  if (_.isUndefined(page)) page = 1;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(page)) res.redirect("/blog");
  if (page < 0) res.redirect("/blog");

  const articlesPerPage = 4;
  const startPostNumber = (page - 1) * articlesPerPage;

  let previous = "";
  let next = "";

  if (page > 0) next = Number(page) + 1;
  if (page > 1) previous = Number(page) - 1;

  let tempPosts = posts.get().slice();
  tempPosts = _.filter(tempPosts, (post) => {
    const indexOf = _.indexOf(post.tags, tag);
    return indexOf >= 0;
  });
  const list = tempPosts.splice(startPostNumber, articlesPerPage);

  if (list.length < articlesPerPage) next = "";

  if (_.isEmpty(list)) {
    res.render("404");
  } else {
    res.render("taghome", {
      tag,
      posts: list,
      title: `Home | Page ${page}`,
      description: "The leftshift blog",
      next,
      previous,
    });
  }
};

exports.love = (req, res) => {
  res.render("love", {
    title:
      "What has love got to do with making apps? | LeftShift | we create loveable apps for ios, android and the web",
    description:
      "There is only one way to make amazing software. Love is what turns a good app into a piece of art.",
  });
};

// Create pages for each projects
exports.projectCaseStudy = (req, res) => {
  let thisProject = {};
  const keys = Object.keys(projects);
  keys.forEach((project) => {
    // We don't have trailing backslash, I'm just too lazy
    if (projects[project].url === req.url) {
      thisProject = projects[project];
      res.render("project", thisProject);
    }
  });
};
