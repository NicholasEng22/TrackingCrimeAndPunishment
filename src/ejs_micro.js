const fs = require('fs');
const ejs = require('ejs');

let state_info = fs.readFileSync(__dirname + '/../resources/IncarcerationData.json', 'utf8');
let index_template = fs.readFileSync(__dirname +'/views/ejsMicro.ejs', 'utf8');

let stateJSON = JSON.parse(state_info);

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

let stateObj = {
          AZ:'Arizona',
          AL:'Alabama',
          AK:'Alaska',
        AR:'Arkansas',
        CA:'California',
        CO:'Colorado',
         CT:'Connecticut',
         DE:'Delaware',
         FL:'Florida',
        GA:'Georgia',
         HI:'Hawaii',
         ID:'Idaho',
         IL:'Illinois',
         IN:'Indiana',
        IA:'Iowa',
         KS:'Kansas',
        KY:'Kentucky',
         LA:'Louisiana',
         ME:'Maine',
         MD:'Maryland',
         MA:'Massachusetts',
         MI:'Michigan',
         MN:'Minnesota',
         MS:'Mississippi',
         MO:'Missouri',
         MT:'Montana',
        NE:'Nebraska',
         NV:'Nevada',
         NH:'New Hampshire',
         NJ:'New Jersey',
         NM:'New Mexico',
         NY:'New York',
         NC:'North Carolina',
         ND:'North Dakota',
         OH:'Ohio',
         OK:'Oklahoma',
         OR:'Oregon',
        PA:'Pennsylvania',
         RI:'Rhode Island',
         SC:'South Carolina',
         SD:'South Dakota',
         TN:'Tennessee',
         TX:'Texas',
         UT:'Utah',
         VT:'Vermont',
         VA:'Virginia',
         WA:'Washington',
         WV:'West Virginia',
         WI:'Wisconsin',
         WY:'Wyoming'};

for (const state_abbrev in stateObj) {
  let stateName = stateObj[state_abbrev].toLowerCase();

  let index_html = ejs.render(index_template, {
    filename: __dirname + '/views/ejsMicro.ejs',
    state: state_abbrev,
    data: Object.values(stateObj).map((state) => {return {jurisdiction: state}}),
    northeast: northeast,
    south: south,
    midwest: midwest,
    west: west
  });

  fs.writeFileSync(("build/" + stateName + ".html"), index_html, 'utf8');
}
