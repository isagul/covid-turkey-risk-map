import { useEffect, useState } from "react";
import { Row, Col, Statistic, Card } from "antd";
import caseBorders from '../../constants/CaseBorders';
import Proptypes from 'prop-types';
import { formatNumbers } from "../../utils/FormatNumbers";

const StatisticComponent = ({ cities, mapData }) => {
  const [cityInfo, setCityInfo] = useState({});
  const [totalWeeklyCaseCount, setTotalWeeklyCaseCount] = useState(0);
  const [totalVaccineCount, setTotalVaccineCount] = useState(0);

  useEffect(() => {
    if (cities.length > 0) {
      setCityInfo(separateCitiesByStatus(cities))
    }
  }, [cities]);

  useEffect(() => {
    if (Object.keys(mapData).length > 0) {
      let weeklyCaseCountTotal = 0;
      let vaccineCountTotal = 0;
      for (const key in mapData) {       
        weeklyCaseCountTotal += Number(mapData[key].caseCountWeekly.replace(/[.,]/g, ""));
        vaccineCountTotal += Number(mapData[key].vaccineInfo[0].total.replace(/[.,]/g, ""));
      }
      setTotalWeeklyCaseCount(formatNumbers(weeklyCaseCountTotal));
      setTotalVaccineCount(formatNumbers(vaccineCountTotal));
    }
  }, [mapData])

  const separateCitiesByStatus = (cities) => {
    const veryGoodCities = cities.filter(city => city.caseRatio <= caseBorders.low.riskBorder);
    const goodCities = cities.filter(city => city.caseRatio > caseBorders.medium.minRiskBorder && city.caseRatio <= caseBorders.medium.maxRiskBorder);
    const badCities = cities.filter(city => city.caseRatio > caseBorders.bad.minRiskBorder && city.caseRatio < caseBorders.bad.maxRiskBorder);
    const veryBadCities = cities.filter(city => city.caseRatio >= caseBorders.veryBad.riskBorder);
    return {
      veryGoodCityCount: veryGoodCities.length,
      goodCityCount: goodCities.length,
      badCityCount: badCities.length,
      veryBadCityCount: veryBadCities.length,
    }
  }

  return (
    <Row gutter={[16, 16]} style={{marginBottom: 8}}>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card style={{height: '100%'}}>
          <Statistic
            title="Toplam Haftalık Vaka Sayısı"
            value={totalWeeklyCaseCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card style={{height: '100%'}}>
          <Statistic
            title="Toplam Yapılan Aşı Sayısı"
            value={totalVaccineCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card style={{height: '100%'}}>
          <Statistic
            title="Düşük Riskli İl Sayısı"
            value={cityInfo.veryGoodCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card style={{height: '100%'}}>
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
