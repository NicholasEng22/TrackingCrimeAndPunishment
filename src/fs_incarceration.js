const fs = require('fs');

let states = [];

let incarcerations_csv = fs.readFileSync('data/Incarceration.csv', 'utf8');

let incarcerations = incarcerations_csv.split("\n");

incarcerations.forEach(function(incarceration) {
  let state_info = incarceration.split(',');
  let state = {};
  state['jurisdiction'] = state_info[0];
  state['includes_jails'] = state_info[1];
  state['year'] = state_info[2];
  state['prisoner_count'] = state_info[3];
  state['crime_reporting_change'] = state_info[4];
  state['crimes_estimated'] = state_info[5];
  state['state_population'] = state_info[6];
  state['violent_crime_total'] = state_info[7];
  state['murder_manslaughter'] = state_info[8];
  state['rape_legacy'] = state_info[9];
  state['rape_revised'] = state_info[10];
  state['robbery'] = state_info[11];
  state['agg_assault'] = state_info[12];
  state['property_crime_total'] = state_info[13];
  state['burglary'] = state_info[14];
  state['larceny'] = state_info[15];
  state['vehicle_theft'] = state_info[16];

  states.push(state);
});

fs.writeFileSync('data/IncarcerationData.json', JSON.stringify(states), 'utf8');
