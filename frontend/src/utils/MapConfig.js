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
            .scale(window.innerWidth * 2)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          const path = geoPath().projection(projection);
          return { path: path, projection: projection };
        },
        geographyConfig: {
          dataUrl: topographyURL,
          highlightBorderColor: "#000",
          borderColor: "gray",
          highlightFillColor: "#1B888C",
          popupTemplate: function (geography, data) {
            return `<div class="hoverinfo" style="padding: 10px; border-radius: 2px">
                <div style='text-align:center; font-weight: 600; color:#1B888C; font-size: 18px'>${data.name}</div>
                <div><strong>Günlük Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseCount}</span></div>
                <div><strong>Haftalık Vaka Sayısı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseCountWeekly}</span></div>
                <div><strong>Haftalık Vaka Oranı:</strong> <span style='font-weight: 600; color:#1B888C; font-size: 18px'>${data.caseRatio}</span></div>
              </div>`;
          },
          highlightBorderWidth: 3,
        },
        fills: {
          "Çok Yüksek Risk": "red",
          "Yüksek Risk": "orange",
          "Orta Risk": "yellow",
          "Düşük Risk": "lightblue",
          defaultFill: "#EDDC4E",
        },
    }
}

export default mapConfig;