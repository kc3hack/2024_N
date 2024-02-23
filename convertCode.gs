function convertCode() {
  //  Google Sheetsからデータを読み込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const foodAndCitySheet = ss.getSheetByName("foodandcity");

  var foodRange = foodAndCitySheet.getRange('C1');
  var foodWord = foodRange.getValue();

  // 連想配列で実装
  foodAndCodeSet = {
    "居酒屋": "G001", 
    "ダイニングバー・バル": "G002", 
    "創作": "G003", 
    "和食": "G004", 
    "洋食": "G005", 
    "イタリアン": "G006", 
    "中華": "G007", 
    "焼肉": "G008", 
    "アジア・エスニック料理": "G009", 
    "各国": "G010", 
    "カラオケ・パーティ": "G011", 
    "バー・カクテル": "G012", 
    "ラーメン": "G013", 
    "カフェ・スイーツ": "G014", 
    "その他": "G015", 
    "お好み焼き・もんじゃ": "G016", 
    "韓国": "G017"
  }

  var foodCode = foodAndCodeSet[foodWord];
  console.log(foodCode);
  foodAndCitySheet.getRange('B1').setValue(foodCode);
}