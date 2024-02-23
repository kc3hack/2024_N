//動作を受け取る処理
function doPost(e) {
  const eventData = JSON.parse(e.postData.contents);
  

  if (eventData && eventData.events) {
    eventData.events.forEach(handleEvent);
  }

  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}
//動作を受け取った時の分岐処理
function handleEvent(event) {
  //イベントから種類、userIdを取得
  const eventType = event.type;
  const userId = event.source.userId;
  const timestamp = new Date();

  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  let log = sheet.getSheetByName('log');
  log.appendRow([eventType, userId, timestamp]);

  if (eventType === 'follow') {
    handleFollowEvent(userId);
  } else if (eventType === 'unfollow') {
    handleUnfollowEvent(userId);
  }
  else if (eventType == 'message') {
    const messageText = eventData.events[0].message.text;
    messageEvent(userId, messageText);
  }

}
//友達追加されたとき、ブロック解除されたときの処理
function handleFollowEvent(userId) {
  Logger.log('Follow event received for user:', userId);

  //useridを名前にしたシートが生成され、そこに会話のログが残る。
  let userSheet = SpreadsheetApp.getActiveSpreadsheet();
  let newSheet = userSheet.insertSheet();
  newSheet.setName(userId);

  // 例: ユーザーにメッセージを送信
  sendMessage(userId, 'Thanks for adding me as a friend!');
}

//友達追加解除されたとき、ブロックされたときの処理
function handleUnfollowEvent(userId) {

  //友達追加から外すとユーザーの固有シートが消える。
  let userSheet = SpreadsheetApp.getActiveSpreadsheet();
  let delSheet = userSheet.getSheetByName(userId);
  sheet.deleteSheet(delSheet);

  Logger.log('Unfollow event received for user:', userId);

}
//メッセージを受け取った時の処理
function messageEvent(userId, messageText) {
  //ユーザーの個別シートにuserId,メッセージ,送信時間を記録
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  let user = sheet.getSheetByName(userId);
  const timestamp = new Date();
  user.appendRow([userId, timestamp, messageText]);
}

//メッセージを送信する機能
function sendMessage(userId, message) {
  // LINEにメッセージを送信する処理
  //const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptPropertied().getProperty("LINE_TOKEN");
  const url = 'https://api.line.me/v2/bot/message/push';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  var data = {
    'to': userId,
    'messages': [
      { 
        'type': 'text', 
        'text': message 
      }
    ],
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(data),
  };
  return UrlFetchApp.fetch(url, options);
}