// Actions and logic
const sitesData = [
  {
    id: 1,
    SiteName: "Stoltenberg Inc",
    SiteID: "jabVbaX7oI",
    SiteMngr: "Elmo Well",
    Adress: {
      StreetAdrs: "222 Morning Trail",
      City: "Evanston",
      State: "IL",
      Zip: "60208",
      County: "potenti in",
    },
    Telephone: "847-623-4449",
    Email: "ewell0@wix.com",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 2,
    SiteName: "Padberg-Simonis",
    SiteID: "EuByaP",
    SiteMngr: "Hilde Willshee",
    Adress: {
      StreetAdrs: "9303 Muir Street",
      City: "Tucson",
      State: "AZ",
      Zip: "85710",
      County: "faucibus",
    },
    Telephone: "520-427-6295",
    Email: "hwillshee1@histats.com",
    CSD: 10,
    CPD: 22,
    CD: 21,
    AD: 11,
    SD: 16,
  },
  {
    id: 3,
    SiteName: "Prohaska LLC",
    SiteID: "n5zMb1jlp",
    SiteMngr: "Amabel Belvard",
    Adress: {
      StreetAdrs: "406 Packers Way",
      City: "Atlanta",
      State: "GA",
      Zip: "30316",
      County: "auctor",
    },
    Telephone: "404-618-3820",
    Email: "abelvard2@arizona.edu",
    CSD: 18,
    CPD: 21,
    CD: 22,
    AD: 9,
    SD: 11,
  },
  {
    id: 4,
    SiteName: "Koch, Johnston and Spinka",
    SiteID: "7jsoeNHS",
    SiteMngr: "Deeanne Aire",
    Adress: {
      StreetAdrs: "23 Vernon Alley",
      City: "Albany",
      State: "NY",
      Zip: "12205",
      County: "volutpat",
    },
    Telephone: "518-324-9281",
    Email: "daire3@linkedin.com",
    CSD: 23,
    CPD: 14,
    CD: 9,
    AD: 6,
    SD: 8,
  },
  {
    id: 5,
    SiteName: "Robel, Lueilwitz and Leuschke",
    SiteID: "CvVqBOHnLXER",
    SiteMngr: "Laurie Lammas",
    Adress: {
      StreetAdrs: "99 Eggendart Street",
      City: "Indianapolis",
      State: "IN",
      Zip: "46254",
      County: "sagittis",
    },
    Telephone: "317-440-9970",
    Email: "llammas4@wiley.com",
    CSD: 9,
    CPD: 14,
    CD: 14,
    AD: 18,
    SD: 23,
  },
  {
    id: 6,
    SiteName: "Fahey LLC",
    SiteID: "2VgxpVfFgNbe",
    SiteMngr: "Sidney Nussey",
    Adress: {
      StreetAdrs: "04309 Clyde Gallagher Circle",
      City: "Albany",
      State: "NY",
      Zip: "12210",
      County: "cursus urna",
    },
    Telephone: "518-859-6513",
    Email: "snussey5@amazon.com",
    CSD: 17,
    CPD: 20,
    CD: 14,
    AD: 6,
    SD: 14,
  },
  {
    id: 7,
    SiteName: "Ernser, Sanford and Ortiz",
    SiteID: "mfCq3XZ",
    SiteMngr: "Horton Jozwik",
    Adress: {
      StreetAdrs: "32481 David Crossing",
      City: "Kansas City",
      State: "MO",
      Zip: "64130",
      County: "ut nulla",
    },
    Telephone: "816-920-5001",
    Email: "hjozwik6@usa.gov",
    CSD: 24,
    CPD: 9,
    CD: 1,
    AD: 22,
    SD: 7,
  },
  {
    id: 8,
    SiteName: "Mertz Inc",
    SiteID: "5Won8rSWMce7",
    SiteMngr: "Griffie Wiz",
    Adress: {
      StreetAdrs: "95 Lerdahl Crossing",
      City: "Raleigh",
      State: "NC",
      Zip: "27635",
      County: "mauris morbi",
    },
    Telephone: "919-612-7338",
    Email: "gwiz7@upenn.edu",
    CSD: 3,
    CPD: 12,
    CD: 25,
    AD: 20,
    SD: 15,
  },
  {
    id: 9,
    SiteName: "Jacobs LLC",
    SiteID: "6JFL8qx7wwc",
    SiteMngr: "Corbet Celler",
    Adress: {
      StreetAdrs: "6 Fordem Point",
      City: "El Paso",
      State: "TX",
      Zip: "88519",
      County: "porta",
    },
    Telephone: "915-535-2481",
    Email: "cceller8@cornell.edu",
    CSD: 13,
    CPD: 6,
    CD: 13,
    AD: 14,
    SD: 2,
  },
  {
    id: 10,
    SiteName: "Schaden-O'Keefe",
    SiteID: "hoEK7h",
    SiteMngr: "Catherin Macconaghy",
    Adress: {
      StreetAdrs: "5768 Lyons Center",
      City: "New York City",
      State: "NY",
      Zip: "10014",
      County: "blandit",
    },
    Telephone: "718-445-2101",
    Email: "cmacconaghy9@usatoday.com",
    CSD: 4,
    CPD: 13,
    CD: 25,
    AD: 10,
    SD: 20,
  },
  {
    id: 11,
    SiteName: "Kris-Hegmann",
    SiteID: "JiEDuR",
    SiteMngr: "Venita Gehrels",
    Adress: {
      StreetAdrs: "7978 Tony Parkway",
      City: "Schenectady",
      State: "NY",
      Zip: "12325",
      County: "eros",
    },
    Telephone: "518-134-6493",
    Email: "vgehrelsa@sciencedaily.com",
    CSD: 4,
    CPD: 13,
    CD: 11,
    AD: 12,
    SD: 8,
  },
  {
    id: 12,
    SiteName: "Bogisich-Brekke",
    SiteID: "wbm1h09zm2W",
    SiteMngr: "Derwin Hollingby",
    Adress: {
      StreetAdrs: "142 Starling Point",
      City: "Dallas",
      State: "TX",
      Zip: "75260",
      County: null,
    },
    Telephone: "214-538-1686",
    Email: "dhollingbyb@europa.eu",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 13,
    SiteName: "Lehner-Gottlieb",
    SiteID: "bdjEg4h9",
    SiteMngr: "Hervey Boniface",
    Adress: {
      StreetAdrs: "16194 Lukken Plaza",
      City: "Houston",
      State: "TX",
      Zip: "77065",
      County: null,
    },
    Telephone: "281-160-0022",
    Email: "hbonifacec@hubpages.com",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 14,
    SiteName: "Kuvalis LLC",
    SiteID: "8zZXmPtU",
    SiteMngr: "Kore Crossby",
    Adress: {
      StreetAdrs: "68420 Petterle Plaza",
      City: "Austin",
      State: "TX",
      Zip: "78759",
      County: "a",
    },
    Telephone: "512-917-8724",
    Email: "kcrossbyd@ucoz.ru",
    CSD: 19,
    CPD: 7,
    CD: 7,
    AD: 13,
    SD: 9,
  },
  {
    id: 15,
    SiteName: "Kub LLC",
    SiteID: "lkYRR101ptE",
    SiteMngr: "Cornelle Meriot",
    Adress: {
      StreetAdrs: "52461 Donald Hill",
      City: "Birmingham",
      State: "AL",
      Zip: "35295",
      County: "amet consectetuer",
    },
    Telephone: "205-349-3674",
    Email: "cmeriote@wix.com",
    CSD: 1,
    CPD: 18,
    CD: 20,
    AD: 3,
    SD: 23,
  },
  {
    id: 16,
    SiteName: "Bernhard Group",
    SiteID: "EgGVHzodpOw",
    SiteMngr: "Anthiathia Pigny",
    Adress: {
      StreetAdrs: "840 2nd Terrace",
      City: "Shreveport",
      State: "LA",
      Zip: "71105",
      County: "non quam",
    },
    Telephone: "318-302-1810",
    Email: "apignyf@1und1.de",
    CSD: 12,
    CPD: 20,
    CD: 20,
    AD: 15,
    SD: 21,
  },
  {
    id: 17,
    SiteName: "Lang, Stiedemann and Wiza",
    SiteID: "cUQrfoHDKng",
    SiteMngr: "Adel Brimmacombe",
    Adress: {
      StreetAdrs: "16227 Russell Hill",
      City: "Seattle",
      State: "WA",
      Zip: "98121",
      County: null,
    },
    Telephone: "253-758-0311",
    Email: "abrimmacombeg@taobao.com",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 18,
    SiteName: "Bartell Group",
    SiteID: "oQpwhd",
    SiteMngr: "Bowie Busch",
    Adress: {
      StreetAdrs: "2 Namekagon Pass",
      City: "Cape Coral",
      State: "FL",
      Zip: "33915",
      County: "quisque porta",
    },
    Telephone: "239-263-4293",
    Email: "bbuschh@yelp.com",
    CSD: 1,
    CPD: 7,
    CD: 15,
    AD: 16,
    SD: 5,
  },
  {
    id: 19,
    SiteName: "Collins-Marks",
    SiteID: "0F92fAA1",
    SiteMngr: "Harcourt Grewcock",
    Adress: {
      StreetAdrs: "2168 Westend Point",
      City: "San Jose",
      State: "CA",
      Zip: "95194",
      County: "consequat lectus",
    },
    Telephone: "408-722-3272",
    Email: "hgrewcocki@aol.com",
    CSD: 25,
    CPD: 15,
    CD: 21,
    AD: 15,
    SD: 24,
  },
  {
    id: 20,
    SiteName: "Ratke, Schuster and Schuppe",
    SiteID: "xLmmX04Ls",
    SiteMngr: "Lisetta McLagan",
    Adress: {
      StreetAdrs: "27 Dapin Circle",
      City: "Los Angeles",
      State: "CA",
      Zip: "90081",
      County: "curabitur convallis",
    },
    Telephone: "213-189-4862",
    Email: "lmclaganj@cafepress.com",
    CSD: 19,
    CPD: 19,
    CD: 13,
    AD: 6,
    SD: 22,
  },
  {
    id: 21,
    SiteName: "Koch-Koss",
    SiteID: "lUg83yu38F",
    SiteMngr: "Joane Laroze",
    Adress: {
      StreetAdrs: "48 Kenwood Parkway",
      City: "Kansas City",
      State: "KS",
      Zip: "66160",
      County: "eu orci",
    },
    Telephone: "913-196-3411",
    Email: "jlarozek@drupal.org",
    CSD: 3,
    CPD: 25,
    CD: 7,
    AD: 9,
    SD: 12,
  },
  {
    id: 22,
    SiteName: "Wisozk LLC",
    SiteID: "tDguvwy3",
    SiteMngr: "Griff Cord",
    Adress: {
      StreetAdrs: "43877 Parkside Trail",
      City: "Milwaukee",
      State: "WI",
      Zip: "53210",
      County: "non",
    },
    Telephone: "414-607-6116",
    Email: "gcordl@flickr.com",
    CSD: 10,
    CPD: 15,
    CD: 6,
    AD: 2,
    SD: 2,
  },
  {
    id: 23,
    SiteName: "Hand, Maggio and Steuber",
    SiteID: "RIflZCY",
    SiteMngr: "Ignace Fanshawe",
    Adress: {
      StreetAdrs: "4050 Hovde Center",
      City: "Nashville",
      State: "TN",
      Zip: "37245",
      County: null,
    },
    Telephone: "615-123-3658",
    Email: "ifanshawem@chron.com",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 24,
    SiteName: "Kuphal-Kuhn",
    SiteID: "shh3GXF",
    SiteMngr: "Mab Tace",
    Adress: {
      StreetAdrs: "23727 Lukken Street",
      City: "Carson City",
      State: "NV",
      Zip: "89706",
      County: null,
    },
    Telephone: "775-867-8529",
    Email: "mtacen@multiply.com",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 25,
    SiteName: "Goodwin-Jast",
    SiteID: "l1clsii6roz",
    SiteMngr: "Kristal Teare",
    Adress: {
      StreetAdrs: "41 Stuart Park",
      City: "Bridgeport",
      State: "CT",
      Zip: "06673",
      County: null,
    },
    Telephone: "203-846-2599",
    Email: "kteareo@squidoo.com",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 26,
    SiteName: "Hegmann and Sons",
    SiteID: "MzCGvM7DM",
    SiteMngr: "Stephie Weatherburn",
    Adress: {
      StreetAdrs: "792 Mallard Street",
      City: "Tallahassee",
      State: "FL",
      Zip: "32304",
      County: "dui vel",
    },
    Telephone: "850-420-7014",
    Email: "sweatherburnp@amazon.com",
    CSD: 25,
    CPD: 25,
    CD: 11,
    AD: 10,
    SD: 3,
  },
  {
    id: 27,
    SiteName: "Kuphal, Stokes and Simonis",
    SiteID: "YHwa2oDf",
    SiteMngr: "Dean Gonin",
    Adress: {
      StreetAdrs: "630 2nd Circle",
      City: "Cumming",
      State: "GA",
      Zip: "30130",
      County: "enim lorem",
    },
    Telephone: "706-647-7424",
    Email: "dgoninq@statcounter.com",
    CSD: 3,
    CPD: 16,
    CD: 25,
    AD: 16,
    SD: 9,
  },
  {
    id: 28,
    SiteName: "Marquardt, Waters and Gorczany",
    SiteID: "MsKg59Muvmkf",
    SiteMngr: "Antin Birtwisle",
    Adress: {
      StreetAdrs: "9 Heath Lane",
      City: "Dallas",
      State: "TX",
      Zip: "75342",
      County: "convallis",
    },
    Telephone: "469-223-6741",
    Email: "abirtwisler@naver.com",
    CSD: 16,
    CPD: 18,
    CD: 12,
    AD: 22,
    SD: 14,
  },
  {
    id: 29,
    SiteName: "Wunsch, Paucek and Rodriguez",
    SiteID: "BQTfF3k9cWz",
    SiteMngr: "Austen Brightling",
    Adress: {
      StreetAdrs: "1213 Meadow Ridge Circle",
      City: "San Diego",
      State: "CA",
      Zip: "92165",
      County: "posuere metus",
    },
    Telephone: "619-339-4800",
    Email: "abrightlings@chicagotribune.com",
    CSD: 16,
    CPD: 20,
    CD: 25,
    AD: 12,
    SD: 9,
  },
  {
    id: 30,
    SiteName: "Lind, Skiles and Lueilwitz",
    SiteID: "tqjDOIL",
    SiteMngr: "Jesse Baack",
    Adress: {
      StreetAdrs: "219 Orin Pass",
      City: "Evansville",
      State: "IN",
      Zip: "47747",
      County: null,
    },
    Telephone: "812-881-2179",
    Email: "jbaackt@ocn.ne.jp",
    CSD: null,
    CPD: null,
    CD: null,
    AD: null,
    SD: null,
  },
  {
    id: 31,
    SiteName: "Crist and Sons",
    SiteID: "US48YD8fM",
    SiteMngr: "Jerri Dobrovolski",
    Adress: {
      StreetAdrs: "078 Fieldstone Parkway",
      City: "Nashville",
      State: "TN",
      Zip: "37235",
      County: "sollicitudin",
    },
    Telephone: "615-551-8581",
    Email: "jdobrovolskiu@umich.edu",
    CSD: 25,
    CPD: 4,
    CD: 14,
    AD: 22,
    SD: 15,
  },
  {
    id: 32,
    SiteName: "Volkman, Altenwerth and Schmitt",
    SiteID: "IIvtMxw8g",
    SiteMngr: "Falito Ehlerding",
    Adress: {
      StreetAdrs: "5343 Hollow Ridge Circle",
      City: "Metairie",
      State: "LA",
      Zip: "70033",
      County: "primis in",
    },
    Telephone: "504-839-8545",
    Email: "fehlerdingv@ucla.edu",
    CSD: 20,
    CPD: 14,
    CD: 18,
    AD: 5,
    SD: 14,
  },
  {
    id: 33,
    SiteName: "Bechtelar-Green",
    SiteID: "CUph3eL",
    SiteMngr: "Elfrieda Bewshea",
    Adress: {
      StreetAdrs: "58075 Ridgeview Court",
      City: "Topeka",
      State: "KS",
      Zip: "66606",
      County: "vulputate",
    },
    Telephone: "785-664-4510",
    Email: "ebewsheaw@dagondesign.com",
    CSD: 10,
    CPD: 3,
    CD: 16,
    AD: 11,
    SD: 12,
  },
  {
    id: 34,
    SiteName: "Medhurst, Schimmel and Reichert",
    SiteID: "Ex3c7PNcA1",
    SiteMngr: "Camila Phillot",
    Adress: {
      StreetAdrs: "42 International Pass",
      City: "Allentown",
      State: "PA",
      Zip: "18105",
      County: "primis in",
    },
    Telephone: "610-782-7809",
    Email: "cphillotx@auda.org.au",
    CSD: 17,
    CPD: 11,
    CD: 20,
    AD: 25,
    SD: 20,
  },
  {
    id: 35,
    SiteName: "Mueller-Hilll",
    SiteID: "wkv9UwqCBWX",
    SiteMngr: "Wandis Vivien",
    Adress: {
      StreetAdrs: "83180 John Wall Hill",
      City: "Southfield",
      State: "MI",
      Zip: "48076",
      County: "aliquet",
    },
    Telephone: "810-404-5733",
    Email: "wvivieny@abc.net.au",
    CSD: 8,
    CPD: 17,
    CD: 8,
    AD: 6,
    SD: 7,
  },
  {
    id: 36,
    SiteName: "Bosco-Cummings",
    SiteID: "Xv8IO913",
    SiteMngr: "Patrick Hymor",
    Adress: {
      StreetAdrs: "198 Oxford Terrace",
      City: "Everett",
      State: "WA",
      Zip: "98206",
      County: "etiam pretium",
    },
    Telephone: "425-673-9051",
    Email: "phymorz@over-blog.com",
    CSD: 13,
    CPD: 19,
    CD: 14,
    AD: 9,
    SD: 24,
  },
  {
    id: 37,
    SiteName: "Roob Group",
    SiteID: "HXg8E3I16T",
    SiteMngr: "Hamel Gemson",
    Adress: {
      StreetAdrs: "39623 Springs Circle",
      City: "Fort Lauderdale",
      State: "FL",
      Zip: "33305",
      County: "donec",
    },
    Telephone: "954-107-3836",
    Email: "hgemson10@state.gov",
    CSD: 16,
    CPD: 16,
    CD: 10,
    AD: 15,
    SD: 15,
  },
  {
    id: 38,
    SiteName: "Abbott, Gibson and Bailey",
    SiteID: "QkRHmFulsO9Q",
    SiteMngr: "Gwenny Beggini",
    Adress: {
      StreetAdrs: "66249 Melvin Street",
      City: "Youngstown",
      State: "OH",
      Zip: "44555",
      County: "odio",
    },
    Telephone: "330-857-5524",
    Email: "gbeggini11@state.tx.us",
    CSD: 12,
    CPD: 25,
    CD: 24,
    AD: 1,
    SD: 10,
  },
  {
    id: 39,
    SiteName: "Lesch-Hintz",
    SiteID: "6uViMd",
    SiteMngr: "Inger Wynter",
    Adress: {
      StreetAdrs: "8181 Nancy Court",
      City: "Norcross",
      State: "GA",
      Zip: "30092",
      County: "aliquam",
    },
    Telephone: "678-818-4985",
    Email: "iwynter12@tuttocitta.it",
    CSD: 10,
    CPD: 23,
    CD: 13,
    AD: 22,
    SD: 25,
  },
  {
    id: 40,
    SiteName: "Dach, Armstrong and Harvey",
    SiteID: "JQioUp7q",
    SiteMngr: "Sayre Ostick",
    Adress: {
      StreetAdrs: "1180 Anniversary Point",
      City: "Las Vegas",
      State: "NV",
      Zip: "89125",
      County: "nam",
    },
    Telephone: "702-735-3714",
    Email: "sostick13@wp.com",
    CSD: 9,
    CPD: 6,
    CD: 20,
    AD: 13,
    SD: 11,
  },
];

