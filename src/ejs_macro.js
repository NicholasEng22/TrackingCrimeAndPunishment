const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync(__dirname +'/../resources/IncarcerationData.json', 'utf8');
let index_template = fs.readFileSync(__dirname +'/views/ejsMacro.ejs', 'utf8');
let about_template = fs.readFileSync(__dirname +"/views/about.ejs", "utf8");

let stateJSON = JSON.parse(state_info);

let macroSummaryTable = [];

stateJSON.forEach(function(state) {
  if ((state["year"] == "year") || state["year"] == "2016") {
    macroSummaryTable.push(state);
  }
});


let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/ejsMacro.ejs',
  data: macroSummaryTable
});

fs.writeFileSync('../build/index.html', index_html, 'utf8');
