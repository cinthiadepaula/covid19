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

async function dados(){
  try{
    const result = await axios.get('https://covid19-brazil-api.now.sh/api/report/v1/brazil');
    const dados = result.data;
    const covid_data = dados.data;
    const cases = document.getElementById('cases');
    const deaths = document.getElementById('deaths');
    const recupered = document.getElementById('recupered')
    cases.innerHTML = covid_data.confirmed.toLocaleString();
    deaths.innerHTML = covid_data.deaths.toLocaleString();
    recupered.innerHTML = (covid_data.recovered).toLocaleString();

  }catch(err){
    console.log(err)
  }
}

dados()

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
        resolution: 'provinces',
        backgroundColor: 'transparent',
        width:'375'
        
      };
      
      let chart = new google.visualization.GeoChart(
        document.getElementById("regions_div")
      );
      chart.draw(data, options);
    }
  };