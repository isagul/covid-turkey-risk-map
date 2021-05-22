import Datamap from "datamaps";
import { useEffect, useState } from "react";
import { Row, Col, Alert, Spin } from "antd";

// theme
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "components/Theme/globalStyles";
import { lightTheme, darkTheme } from "components/Theme/Themes";

// components
import StatisticComponent from "components/Statistic";
import MapInfoDrawerComponent from "components/MapInfoDrawer";
import Header from "components/Header";

// utils
import mapConfig from "utils/MapConfig";
import classificationCitiesByCaseCount from "utils/ClassificationCitiesByCaseCount";

// api
import { getCaseRatio } from "api/GetCaseRatio";
import { getVaccineInfo } from "api/GetVaccineInfo";
import { getTurkeyTopology } from "api/GetTurkeyTopology";

// constants
import caseBorders from "constants/CaseBorders";
import cityPopulation from "constants/CityPopulation";

// styles
import "./App.scss";

function App() {
  const [mapData, setMapData] = useState({});
  const [cities, setCities] = useState([]);
  const [dateRange, setDateRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoDrawerVisible, setInfoDrawerVisible] = useState(false);

  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const apiPrefix = "https://api-covid-turkey.herokuapp.com"

  const topographyURL =
    "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/438b8a8d419a5059c07ea5115aa65ca7b3f294cd/turkey.topo.json";

  useEffect(() => {
    handleCaseRatios(apiPrefix);
  }, []);

  useEffect(() => {
    if (cities.length > 0) {

      getVaccineInfo(`${apiPrefix}/vaccine`).then(response => {
        const { result } = response;

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
                resultObject = classificationCitiesByCaseCount(findCity, geometry, "Düşük Risk", result);
              } else if (findCity.caseRatio > caseBorders.medium.minRiskBorder && findCity.caseRatio <= caseBorders.medium.maxRiskBorder) {
                resultObject = classificationCitiesByCaseCount(findCity, geometry, "Orta Risk", result);
              } else if (findCity.caseRatio > caseBorders.bad.minRiskBorder && findCity.caseRatio < caseBorders.bad.maxRiskBorder) {
                resultObject = classificationCitiesByCaseCount(findCity, geometry, "Yüksek Risk", result);
              } else {
                resultObject = classificationCitiesByCaseCount(findCity, geometry, "Çok Yüksek Risk", result);
              }
              lastMapData = { ...lastMapData, ...resultObject };
            }
          });
          setMapData(lastMapData);
        });
      })
        .catch((err) => {
          console.log("err :>> ", err);
        })
        .then(() => {
          setLoading(false);
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
        if (data.cities.length > 0) {
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
        }
      })
      .catch((err) => {
        console.log("err :>> ", err);
      })
  };

  const showMapInfoDrawer = (value) => {
    setInfoDrawerVisible(value);
  };

  const handleInfoDrawerVisible = (value) => {
    setInfoDrawerVisible(value);
  };

  const createMap = () => {
    if (mapData !== undefined && Object.keys(mapData).length > 0) {
      const map = new Datamap({
        ...mapConfig(document.getElementById("container"), topographyURL),
        data: mapData,
      });
      // map.legend();
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header theme={theme} onThemeChange={themeToggler} dateRange={dateRange} />
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
      </Spin>
      <MapInfoDrawerComponent
        visible={infoDrawerVisible}
        getInfoDrawerVisible={handleInfoDrawerVisible}
      />
      <Col span={24} className="alert-info-box">
        <StatisticComponent cities={cities} mapData={mapData} />
        <Alert
          type="info"
          message="Harita ile ilgili bilgiler için tıklayınız."
          onClick={() => showMapInfoDrawer(true)}
          style={{ cursor: "pointer" }}
        />
      </Col>
    </ThemeProvider>
  );
}

export default App;
