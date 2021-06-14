import React from 'react';
import { Alert } from "antd";
import Proptypes from 'prop-types';

// components
import StatisticComponent from "components/Statistic";

const Footer = ({ cities, mapData, getMapInfoDrawerVisible }) => {

    return (
        <div className="alert-info-box">
            <StatisticComponent cities={cities} mapData={mapData} />
            <Alert
                type="info"
                message="Harita ile ilgili bilgiler için tıklayınız."
                onClick={() => getMapInfoDrawerVisible(true)}
                style={{ cursor: "pointer" }}
            />
        </div>
    )
}

Footer.propTypes = {
    cities: Proptypes.arrayOf(Proptypes.object),
    mapData: Proptypes.object,
    getMapInfoDrawerVisible: Proptypes.func
}

Footer.defaultProps = {
    cities: [],
    mapData: {}
}

export default Footer;