const placeholderList = [
  "Site Name",
  "Site Manager",
  "Street Address",
  "City",
  "State",
  "ZIP",
  "County",
  "Phone",
  "Email",
];

const headerList = [
  "id",
  "Site Name",
  "Site ID",
  "Site Manager",
  "Address",
  "County",
  "Phone",
  "Email",
];

const labelList = [
  "id",
  "Site Name",
  "Site ID",
  "Site Manager",
  "Street Address",
  "City",
  "State",
  "ZIP",
  "County",
  "Phone",
  "Email",
  "CSD",
  "CPD",
  "CD",
  "AD",
  "SD",
];
const dataSites = sitesDataServer.slice(0);
const countyList = countyData.slice(0);
const labelObj = {
  ID: "ID",
  AgencyID: "agencyId",
  SiteID: "Site ID",
  SiteName: "Site Name",
  SiteManager: "Manager",
  Address: "Address",
  City: "City",
  State: "State",
  Zip: "ZIP",
  County: "County",
  Telephone: "Phone",
  SiteEmail: "Email",
  CSD: "Community School Dist.",
  CPD: "Community Planning Dist.",
  CD: "Congressional Dist.",
  AD: "Assembly Dist.",
  SD: "Senatorial Dist.",
};

const createNewSite = () => {
  for (let i = 0; i < placeholderList.length; i++) {
    const newLine = "";

    $("#new-site").append(`${newLine}<input
    type="text"
    class="form-control"
    placeholder='${placeholderList[i]}'
    required
  />`);
  }

  $("#new-site").append(
    `<button type="submit" id="submit-btn" class="btn btn-primary">Add New Site</button>`
  );
};

