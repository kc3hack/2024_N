function setting() {
  var city = "京都";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const foodAndCitySheet = ss.getSheetByName("foodandcity");

  foodAndCitySheet.getRange("A1").setValue(city);
}