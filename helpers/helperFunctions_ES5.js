//* Helper functions for ASISTS_2020 pages
var createInputField = function createInputField(keyVal, labelVal, value) {
    var labelClassVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var classVal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var option = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
    return "<div class=\"input-field\">\n    <label for='".concat(keyVal, "' class='").concat(labelClassVal, "'>").concat(labelVal, "</label>\n    <input type=\"text\" id='").concat(keyVal, "' class='").concat(classVal, "' value='").concat(value, "' ").concat(option, ">\n    </div>");
}; // Converts 0000000000 to 000-000-0000 and vice-versa


var phoneFormat = function phoneFormat(str) {
    if (str.match(/\D/)) {
        return str.replace(/\D/gi, "");
    } else {
        return "".concat(str.slice(0, 3), "-").concat(str.slice(3, 6), "-").concat(str.slice(6));
    }
}; // dataObj: JSON object
// labelObj: JS Object with key from dataObj, value = label


var createFieldList = function createFieldList(dataObj, labelObj) {
    var keyList = Object.keys(dataObj);
    return keyList.map(function (key) {
        var label = labelObj[key] ? labelObj[key] : key;
        return [key, label, dataObj[key]];
    });
}; // Returns the year of a string date


var createFiscalYear = function createFiscalYear(str) {
    var date = new Date(str);
    return date.getFullYear();
}; // Returns amount with $ 000000.00 format


var currencyFormat = function currencyFormat(str) {
    return !str ? "" : "$ " + Number(str).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}; // Returns a string date formatted MM/DD/YYYY with 0 if day or month
// is 1 digit.


var dateFormat = function dateFormat(str) {
    var date = new Date(str);
    var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    var day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
    return "".concat(month, "/").concat(day, "/").concat(date.getFullYear());
}; // Creates a JS Object from 1 object result of processing page elements
// and 1 JSON data object result of server request


var updateDataObject = function updateDataObject(obj, dataObj) {
    var result = {};
    var listKeys = Object.keys(dataObj);

    for (var _i = 0, _listKeys = listKeys; _i < _listKeys.length; _i++) {
        var key = _listKeys[_i];

        if (!obj[key]) {
            result[key] = dataObj[key];
        } else {
            result[key] = obj[key];
        }
    }

    return result;
};