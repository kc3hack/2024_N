function writePrefecture(message) {
  const SHEET = SpreadsheetApp.openById('1S9Uegi7Vz-VeFqPKIRgwGPkqpmstZwE3usqHJQTkFAc');
  const baseSheet = SHEET.getSheetByName('foodandcity');

  baseSheet.getRange('A1').setValue(message);
}