// 応答メッセージを送信する関数
function sendReply(replyToken, message, LINE_REPLY_ENDPOINT) {
  // LINEプラットフォームからのイベントを処理する関数
  function doPost(e) {
    var events = JSON.parse(e.postData.contents).events;
    if (events.length > 0) {
      var event = events[0]; // 最初のイベントのみを扱う

      if (event.type === 'message' && event.message.type === 'text') {
        var userMessage = event.message.text;

        // 追加点（ここから）
        var quickReplyOptions = ["大阪府", "京都府", "兵庫県", "滋賀県", "和歌山県", "奈良県"];
        if (quickReplyOptions.includes(userMessage)) {
          var ss = SpreadsheetApp.getActiveSpreadsheet();
          var sheet = ss.getSheetByName("foodandcity");
          sheet.getRange('E1').setValue(userMessage);

          var replyMessage = 'あなたが選んだのは:' + userMessage + 'です。';
          sendReply(event.replyToken, replyMessage);
        }
        // ここまで

      }
    }
    return ContentService.createTextOutput(JSON.stringify({ 'content': 'post received' })).setMimeType(ContentService.MimeType.JSON);
  }
  // var url = 'https://api.line.me/v2/bot/message/reply';
  var channelToken = 'Bearer E9AbOFFW8FIWgFGaB8wqEsK2o5Ya0AdqicpCWa5DmZqZdys0YoOt8ov8QgvcE0FURMck6+nzdYsWNcAtgeBQhfICUYC17D1pXzcCLTrEfo4Trd5KxdMuEsislNXG7v6yktNMsAhe1smhOz8haRcNSgdB04t89/1O/w1cDnyilFU=';

  var postData = {
    'replyToken': replyToken,
    'messages': [{ 'type': 'text', 'text': message }]
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': { 'Authorization': channelToken },
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, options);
}
