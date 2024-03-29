import Datamap from "datamaps";
import { Row, Col, Spin } from "antd";
import { useEffect, useState } from "react";

// theme
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "components/Theme/globalStyles";
import { lightTheme, darkTheme } from "components/Theme/Themes";

// components
import Header from "components/Header";
import Footer from "components/Footer";
import MapInfoDrawerComponent from "components/MapInfoDrawer";

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

const apiPrefix = "https://covid-turkey-case-ratio.herokuapp.com";
const topographyURL = "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/438b8a8d419a5059c07ea5115aa65ca7b3f294cd/turkey.topo.json";

const localStoreKeyName = "COVID_MAP_THEME"

function App() {
  const [mapData, setMapData] = useState(undefined);
  const [cities, setCities] = useState([]);
  const [dateRange, setDateRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoDrawerVisible, setInfoDrawerVisible] = useState(false);

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storageValue = localStorage.getItem(localStoreKeyName);
    if (storageValue) {
      setTheme(storageValue);
    } else {
      localStorage.setItem(localStoreKeyName, theme);
    }
  }, [])

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
              } else if (findCity.caseRatio >= caseBorders.medium.minRiskBorder && findCity.caseRatio <= caseBorders.medium.maxRiskBorder) {
                resultObject = classificationCitiesByCaseCount(findCity, geometry, "Orta Risk", result);
              } else if (findCity.caseRatio >= caseBorders.bad.minRiskBorder && findCity.caseRatio <= caseBorders.bad.maxRiskBorder) {
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

  const createMap = () => {
    if (mapData !== undefined) {
      const map = new Datamap({
        ...mapConfig(document.getElementById("container"), topographyURL),
        data: mapData,
      });
    }

    // map.legend();
  };

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

  const handleMapInfoDrawerVisible = (value) => {
    setInfoDrawerVisible(value);
  };

  const handleInfoDrawerVisible = (value) => {
    setInfoDrawerVisible(value);
  };

  const themeToggler = () => {
    if (theme === "light") {
      setTheme('dark');
      localStorage.setItem(localStoreKeyName, "dark");
    } else {
      setTheme('light');
      localStorage.setItem(localStoreKeyName, "light");
    }
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header theme={theme} onThemeChange={themeToggler} dateRange={dateRange} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Spin spinning={loading}>
                <div id="container" />
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
      <MapInfoDrawerComponent
        visible={infoDrawerVisible}
        getInfoDrawerVisible={handleInfoDrawerVisible}
      />
      <Footer cities={cities} mapData={mapData} getMapInfoDrawerVisible={handleMapInfoDrawerVisible} />
    </ThemeProvider>
  );
}

export default App;