const createViewBloc = (dataObj, labels) => {
  const excludedLabels = [
    "ID",
    "AgencyID",
    "City",
    "State",
    "Zip",
    "CSD",
    "CPD",
    "CD",
    "AD",
    "SD",
  ];

  const labelList = Object.keys(labels)
    .filter((key) => !excludedLabels.includes(key))
    .map((key) => labels[key]);

  const bodyLabelList = labelList
    .slice(0, 4)
    .concat(["City", "State", "ZIP"], labelList.slice(4));

  // createHeaders() <== helperFunctions()
  const headerLine = createHeaders(labelList);
  const tableBody = createBody(dataObj, bodyLabelList);
  // const tableBody = "<h2>Table Body</h2>";
  $("#view-bloc").append(
    `<table class="table">${headerLine}${tableBody}</table>`
  );

  // Elements hidden so they are included in the selection used to
  // create the modal form for editing.
  $(".City, .State, .Zip").toggleClass("hidden");
};

const createListFields = (num) => {
  const selectedRecord = sitesData.filter((record) => record.id === num);
  const flattenedRecord = flatten(selectedRecord);
  const keyList = Object.keys(flattenedRecord);
  const list = keyList.map((key, indx) => [
    key,
    labelList[indx],
    flattenedRecord[key],
  ]);

  return list;
};

