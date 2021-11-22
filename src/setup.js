const fs = require('fs');

fs.rmdirSync("../build", {recursive: true});

fs.mkdirSync("../build");


fs.copyFileSync("about.html", "../build/about.html");
fs.copyFileSync("test.html", "../build/test.html");
fs.mkdirSync("../build/states");
