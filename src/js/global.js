const config = {
    method: "get",
    url: "https://api.covid19api.com/summary",
    headers: {},
  };
  function country() {
    axios(config)
      .then(function (response) {
        const Countries = [];
        for (Country of response.data.Countries) {
          Countries.push(Country);
        }
        map(Countries);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  country();
  
  const map = (country) => {
    google.charts.load("current", {
      packages: ["geochart"],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
      const data = new google.visualization.DataTable();
      data.addColumn("string", "Pais");
      data.addColumn("number", "Confirmados");
      data.addColumn("number", "Mortos");
      country.forEach((e) => {
        data.addRows([[e.Slug, e.TotalConfirmed, e.TotalDeaths]]);
      });
  
      let options = {
        colorAxis: { colors: ["#FA8072", "#800000"] },
        width:'350'
      };
      let chart = new google.visualization.GeoChart(
        document.getElementById("regions")
      );
      chart.draw(data, options);
    }
  };
  