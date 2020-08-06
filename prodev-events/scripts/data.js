// This object is the source for look up event dropdown on profdev_info page
// After select, ID value is passed to GetRoster stored procedure

const ProfDevEventsRoster = [
  {
    ProfDevActivityID: "PRA12112014_4015",
    ID: 4015,
    ActNameDesc: "Asists - 12/11/14"
  },
  {
    ProfDevActivityID: "PRA08052017_8898",
    ID: 8898,
    ActNameDesc: "ASISTS Build 10.4  - 08/05/17"
  },
  {
    ProfDevActivityID: "PRA02282010_153",
    ID: 153,
    ActNameDesc: "asists Data entry Training - 02/28/10"
  },
  {
    ProfDevActivityID: "PRA08162016_8932",
    ID: 8932,
    ActNameDesc: "ASISTS Training 2.0 - 08/16/16"
  },
  {
    ProfDevActivityID: "PRA08162016_8933",
    ID: 8933,
    ActNameDesc: "ASISTS Training 2.0 - 08/16/16"
  }
];

// This object is the source for form on profdev_info page
// ID value from dropdown is passed to GetProvDevInfo stored procedure

const ProfDevEventsInfo = [
  {
    ID: "4015",
    ProfDevActivityName: "Asists",
    ProfDevDescription: "morning",
    ProfDevDate: "12/11/2014",
    ProfDevProviderID: "528",
    ProfDevFY: "2014",
    ProfDevCategoryID: "53",
    ProfDevSubjectID: "1",
    ProfDevHours: "",
    ProfDevLocationID: "46",
    ProfDevFacilitator1: "1026",
    ProfDevFacilitator2: "2184",
    ProfDevFacilitator3: "2160",
    ProfDevFeeCharged: "",
    RAENEvent: "0",
    ProfDevComments: "",
    ProfDevTimeFrom: "",
    ProfDevTimeTo: ""
  },
  {
    ID: "4321",
    ProfDevActivityName: "ASISTS for Beginners",
    ProfDevDescription: "afternoon",
    ProfDevDate: "11/01/2016",
    ProfDevProviderID: "959",
    ProfDevFY: "2017",
    ProfDevCategoryID: "26",
    ProfDevSubjectID: "",
    ProfDevHours: "7",
    ProfDevLocationID: "1591",
    ProfDevFacilitator1: "2305",
    ProfDevFacilitator2: "",
    ProfDevFacilitator3: "",
    ProfDevFeeCharged: "500.00",
    RAENEvent: "1",
    ProfDevComments: "Great training.",
    ProfDevTimeFrom: "9:00AM",
    ProfDevTimeTo: "5:00PM"
  },
  {
    ID: "4322",
    ProfDevActivityName: "How to grade TABE11/12",
    ProfDevDescription: "morning",
    ProfDevDate: "12/11/2016",
    ProfDevProviderID: "528",
    ProfDevFY: "2017",
    ProfDevCategoryID: "1",
    ProfDevSubjectID: "",
    ProfDevHours: "3",
    ProfDevLocationID: "46",
    ProfDevFacilitator1: "1026",
    ProfDevFacilitator2: "",
    ProfDevFacilitator3: "",
    ProfDevFeeCharged: "",
    RAENEvent: "0",
    ProfDevComments: "",
    ProfDevTimeFrom: "9AM",
    ProfDevTimeTo: "12PM"
  },
  {
    ID: "4323",
    ProfDevActivityName: "ASISTS Reporting 101",
    ProfDevDescription: "afternoon",
    ProfDevDate: "12/05/2017",
    ProfDevProviderID: "959",
    ProfDevFY: "2018",
    ProfDevCategoryID: "26",
    ProfDevSubjectID: "",
    ProfDevHours: "7",
    ProfDevLocationID: "1591",
    ProfDevFacilitator1: "1",
    ProfDevFacilitator2: "2184",
    ProfDevFacilitator3: "",
    ProfDevFeeCharged: "500.00",
    RAENEvent: "1",
    ProfDevComments: "Great training.",
    ProfDevTimeFrom: "9:00AM",
    ProfDevTimeTo: "5:00PM"
  },
  {
    ID: "4324",
    ProfDevActivityName: "Better lesson plans for ESOL",
    ProfDevDescription: "morning",
    ProfDevDate: "02/11/2017",
    ProfDevProviderID: "992",
    ProfDevFY: "2017",
    ProfDevCategoryID: "53",
    ProfDevSubjectID: "5",
    ProfDevHours: "3",
    ProfDevLocationID: "1",
    ProfDevFacilitator1: "2305",
    ProfDevFacilitator2: "",
    ProfDevFacilitator3: "",
    ProfDevFeeCharged: "",
    RAENEvent: "0",
    ProfDevComments: "",
    ProfDevTimeFrom: "9AM",
    ProfDevTimeTo: "12PM"
  },
  {
    ID: "4325",
    ProfDevActivityName: "ASISTS Reporting 102",
    ProfDevDescription: "afternoon",
    ProfDevDate: "01/05/2018",
    ProfDevProviderID: "992",
    ProfDevFY: "2018",
    ProfDevCategoryID: "52",
    ProfDevSubjectID: "5",
    ProfDevHours: "7",
    ProfDevLocationID: "1591",
    ProfDevFacilitator1: "1",
    ProfDevFacilitator2: "",
    ProfDevFacilitator3: "",
    ProfDevFeeCharged: "500.00",
    RAENEvent: "1",
    ProfDevComments: "Great training.",
    ProfDevTimeFrom: "9:00AM",
    ProfDevTimeTo: "5:00PM"
  }
];

