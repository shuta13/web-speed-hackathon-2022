"use strict";

const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

const BLACKLIST = ["@types/lodash", "modern-css-reset", "assert", "buffer"];

const ps = function (names, id) {
  console.log(`--- ${id} package size ---`);
  shell.exec(
    `yarn dlx package-size ${names
      .filter((name) => !BLACKLIST.includes(name))
      .join(" ")}`,
  );
};

(function () {
  const target = path.resolve(__dirname, "../package.json");
  const file = fs.readFileSync(target);
  const packageJson = JSON.parse(file);

  const depNames = Object.keys(packageJson.dependencies);
  const devDepNames = Object.keys(packageJson.devDependencies);

  ps(depNames, "dependencies");
  ps(devDepNames, "devDependencies");
})();
