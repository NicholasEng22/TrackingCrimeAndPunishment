const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync(__dirname + '/../resources/IncarcerationData.json', 'utf8');
let index_template = fs.readFileSync(__dirname +'/views/ejsMicro.ejs', 'utf8');

let stateJSON = JSON.parse(state_info);


let stateArray = ["ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "CALIFORNIA", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "TEXAS", "LOUISANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN"];


for (let i = 0; i < 10; i++) {
  let microSummaryTable = [];

  stateJSON.forEach(function(state) {
    if ((state["jurisdiction"] == "jurisdiction") || (state["jurisdiction"] == stateArray[i])) {
      microSummaryTable.push(state);
    }
  });

  let stateName = stateArray[i].toLowerCase();

  let index_html = ejs.render(index_template, {
    filename: __dirname + '/views/ejsMicro.ejs',
    data: microSummaryTable
  });

  fs.writeFileSync(("../build/states/" + stateName + ".html"), index_html, 'utf8');
}
