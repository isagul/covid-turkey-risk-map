const cities = [
  {
    "id": 1,
    "name": "Adana",
    "latitude": "37.0000",
    "longitude": "35.3213",
    "population": 2258718,
    "caseRatio": 59.95   
  },
  {
    "id": 2,
    "name": "Adıyaman",
    "latitude": "37.7648",
    "longitude": "38.2786",
    "population": 632459,
    "caseRatio": 100.55
  },
  {
    "id": 3,
    "name": "Afyonkarahisar",
    "latitude": "38.7507",
    "longitude": "30.5567",
    "population": 736912,
    "caseRatio": 22.32
  },
  {
    "id": 4,
    "name": "Ağrı",
    "latitude": "39.7191",
    "longitude": "43.0503",
    "population": 535435,
    "caseRatio": 27.50
  },
  {
    "id": 5,
    "name": "Amasya",
    "latitude": "40.6499",
    "longitude": "35.8353",
    "population": 335494,
    "caseRatio": 96.06
  },
  {
    "id": 6,
    "name": "Ankara",
    "latitude": "39.9208",
    "longitude": "32.8541",
    "population": 5663322,
    "caseRatio": 35.49
  },
  {
    "id": 7,
    "name": "Antalya",
    "latitude": "36.8841",
    "longitude": "30.7056",
    "population": 2548308,
    "caseRatio": 78.20
  },
  {
    "id": 8,
    "name": "Artvin",
    "latitude": "41.1828",
    "longitude": "41.8183",
    "population": 169501,
    "caseRatio": 78.42
  },
  {
    "id": 9,
    "name": "Aydın",
    "latitude": "37.8560",
    "longitude": "27.8416",
    "population": 1119084,
    "caseRatio": 35.21
  },
  {
    "id": 10,
    "name": "Balıkesir",
    "latitude": "39.6484",
    "longitude": "27.8826",
    "population": 1240285,
    "caseRatio": 83.65
  },
  {
    "id": 11,
    "name": "Bilecik",
    "latitude": "40.0567",
    "longitude": "30.0665",
    "population": 218717,
    "caseRatio": 35.41
  },
  {
    "id": 12,
    "name": "Bingöl",
    "latitude": "39.0626",
    "longitude": "40.7696",
    "population": 281768,
    "caseRatio": 26.81
  },
  {
    "id": 13,
    "name": "Bitlis",
    "latitude": "38.3938",
    "longitude": "42.1232",
    "population": 350994,
    "caseRatio": 10.35
  },
  {
    "id": 14,
    "name": "Bolu",
    "latitude": "40.5760",
    "longitude": "31.5788",
    "population": 314802,
    "caseRatio": 44.96
  },
  {
    "id": 15,
    "name": "Burdur",
    "latitude": "37.4613",
    "longitude": "30.0665",
    "population": 267092,
    "caseRatio": 75.54
  },
  {
    "id": 16,
    "name": "Bursa",
    "latitude": "40.2669",
    "longitude": "29.0634",
    "population": 3101833,
    "caseRatio": 34.87
  },
  {
    "id": 17,
    "name": "Çanakkale",
    "latitude": "40.1553",
    "longitude": "26.4142",
    "population": 541548,
    "caseRatio": 37.61
  },
  {
    "id": 18,
    "name": "Çankırı",
    "latitude": "40.6013",
    "longitude": "33.6134",
    "population": 192428,
    "caseRatio": 22.86
  },
  {
    "id": 19,
    "name": "Çorum",
    "latitude": "40.5506",
    "longitude": "34.9556",
    "population": 530126,
    "caseRatio": 35.36
  },
  {
    "id": 20,
    "name": "Denizli",
    "latitude": "37.7765",
    "longitude": "29.0864",
    "population": 1040915,
    "caseRatio": 32.52
  },
  {
    "id": 21,
    "name": "Diyarbakır",
    "latitude": "37.9144",
    "longitude": "40.2306",
    "population": 1783431,
    "caseRatio": 17.53
  },
  {
    "id": 22,
    "name": "Edirne",
    "latitude": "41.6818",
    "longitude": "26.5623",
    "population": 407763,
    "caseRatio": 65.66
  },
  {
    "id": 23,
    "name": "Elazığ",
    "latitude": "38.6810",
    "longitude": "39.2264",
    "population": 587960,
    "caseRatio": 50.42
  },
  {
    "id": 24,
    "name": "Erzincan",
    "latitude": "39.7500",
    "longitude": "39.5000",
    "population": 234431,
    "caseRatio": 60.37
  },
  {
    "id": 25,
    "name": "Erzurum",
    "latitude": "39.9000",
    "longitude": "41.2700",
    "population": 758279,
    "caseRatio": 37.71
  },
  {
    "id": 26,
    "name": "Eskişehir",
    "latitude": "39.7767",
    "longitude": "30.5206",
    "population": 888828,
    "caseRatio": 30.99
  },
  {
    "id": 27,
    "name": "Gaziantep",
    "latitude": "37.0662",
    "longitude": "37.3833",
    "population": 2101157,
    "caseRatio": 26.72
  },
  {
    "id": 28,
    "name": "Giresun",
    "latitude": "40.9128",
    "longitude": "38.3895",
    "population": 448721,
    "caseRatio": 184.34
  },
  {
    "id": 29,
    "name": "Gümüşhane",
    "latitude": "40.4386",
    "longitude": "39.5086",
    "population": 141702,
    "caseRatio": 97.18
  },
  {
    "id": 30,
    "name": "Hakkari",
    "latitude": "37.5833",
    "longitude": "43.7333",
    "population": 280514,
    "caseRatio": 9.55
  },
  {
    "id": 31,
    "name": "Hatay",
    "latitude": "36.4018",
    "longitude": "36.3498",
    "population": 1659320,
    "caseRatio": 62.82
  },
  {
    "id": 32,
    "name": "Isparta",
    "latitude": "37.7648",
    "longitude": "30.5566",
    "population": 440304,
    "caseRatio": 33.88
  },
  {
    "id": 33,
    "name": "Mersin",
    "latitude": "36.8000",
    "longitude": "34.6333",
    "population": 1868757,
    "caseRatio": 90.57
  },
  {
    "id": 34,
    "name": "İstanbul",
    "latitude": "41.0053",
    "longitude": "28.9770",
    "population": 15462452,
    "caseRatio": 60.19
  },
  {
    "id": 35,
    "name": "İzmir",
    "latitude": "38.4189",
    "longitude": "27.1287",
    "population": 4394694,
    "caseRatio": 44.39
  },
  {
    "id": 36,
    "name": "Kars",
    "latitude": "40.6167",
    "longitude": "43.1000",
    "population": 284923,
    "caseRatio": 17.79
  },
  {
    "id": 37,
    "name": "Kastamonu",
    "latitude": "41.3887",
    "longitude": "33.7827",
    "population": 376377,
    "caseRatio": 29.73
  },
  {
    "id": 38,
    "name": "Kayseri",
    "latitude": "38.7312",
    "longitude": "35.4787",
    "population": 1421455,
    "caseRatio": 56.71
  },
  {
    "id": 39,
    "name": "Kırklareli",
    "latitude": "41.7333",
    "longitude": "27.2167",
    "population": 361737,
    "caseRatio": 52.61
  },
  {
    "id": 40,
    "name": "Kırşehir",
    "latitude": "39.1425",
    "longitude": "34.1709",
    "population": 243042,
    "caseRatio": 29.90
  },
  {
    "id": 41,
    "name": "Kocaeli",
    "latitude": "40.8533",
    "longitude": "29.8815",
    "population": 1997258,
    "caseRatio": 88.19
  },
  {
    "id": 42,
    "name": "Konya",
    "latitude": "37.8667",
    "longitude": "32.4833",
    "population": 2250020,
    "caseRatio": 90.99
  },
  {
    "id": 43,
    "name": "Kütahya",
    "latitude": "39.4167",
    "longitude": "29.9833",
    "population": 576688,
    "caseRatio": 50.91
  },
  {
    "id": 44,
    "name": "Malatya",
    "latitude": "38.3552",
    "longitude": "38.3095",
    "population": 806156,
    "caseRatio": 40.92
  },
  {
    "id": 45,
    "name": "Manisa",
    "latitude": "38.6191",
    "longitude": "27.4289",
    "population": 1450616,
    "caseRatio": 42.52
  },
  {
    "id": 46,
    "name": "Kahramanmaraş",
    "latitude": "37.5858",
    "longitude": "36.9371",
    "population": 1168163,
    "caseRatio": 39.38
  },
  {
    "id": 47,
    "name": "Mardin",
    "latitude": "37.3212",
    "longitude": "40.7245",
    "population": 854716,
    "caseRatio": 15.33
  },
  {
    "id": 48,
    "name": "Muğla",
    "latitude": "37.2153",
    "longitude": "28.3636",
    "population": 1000773,
    "caseRatio": 54.94
  },
  {
    "id": 49,
    "name": "Muş",
    "latitude": "38.9462",
    "longitude": "41.7539",
    "population": 411117,
    "caseRatio": 16.28
  },
  {
    "id": 50,
    "name": "Nevşehir",
    "latitude": "38.6939",
    "longitude": "34.6857",
    "population": 304962,
    "caseRatio": 66.16
  },
  {
    "id": 51,
    "name": "Niğde",
    "latitude": "37.9667",
    "longitude": "34.6833",
    "population": 362071,
    "caseRatio": 54.67
  },
  {
    "id": 52,
    "name": "Ordu",
    "latitude": "40.9839",
    "longitude": "37.8764",
    "population": 761400,
    "caseRatio": 194.42
  },
  {
    "id": 53,
    "name": "Rize",
    "latitude": "41.0201",
    "longitude": "40.5234",
    "population": 344359,
    "caseRatio": 202.44
  },
  {
    "id": 54,
    "name": "Sakarya",
    "latitude": "40.6940",
    "longitude": "30.4358",
    "population": 1042649,
    "caseRatio": 76.77
  },
  {
    "id": 55,
    "name": "Samsun",
    "latitude": "41.2928",
    "longitude": "36.3313",
    "population": 1356079,
    "caseRatio": 171.29
  },
  {
    "id": 56,
    "name": "Siirt",
    "latitude": "37.9333",
    "longitude": "41.9500",
    "population": 331070,
    "caseRatio": 21.37
  },
  {
    "id": 57,
    "name": "Sinop",
    "latitude": "42.0231",
    "longitude": "35.1531",
    "population": 216460,
    "caseRatio": 79.52
  },
  {
    "id": 58,
    "name": "Sivas",
    "latitude": "39.7477",
    "longitude": "37.0179",
    "population": 635889	,
    "caseRatio": 33.08
  },
  {
    "id": 59,
    "name": "Tekirdağ",
    "latitude": "40.9833",
    "longitude": "27.5167",
    "population": 1081065,
    "caseRatio": 55.37
  },
  {
    "id": 60,
    "name": "Tokat",
    "latitude": "40.3167",
    "longitude": "36.5500",
    "population": 597861,
    "caseRatio": 118.52
  },
  {
    "id": 61,
    "name": "Trabzon",
    "latitude": "41.0015",
    "longitude": "39.7178",
    "population": 811901,
    "caseRatio": 228.02
  },
  {
    "id": 62,
    "name": "Tunceli",
    "latitude": "39.3074",
    "longitude": "39.4388",
    "population": 83443,
    "caseRatio": 38.96
  },
  {
    "id": 63,
    "name": "Şanlıurfa",
    "latitude": "37.1591",
    "longitude": "38.7969",
    "population": 2115256,
    "caseRatio": 27.12
  },
  {
    "id": 64,
    "name": "Uşak",
    "latitude": "38.6823",
    "longitude": "29.4082",
    "population": 369433,
    "caseRatio": 27.70
  },
  {
    "id": 65,
    "name": "Van",
    "latitude": "38.4891",
    "longitude": "43.4089",
    "population": 1149342,
    "caseRatio": 14.89
  },
  {
    "id": 66,
    "name": "Yozgat",
    "latitude": "39.8181",
    "longitude": "34.8147",
    "population": 419095	,
    "caseRatio": 41.07
  },
  {
    "id": 67,
    "name": "Zonguldak",
    "latitude": "41.4564",
    "longitude": "31.7987",
    "population": 591204,
    "caseRatio": 54.67
  },
  {
    "id": 68,
    "name": "Aksaray",
    "latitude": "38.3687",
    "longitude": "34.0370",
    "population": 423011,
    "caseRatio": 92.01
  },
  {
    "id": 69,
    "name": "Bayburt",
    "latitude": "40.2552",
    "longitude": "40.2249",
    "population": 81910,
    "caseRatio": 60.71
  },
  {
    "id": 70,
    "name": "Karaman",
    "latitude": "37.1759",
    "longitude": "33.2287",
    "population": 254919,
    "caseRatio": 103.16
  },
  {
    "id": 71,
    "name": "Kırıkkale",
    "latitude": "39.8468",
    "longitude": "33.5153",
    "population": 278703,
    "caseRatio": 43.23
  },
  {
    "id": 72,
    "name": "Batman",
    "latitude": "37.8812",
    "longitude": "41.1351",
    "population": 620278	,
    "caseRatio": 12.49
  },
  {
    "id": 73,
    "name": "Şırnak",
    "latitude": "37.4187",
    "longitude": "42.4918",
    "population": 537762,
    "caseRatio": 7.82
  },
  {
    "id": 74,
    "name": "Bartın",
    "latitude": "41.5811",
    "longitude": "32.4610",
    "population": 198979,
    "caseRatio": 44.69
  },
  {
    "id": 75,
    "name": "Ardahan",
    "latitude": "41.1105",
    "longitude": "42.7022",
    "population": 96161,
    "caseRatio": 65.63
  },
  {
    "id": 76,
    "name": "Iğdır",
    "latitude": "39.8880",
    "longitude": "44.0048",
    "population": 201314,
    "caseRatio": 23.28
  },
  {
    "id": 77,
    "name": "Yalova",
    "latitude": "40.6500",
    "longitude": "29.2667",
    "population": 276050,
    "caseRatio": 75.17
  },
  {
    "id": 78,
    "name": "Karabük",
    "latitude": "41.2061",
    "longitude": "32.6204",
    "population": 243614,
    "caseRatio": 34.15
  },
  {
    "id": 79,
    "name": "Kilis",
    "latitude": "36.7184",
    "longitude": "37.1212",
    "population": 142792	,
    "caseRatio": 51.57
  },
  {
    "id": 80,
    "name": "Osmaniye",
    "latitude": "37.2130",
    "longitude": "36.1763",
    "population": 548556,
    "caseRatio": 139.81
  },
  {
    "id": 81,
    "name": "Düzce",
    "latitude": "40.8438",
    "longitude": "31.1565",
    "population": 395679,
    "caseRatio": 43.99
  }
]

export default cities;