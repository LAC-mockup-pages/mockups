//* Fetching data from .NET / SQL Server back-end 
//* Sending updated data to back-end
    
    
    const agencyDataFund =   [
                    {"ID":"10481","AgencyID":"PRA","FSID":"DYADL","FY":"2020","FundAbbrev":"Adolescent Literacy DYCD","Amount":"","Purpose":"Some nefarious purpose","FundNumber":"","FundStart":"7/1/2019 12:00:00 AM","FundEnd":"6/30/2020 12:00:00 AM"},
                    {"ID":"10498","AgencyID":"PRA","FSID":"L","FY":"2020","FundAbbrev":"ALE - Adult Literacy Edu","Amount":"1000.00","Purpose":"NYC DYCD","FundNumber":"a34-347857","FundStart":"7/1/2019 12:00:00 AM","FundEnd":"6/30/2020 12:00:00 AM"},
                    {"ID":"10482","AgencyID":"PRA","FSID":"E","FY":"2020","FundAbbrev":"EPE","Amount":"","Purpose":"RS  Test","FundNumber":"","FundStart":"7/1/2019 12:00:00 AM","FundEnd":"6/30/2020 12:00:00 AM"},
                    {"ID":"10499","AgencyID":"PRA","FSID":"Y","FY":"2020","FundAbbrev":"WIA/WIOA","Amount":"500000.00","Purpose":"","FundNumber":"","FundStart":"7/1/2019 12:00:00 AM","FundEnd":"6/30/2020 12:00:00 AM"}
    ];
    
    const fundingData = [
        {"FSID":"06-07","FundAbbrev":"06-07 registration fee"},
        {"FSID":"07-08","FundAbbrev":"07-08 Registration Fee"},
        {"FSID":"911","FundAbbrev":"911"},
        {"FSID":"AVR","FundAbbrev":"ACCES-VR"},
        {"FSID":"A","FundAbbrev":"ACE"},
        {"FSID":"DYADL","FundAbbrev":"Adolescent Literacy DYCD"},
        {"FSID":"ALSL","FundAbbrev":"Adult Literacy Services-"},
        {"FSID":"C","FundAbbrev":"AEA"},
        {"FSID":"ASP","FundAbbrev":"AHSEPP"},
        {"FSID":"L","FundAbbrev":"ALE - Adult Literacy Edu"},
        {"FSID":"ATP","FundAbbrev":"Alternative Trans Program"},
        {"FSID":"ARRA","FundAbbrev":"ARRA Community"},
        {"FSID":"H","FundAbbrev":"BEGIN"},
        {"FSID":"200","FundAbbrev":"Below 200% Poverty"},
        {"FSID":"BST","FundAbbrev":"BOOST"},
        {"FSID":"B","FundAbbrev":"Bridge Core"},
        {"FSID":"CDAEW","FundAbbrev":"Career Development Acad."},
        {"FSID":"CPATH","FundAbbrev":"Career Pathways"},
        {"FSID":"CSP","FundAbbrev":"CASP 3 DSS"},
        {"FSID":"CFA","FundAbbrev":"CFA Grant - F858"},
        {"FSID":"CBG","FundAbbrev":"Community Block Grant"},
        {"FSID":"CO","FundAbbrev":"Coordinated Outreach"},
        {"FSID":"LDSS","FundAbbrev":"County Social Service"},
        {"FSID":"LDSSI","FundAbbrev":"County SS Inactive"},
        {"FSID":"CESOL","FundAbbrev":"CSBG - ESOL"},
        {"FSID":"CS","FundAbbrev":"CSEA"},
        {"FSID":"CTC","FundAbbrev":"CTC Grant"},
        {"FSID":"CP","FundAbbrev":"CUNY PLUS"},
        {"FSID":"U","FundAbbrev":"CWE"},
        {"FSID":"DACAC","FundAbbrev":"DACA - CUNY"},
        {"FSID":"DACABE","FundAbbrev":"DACA ABE/HSE"},
        {"FSID":"DACAES","FundAbbrev":"DACA ESOL"},
        {"FSID":"DHS","FundAbbrev":"Dept of Homeland Security"},
        {"FSID":"DIP","FundAbbrev":"Diploma"},
        {"FSID":"D","FundAbbrev":"DSAS"},
        {"FSID":"DARBE","FundAbbrev":"DYCD ARRA BE"},
        {"FSID":"DARBJ","FundAbbrev":"DYCD ARRA BE Jobs"},
        {"FSID":"DARES","FundAbbrev":"DYCD ARRA ESL"},
        {"FSID":"DAREJ","FundAbbrev":"DYCD ARRA ESL Jobs"},
        {"FSID":"DCEO","FundAbbrev":"DYCD CEO"},
        {"FSID":"DYC","FundAbbrev":"DYCD Civics/Immigration"},
        {"FSID":"DNYC","FundAbbrev":"DYCD NYCALI"},
        {"FSID":"DSN","FundAbbrev":"DYSON"},
        {"FSID":"YB","FundAbbrev":"Youth Build"}
    ];
    
    const sessionVariable = {
        AgencyID: "PRA",
        AuditUserID: '<%= Session["UserID"] %>',
        FiscalYear: ["2016", "2017"],
    };