// This object is the source for table on profdev_roster page
// ID value from dropdown is passed to GetProvDevRoster stored procedure
// Key ID fields have been included

const ProfDevRoster = [
  {
    ID: "20828",
    AgencyID: "PRA",
    PDActivity_PKID: "4015",
    Personnel_PKID: "24224",
    PersonnelID: "cuesuzyPRA14",
    Name: "cue, suzy",
    Date: "12/11/2014",
    Attended: "True",
    FeesPaid: "False"
  },
  {
    ID: "20827",
    AgencyID: "PRA",
    PDActivity_PKID: "4015",
    Personnel_PKID: "23853",
    PersonnelID: "DainMichillePRA19",
    Name: "Dains, Michille",
    Date: "12/11/2014",
    Attended: "True",
    FeesPaid: "False"
  },
  {
    ID: "20829",
    AgencyID: "PRA",
    PDActivity_PKID: "4015",
    Personnel_PKID: "23433",
    PersonnelID: "Thomas # 13MarcellasPRA9",
    Name: "Thomas # 13, Marcellas",
    Date: "12/11/2014",
    Attended: "False",
    FeesPaid: "False"
  },
  {
    ID: "20831",
    AgencyID: "PRA",
    PDActivity_PKID: "4015",
    Personnel_PKID: "24228",
    PersonnelID: "JonesTomPRA14",
    Name: "Jones, Tom",
    Date: "12/11/2014",
    Attended: "True",
    FeesPaid: "True"
  },
  {
    ID: "20835",
    AgencyID: "HUN",
    PDActivity_PKID: "4015",
    Personnel_PKID: "24229",
    PersonnelID: "SmithTomTEST214",
    Name: "Smith, Tom",
    Date: "12/11/2014",
    Attended: "True",
    FeesPaid: "False"
  }
];

//!  Do not Use -
// const  ProfDevRoster =[
//   {"ID":"20828","AgencyID":"PRA","PersonnelID":"cuesuzyPRA14","Name":"cue, suzy","Date":"12/11/2014","Attended":"True","FeesPaid":"False"},{"ID":"20827","AgencyID":"PRA","PersonnelID":"DainMichillePRA19","Name":"Dains, Michille","Date":"12/11/2014","Attended":"True","FeesPaid":"False"},
//   {"ID":"20831","AgencyID":"PRA","PersonnelID":"JonesTomPRA14","Name":"Jones, Tom","Date":"12/11/2014","Attended":"True","FeesPaid":"True"},{"ID":"20829","AgencyID":"PRA","PersonnelID":"Thomas # 13MarcellasPRA9","Name":"Thomas # 13, Marcellas","Date":"12/11/2014","Attended":"False","FeesPaid":"False"}
//   ]

// This object is the source for Region dropdown on add new attendee on profdev_roster page
// After select, ID value is passed to GetAgency stored procedure to filter agency list

