function serchRestaurant(foodWord, city) {
  const API_KEY = 'a902d5426ee72db7';
  var baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
  
  // 検索条件を設定
  var params = {
    key: API_KEY,
    keyword: 'カレー',
    range: 5, // 検索範囲（半径5km）
    format: 'json', // レスポンスの形式
    count: 10
  };
  
  // APIリクエストを送信
  var response = UrlFetchApp.fetch(baseUrl + '?' + Object.keys(params).map(function(key) {
    return key + '=' + params[key];
  }).join('&'));
  
  var responseData = JSON.parse(response.getContentText());

  // レスポンスデータをGoogle Sheetsに書き込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("シート1");

  // シートのクリア
  sheet.clear();

  // headerの書き込み
  var headers = ['店舗名', '地名', 'URL'];
  sheet.getRange("A1:C1").setValues([headers]);  

  responseData.results.shop.forEach(function(shop) {
    var row = [shop.name, shop.middle_area.name, shop.urls.pc];
    sheet.appendRow(row).getRange("A2");
  });
}