const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let questions = [];

//url request
const getData = (url) =>{
  request(url, function (error, response, html) {
    if (!error) {
      console.log(html);
    }
  });  
}

export default getData;
