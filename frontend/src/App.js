import { useEffect, useState } from "react";
import { Row, Col, Alert, Spin } from "antd";
import Datamap from "datamaps";
import { geoPath, geoMercator } from "d3-geo";
import cityCaseRatios from "./data/cityCaseRatios";
import { getCaseRatio } from "./api/GetCaseRatio";
import StatisticComponent from "./components/Statistic";
import "./App.css";

function App() {
  const [mapData, setMapData] = useState({});
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const topographyURL =
    "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/98285c0bc21a799ac74e2994b5374d4e916a4535/turkey.topo.json";

  useEffect(() => {
    handleCaseRatios("https://covid-turkey-case-ratio.herokuapp.com/");
  }, []);

  const handleCaseRatios = (url) => {
    setLoading(true);
    getCaseRatio(url)
      .then((data) => {
        const result = cityCaseRatios.map((cityCaseRatio) => {
          const findCity = data.find(
            (cityCovid) =>
              cityCovid.cityName.toLocaleLowerCase() ===
              cityCaseRatio.name.toLocaleLowerCase()
          );
          if (findCity) {
            cityCaseRatio["caseRatio"] = findCity.cityCaseRatio;
            return cityCaseRatio;
          }
        });
        setCities(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let lastMapData = {};

    getTurkeyTopology(topographyURL).then((res) => {
      res.objects.collection.geometries.forEach((geometry) => {
        const findCity = cities.find(
          (city) =>
            city.name.toLowerCase() === geometry.properties.name.toLowerCase()
        );
        if (findCity) {
          const resultObject = {};
          const caseCountDaily = Math.round(
            ((findCity.population / 100000) * findCity.caseRatio) / 7
          );
          const caseCountWeekly = Math.round(
            (findCity.population / 100000) * findCity.caseRatio
          );
          if (findCity.caseRatio <= 10) {
            resultObject[geometry.id] = {
              fillKey: "Düşük Risk",
              caseCount: caseCountDaily,
              caseCountWeekly: caseCountWeekly,
              caseRatio: findCity.caseRatio,
              name: geometry.properties.name,
            };
          } else if (findCity.caseRatio > 10 && findCity.caseRatio <= 35) {
            resultObject[geometry.id] = {
              fillKey: "Orta Risk",
              caseCount: caseCountDaily,
              caseCountWeekly: caseCountWeekly,
              caseRatio: findCity.caseRatio,
              name: geometry.properties.name,
            };
          } else if (findCity.caseRatio > 35 && findCity.caseRatio < 100) {
            resultObject[geometry.id] = {
              fillKey: "Yüksek Risk",
              caseCount: caseCountDaily,
              caseCountWeekly: caseCountWeekly,
              caseRatio: findCity.caseRatio,
              name: geometry.properties.name,
            };
          } else {
            resultObject[geometry.id] = {
              fillKey: "Çok Yüksek Risk",
              caseCount: caseCountDaily,
              caseCountWeekly: caseCountWeekly,
              caseRatio: findCity.caseRatio,
              name: geometry.properties.name,
            };
          }
          lastMapData = { ...lastMapData, ...resultObject };
        }
      });
      setMapData(lastMapData);
    });
  }, [cities]);

  useEffect(() => {
    createMap();
  }, [mapData]);

  const createMap = () => {
    if (mapData !== undefined && Object.keys(mapData).length > 0) {
      const map = new Datamap({
        scope: "collection",
        height: 600,
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
          dataUrl: topographyURL,
          highlightBorderColor: "#1B888C",
          borderColor: "gray",
          highlightFillColor: "#1B888C",
          popupTemplate: function (geography, data) {
            return `<div class="hoverinfo">
                <div style='text-align:center; font-weight: 600; color:#1B888C; font-size: 18px'>${data.name}</div>
                <div><strong>Günlük Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 16px'>${data.caseCount}</span></div>
                <div><strong>Haftalık Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 16px'>${data.caseCountWeekly}</span></div>
                <div><strong>Haftalık Vaka Oranı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 16px'>${data.caseRatio}</span></div>
              </div>`;
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

  return (
    <>
      <Row gutter={[16, 16]} align="middle" justify="center">
        <h1 style={{ color: "#1B888C" }}>Türkiye Vaka Risk Haritası</h1>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div id="container"></div>
          </Col>
        </Row>
      </Spin>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: 16,
          width: "100%",
        }}
      >
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <StatisticComponent cities={cities} />
          </Col>
          <Col span={24}>
            <Alert
              showIcon
              type="info"
              message="Vaka sayıları illerin 2020 yılı nüfus sayısı dikkate alınarak belirlenmiştir."
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default App;