const Region = [
  { RAENID: "CN", RegionName: "CN" },
  { RAENID: "CST", RegionName: "CST" },
  { RAENID: "FL", RegionName: "FL" },
  { RAENID: "HV", RegionName: "HV" },
  { RAENID: "LI", RegionName: "LI" },
  { RAENID: "NY", RegionName: "NY" },
  { RAENID: "NYSED", RegionName: "NYSED" },
  { RAENID: "TEST", RegionName: "TEST" },
  { RAENID: "WEST", RegionName: "WEST" }
];

// This object is the source for Agency dropdown on add new attendee on profdev_roster page
// After select, ID value is passed to GetStaff stored procedure to filter personnel name list

// const Agency = [
//   {"AgencyID":"PRA","AgencyName":"Practice Agency","RAENID":"NY"},
//   {"AgencyID":"TEST1","AgencyName":"Test Agency 1","RAENID":"NY"},
//   {"AgencyID":"TEST2","AgencyName":"Test Agency 2", "RAENID":"WEST"},
//   {"AgencyID":"TEST3","AgencyName":"Test Agency 3","RAENID":"LI"}
//   ]

const Agency = [
  { RAENID: "TEST", AgencyID: "PRA", AgencyName: "Practice Agency" },
  {
    RAENID: "CST",
    AgencyID: "ACSD",
    AgencyName: "Afton Consortium of Schools"
  },
  { RAENID: "CST", AgencyID: "BTEB", AgencyName: "Broome-Tioga BOCES" },
  {
    RAENID: "CST",
    AgencyID: "RNMDS",
    AgencyName: "Central Southern Tier RAEN"
  },
  { RAENID: "CST", AgencyID: "BRTL", AgencyName: "LVA Broome/Tioga Cos. Inc." },
  { RAENID: "CST", AgencyID: "CHEL", AgencyName: "LVA Chenango County" },
  { RAENID: "CST", AgencyID: "MOCB", AgencyName: "Madison-Oneida BOCES" },
  {
    RAENID: "CST",
    AgencyID: "ONMB",
    AgencyName: "Onondaga Cortland Madison BOCES"
  },
  {
    RAENID: "CST",
    AgencyID: "SESD",
    AgencyName: "Syracuse City School District"
  },
  { RAENID: "CST", AgencyID: "UCSD", AgencyName: "Utica City School District" },
  {
    RAENID: "NY",
    AgencyID: "HOS",
    AgencyName: "CUNY Hostos Community College"
  },
  { RAENID: "NY", AgencyID: "HUN", AgencyName: "CUNY Hunter College" },
  {
    RAENID: "NY",
    AgencyID: "KCC",
    AgencyName: "CUNY Kingsborough Community College"
  },
  { RAENID: "NY", AgencyID: "RBWK", AgencyName: "Make the Road New York" },
  { RAENID: "NY", AgencyID: "RNNY", AgencyName: "New York City RAEN" },
  { RAENID: "NY", AgencyID: "NYPL", AgencyName: "NYPL/ALC" },
  { RAENID: "NY", AgencyID: "RLI", AgencyName: "NYPL/ESOL" },
  { RAENID: "NY", AgencyID: "R08", AgencyName: "Region 8" },
  { RAENID: "NY", AgencyID: "QCE", AgencyName: "QBPL Central Library" },
  { RAENID: "NY", AgencyID: "B07", AgencyName: "BPL Central ESOL Program" },
  { RAENID: "NY", AgencyID: "B08", AgencyName: "BPL Pre-HSE Program" }
];

// This object is the source for Personnel Name dropdown on add new attendee on profdev_roster page
// After select, ID and PersonnelID values should be saved to database
// PersonnelID is saved for legacy queries

// const Staff = [
// {"ID":"","PersonnelID":"","Name":""},
// {"ID":"28555","PersonnelID":"AlfieriShelleyPRA1","Name":"Alfieri, Shelley"},
// {"ID":"24386","PersonnelID":"AlisovaMurianaPRA9","Name":"Alisova, Muriana"},
// {"ID":"24234","PersonnelID":"BarnesJuliaPRA14","Name":"Barnes, Julia"},
// {"ID":"28083","PersonnelID":"PorterJanePRA9","Name":"Porter, Jane"},
// {"ID":"51033","PersonnelID":"ScottAdamPRA9","Name":"Scott, Adam"},
// {"ID":"51442","PersonnelID":"SilversRayleighPRA18","Name":"Silvers, Rayleigh"},
// {"ID":"52916","PersonnelID":"ZoroRoronoaPRA9","Name":"Zoro, Roronoa"}
// ]

