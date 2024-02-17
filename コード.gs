function serchRestaurant(foodWord, city) {
  const API_KEY = 'a902d5426ee72db7';
  var baseUrl = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
  
  // 検索条件を設定
  var params = {
    key: API_KEY,
    keyword: '居酒屋',
    range: 3, // 検索範囲（半径3km）
    format: 'json', // レスポンスの形式
    count: 5
  };
  
  // APIリクエストを送信
  var response = UrlFetchApp.fetch(baseUrl + '?' + Object.keys(params).map(function(key) {
    return key + '=' + params[key];
  }).join('&'));
  
  var responseData = JSON.parse(response.getContentText());

  // レスポンスデータをGoogle Sheetsに書き込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("シート1");
  // headerの書き込み
  var headers = ['店舗名', '住所', '電話番号'];
  sheet.appendRow(headers);
  
  responseData.results.shop.forEach(function(shop) {
    var row = [shop.name, shop.address, shop.urls.pc];
    sheet.appendRow(row).getRange("A2");
  });

}