let d3Data = [];
let csv_url = "../resources/crime_and_incarceration_by_state_data.csv"; //"https://raw.githubusercontent.com/NicholasEng22/TrackingCrimeAndPunishment/main/resources/crime_and_incarceration_by_state_data.csv?token=AOVV4RRWZVUKRTXFCI63DB3BTJ7HS"

function generateMap() {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    let crimeSelect = document.querySelector("#crime-select");
    let yearSelect = document.querySelector("#year-select").value;

    let rowsData = d3Data.filter(function(row) {
      return yearSelect === "all" || yearSelect == row['year'];
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
        title: 'All Prison',
        geo:{
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'
        }
    };
    console.log("running");
    Plotly.newPlot("mapDiv", data, layout, {showLink: false});
}

function generatePie(){
  var data = [{
    values: [25, 75],
    labels: ['Violent Crime', 'Property Crime'],
    type: 'pie'
  }];

  var layout = {
    title: 'Types of Crime in State',
    height: 500,
    width: 700
  };

  Plotly.newPlot('pie', data, layout);
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

function generatePlots() {
  if(d3Data.length === 0 ) {
    d3.csv(csv_url, function(err, rows){
      d3Data = rows;
      generateMap();
      // generatePie();
      // generateBar();
    });
  } else {
    generateMap();
    // generatePie();
    // generateBar();
  }
}

generatePlots();
