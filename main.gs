// LINE Developersで取得したアクセストークンを入れる
const CHANNEL_ACCESS_TOKEN = 'E/nVXmnJ2f1yKEUlkS0xjrB7S6txzRt4ULwX6RTPfQlZ6kto5l+ZJc0xxbzW2iZyEEh6JAy1iSzAEsiVtMfnDZdiwlZaEOMRuTYUVLAl1g5OVJ8Vi8SxsfIqh/8iIf3gk8Ls7tnLTnhuLscZ1076gQdB04t89/1O/w1cDnyilFU=';
const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply";
const LINE_BROADCAST_ENDPOINT = "https://api.line.me/v2/bot/message/broadcast";
const LINE_PUSH_ENDPOINT = "https://api.line.me/v2/bot/message/push";

var list = []

// 質問を持ってくる
function createQuestion() {
  questionAndScoreList = []
  for (let i = 0; i < 3; i++) {
    var questionAndScoreSet = sendQuestions(1 + i * 3);
    questionAndScoreList.push(questionAndScoreSet);
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const foodAndCitySheet = ss.getSheetByName("answer");
  console.log(foodAndCitySheet.getRange("D2").getValue())
  
  return questionAndScoreList;
}

// doPost
function doPost(e) {
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token = json.events[0].replyToken;

  if (typeof reply_token === 'undefined') {
    return;
  }

  // 送られたメッセージ内容を取得
  var message = json.events[0].message.text;

  /* buttonUI */
  if (message === "お店を紹介して") {
    searchPrefecture(reply_token);
  }

  /* setting */
  if (message === "大阪府" || message === "京都府" || message === "滋賀県" || message === "兵庫県" || message === "奈良県" || message === "和歌山県") {
    writePrefecture(message);
  }

  // スプレッドシートの読み込み
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const foodAndCitySheet = ss.getSheetByName("foodAndCity");
  var count = foodAndCitySheet.getRange('A2').getValue();
  var scoreSum = foodAndCitySheet.getRange('A3').getValue();

  /* sendQuestions, getMessage */
  // 質問と得点が入ったセット
  questionAndScoreList = createQuestion();

  // 送信
  if (count == 0) {
    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': [{
          'type': 'text',
          'text': questionAndScoreList[0]['question'],
        }],
      }),
    });

    // Noならばマイナス、Yesならばぷらす
    if (message === "NO") {
      scoreSum -= questionAndScoreList[0]['score'];
    } else {
      scoreSum += questionAndScoreList[0]['score'];
    }
  }

  if (count == 1) 
  {
    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': [{
          'type': 'text',
          'text': questionAndScoreList[1]['question'], 
        }],
      }),
    });

    // Noならばマイナス、Yesならばぷらす
    if (message === "NO") {
      scoreSum -= questionAndScoreList[1]['score'];
    } else {
      scoreSum += questionAndScoreList[1]['score'];
    }
  } 

  if (count == 2) 
  {
    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': [{
          'type': 'text',
          'text': questionAndScoreList[2]['question'],
        }],
      }),
    });

    // Noならばマイナス、Yesならばぷらす
    if (message === "NO") {
      scoreSum -= questionAndScoreList[2]['score'];
    } else {
      scoreSum += questionAndScoreList[2]['score'];
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const answerSheet = ss.getSheetByName("answer");
    const foodAndCitySheet = ss.getSheetByName("foodandcity");
    var lastRow = answerSheet.getLastRow();

    // E2にユーザーの値を書き込む
    answerSheet.getRange('E2').setValue(scoreSum);
    for (let i = 2; i <= lastRow; i++) {
      if (answerSheet.getRange('D' + String(i)).getValue()) {
        var foodGenre = answerSheet.getRange('A' + String(i)).getValue();
        foodAndCitySheet.getRange('C1').setValue(foodGenre);
      }
    }
  } 

  if (count == 3) 
  {
    // convertCode
    convertCode();

    // serchRestaurant
    serchRestaurant();

    /* resultMessage */
    columns = resultMessage();
    list.push(colums);
    count++;
  }

  if (count == 4)
  {
    // 結果を送信する
    //　送信
    var payload = JSON.stringify({
      "replyToken": replyToken,
      "messages": [{
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": list[0],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
      }]
    });

     UrlFetchApp.fetch(LINE_PUSH_ENDPOINT, {
      "headers": {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      "method": "post",
      "payload": payload
    });

    foodAndCitySheet.getRange('A2').setValue(0);
    foodAndCitySheet.getRange('A3').setValue(0);
    return;
  }

  count++;
  foodAndCitySheet.getRange('A2').setValue(count);
  foodAndCitySheet.getRange('A3').setValue(scoreSum);
}