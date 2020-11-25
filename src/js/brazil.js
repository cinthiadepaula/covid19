const request = require('request');

const options = {
  method: 'GET',
  url: 'https://covid19-brazil-api.now.sh/api/report/v1/'
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
      
       

       for(let i = 0; i < body.length; i ++ ){
         console.log(body)
       }
})
}

Cases()