// LINE Developersで取得したアクセストークンを入れる
const CHANNEL_ACCESS_TOKEN = 'E/nVXmnJ2f1yKEUlkS0xjrB7S6txzRt4ULwX6RTPfQlZ6kto5l+ZJc0xxbzW2iZyEEh6JAy1iSzAEsiVtMfnDZdiwlZaEOMRuTYUVLAl1g5OVJ8Vi8SxsfIqh/8iIf3gk8Ls7tnLTnhuLscZ1076gQdB04t89/1O/w1cDnyilFU=';
const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_BROADCAST_ENDPOINT = "https://api.line.me/v2/bot/message/broadcast";

// ポストで送られてくるので、送られてきたJSONをパース

function doPost(e) {
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') 
  {
    return;
  }

  // 送られたメッセージ内容を取得
  var message = json.events[0].message.text;

  /* buttonUI */
  if (message === "お店を紹介して") 
  {
    searchPrefecture(reply_token);
  }

  /* setting */
  if (message === "大阪府" || message === "京都府" || message === "滋賀県" || message === "兵庫県" || message === "奈良県" || message === "和歌山県") 
  {
    writePrefecture(message);
  }

  /* sendQuestions, getMessage */
  var scoreSum = 0;
  for (let i = 0; i < 3; i++) 
  {
    var questionAndScoreSet = sendQuestions(1 + i * 3);

    // 質問を送信する機能
    const option = {
    'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + LINE_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': [{
          'type': 'text',
          'text': questionAndScoreSet.question,
        }],
      }),
    }

    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT,option);

    if (message === "NO")
    {
      score *= -1;
    }

    scoreSum += score;
  }

  // スプレッドシートを読み込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const answerSheet = ss.getSheetByName("answer");
  const foodAndCitySheet = ss.getSheetByName("foodandcity");
  var lastRow = answerSheet.getLastRow();

  // E2にユーザーの値を書き込む
  answerSheet.getRange('E2').setValue(scoreSum);
  for (let i = 2; i <= lastRow; i++)
  {
    if (answerSheet.getRange('D' + String(i)).getValue() == "TRUE")
    {
      var foodGenre = answerSheet.getRange('A' + String(i)).getValue();
      foodAndCitySheet.getRange('C1').setValue(foodGenre);
    }
  }

  // converCodeの実行
  convertCode();

  // serchRestaurant
  serchRestaurant();

  /* resultMessage */
  columns = resultMessage();

  // 
  var payload = JSON.stringify({
      "replyToken": reply_Token,
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

  //　送信
  UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, {
      "headers": {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      "method": "post",
      "payload": payload
  });
}
