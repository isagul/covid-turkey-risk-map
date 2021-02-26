import { useEffect, useState } from "react";
import { Row, Col, Statistic, Card } from "antd";
import caseBorders from '../../constants/CaseBorders';
import Proptypes from 'prop-types';

const StatisticComponent = ({ cities }) => {
  const [cityInfo, setCityInfo] = useState({});

  useEffect(() => {
    setCityInfo(separateCitiesByStatus(cities))
  }, [cities]);

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
    <Row gutter={[16, 16]}>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Düşük Riskli İl Sayısı"
            value={cityInfo.veryGoodCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Orta Riskli İl Sayısı"
            value={cityInfo.goodCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card>
          <Statistic
            title="Yüksek Riskli İl Sayısı"
            value={cityInfo.badCityCount}
          />
        </Card>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Card>
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
  cities: Proptypes.arrayOf(Proptypes.object)
}

StatisticComponent.defaultProps = {
  cities: []
}

export default StatisticComponent;
