const LINE_TOKEN = 'E/nVXmnJ2f1yKEUlkS0xjrB7S6txzRt4ULwX6RTPfQlZ6kto5l+ZJc0xxbzW2iZyEEh6JAy1iSzAEsiVtMfnDZdiwlZaEOMRuTYUVLAl1g5OVJ8Vi8SxsfIqh/8iIf3gk8Ls7tnLTnhuLscZ1076gQdB04t89/1O/w1cDnyilFU=';
const LINE_PUSH_ENDPOINT = "https://api.line.me/v2/bot/message/push";
const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_BROADCAST_ENDPOINT = "https://api.line.me/v2/bot/message/broadcast";
const LINE_USERID = 'U8b7b305f2a9fb2429b8d44dec955bf83';

var replyToken, message;

function main() {
  searchPrefecture(LINE_TOKEN, LINE_BROADCAST_ENDPOINT, LINE_USERID); // 都道府県を選択させる
                                                                      // 選択した都道府県をスプレットシートに出力する
  convertCode();                  // コード変換
  serchRestaurant();              // 店を調べる
  var columns = resultMessage();  // 結果のカラムを作る

  console.log(columns);

  // doPost()関数
  function doPost(e) {
    //受け取ったメッセージから返信用のTokenを取得
    var json = JSON.parse(event.postData.contents);
    var replyToken = json.events[0].replyToken;

    // 作成したカラムを元にメッセージを作成
    var payload = JSON.stringify({
      "replyToken": replyToken,
      "messages": [{
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "columns": columns,
          "imageAspectRatio": "rectangle",
          "imageSize": "cover"
        }
      }]
    });

    //４．送信
    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, {
      "headers": {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + LINE_TOKEN,
      },
      "method": "post",
      "payload": payload
    });

    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  }

}