const Staff = [
  { AgencyID: "", ID: "0", PersonnelID: "", Name: "" },
  {
    AgencyID: "SESD",
    ID: "44807",
    PersonnelID: "AbtDianeSESD1",
    Name: "Abt, Diane"
  },
  {
    AgencyID: "SESD",
    ID: "37422",
    PersonnelID: "AhmedDaudSESD2",
    Name: "Ahmed, Daud"
  },
  {
    AgencyID: "PRA",
    ID: "28555",
    PersonnelID: "AlfieriShelleyPRA1",
    Name: "Alfieri, Shelley"
  },
  {
    AgencyID: "PRA",
    ID: "24386",
    PersonnelID: "AlisovaMurianaPRA9",
    Name: "Alisova, Muriana"
  },
  {
    AgencyID: "MOCB",
    ID: "35780",
    PersonnelID: "BalesDavidMOCB9",
    Name: "Bales, David"
  },
  {
    AgencyID: "PRA",
    ID: "24234",
    PersonnelID: "BarnesJuliaPRA14",
    Name: "Barnes, Julia"
  },
  {
    AgencyID: "PRA",
    ID: "52310",
    PersonnelID: "BartowksiCharlesPRA9",
    Name: "Bartowksi, Charles"
  },
  {
    AgencyID: "PRA",
    ID: "51590",
    PersonnelID: "BladeSenuaPRA9",
    Name: "Blade, Senua"
  },
  {
    AgencyID: "PRA",
    ID: "51065",
    PersonnelID: "BradyTomPRA9",
    Name: "Brady, Tom"
  },
  {
    AgencyID: "SESD",
    ID: "44808",
    PersonnelID: "BuchananKarenSESD1",
    Name: "Buchanan, Karen"
  },
  {
    AgencyID: "PRA",
    ID: "33828",
    PersonnelID: "CampbellDonPRA9",
    Name: "Campbell, Don"
  },
  {
    AgencyID: "PRA",
    ID: "53190",
    PersonnelID: "CharlotinWilsonPRA18",
    Name: "Charlotin, Wilson"
  },
  {
    AgencyID: "JLWL",
    ID: "51268",
    PersonnelID: "ChristoffersonAmyJLWL18",
    Name: "Christofferson, Amy"
  },
  {
    AgencyID: "PRA",
    ID: "51261",
    PersonnelID: "CooperDalePRA18",
    Name: "Cooper, Dale"
  },
  {
    AgencyID: "PRA",
    ID: "47016",
    PersonnelID: "CooperGary PRA9",
    Name: "Cooper, Gary "
  },
  {
    AgencyID: "OSDL",
    ID: "48991",
    PersonnelID: "DavidsonEvaOSDL18",
    Name: "Davidson, Eva"
  },
  {
    AgencyID: "SESD",
    ID: "45967",
    PersonnelID: "DemauroNicoleSESD9",
    Name: "Demauro, Nicole"
  },
  {
    AgencyID: "PRA",
    ID: "46763",
    PersonnelID: "Donovan Ray PRA9",
    Name: "Donovan, Ray"
  },
  {
    AgencyID: "PRA",
    ID: "45229",
    PersonnelID: "DryjaKelly PRA9",
    Name: "Dryja, Kelly "
  },
  {
    AgencyID: "SESD",
    ID: "43060",
    PersonnelID: "DunnKarenSESD20",
    Name: "Dunn, Karen"
  },
  {
    AgencyID: "PRA",
    ID: "23847",
    PersonnelID: "EEEJLNAAPRA18",
    Name: "EEESS, JLNAA"
  },
  {
    AgencyID: "TSTB",
    ID: "52525",
    PersonnelID: "ElghaziAlissaTSTB1",
    Name: "Elghazi, Alissa"
  },
  {
    AgencyID: "TSTB",
    ID: "51880",
    PersonnelID: "EschlerNicoleTSTB6",
    Name: "Eschler, Nicole"
  },
  {
    AgencyID: "PRA",
    ID: "49708",
    PersonnelID: "FrazierClydePRA9",
    Name: "Frazier, Clyde"
  },
  {
    AgencyID: "PRA",
    ID: "1359",
    PersonnelID: "FrownJanicePRA9",
    Name: "Frown, Janice"
  },
  {
    AgencyID: "PRA",
    ID: "52619",
    PersonnelID: "FullerMartinPRA9",
    Name: "Fuller, Martin"
  },
  {
    AgencyID: "MOCB",
    ID: "52423",
    PersonnelID: "GARCIAELLENMOCB20",
    Name: "GARCIA, ELLEN"
  },
  {
    AgencyID: "ACSD",
    ID: "10527",
    PersonnelID: "GarlandMelisACSD9",
    Name: "Garland, Melissa"
  },
  {
    AgencyID: "PRA",
    ID: "27812",
    PersonnelID: "GeorgiaWashingtonPRA9",
    Name: "GEORGIA, WASHINGTON"
  },
  {
    AgencyID: "HCCB",
    ID: "51032",
    PersonnelID: "HaggertyLauraHCCB20",
    Name: "Haggerty, Laura"
  },
  {
    AgencyID: "ACSD",
    ID: "10635",
    PersonnelID: "HarveyGloriACSD9",
    Name: "Harvey, Gloria"
  },
  {
    AgencyID: "PRA",
    ID: "50951",
    PersonnelID: "HydeStevenPRA18",
    Name: "Hyde, Steven"
  },
  {
    AgencyID: "SESD",
    ID: "46942",
    PersonnelID: "JamisonAmandaSESD9",
    Name: "Jamison, Amanda"
  },
  {
    AgencyID: "PRA",
    ID: "44988",
    PersonnelID: "JohnLauraPRA9",
    Name: "John, Laura"
  },
  {
    AgencyID: "PRA",
    ID: "53184",
    PersonnelID: "JohnsonNormaPRA2",
    Name: "Johnson, Norma"
  },
  {
    AgencyID: "PRA",
    ID: "47045",
    PersonnelID: "jonesfredPRA9",
    Name: "jones, fred"
  },
  {
    AgencyID: "PRA",
    ID: "51968",
    PersonnelID: "JonesYogaPRA9",
    Name: "Jones, Yoga"
  },
  {
    AgencyID: "MOCB",
    ID: "47498",
    PersonnelID: "Kabil-CvijanovicAidaMOCB2",
    Name: "Kabil-Cvijanovic, Aida"
  },
  {
    AgencyID: "PRA",
    ID: "49118",
    PersonnelID: "KenobiGeneralPRA18",
    Name: "Kenobi, General"
  },
  {
    AgencyID: "OCCB",
    ID: "52532",
    PersonnelID: "KimballKarenOCCB1",
    Name: "Kimball, Karen"
  },
  {
    AgencyID: "SESD",
    ID: "32045",
    PersonnelID: "KingPatriciaSESD2",
    Name: "King, Patricia"
  },
  {
    AgencyID: "TOML",
    ID: "50981",
    PersonnelID: "KowalskiJoannTOML14",
    Name: "Kowalski, Joann"
  },
  {
    AgencyID: "TOML",
    ID: "52527",
    PersonnelID: "LaMorteDawnTOML20",
    Name: "LaMorte, Dawn"
  },
  {
    AgencyID: "SESD",
    ID: "33689",
    PersonnelID: "LangdonGinnySESD9",
    Name: "Langdon, Ginny"
  },
  {
    AgencyID: "SESD",
    ID: "2016",
    PersonnelID: "LockeAngelSESD9",
    Name: "Locke, Angela"
  },
  {
    AgencyID: "HCCB",
    ID: "40163",
    PersonnelID: "LuppinoCorneliaHCCB8",
    Name: "Luppino, Cornelia"
  },
  {
    AgencyID: "PRA",
    ID: "25120",
    PersonnelID: "MacAlinneyMARYPRA9",
    Name: "MacAlinney, MARY"
  },
  {
    AgencyID: "PRA",
    ID: "38951",
    PersonnelID: "McConnell07GracePRA9",
    Name: "McConnell07, Grace"
  },
  {
    AgencyID: "PRA",
    ID: "35612",
    PersonnelID: "mehmetayferPRA9",
    Name: "mehmet, ayfer"
  },
  {
    AgencyID: "PRA",
    ID: "50202",
    PersonnelID: "MelfiJenniferPRA14",
    Name: "Melfi, Jennifer"
  },
  {
    AgencyID: "OSWL",
    ID: "51649",
    PersonnelID: "MillsChristinaOSWL18",
    Name: "Mills, Christina"
  },
  {
    AgencyID: "COCB",
    ID: "51816",
    PersonnelID: "MoralesDeborahCOCB9",
    Name: "Morales, Deborah"
  },
  {
    AgencyID: "SESD",
    ID: "45755",
    PersonnelID: "NicholsTerrySESD1",
    Name: "Nichols, Terry"
  },
  {
    AgencyID: "PRA",
    ID: "44987",
    PersonnelID: "PeetTammy PRA10",
    Name: "Peet, Tammy "
  },
  {
    AgencyID: "GSYL",
    ID: "51360",
    PersonnelID: "PlonyDoreenGSYL13",
    Name: "Plony, Doreen"
  },
  {
    AgencyID: "PRA",
    ID: "28083",
    PersonnelID: "PorterJanePRA9",
    Name: "Porter, Jane"
  },
  {
    AgencyID: "MOCB",
    ID: "29677",
    PersonnelID: "RoseAmeliaMOCB18",
    Name: "Rose, Amelia"
  },
  {
    AgencyID: "PRA",
    ID: "51033",
    PersonnelID: "ScottAdamPRA9",
    Name: "Scott, Adam"
  },
  {
    AgencyID: "PRA",
    ID: "51442",
    PersonnelID: "SilversRayleighPRA18",
    Name: "Silvers, Rayleigh"
  },
  {
    AgencyID: "PRA",
    ID: "24202",
    PersonnelID: "SinesKellyPRA18",
    Name: "Sines, Kelly"
  },
  {
    AgencyID: "PRA",
    ID: "51884",
    PersonnelID: "SmithJonPRA9",
    Name: "Smith, Jon"
  },
  {
    AgencyID: "PRA",
    ID: "47093",
    PersonnelID: "SmithMaryPRA9",
    Name: "Smith, Mary"
  },
  {
    AgencyID: "PRA",
    ID: "2233",
    PersonnelID: "SmithSharonPRA9",
    Name: "Smith, Sharon"
  },
  {
    AgencyID: "PRA",
    ID: "50653",
    PersonnelID: "TankenSerjPRA9",
    Name: "Tanken, Serj"
  },
  {
    AgencyID: "PRA",
    ID: "38704",
    PersonnelID: "TaylorTeresaPRA9",
    Name: "Taylor, Teresa"
  },
  {
    AgencyID: "PRA",
    ID: "24447",
    PersonnelID: "TesterVenu PRA5",
    Name: "TesterCMP, Venu"
  },
  {
    AgencyID: "PRA",
    ID: "40178",
    PersonnelID: "TestThelakkatVenuPRA9",
    Name: "TestThelakkat, Venu"
  },
  {
    AgencyID: "PRA",
    ID: "46765",
    PersonnelID: "VauseAlexPRA9",
    Name: "Vause, Alex"
  },
  {
    AgencyID: "PRA",
    ID: "28561",
    PersonnelID: "WoodhamsMellissaPRA14",
    Name: "Woodhams, Mellissa"
  },
  {
    AgencyID: "MOCB",
    ID: "52402",
    PersonnelID: "YoungMeganMOCB9",
    Name: "Young, Megan"
  },
  {
    AgencyID: "TSTB",
    ID: "44908",
    PersonnelID: "ZawislakJenniferTSTB1",
    Name: "Zawislak, Jennifer"
  },
  {
    AgencyID: "PRA",
    ID: "52916",
    PersonnelID: "ZoroRoronoaPRA9",
    Name: "Zoro, Roronoa"
  }
];

