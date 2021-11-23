const fs = require('fs');

fs.rmdirSync("../build", {recursive: true});

fs.mkdirSync("../build");


fs.mkdirSync("../build/states");
