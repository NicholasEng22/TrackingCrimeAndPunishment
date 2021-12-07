const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync(__dirname +'/../resources/IncarcerationData.json', 'utf8');
let index_template = fs.readFileSync(__dirname +'/views/ejsMacro.ejs', 'utf8');
let about_template = fs.readFileSync(__dirname +"/views/about.ejs", "utf8");

let northeast = [
  'Connecticut',
  'Maine',
  'Massachusetts',
  'New Hampshire',
  'Rhode Island',
  'Vermont',
  'New Jersey',
  'New York',
  'Pennsylvania'
];

let midwest = [
  'Illinois',
  'Indiana',
  'Michigan',
  'Ohio',
  'Wisconsin',
  'Iowa',
  'Kansas',
  'Minnesota',
  'Missouri',
  'Nebraska',
  'North Dakota',
  'South Dakota'
];

let south = [
  'Delaware',
  'Florida',
  'Georgia',
  'Maryland',
  'North Carolina',
  'South Carolina',
  'Virginia',
  'West Virginia',
  'Alabama',
  'Kentucky',
  'Mississippi',
  'Tennessee',
  'Arkansas',
  'Louisiana',
  'Oklahoma',
  'Texas'
];

let west = [
  'Arizona',
  'Colorado',
  'Idaho',
  'Montana',
  'Nevada',
  'New Mexico',
  'Utah',
  'Wyoming',
  'Alaska',
  'California',
  'Hawaii',
  'Oregon',
  'Washington'
];

let stateJSON = JSON.parse(state_info);

let macroSummaryTable = [];

stateJSON.forEach(function(state) {
  if ((state["year"] == "year") || state["year"] == "2016") {
    macroSummaryTable.push(state);
  }
});

let about_html = ejs.render(about_template, {
  filename: __dirname + '/views/about.ejs',
  data: macroSummaryTable,
  northeast: northeast,
  south: south,
  midwest: midwest,
  west: west
});

fs.writeFileSync('build/about.html', about_html, 'utf8');


let index_html = ejs.render(index_template, {
  filename: __dirname + '/views/ejsMacro.ejs',
  data: macroSummaryTable,
  northeast: northeast,
  south: south,
  midwest: midwest,
  west: west
});

fs.writeFileSync('build/index.html', index_html, 'utf8');