//! Do Not Use -
// const Staff = [
//   {"PersonnelID":"","Name":""},
//   {"PersonnelID":"AlfieriShelleyPRA1","Name":"Alfieri, Shelley"},
//   {"PersonnelID":"AlisovaMurianaPRA9","Name":"Alisova, Muriana"},
//   {"PersonnelID":"BarnesJuliaPRA14","Name":"Barnes, Julia"},
//   {"PersonnelID":"PorterJanePRA9","Name":"Porter, Jane"},
//   {"PersonnelID":"ScottAdamPRA9","Name":"Scott, Adam"},{"PersonnelID":"SilversRayleighPRA18","Name":"Silvers, Rayleigh"},
//   {"PersonnelID":"ZoroRoronoaPRA9","Name":"Zoro, Roronoa"}
//   ]

const Categories = [
  { CATEGORYID: 50, Category: "ABE/HSE" },
  { CATEGORYID: 1, Category: "Assessment" },
  { CATEGORYID: 53, Category: "Common Core Content Related" },
  { CATEGORYID: 52, Category: "Common Core Instructional Practice" },
  { CATEGORYID: 26, Category: "Data/ASISTS" },
  { CATEGORYID: 55, Category: "Distance Learning" },
  { CATEGORYID: 51, Category: "ESOL" }
];

