import { useEffect, useState } from "react";
import { Row, Col, Alert, Spin } from "antd";
import Datamap from "datamaps";
import cityPopulation from "./constants/CityPopulation";
import { getCaseRatio } from "./api/GetCaseRatio";
import { getTurkeyTopology } from "./api/getTurketTopology";
import StatisticComponent from "./components/Statistic";
import MapInfoDrawerComponent from "./components/MapInfoDrawer";
import mapConfig from './utils/MapConfig';
import caseBorders from './constants/CaseBorders';
import classificationCitiesByCaseCount from './utils/ClassificationCitiesByCaseCount';
import "./App.scss";

function App() {
  const [mapData, setMapData] = useState({});
  const [cities, setCities] = useState([]);
  const [dateRange, setDateRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoDrawerVisible, setInfoDrawerVisible] = useState(false);

  const topographyURL =
    "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/438b8a8d419a5059c07ea5115aa65ca7b3f294cd/turkey.topo.json";

  useEffect(() => {
    handleCaseRatios("https://covid-turkey-case-ratio.herokuapp.com/");
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      let lastMapData = {};

      getTurkeyTopology(topographyURL).then((res) => {
        res.objects.collection.geometries.forEach((geometry) => {
          const findCity = cities.find(
            (city) =>
              city.name.toLowerCase() === geometry.properties.name.toLowerCase()
          );
          if (findCity) {
            let resultObject = {};
            if (findCity.caseRatio <= caseBorders.low.riskBorder) {
              resultObject = classificationCitiesByCaseCount(findCity, geometry, "Düşük Risk");
            } else if (findCity.caseRatio > caseBorders.medium.minRiskBorder && findCity.caseRatio <= caseBorders.medium.maxRiskBorder) {
              resultObject = classificationCitiesByCaseCount(findCity, geometry, "Orta Risk");
            } else if (findCity.caseRatio > caseBorders.bad.minRiskBorder && findCity.caseRatio < caseBorders.bad.maxRiskBorder) {
              resultObject = classificationCitiesByCaseCount(findCity, geometry, "Yüksek Risk");
            } else {
              resultObject = classificationCitiesByCaseCount(findCity, geometry, "Çok Yüksek Risk");
            }
            lastMapData = { ...lastMapData, ...resultObject };
          }
        });
        setMapData(lastMapData);
      });
    }
  }, [cities]);

  useEffect(() => {
    createMap();
  }, [mapData]);

  const handleCaseRatios = (url) => {
    setLoading(true);
    getCaseRatio(url)
    .then((data) => {
      setDateRange(data.dateRange);
      const result = cityPopulation.map((cityCaseRatio) => {
        const findCity = data.cities.find(
          (cityCovid) =>
            cityCovid.name.toLocaleLowerCase() ===
            cityCaseRatio.name.toLocaleLowerCase()
        );
        if (findCity) {
          cityCaseRatio["caseRatio"] = findCity.caseRatio;
          return cityCaseRatio;
        }
      });
      setCities(result);
    }).catch(err => {
      console.log('err :>> ', err);
    }).then(() => {
      setLoading(false);
    })
  };

  const showMapInfoDrawer = () => {
    setInfoDrawerVisible(true);
  };

  const handleInfoDrawerVisible = (value) => {
    setInfoDrawerVisible(value);
  };

  const createMap = () => {
    if (mapData !== undefined && Object.keys(mapData).length > 0) {
      const map = new Datamap({
        ...mapConfig(document.getElementById("container")),
        data: mapData,
      });
      map.legend();
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} align="middle" justify="center">
        <h2 style={{ color: "#1B888C" }}>
          Türkiye Vaka Risk Haritası
          {dateRange.length > 0 && <span> ({dateRange})</span>}
        </h2>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div id="container" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ height: 180, marginTop: "3rem" }}>
          <Col span={24}>
            <StatisticComponent cities={cities} />
          </Col>
        </Row>
      </Spin>
      <MapInfoDrawerComponent
        visible={infoDrawerVisible}
        getInfoDrawerVisible={handleInfoDrawerVisible}
      />
      <Col span={24} className="alert-info-box">
        <Alert
          showIcon
          type="info"
          message="Harita ile ilgili bilgiler için tıklayınız."
          onClick={showMapInfoDrawer}
          style={{ cursor: "pointer" }}
        />
      </Col>
    </>
  );
}

export default App;
