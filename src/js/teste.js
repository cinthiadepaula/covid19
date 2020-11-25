


const config = {
    method: 'get',
    url: 'https://covid19-brazil-api.now.sh/api/report/v1/',
    headers:{}
};

function state() {
  axios(config)
    .then(function (response) {
      const data = response.data;
      const state = [];

      for (estado of data.data) {
        state.push(estado);
        console.log(estado.state)
        console.log(estado.cases)
      }
      map(state);
      
    })
    .catch(function (error) {
      console.log(error);
    });
}

state();


const map = (state) => {
    google.charts.load("current", {
      packages: ["geochart"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Estados");
      data.addColumn("number", "Confirmados");
      data.addColumn("number", "Mortes");
      
      state.forEach((e) => {
        data.addRows([[e.state, e.cases, e.deaths]]);
      });
  
      let options = {
        colorAxis: { colors: ["#FA8072", "#800000"] },
        region:'BR',
        width: 800,
        height: 500,
        resolution: 'provinces',
        background:'transparent'
      };
      let chart = new google.visualization.GeoChart(
        document.getElementById("regions_div")
      );
      chart.draw(data, options);
    }
  };