const Subjects = [
  { SubjectID: 1, SubjectDesc: "ELA" },
  { SubjectID: 2, SubjectDesc: "Social Studies" },
  { SubjectID: 3, SubjectDesc: "Science" },
  { SubjectID: 4, SubjectDesc: "Math" },
  { SubjectID: 5, SubjectDesc: "Career Pathways" },
  { SubjectID: 6, SubjectDesc: "ESL" }
];

const Facilitator = [
  {
    ID: "1",
    FacFirstName: "test1",
    FacLastName: "new",
    Address: "",
    City: "",
    State: "NY",
    Zip: "",
    HomePhone: "2125555555",
    Email: "qqwwqq",
    CellPhone: "",
    AlternatePhone: ""
  },
  {
    ID: "1026",
    FacFirstName: "Vutha",
    FacLastName: "Nguy",
    Address: "",
    City: "",
    State: "NY",
    Zip: "",
    HomePhone: "1111111111",
    Email: "vnguy@dycd.com",
    CellPhone: "",
    AlternatePhone: ""
  },
  {
    ID: "2184",
    FacFirstName: "Lizelena",
    FacLastName: "Iglesias",
    Address: "89 Broad Street",
    City: "New York",
    State: "NY",
    Zip: "10009",
    HomePhone: "2125556987",
    Email: "",
    CellPhone: "3475555896",
    AlternatePhone: ""
  },
  {
    ID: "2305",
    FacFirstName: "Srikanth",
    FacLastName: "Srinivasan",
    Address: "85 Broad Street ",
    City: "New York ",
    State: "NY",
    Zip: "11246",
    HomePhone: "2125554692",
    Email: "pra@asists.com",
    CellPhone: "",
    AlternatePhone: ""
  },
  {
    ID: "2160",
    FacFirstName: "Raju",
    FacLastName: "Srinivasan",
    Address: "455 5th Avenue ",
    City: "New York City ",
    State: "NY",
    Zip: "10016",
    HomePhone: "2125555555",
    Email: "rajus@lacnyc.org",
    CellPhone: "",
    AlternatePhone: ""
  }
];

