const request = require('request');
const inputArg = process.argv.slice(2);
let url = `https://api.thecatapi.com/v1/breeds/search?q=`;

const breedFetcher = () => {
  request(url + inputArg[0], (error, response, body) => {
    if (error) {
      console.log('error: ', error); // Print the error if one occurred
      console.log('statusCode: ', response && response.statusCode);
      return;
    }

    const dataObj = JSON.parse(body); //This is actually an array where the first element is an obj body
    
    //This conditional captures invalid input
    if (dataObj[0] === undefined) {
      console.log("invalid input, breed not found");
      return;
    }

    console.log(dataObj[0].description);
  });
};

breedFetcher();

