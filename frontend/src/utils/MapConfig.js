import { geoPath, geoMercator } from "d3-geo";

const topographyURL =
    "https://gist.githubusercontent.com/isagul/2887858e1c759e006e604032b0e31c79/raw/438b8a8d419a5059c07ea5115aa65ca7b3f294cd/turkey.topo.json";

const mapConfig = (element) => {
    return {
        scope: "collection",
        height: 600,
        responsive: window.innerWidth < 900 ? true : false,
        element: element,
        setProjection: function (element) {
          const projection = geoMercator()
            .center([35.6667, 39.1667]) // turkey coordinates [East Latitude, North Longitude]
            .scale(3000)
          const path = geoPath().projection(projection);
          return { path: path, projection: projection };
        },
        done: function (datamap) {
          const svgElement = datamap.svg[0][0];
          svgElement.setAttribute("viewBox", "0 0 900 600");
          svgElement.style.width = "100%";       
        },
        geographyConfig: {
          dataUrl: topographyURL,
          highlightBorderColor: "#000",
          borderColor: "#565252",
          highlightFillColor: "#1B888C",
          popupTemplate: function (geography, data) {
            return `<div class="hoverinfo" style="padding: 10px; border-radius: 2px">
                <h1 style='text-align:center; font-weight: 600; color:#1B888C; font-size: 18px'>${data.name}</h1>
                <div style='text-align:center; font-weight: bold; color:${cityStatusColor(data.fillKey)}; font-size: 14px'>${data.fillKey}</div>
                <div><strong>Ort. Günlük Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseCount}</span></div>
                <div><strong>Haftalık Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseCountWeekly}</span></div>
                <div><strong>Haftalık Vaka Oranı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseRatio}</span></div>
                <hr />
                <div><strong>Toplam Yapılan Aşı Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.vaccineInfo[0].total}</span></div>
                <div><strong>1. Doz Uygulanan Kişi Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.vaccineInfo[0].firstDose}</span></div>
                <div><strong>2. Doz Uygulanan Kişi Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.vaccineInfo[0].secondDose}</span></div>
               
              </div>`;
          },
          highlightBorderWidth: 3,
        },
        fills: {
          "Çok Yüksek Risk": "#CE0404",
          "Yüksek Risk": "#F08F00",
          "Orta Risk": "#FDE03B",
          "Düşük Risk": "#13B3C5",
          defaultFill: "#EDDC4E",
        },
    }
}

const cityStatusColor = (status) => {
  if (status === "Çok Yüksek Risk") {
    return "#CE0404";
  } else if (status === "Yüksek Risk") {
    return "#F08F00";
  } else if (status === "Orta Risk") {
    return "#FDE03B";
  } else {
    return "#13B3C5";
  }
}

export default mapConfig;