const Locations = [
  {
    ID: "1",
    FacilityName: "loco1",
    Address: "",
    City: "",
    State: "NY",
    Zip: "",
    Phone: "(___) ___-____",
    Email: ""
  },
  {
    ID: "46",
    FacilityName: "Utica",
    Address: "309 Genessee Street",
    City: "Utica",
    State: "NY",
    Zip: "",
    Phone: "",
    Email: ""
  },
  {
    ID: "812",
    FacilityName: "DYCD",
    Address: "",
    City: "",
    State: "NY",
    Zip: "",
    Phone: "",
    Email: ""
  },
  {
    ID: "1534",
    FacilityName: "LAC-FiDi",
    Address: "89 Broad Street ",
    City: "New York City ",
    State: "NY",
    Zip: "10003",
    Phone: "2125553699",
    Email: ""
  },
  {
    ID: "1591",
    FacilityName: "Literacy Assistance Center",
    Address: "85 Broad Street ",
    City: "New York ",
    State: "NY",
    Zip: "10004",
    Phone: "2125553355",
    Email: ""
  }
];

const Providers = [
  {
    ID: "528",
    ProviderName: "DYCD",
    Address: "",
    City: "",
    State: "NY",
    Zip: "",
    Phone: "0000000000",
    Email: "000"
  },
  {
    ID: "959",
    ProviderName: "LAC-FIDI",
    Address: "89 Broad Street",
    City: "New York",
    State: "NY",
    Zip: "10009",
    Phone: "2125558035",
    Email: ""
  },
  {
    ID: "992",
    ProviderName: "Literacy Assistance Center ",
    Address: "85 Broad Street ",
    City: "New York ",
    State: "NY",
    Zip: "10004",
    Phone: "2125553355",
    Email: "pra@asists.com"
  },
  {
    ID: "1",
    ProviderName: "provider1",
    Address: "",
    City: "",
    State: "NY",
    Zip: "",
    Phone: "2125555555",
    Email: "ggffghgfh"
  }
];

