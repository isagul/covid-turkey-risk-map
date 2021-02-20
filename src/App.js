import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import Datamap from "datamaps";
import { geoPath, geoMercator } from "d3-geo";
import getData from "./api/CaseRatio";
import cityCaseRatios from "./data/cityCaseRatios";
import "./App.css";

function App() {
  const [mapData, setMapData] = useState({});

  // useEffect(() => {
  //   getData('http://github.com/lydiahallie/javascript-questions');
  // }, []);

  useEffect(() => {
    let lastMapData = {};

    getTurkeyTopology(
      "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/d920e3b5416357eb32217d8f4eba2a0c37b8b944/turkey.topo.json"
    ).then((res) => {
      res.objects.collection.geometries.forEach((geometry) => {
        const findCity = cityCaseRatios.find(
          (city) =>
            city.name.toLowerCase() === geometry.properties.name.toLowerCase()
        );
        if (findCity) {
          const resultObject = {};
          const caseCountDaily = Math.round(
            ((findCity.population / 100000) * findCity.caseRatio) / 7
          );
          if (findCity.caseRatio <= 10) {
            resultObject[geometry.id] = {
              fillKey: "Düşük Risk",
              caseCount: caseCountDaily,
              name: geometry.properties.name,
            };
          } else if (findCity.caseRatio >= 11 && findCity.caseRatio <= 35) {
            resultObject[geometry.id] = {
              fillKey: "Orta Risk",
              caseCount: caseCountDaily,
              name: geometry.properties.name,
            };
          } else if (findCity.caseRatio >= 36 && findCity.caseRatio < 100) {
            resultObject[geometry.id] = {
              fillKey: "Yüksek Risk",
              caseCount: caseCountDaily,
              name: geometry.properties.name,
            };
            console.log(resultObject);
          } else {
            resultObject[geometry.id] = {
              fillKey: "Çok Yüksek Risk",
              caseCount: caseCountDaily,
              name: geometry.properties.name,
            };
          }
          lastMapData = { ...lastMapData, ...resultObject };
        }
      });
      setMapData(lastMapData);
    });
  }, []);

  useEffect(() => {
    createMap();
  }, [mapData]);

  const createMap = () => {
    if (mapData !== undefined && Object.keys(mapData).length > 0) {
      const map = new Datamap({
        scope: "collection",
        element: document.getElementById("container"),
        setProjection: function (element) {
          const projection = geoMercator()
            .center([35.6667, 39.1667]) // turkey coordinates [East Latitude, North Longitude]
            .scale(3000)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          const path = geoPath().projection(projection);
          return { path: path, projection: projection };
        },
        geographyConfig: {
          dataUrl:
            "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/13b3e0292c75d4d9380314fd766a0c63afe55d3d/turkey.topo.json",
          highlightBorderColor: "#1B888C",
          borderColor: "gray",
          highlightFillColor: "#1B888C",
          popupTemplate: function (geography, data) {
            return (
              '<div class="hoverinfo">' +
              `<h3><strong>${data.name}</strong></h3>` +
              " Günlük Vaka Sayısı:" +
              data.caseCount
            );
          },
          highlightBorderWidth: 3,
        },
        fills: {
          "Çok Yüksek Risk": "red",
          "Yüksek Risk": "orange",
          "Orta Risk": "yellow",
          "Düşük Risk": "lightblue",
          defaultFill: "#EDDC4E",
        },
        data: mapData,
      });
      map.legend();
    }
  };

  const getTurkeyTopology = async (url) => {
    return await fetch(url).then((res) => res.json());
  };

  const getTurkeyCaseRatios = async (url) => {
    return await fetch(url).then((res) => res.text());
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ textAlign: "center" }}>
        <h1>Türkiye Covid Risk Haritası</h1>
      </Col>
      <Col span={24}>
        <div id="container"></div>
      </Col>
    </Row>
  );
}

export default App;
