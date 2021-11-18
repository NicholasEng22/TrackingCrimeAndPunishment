const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync('../resources/IncarcerationData.json', 'utf8');
let index_template = fs.readFileSync('views/ejsMicro.ejs', 'utf8');

let stateJSON = JSON.parse(state_info);

let microSummaryTable = [];

stateJSON.forEach(function(state) {
  if ((state["jurisdiction"] == "jurisdiction") || state["jurisdiction"] == "ALABAMA") {
    microSummaryTable.push(state);
  }
});


let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/ejsMicro.ejs',
  data: microSummaryTable
});

fs.writeFileSync('ejsMicro.html', index_html, 'utf8');
