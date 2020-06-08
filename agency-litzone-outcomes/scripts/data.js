        const outcomesData = [
                    { "ID": "1009", "AgencyID": "PRA", "OutcomeSortOrder": "1", "Category": "Health Literacy", "Description": "Test 12.1 a" },
                    { "ID": "1010", "AgencyID": "PRA", "OutcomeSortOrder": "3", "Category": "Functional Literacy", "Description": "Wrote down a family recipe" },
                    { "ID": "1265", "AgencyID": "PRA", "OutcomeSortOrder": "5", "Category": "Community Outcomes", "Description": "Joined a club" },
                    { "ID": "1355", "AgencyID": "PRA", "OutcomeSortOrder": "6", "Category": "School Relations", "Description": "Sit for GED test" },
                    { "ID": "2694", "AgencyID": "PRA", "OutcomeSortOrder": "1", "Category": "Health Literacy", "Description": "Get Flu Vaccination" },
                    { "ID": "2881", "AgencyID": "PRA", "OutcomeSortOrder": "7", "Category": "Social Services", "Description": "TASC Test" },
                    { "ID": "2967", "AgencyID": "PRA", "OutcomeSortOrder": "1", "Category": "Health Literacy", "Description": "applied for health benefits (self)" },
                    { "ID": "3231", "AgencyID": "PRA", "OutcomeSortOrder": "8", "Category": "Workforce Readiness", "Description": "Dress for Success" },
                    { "ID": "3232", "AgencyID": "PRA", "OutcomeSortOrder": "4", "Category": "Family Literacy", "Description": "get a library card" },
                    { "ID": "3252", "AgencyID": "PRA", "OutcomeSortOrder": "5", "Category": "Community Outcomes", "Description": "Volunteering for meals on wheels" },
        ];

        const categoryData = [
                    { "OutcomeSortOrder": "1", "Category": "Health Literacy" },
                    { "OutcomeSortOrder": "2", "Category": "Financial Literacy" },
                    { "OutcomeSortOrder": "3", "Category": "Functional Literacy" },
                    { "OutcomeSortOrder": "4", "Category": "Family Literacy" },
                    { "OutcomeSortOrder": "5", "Category": "Community Outcomes" },
                    { "OutcomeSortOrder": "6", "Category": "School Relations" },
                    { "OutcomeSortOrder": "7", "Category": "Social Services" },
                    { "OutcomeSortOrder": "8", "Category": "Workforce Readiness" },
                    { "OutcomeSortOrder": "9", "Category": "Legal Services" },
                    { "OutcomeSortOrder": "10", "Category": "Citizenship" }
            ];

        const sessionVariable = {
        AgencyID: "PRA",
        AuditUserID: '<%= Session["UserID"] %>',
        FiscalYear: ["2016", "2017"],
        };