const fs = require('fs');

fs.rmdirSync("build", {recursive: true});

fs.mkdirSync("build");

fs.mkdirSync("build/src");

fs.copyFileSync("src/plotlyGenerator.js", "build/src/plotlyGenerator.js");
fs.copyFileSync("resources/crime_and_incarceration_by_state_data.csvV2.csv", "build/src/crime_and_incarceration_by_state_data.csvV2.csv");
