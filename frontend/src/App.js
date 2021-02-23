import { useEffect, useState } from "react";
import { Row, Col, Alert, Spin } from "antd";
import { GithubOutlined } from '@ant-design/icons'
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
    "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/438b8a8d419a5059c07ea5115aa65ca7b3f294cd/turkey.topo.json";

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
      console.log(window.innerWidth);
      const map = new Datamap({
        scope: "collection",
        height: 600,
        element: document.getElementById("container"),
        setProjection: function (element) {
          const projection = geoMercator()
            .center([35.6667, 39.1667]) // turkey coordinates [East Latitude, North Longitude]
            .scale(window.innerWidth * 2)
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
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div id="container"></div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ height: 180, marginTop: "3rem" }}>
          <Col span={24}>
            <StatisticComponent cities={cities} />
          </Col>
          <Col span={24}>
            <Alert
              showIcon
              type="info"
              message="Vaka sayıları illerin 2020 yılı nüfus sayısı dikkate alınarak hesaplanmıştır."
            />
          </Col>
        </Row>
      </Spin>
      <div className='github-area'>
        <a href='https://github.com/isagul/covid-turkey-risk-map' target='_blank'>
          <GithubOutlined />
        </a>
      </div>
    </>
  );
}

export default App;
