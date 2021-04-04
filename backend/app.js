const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cheerio = require("cheerio");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  request("https://covid19.saglik.gov.tr/", function (error, response, html) {
    if (!error) {    
      let cities = [];
      let dateRange = "";
      const $ = cheerio.load(html);
      $(".il_blocks table tbody tr").each(function (index, el) {
        const cityName = $(el).children("td").first().text().trim();
        const cityCaseRatio = $(el)
          .children("td")
          .last()
          .text()
          .replace(",", ".")
          .trim();
        cities.push({
          name: cityName,
          caseRatio: cityCaseRatio,
        });
      });
      $(".info_box").each(function (index, el) {
        if (index === 0) {
          dateRange = $(el).children("p").text().trim();
        }
      });
      res.send(JSON.stringify({
        dateRange: dateRange,
        cities: cities
      }));
    }
  });
});

app.get("/vaccine", (req, res) => {
  request("https://covid19asi.saglik.gov.tr/", function (error, response, html) {

    if (!error) {    
      const data = [];
      const $ = cheerio.load(html);
      $(".svg-turkiye-haritasi #turkiye g").each(function (index, el) {
        const city = $(el);
        let vaccineInfo = {
          name: city.attr("data-adi"),
          total:Number(city.attr("data-toplam").replace(".","")),
          firstDose: Number(city.attr("data-birinci-doz").replace(".","")),
          secondDose: Number(city.attr("data-ikinci-doz").replace(".","")),
        }
        data.push(vaccineInfo);
      });
      res.send(JSON.stringify({
        result: data
      }));
    }
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
