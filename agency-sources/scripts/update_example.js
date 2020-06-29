                $("table[id*=GridView2] tr").click(function () {
                    var fsid = $(this).find("td:eq(0)").text();
                    var amt = $(this).find("td:eq(1)").text();
                    var stdate = $(this).find("td:eq(2)").text();
                    var enddate = $(this).find("td:eq(3)").text();
                    var fundfy = $(this).find("td:eq(4)").text();
                    var fundnumber = $(this).find("td:eq(5)").text().trim();
                    var purpose = $(this).find("td:eq(6)").text().trim();
                    var fndid = $(this).find("td:eq(7)").text(); //$(this).data('id');
                    var rowIndx = $(this).index();
                    //$("select[id*=ddlFSID]
                    //$(("table[id*=fv_AgencySources]").find("select[id*=ddlFSID]").
                    //$("span[id*=msg]").text(id);
                    $("select[id*=ddlFSID]")[0].selectedIndex = 0;
                    $("select[id*=ddlFSID] option").each(function (a, b) {
                        if ($(this).html() == fsid) $(this).attr("selected", "selected");
                        //$("select[id*=ddlFSID])").selectmenu('refresh', true);
                    });
                    $("select[id*=ddlFSID]").attr("disabled", "disabled");
                    //.val(fsid);
                    $("input[id*=txtAmount]").val(amt);
                    $("input[id*=txtFundStart]").val(stdate);
                    $("input[id*=txtFundEnd]").val(enddate);
                    $("input[id*=txtFY]").val(fundfy);
                    $("input[id*=txtFundNumber]").val(fundnumber);
                    $("input[id*=txtPurpose]").val(purpose);
                    $("span[id*=FundID]").text(fndid);
                    $("span[id*=rowIndex]").text(rowIndx);
                    $("#InsertButton").text('Update');
                    $('#divStatus').html('');
                });



// Update code
            function UpdateSource() {
                //debugger;
                //alert('UpdateSource');
                var fndid = $("span[id*=FundID]").text();
                //var fsid = $("select[id*=ddlFSID]").val();
                var amt = $("input[id*=txtAmount]").val();
                var stdate = $("input[id*=txtFundStart]").val();
                var enddate = $("input[id*=txtFundEnd]").val();
                var fundnumber = $("input[id*=txtFundNumber]").val();
                var purpose = $("input[id*=txtPurpose]").val();
                var AuditUser = '<%= Session["UserID"] %>';
                var rowid = $("span[id*=rowIndex]").text();
                $.ajax({
                    type: 'POST',
                    url: 'agencysourcesinfo.aspx/UpdateAgencySourcesInfo',
                    data: '{Amount: ' + JSON.stringify(amt) + ', Purpose: ' + JSON.stringify(purpose) +
                             ', FundNumber: ' + JSON.stringify(fundnumber) +
                                ', FundStart: ' + JSON.stringify(stdate) + ', FundEnd: ' + JSON.stringify(enddate) +
                                 ', ID: ' + fndid + ', AuditUserID: ' + AuditUser + '}',
                    contentType: "application/json; charset=utf-8",
                    //dataType: "json",
                    success: function (Response_msg) {
                        if (Response_msg.d.indexOf('ERROR') < 0) {
                            $('#divStatus').html(Response_msg.d);
                            $('#divStatus').css({ "font-weight": "bold", "color": "Green" });
                            $($('table[id*=GridView2]').find("span[id*=Label1]")[rowid - 1]).text(amt);
                            $($('table[id*=GridView2]').find("span[id*=Label2]")[rowid - 1]).text(stdate);
                            $($('table[id*=GridView2]').find("span[id*=Label3]")[rowid - 1]).text(enddate);
                            $($('table[id*=GridView2]').find("span[id*=lblFundNumber]")[rowid - 1]).text(fundnumber);
                            $($('table[id*=GridView2]').find("span[id*=lblPurpose]")[rowid - 1]).text(purpose);
                            $('#divStatus').css({ "font-weight": "bold", "color": "Green" });
                            //$("input[id*=InsertCancelButton]").trigger('click');
                        }
                        else {
                            $('#divStatus').html(Response_msg.d);
                            $('#divStatus').css({ "font-weight": "bold", "color": "Red" });
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        $('#divStatus').html(errorThrown + '</br>' + status + '</br>' + xhr.statusText);
                        $('#divStatus').css({ "font-weight": "bold", "color": "Blue" });
                    }
                });
                return false;
            };


// Code behind
    [System.Web.Services.WebMethod]
    public static string UpdateAgencySourcesInfo(string Amount,
            string Purpose, string FundNumber, string FundStart, string FundEnd,
            int ID, int AuditUserID)
    {
        try
        {
            string connectionString = ConfigurationManager.AppSettings["conn"];

            //1. create the connection object.
            SqlConnection myConnection = new SqlConnection(connectionString);
            SqlCommand cmd = myConnection.CreateCommand();

            //2. create the command object identifying the stored procedure.
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "sp_UpdateAgencySources";

            cmd.Parameters.Add(new SqlParameter("@ID", ID));

            if (!String.IsNullOrEmpty(Amount))
                cmd.Parameters.Add(new SqlParameter("@Amount", (float)Convert.ToDecimal(Amount)));
            else
                cmd.Parameters.Add(new SqlParameter("@Amount", DBNull.Value));

            if (!String.IsNullOrEmpty(Purpose))
                cmd.Parameters.Add(new SqlParameter("@Purpose", Purpose));
            else
                cmd.Parameters.Add(new SqlParameter("@Purpose", DBNull.Value));

            if (!String.IsNullOrEmpty(FundNumber))
                cmd.Parameters.Add(new SqlParameter("@FundNumber", FundNumber));
            else
                cmd.Parameters.Add(new SqlParameter("@FundNumber", DBNull.Value));

            if (!String.IsNullOrEmpty(FundStart))
                cmd.Parameters.Add(new SqlParameter("@FundStart", Convert.ToDateTime(FundStart)));
            else
                cmd.Parameters.Add(new SqlParameter("@FundStart", DBNull.Value));

            if (!String.IsNullOrEmpty(FundEnd))
                cmd.Parameters.Add(new SqlParameter("@FundEnd", Convert.ToDateTime(FundEnd)));
            else
                cmd.Parameters.Add(new SqlParameter("@FundEnd", DBNull.Value));

            cmd.Parameters.Add(new SqlParameter("@AuditUserId", AuditUserID));

            //3. execute the command
            cmd.Connection.Open();
            Int32 retVal = cmd.ExecuteNonQuery();
            myConnection.Close();
            cmd.Dispose();
            myConnection.Dispose();
        }
        catch (Exception Ex)
        {
            return "ERROR: Unable to save data !!</br>" + Ex.Message;
        }

        return "Data Saved Successfully!";
    }

