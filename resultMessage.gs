function resultMessage() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const resultSheet = ss.getSheetByName("result");
  
  // 行を取得
  var lastRow = resultSheet.getLastRow();
  console.log(lastRow);

  // カラムを作成
  for (let i = 0; i < 3; i++)
  {
    // カラムのリストを作成
    var columns = [];

    // 乱数を取得
    var row = Math.ceil(Math.random() * (lastRow-1)) + 1;

    // 飲食店を乱数に基づいてピックアップしカラムの項目を作成
    var restaurantName = resultSheet.getRange(row, 1).getValue();
    var restaurantGenre = resultSheet.getRange(row, 2).getValue();
    var restaurantCity = resultSheet.getRange(row, 3).getValue();
    var restaurantURL = resultSheet.getRange(row, 4).getValue();
    var restaurantImage = resultSheet.getRange(row, 5).getValue();
    var restaurantCoupon = resultSheet.getRange(row, 6).getValue();
    var restaurantCatchPhrase = resultSheet.getRange(row, 7).getValue();

    var column = {
      "imageBackgroundColor": "#FFFFFF",
      "title": restaurantName,
      "text": restaurantCatchPhrase,
      "actions": 
      [
        {
          "type": "uri",
          "label": "基本情報を見る",
          "uri": restaurantURL
        }
      ]
    }
    
    //カラムを配列に格納
    columns[i] = column;
  }

  // return
  return columns;
}
