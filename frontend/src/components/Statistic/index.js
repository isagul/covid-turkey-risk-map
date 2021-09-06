import Proptypes from 'prop-types';
import { useEffect, useState } from "react";
import { Row, Col, Statistic, Card } from "antd";

// utils
import { formatNumbers } from "utils/FormatNumbers";

// constants
import caseBorders from 'constants/CaseBorders';

// styles
import './style.scss';

const StatisticComponent = ({ cities, mapData }) => {
  const [cityInfo, setCityInfo] = useState({});
  const [totalWeeklyCaseCount, setTotalWeeklyCaseCount] = useState(0);
  const [firstDoseVaccineCount, setFirstDoseVaccineCount] = useState(0);
  const [secondDoseVaccineCount, setSecondDoseVaccineCount] = useState(0);
  const [totalVaccineCount, setTotalVaccineCount] = useState(0);

  useEffect(() => {
    if (cities.length > 0) {
      setCityInfo(separateCitiesByStatus(cities))
    }
  }, [cities]);

  useEffect(() => {
    if (Object.keys(mapData).length > 0) {
      let weeklyCaseCountTotal = 0;
      let firstDoseVaccineCountTotal = 0;
      let secondDoseVaccineCountTotal = 0;
      let vaccineCountTotal = 0;

      for (const key in mapData) {
        weeklyCaseCountTotal += Number(mapData[key].caseCountWeekly.replace(/[.,]/g, ""));
        if (mapData[key].vaccineInfo.length > 0) {
          vaccineCountTotal += Number(mapData[key].vaccineInfo[0].total.replace(/[.,]/g, ""));
          firstDoseVaccineCountTotal += Number(mapData[key].vaccineInfo[0].firstDose.replace(/[.,]/g, ""));
          secondDoseVaccineCountTotal += Number(mapData[key].vaccineInfo[0].secondDose.replace(/[.,]/g, ""));
        }
      }

      setTotalWeeklyCaseCount(formatNumbers(weeklyCaseCountTotal));
      setFirstDoseVaccineCount(formatNumbers(firstDoseVaccineCountTotal));
      setSecondDoseVaccineCount(formatNumbers(secondDoseVaccineCountTotal));
      setTotalVaccineCount(formatNumbers(vaccineCountTotal));
    }
  }, [mapData])

  const separateCitiesByStatus = (cities) => {
    const veryGoodCities = cities.filter(city => city.caseRatio <= caseBorders.low.riskBorder);
    const goodCities = cities.filter(city => city.caseRatio >= caseBorders.medium.minRiskBorder && city.caseRatio <= caseBorders.medium.maxRiskBorder);
    const badCities = cities.filter(city => city.caseRatio >= caseBorders.bad.minRiskBorder && city.caseRatio <= caseBorders.bad.maxRiskBorder);
    const veryBadCities = cities.filter(city => city.caseRatio >= caseBorders.veryBad.riskBorder);
    return {
      veryGoodCityCount: veryGoodCities.length, // düşük risk
      goodCityCount: goodCities.length, // orta risk
      badCityCount: badCities.length, // yüksek risk
      veryBadCityCount: veryBadCities.length, // çok yüksek risk
    }
  }

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 8, justifyContent: 'center' }}>
      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card style={{ height: '100%' }}>
          <Statistic
            title="Toplam Haftalık Vaka Sayısı"
            value={totalWeeklyCaseCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card style={{ height: '100%' }}>
          <Statistic
            title="Düşük Riskli İl Sayısı"
            value={cityInfo.veryGoodCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card style={{ height: '100%' }}>
          <Statistic
            title="Orta Riskli İl Sayısı"
            value={cityInfo.goodCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card style={{ height: '100%' }}>
          <Statistic
            title="Yüksek Riskli İl Sayısı"
            value={cityInfo.badCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
        <Card style={{ height: '100%' }}>
          <Statistic
            title="Çok Yüksek Riskli İl Sayısı"
            value={cityInfo.veryBadCityCount}
          />
        </Card>
      </Col>
    </Row>
  );
};

StatisticComponent.propTypes = {
  cities: Proptypes.arrayOf(Proptypes.object),
  mapData: Proptypes.object
}

StatisticComponent.defaultProps = {
  cities: [],
  mapData: {}
}

export default StatisticComponent;
