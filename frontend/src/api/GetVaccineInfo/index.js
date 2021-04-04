export const getVaccineInfo = async (url) => {
    return await fetch(url).then((res) => res.json());
  };
  