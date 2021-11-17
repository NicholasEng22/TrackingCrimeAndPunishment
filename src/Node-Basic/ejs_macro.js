const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync('../../resources/IncarcerationData.json' "utf8");
let index_template = fs.readFileSync('index.ejs', 'utf8');

let macroSummaryTable = {};

state_info.forEach(function(state) {
  if ((state["year"] == "year") || state["year"] == "2016") {
    macroSummaryTable.push(state);
  }
});



let index_html = ejs.render(index_template, {
  filename: __dirname + 'index.ejs',
  data: JSON.parse(state_info)
});

fs.writeFileSync('ejsMacro.html', index_html, 'utf8');
