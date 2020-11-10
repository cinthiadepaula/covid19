const request = require('request');

const options = {
  method: 'GET',
  url: 'https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/'
};

/*
request(options, (err, res, body) => {
  if (err) {
    throw new Error(err);
  }

  console.log(res.data);
});*/

function Cases(){
    request(options, (err, res, body) => {
        if (err) {
          throw new Error(err);
        }
      
       for(let estado of body){
           console.log(estado)
       }
})
}

Cases()