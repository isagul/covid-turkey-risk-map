import { Divider, Drawer, Button, Row, Col } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import Proptypes from "prop-types";

const MapInfoDrawerComponent = ({ visible, getInfoDrawerVisible }) => {
  const onClose = () => {
    getInfoDrawerVisible(false);
  };

  return (
    <Drawer
      title="Türkiye Covid-19 Vaka Risk Haritası"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={window.innerWidth > 900 ? 450 : window.innerWidth - 100}
      headerStyle={{ textAlign: "center" }}
      zIndex={9999}
    >
      <h2>Haritadaki İllerin Renklendirilmesi</h2>
      <p>İller, aşağıdaki şartlara göre renklendirilmiştir.</p>
      <ul>
        <li>Yüz binde 20'nin altında vaka görülen iller "düşük riskli",</li>
        <li>Yüz binde 21-50 arası vaka olan iller "orta riskli",</li>
        <li>Yüz binde 51-100 arası vakası bulunan iller "yüksek riskli",</li>
        <li>
          Yüz binde 100'ün üstünde vaka seyri görülen iller ise "çok yüksek
          riskli"
        </li>
      </ul>
      <Divider />
      <h2>Günlük Vaka Sayısının Belirlenmesi</h2>
      <p>Günlük vaka sayısı belirlenirken aşağıdaki formül baz alınmıştır.</p>
      <code>(( İl_Nüfusu / 100000 ) * İl_Vaka_Oranı) / 7</code>
      <Divider />
      <Row gutter={[16]}>
        <Col span={24}>
          <Button href="https://github.com/isagul/covid-turkey-risk-map" target="_blank" icon={<GithubOutlined />} style={{width: '100%', backgroundColor: '#000', color: '#fff', border: 'none'}} />
        </Col>
      </Row>
    </Drawer>
  );
};

MapInfoDrawerComponent.propTypes = {
  visible: Proptypes.bool,
  getInfoDrawerVisible: Proptypes.func,
};

MapInfoDrawerComponent.defaultProps = {
  visible: false,
};

export default MapInfoDrawerComponent;