const FiscalYear = [
  { FiscalYear: "2021" },
  { FiscalYear: "2020" },
  { FiscalYear: "2019" },
  { FiscalYear: "2018" },
  { FiscalYear: "2017" },
  { FiscalYear: "2016" },
  { FiscalYear: "2015" },
  { FiscalYear: "2014" }
];

const sessionVariable = {
  AgencyID: "PRA",
  AuditUserID: '<%= Session["UserID"] %>'
};

const States = [
  { Abbrev: "AL", State: "Alabama" },
  { Abbrev: "AS", State: "American Samoa" },
  { Abbrev: "AK", State: "Alaska" },
  { Abbrev: "AZ", State: "Arizona" },
  { Abbrev: "AR", State: "Arkansas" },
  { Abbrev: "CA", State: "California" },
  { Abbrev: "CO", State: "Colorado" },
  { Abbrev: "CT", State: "Connecticut" },
  { Abbrev: "DE", State: "Delaware" },
  { Abbrev: "DC", State: "District Of Columbia" },
  { Abbrev: "FM", State: "Federated States Of Micronesia" },
  { Abbrev: "FL", State: "Florida" },
  { Abbrev: "GA", State: "Georgia" },
  { Abbrev: "GU", State: "Guam" },
  { Abbrev: "HI", State: "Hawaii" },
  { Abbrev: "ID", State: "Idaho" },
  { Abbrev: "IL", State: "Illinois" },
  { Abbrev: "IN", State: "Indiana" },
  { Abbrev: "IA", State: "Iowa" },
  { Abbrev: "KS", State: "Kansas" },
  { Abbrev: "KY", State: "Kentucky" },
  { Abbrev: "LA", State: "Louisiana" },
  { Abbrev: "ME", State: "Maine" },
  { Abbrev: "MH", State: "Marshall Islands" },
  { Abbrev: "MD", State: "Maryland" },
  { Abbrev: "MA", State: "Massachusetts" },
  { Abbrev: "MI", State: "Michigan" },
  { Abbrev: "MN", State: "Minnesota" },
  { Abbrev: "MS", State: "Mississippi" },
  { Abbrev: "MO", State: "Missouri" },
  { Abbrev: "MT", State: "Montana" },
  { Abbrev: "NE", State: "Nebraska" },
  { Abbrev: "NV", State: "Nevada" },
  { Abbrev: "NH", State: "New Hampshire" },
  { Abbrev: "NJ", State: "New Jersey" },
  { Abbrev: "NM", State: "New Mexico" },
  { Abbrev: "NY", State: "New York" },
  { Abbrev: "NC", State: "North Carolina" },
  { Abbrev: "ND", State: "North Dakota" },
  { Abbrev: "MP", State: "Northern Mariana Islands" },
  { Abbrev: "OH", State: "Ohio" },
  { Abbrev: "OK", State: "Oklahoma" },
  { Abbrev: "OR", State: "Oregon" },
  { Abbrev: "PW", State: "Palau" },
  { Abbrev: "PA", State: "Pennsylvania" },
  { Abbrev: "PR", State: "Puerto Rico" },
  { Abbrev: "RI", State: "Rhode Island" },
  { Abbrev: "SC", State: "South Carolina" },
  { Abbrev: "SD", State: "South Dakota" },
  { Abbrev: "TN", State: "Tennessee" },
  { Abbrev: "TX", State: "Texas" },
  { Abbrev: "UT", State: "Utah" },
  { Abbrev: "VT", State: "Vermont" },
  { Abbrev: "VI", State: "Virgin Islands" },
  { Abbrev: "VA", State: "Virginia" },
  { Abbrev: "WA", State: "Washington" },
  { Abbrev: "WV", State: "West Virginia" },
  { Abbrev: "WI", State: "Wisconsin" },
  { Abbrev: "WY", State: "Wyoming" }
];
