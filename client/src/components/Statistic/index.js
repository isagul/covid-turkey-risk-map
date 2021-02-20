import { useEffect, useState } from "react";
import { Row, Col, Statistic, Card } from "antd";
import cityCaseRatios from '../../data/cityCaseRatios';

const StatisticComponent = () => {
  const [cityInfo, setCityInfo] = useState({});

  useEffect(() => {
    setCityInfo(separateCitiesByStatus(cityCaseRatios))
  }, []);

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

export default StatisticComponent;
