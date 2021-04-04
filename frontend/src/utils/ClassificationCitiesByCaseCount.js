import { formatNumbers } from "./FormatNumbers";

const classificationCitiesByCaseCount = (findCity, geometry, riskStatus, vaccines) => {
  let resultObject = {};

  const caseCountDaily = Math.round(
    ((findCity.population / 100000) * findCity.caseRatio) / 7
  );
  const caseCountWeekly = Math.round(
    (findCity.population / 100000) * findCity.caseRatio
  );

  const cityVaccine = vaccines.filter((city) => city.name === findCity.name).map(city => {
    return {
      total: formatNumbers(city.total),
      firstDose: formatNumbers(city.firstDose),
      secondDose: formatNumbers(city.secondDose),
    }
  });

  resultObject[geometry.id] = {
    fillKey: riskStatus,
    caseCount: formatNumbers(caseCountDaily),
    caseCountWeekly: formatNumbers(caseCountWeekly),
    caseRatio: findCity.caseRatio,
    vaccineInfo: cityVaccine,
    name: geometry.properties.name,
  };
  return resultObject;
};

export default classificationCitiesByCaseCount;
