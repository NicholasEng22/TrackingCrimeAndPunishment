let d3Data = [];
let csv_url = "https://raw.githubusercontent.com/NicholasEng22/TrackingCrimeAndPunishment/main/resources/crime_and_incarceration_by_state_data.csv"; //"../resources/crime_and_incarceration_by_state_data.csv"

function generateStateData() {

}

function generateMap() {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    let crimeSelect = document.querySelector("#crime-select");
    let yearSelect = document.querySelector("#year-select").value;

    let rowsData = d3Data.filter(function(row) {
      return yearSelect === "2001-2016" || yearSelect == row['year'];
    });

    let min = rowsData.reduce(function(prev, current) {
      return parseInt(prev[crimeSelect.value]) <= parseInt(current[crimeSelect.value]) ? prev : current;
    });

    let max = rowsData.reduce(function(prev, current) {
      return parseInt(prev[crimeSelect.value]) >= parseInt(current[crimeSelect.value]) ? prev : current;
    });

    min = min[crimeSelect.value];
    max = max[crimeSelect.value];

    var data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: unpack(d3Data, 'code'),
        z: unpack(d3Data, crimeSelect.value),
        text: unpack(d3Data, 'jurisdiction'),
        zmin: min,
        zmax: max,
        colorscale: [
            [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
            [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
            [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
        ],
        colorbar: {
            title: crimeSelect.value,
            thickness: 0.2
        },
        marker: {
            line:{
                color: 'rgb(255,255,255)',
                width: 2
            }
        }
    }];


    var layout = {
        title: crimeSelect.value.toUpperCase() + ' from ' + yearSelect,
        geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        }
    };
    console.log("running");
    Plotly.newPlot("mapDiv", data, layout, {showLink: false});
}

function microCrimePieChart(){
  let yearSelect = document.querySelector("#year-select").value;
  let stateSelect = document.querySelector("#state-select").value;
  let stateData = d3Data.filter(function(row) {
    return ((yearSelect === "2001-2016" && row['year'] == "2016") || yearSelect == row['year']) && row['code'] == stateSelect;
  });
  var data = [{
    values: [stateData[0].murder_manslaughter,
        stateData[0].rape_legacy,
        stateData[0].robbery,
        stateData[0].agg_assault,
        stateData[0].burglary,
        stateData[0].larceny,
        stateData[0].vehicle_theft
      ],
    // values: [2135, 75, 2533, 5400, 242, 9003, 253, 4793],
    labels: ['Murder/Manslaughter', 'Rape', 'Robbery', 'Aggrevated Assault', 'Burglary', 'Larceny', 'Vehicle Theft'],
    type: 'pie'
  }];

  var layout = {
    title: 'Types of Crime in ' + stateSelect,
    height: 500,
    width: 700
  };

  Plotly.newPlot('microCrimePieChart', data, layout);
}

function macroCrimePieChart(){
  let yearSelect = document.querySelector("#year-select").value;
  let stateData = d3Data.filter(function(row) {
    return ((yearSelect === "2001-2016" && row['year'] == "2016") || yearSelect == row['year']) && row['code'] == 'FED';
  });
  var data = [{
    values: [stateData[0].murder_manslaughter,
        stateData[0].rape_legacy,
        stateData[0].robbery,
        stateData[0].agg_assault,
        stateData[0].burglary,
        stateData[0].larceny,
        stateData[0].vehicle_theft
      ],
    // values: [2135, 75, 2533, 5400, 242, 9003, 253, 4793],
    labels: ['Murder/Manslaughter', 'Rape', 'Robbery', 'Aggrevated Assault', 'Burglary', 'Larceny', 'Vehicle Theft'],
    type: 'pie'
  }];

  var layout = {
    title: 'Types of Crime in the US',
    height: 500,
    width: 700
  };

  Plotly.newPlot('macroCrimePieChart', data, layout);
}

function generateBar(){
  var data = [
    {
      x: ['State', 'Federal'],
      y: [60000, 800000],
      type: 'bar'
    }
  ];

  Plotly.newPlot('bar', data);
}

function generateStateCrimeBarGraphMacro(){
  let crimeSelect = document.querySelector("#crime-select").value;
  let crimeData = d3Data.reduce(function(prev, curr) {
    if(prev[curr.code] == null) {
      prev[curr.code] = {
        x: [curr.year],
        y: [curr[crimeSelect]]
      };
    } else {
      prev[curr.code].x.push(curr.year);
      prev[curr.code].y.push(curr[crimeSelect]);
    }
    return prev;
  }, {});

  let plotData = Object.keys(crimeData).map(function(state){
    let stateData = crimeData[state];
    return {
      x: stateData.x,
      y: stateData.y,
      mode: 'lines',
      name: state
    }
  });

  console.log(crimeData);
  console.log(plotData);

  Plotly.newPlot('lineBarMacro', plotData);
}

function generateStateCrimeBarGraphMicro(){
  let crimeSelect = document.querySelector("#crime-select").value;
  let stateSelect = document.querySelector("#state-select").value;
  let crimeData = d3Data.reduce(function(prev, curr) {
    if(prev[curr.code] == null) {
      prev[curr.code] = {
        x: [curr.year],
        y: [curr[crimeSelect]]
      };
    } else {
      prev[curr.code].x.push(curr.year);
      prev[curr.code].y.push(curr[crimeSelect]);
    }
    return prev;
  }, {});

  let plotData = Object.keys(crimeData).map(function(state){
    let stateData = crimeData[state];
    return {
      x: stateData.x,
      y: stateData.y,
      mode: 'lines',
      name: state
    }
  });

  plotData = plotData.filter(function(stateData){
    return stateData.name == stateSelect;
  });
  console.log("micro");
  console.log(crimeData);
  console.log(plotData);

  Plotly.newPlot('lineBarMicro', plotData);
}

function generatePlots() {
  if(d3Data.length === 0 ) {
    d3.csv(csv_url, function(err, rows){
      d3Data = rows;
      generateMap();
      microCrimePieChart();
      macroCrimePieChart();
      generateBar();
      generateStateCrimeBarGraphMacro();
      generateStateCrimeBarGraphMicro();
    });
  } else {
    generateMap();
    microCrimePieChart();
    macroCrimePieChart();
    generateBar();
    generateStateCrimeBarGraphMacro();
    generateStateCrimeBarGraphMicro();
  }
}

generatePlots();
