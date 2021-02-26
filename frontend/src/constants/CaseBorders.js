const caseBorders = {
    low: {
        riskBorder: 10
    },
    medium: {
        minRiskBorder: 10,
        maxRiskBorder: 35
    },
    bad : {
        minRiskBorder: 35,
        maxRiskBorder: 100
    },
    veryBad: {
        riskBorder: 100
    }
}

export default caseBorders;