        const sitesDataServer = [
                { "ID": "5929", "AgencyID": "PRA", "SiteID": "ASISTS_12.4", "SiteName": "ASISTS_Release 12.4Edit", "SiteManager": "Raj Srinivasan", "Address": "85 Broad Street", "City": "New York", "State": "NY", "Zip": "10004", "County": '36001', "Telephone": "", "SiteEmail":"myemail@email.com","CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "5679", "AgencyID": "PRA", "SiteID": "BooBooVille", "SiteName": "BooBooVille", "SiteManager": "Hurly Girly", "Address": "123 Shananigans Street", "City": "Funville", "State": "NY", "Zip": "123457896", "County": "36019", "Telephone": "", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4453", "AgencyID": "PRA", "SiteID": "zzz_BKLY29", "SiteName": "Brooklyn 29", "SiteManager": "Barny Benjamin", "Address": "17 Main St", "City": "Brooklyn", "State": "NY", "Zip": "10234", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4455", "AgencyID": "PRA", "SiteID": "BKLY23", "SiteName": "Brooklyn23", "SiteManager": "Barry Benjamin", "Address": "17 Main Street", "City": "New York", "State": "NY", "Zip": "10234-____", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4461", "AgencyID": "PRA", "SiteID": "BKLY24", "SiteName": "BROOKLYN24", "SiteManager": "BARRY BENJAMIN", "Address": "17 MAIN ST", "City": "BROOKLYN", "State": "NY", "Zip": "10234-____", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4441", "AgencyID": "PRA", "SiteID": "BKLY", "SiteName": "Brooklyn25", "SiteManager": "Barry Benjamin", "Address": "17 Main Street", "City": "New York", "State": "NY", "Zip": "10234-____", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4463", "AgencyID": "PRA", "SiteID": "BKLY25", "SiteName": "Brooklyn25", "SiteManager": "Barry Benjamin", "Address": "17 Main Streeet", "City": "Brookllyn", "State": "NY", "Zip": "____1-0234", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4450", "AgencyID": "PRA", "SiteID": "BKLY27", "SiteName": "Brooklyn27", "SiteManager": "Barni Benjamin", "Address": "17 Main Street", "City": "Brooklyn", "State": "NY", "Zip": "10234-____", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4464", "AgencyID": "PRA", "SiteID": "BKLY28", "SiteName": "Brooklyn28", "SiteManager": "Barny Benjamin", "Address": "17 Main Street", "City": "Brooklyn", "State": "NY", "Zip": "_____-____", "County": null, "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" },
                { "ID": "4618", "AgencyID": "PRA", "SiteID": "BKLY3", "SiteName": "Brooklyn3", "SiteManager": "Barry Benjamin", "Address": "17 Main Street", "City": "Brooklyn", "State": "NY", "Zip": "10234-0000", "County": "36021", "Telephone": "(718) 458-4588", "CSD": "", "CPD": "", "CD": "", "AD": "", "SD": "" }
            ];


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
                    { "FIPS": "36013", "CountyDesc": "36013 Chautauqua" }
                ];

const sessionVariable = {
    AgencyID: "PRA",
    AuditUserID: '<%= Session["UserID"] %>',
    FiscalYear: ["2016", "2017"],
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