

const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN"); // Messaging API設定の一番下で発行できるLINE Botのアクセストークン
/*
プロジェクトの設定（歯車のマーク）→ スクリプトプロパティでLINE_TOKENの環境変数を以下のように設定する必要があります。

プロパティ= LINE_TOKEN
値 = LINE botのチャンネルアクセストークン
*/
const LINE_URL = 'https://api.line.me/v2/bot/message/reply';


//ユーザーからメッセージを受け取った時にする処理
function doPost(e){
  //ユーザが送信したデータ
  const json = JSON.parse(e.postData.contents);
  const reply_token = json.events[0].replyToken;
  const messageId = json.events[0].message.id;
  const messageType = json.events[0].message.type;
  const messageText = json.events[0].message.text;

  //検証時に正常処理値(200)を返す

  //メインメニューの分岐処理
  if (typeof reply_token === 'underfined') {
    return;
  }
  if (messageText == "ヘルプ"){
    sendMessage("これはヘルプです");
  }
  if (messageText == "設定"){
    setting();
  }
  if (messageText == "お店を決めてもらう"){
    question();
  }
  
}

//メッセージを送る関数
function sendMessage(postmessage){
  //送信データのjson
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
        'text': postmessage,
      }],
    }),
  }
  //送信
  UrlFetchApp.fetch(LINE_URL,option);

  return;

}