$(document).ready(() => {
  // * sub-navbar/index.js
  $("#sub-nav li").click(function () {
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  //* Back to Top button
  const btnToTop = $("#btn-top");
  $("window").scroll(() => {
    btnToTop.style.display =
      $("window").scrollTop() > 600 || $("body".scrollTop() > 600)
        ? "inline-block"
        : "none";
  });
  btnToTop.click((e) => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "600");
  });

  // * data viewing
  // createNewSite();
  // viewHeaders();
  // viewData(sitesData);

  createViewBloc(dataSites, labelObj);

  // //* Adding a new site

  // //* Select site
  $("[title^='click'").click(function () {
    const rowID = Number($(this).attr("id"));
    const listFields = createListFields(rowID);
    $("#modalBloc").modal("toggle");
    $(".modal-body form").remove();
    $(".modal-body").append("<form id='modal-form'></form>");

    for (field of listFields) {
      const key = field[1],
        idVal = field[0];
      let option = "",
        classOption = "",
        val = field[2];

      if (["id", "SiteID"].includes(idVal)) option = "disabled";
      if (placeholderList.includes(key)) classOption = "class='red-text'";
      if (!val) val = "";
      $(".modal-body>form").append(
        `<div class="input-field">
            <label for=${idVal} ${classOption}>${key}</label>
            <input type="text" id=${idVal} value='${val}' ${option}>
          </div>`
      );
    }
  });

  // //* Deleting source
});
