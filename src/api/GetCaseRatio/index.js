const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

let cities = [];

const getCaseRatio = url => {
  request(url, function (error, response, html) {
    if (!error) {
        var $ = cheerio.load(html);
        $('.il_blocks table tbody tr').each(function(index, el){
          const cityName = $(el).children('td').first().text().trim();
          const cityCaseRatio = $(el).children('td').last().text().replace(',', '.').trim();
          cities.push({
              cityName,
              cityCaseRatio
          });
        });
        writeFile(JSON.stringify(cities));
    }
  });
}

function writeFile(data) {
  var dataFile = fs.createWriteStream("covidData.json");
  dataFile.once('open', function functionName(f) {
    dataFile.write(data);
  });
}

getCaseRatio('https://covid19.saglik.gov.tr/');