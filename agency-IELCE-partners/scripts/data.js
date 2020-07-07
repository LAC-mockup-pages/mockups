const ielcePartnersData = [
{"ID":"10","AgencyID":"PRA","IELCEPartnerID":"PRAIELCE10","PartnerName":"IEL-12.3","PartnerManager":"ASISTS Data Services ","Address":"85 Broad Street ","City":"New York ","State":"NY","Zip":"10004-____","County":"","Telephone":"","PartnerFSID":"EPE","AmountProj":"70000.00","AmountAct":"70000.00","PartnerTrainingType":"Workforce Readiness","PartnerCredential":"Certification","CountyDesc":"","PartnerFSIDDesc":"EPE"},{"ID":"2","AgencyID":"PRA","IELCEPartnerID":"PRAIELCE2","PartnerName":"IEL-4","PartnerManager":"Raj Srinivasan","Address":"85 Broad Street","City":"New York","State":"NY","Zip":"10004-____","County":"36061","Telephone":"(212) 555-1000","PartnerFSID":"EPE","AmountProj":"80.00","AmountAct":"80.00","PartnerTrainingType":"","PartnerCredential":"Workforce Certification","CountyDesc":"36061 NY County(Manhattan)","PartnerFSIDDesc":"EPE"},{"ID":"8","AgencyID":"PRA","IELCEPartnerID":"PRAIELCE8","PartnerName":"IEL-5","PartnerManager":"LAC ","Address":"85 Broad Street 27th floor ","City":"New York ","State":"NY","Zip":"10004-0000","County":"","Telephone":"","PartnerFSID":"EPE","AmountProj":"50000.00","AmountAct":"50000.00","PartnerTrainingType":"Workforce","PartnerCredential":"Certificate","CountyDesc":"","PartnerFSIDDesc":"EPE"},{"ID":"1","AgencyID":"PRA","IELCEPartnerID":"PRAIELCE1","PartnerName":"LACnyc","PartnerManager":"Gregory upd","Address":"85 Broad Street","City":"","State":"","Zip":"_____-____","County":"36035","Telephone":"(___) ___-____","PartnerFSID":"T1","AmountProj":"44.00","AmountAct":"44.00","PartnerTrainingType":"aaa","PartnerCredential":"ccc","CountyDesc":"36035 Fulton","PartnerFSIDDesc":"Title I"},{"ID":"3","AgencyID":"PRA","IELCEPartnerID":"PRAIELCE3","PartnerName":"westchester branch","PartnerManager":"Kate Tornese","Address":"","City":"","State":"","Zip":"","County":"","Telephone":"","PartnerFSID":"SCHL","AmountProj":"20000.00","AmountAct":"20000.00","PartnerTrainingType":"","PartnerCredential":"","CountyDesc":"","PartnerFSIDDesc":"Scholarship"}] 


        const countyData = [
                    { "FIPS": "36001", "CountyDesc": "36001 Albany" },
                    { "FIPS": "36003", "CountyDesc": "36003 Allegany" },
                    { "FIPS": "36007", "CountyDesc": "36007 Broome" },
                    { "FIPS": "36005", "CountyDesc": "36005 Bronx" },
                    { "FIPS": "36009", "CountyDesc": "36009 Cattaraugus" },
                    { "FIPS": "36021", "CountyDesc": "36021 Columbia" },
                    { "FIPS": "36015", "CountyDesc": "36015 Chemung" },
                    { "FIPS": "36019", "CountyDesc": "36019 Clinton" },
                    { "FIPS": "36017", "CountyDesc": "36017 Chenango" },
                    { "FIPS": "36013", "CountyDesc": "36013 Chautauqua" },
                    { "FIPS": "36061", "CountyDesc": "36061 NY County (Manhattan)" }, {"FIPS":"36035","CountyDesc":"Fulton"}
        ];
        
        const fundingData = [
          {"FSID":"CCF","FundAbbrev":"Community College FTE"},
          {"FSID":"EMP","FundAbbrev":"Employer"},
          {"FSID":"EPE","FundAbbrev":"EPE"},
          {"FSID":"FND","FundAbbrev":"Foundation"},
          {"FSID":"SCHL","FundAbbrev":"Scholarship"},
          {"FSID":"SLF","FundAbbrev":"Self-Pay"},
          {"FSID":"T1","FundAbbrev":"Title I"},
          {"FSID":"UNI","FundAbbrev":"Union"}
      ];
  
        const sessionVariable = {
                AgencyID: "PRA",
                AuditUserID: '<%= Session["UserID"] %>',
                };
                
            const ddlStates = [
                { objKey: "AL", objValue: "Alabama" },
                { objKey: "AS", objValue: "American Samoa" },
                { objKey: "AK", objValue: "Alaska" },
                { objKey: "AZ", objValue: "Arizona" },
                { objKey: "AR", objValue: "Arkansas" },
                { objKey: "CA", objValue: "California" },
                { objKey: "CO", objValue: "Colorado" },
                { objKey: "CT", objValue: "Connecticut" },
                { objKey: "DE", objValue: "Delaware" },
                { objKey: "DC", objValue: "District Of Columbia" },
                { objKey: "FM", objValue: "Federated States Of Micronesia" },
                { objKey: "FL", objValue: "Florida" },
                { objKey: "GA", objValue: "Georgia" },
                { objKey: "GU", objValue: "Guam" },
                { objKey: "HI", objValue: "Hawaii" },
                { objKey: "ID", objValue: "Idaho" },
                { objKey: "IL", objValue: "Illinois" },
                { objKey: "IN", objValue: "Indiana" },
                { objKey: "IA", objValue: "Iowa" },
                { objKey: "KS", objValue: "Kansas" },
                { objKey: "KY", objValue: "Kentucky" },
                { objKey: "LA", objValue: "Louisiana" },
                { objKey: "ME", objValue: "Maine" },
                { objKey: "MH", objValue: "Marshall Islands" },
                { objKey: "MD", objValue: "Maryland" },
                { objKey: "MA", objValue: "Massachusetts" },
                { objKey: "MI", objValue: "Michigan" },
                { objKey: "MN", objValue: "Minnesota" },
                { objKey: "MS", objValue: "Mississippi" },
                { objKey: "MO", objValue: "Missouri" },
                { objKey: "MT", objValue: "Montana" },
                { objKey: "NE", objValue: "Nebraska" },
                { objKey: "NV", objValue: "Nevada" },
                { objKey: "NH", objValue: "New Hampshire" },
                { objKey: "NJ", objValue: "New Jersey" },
                { objKey: "NM", objValue: "New Mexico" },
                { objKey: "NY", objValue: "New York" },
                { objKey: "NC", objValue: "North Carolina" },
                { objKey: "ND", objValue: "North Dakota" },
                { objKey: "MP", objValue: "Northern Mariana Islands" },
                { objKey: "OH", objValue: "Ohio" },
                { objKey: "OK", objValue: "Oklahoma" },
                { objKey: "OR", objValue: "Oregon" },
                { objKey: "PW", objValue: "Palau" },
                { objKey: "PA", objValue: "Pennsylvania" },
                { objKey: "PR", objValue: "Puerto Rico" },
                { objKey: "RI", objValue: "Rhode Island" },
                { objKey: "SC", objValue: "South Carolina" },
                { objKey: "SD", objValue: "South Dakota" },
                { objKey: "TN", objValue: "Tennessee" },
                { objKey: "TX", objValue: "Texas" },
                { objKey: "UT", objValue: "Utah" },
                { objKey: "VT", objValue: "Vermont" },
                { objKey: "VI", objValue: "Virgin Islands" },
                { objKey: "VA", objValue: "Virginia" },
                { objKey: "WA", objValue: "Washington" },
                { objKey: "WV", objValue: "West Virginia" },
                { objKey: "WI", objValue: "Wisconsin" },
                { objKey: "WY", objValue: "Wyoming" },
                  ];