// @ts-nocheck
function serchRestaurant() {
  const API_KEY = 'a902d5426ee72db7';
  const API_ENDPOINT = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

  // Google Sheetsからデータを読み込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const foodAndCitySheet = ss.getSheetByName("foodandcity");
  const resultSheet = ss.getSheetByName("result");

  var cityRange = foodAndCitySheet.getRange('A1');
  var cityName = cityRange.getValue();
  var foodRange = foodAndCitySheet.getRange('B1');
  var foodWord = foodRange.getValue();

  Logger.log(cityName);
  Logger.log(foodWord);
  
  // 検索条件を設定
  // APIキー、キーワード（地名）、食べ物ジャンル、表示個数（30）、クレカ使えるか、フォーマット（json）
  var params = {
    key: API_KEY,
    keyword: cityName,
    genre: foodWord,
    count: 30,
    card: 1,
    format: 'json'
  };
  
  // APIリクエストを送信
  var response = UrlFetchApp.fetch(API_ENDPOINT + '?' + Object.keys(params).map(function(key) {
    return key + '=' + params[key];
  }).join('&'));
  
  var responseData = JSON.parse(response.getContentText());

  // シートのクリア
  resultSheet.clear();

  // headerの書き込み
  var headers = ['店舗名', 'ジャンル', '地名', 'URL', '画像', 'クーポン', 'キャッチ'];
  resultSheet.getRange("A1:G1").setValues([headers]); 

  responseData.results.shop.forEach(function(shop) {
    var row = [shop.name, shop.genre.name, shop.station_name, shop.urls.pc, shop.photo.mobile.l, shop.coupon_urls.sp, shop.genre.catch];
    resultSheet.appendRow(row).getRange("A2");
  });
}