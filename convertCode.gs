function convertCode() {
  //  Google Sheetsからデータを読み込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const foodAndCitySheet = ss.getSheetByName("foodandcity");

  var foodRange = foodAndCitySheet.getRange('C1');
  var foodWord = foodRange.getValue();
  var foodCode;

  // wordからcodeに変換（index1ずれ）
  foodWordArray = ["居酒屋", "ダイニングバー・バル", "創作", "和食", "洋食", "イタリアン", "中華", "焼肉", "アジア・エスニック料理", "各国", "カラオケ・パーティ", "バー・カクテル", "ラーメン", "カフェ・スイーツ", "その他", "お好み焼き・もんじゃ", "韓国"]

  for (let i = 0; i < 17; i++)
  {
    if (foodWord == foodWordArray[i])
    {
      if (i > 8)
      {
        foodCode = "G0" + String(i + 1);
      }
      else
      {
        foodCode = "G00" + String(i + 1);
      }
    }
  }

  foodAndCitySheet.getRange('B1').setValue(foodCode);
}