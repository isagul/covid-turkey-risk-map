import { useEffect, useState } from "react";
import { Row, Col, Statistic, Card } from "antd";
import Proptypes from 'prop-types';

const StatisticComponent = ({ cities }) => {
  const [cityInfo, setCityInfo] = useState({});

  useEffect(() => {
    setCityInfo(separateCitiesByStatus(cities))
  }, [cities]);

  const separateCitiesByStatus = (cities) => {
    const veryGoodCities = cities.filter(city => city.caseRatio <= 10);
    const goodCities = cities.filter(city => city.caseRatio > 10 && city.caseRatio <= 35);
    const badCities = cities.filter(city => city.caseRatio > 35 && city.caseRatio < 100);
    const veryBadCities = cities.filter(city => city.caseRatio >= 100);
    return {
      veryGoodCityCount: veryGoodCities.length,
      goodCityCount: goodCities.length,
      badCityCount: badCities.length,
      veryBadCityCount: veryBadCities.length,
    }
  }
  
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card>
          <Statistic
            title="Düşük Riskli İl Sayısı"
            value={cityInfo.veryGoodCityCount}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Orta Riskli İl Sayısı"
            value={cityInfo.goodCityCount}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Yüksek Riskli İl Sayısı"
            value={cityInfo.badCityCount}
          />
        </Card>
      </Col>
      <Col span={6}>
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
