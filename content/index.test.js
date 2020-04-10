const fs = require("fs");
const path = require("path");

const clients = require("./clients").get();
const posts = require("./posts").get();
const projects = require("./projects").get();
const team = require("./team").get();

test("clients", () => {
  expect(clients).toHaveLength(30);
});

test("posts", () => {
  expect(posts).toHaveLength(16);
});

test("posts content", () => {
  return new Promise((done) => {
    fs.readdir(path.join(__dirname, "/../content/markdown"), (err, files) => {
      expect(files).toHaveLength(posts.length);
      done();
    });
  });
});

test("projects", () => {
  expect(Object.keys(projects)).toHaveLength(15);
});

test("team", () => {
  expect(team).toHaveLength(34);
});
