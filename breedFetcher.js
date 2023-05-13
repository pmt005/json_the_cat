const request = require('request');


const fetchBreedDescription = (breed, callback) => {
  let url = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;
  
  request(url, (error, response, body) => {
    

    //FILTER TOWARD THE HAPPY PATH WITH TRUTHY FALSY
    if (!error) {
      //BAD statusCODE
      if (response.statusCode !== 200) {
        return callback(`Trouble connecting expected status code 200 received ${response.statusCode}`);
      }

      //No body data sent to client
      if (!body) {
        return callback(`No body data sent to client`);
      }
      let catPages = JSON.parse(body); //This is actually an array where the first element is an obj body
      
      //breed not found
      if (catPages[0] === undefined) {
        return callback(`Trouble finding that breed, you searched ${breed} and it wasn't found`);
      }
    
      //HAPPY PATH HAPPY PATH HAPPY PATH
      return callback(null, catPages[0].description);
    }

    //request error
    return callback(error);
    
  });
};



module.exports = { fetchBreedDescription };