const fs = require('fs');

fs.rmdirSync("build", {recursive: true});

fs.mkdirSync("build");

fs.mkdirSync("build/src");

fs.copyFileSync("src/plotlyGenerator.js", "build/src/plotlyGenerator.js");
