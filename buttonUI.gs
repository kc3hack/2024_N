function quickReply(LINE_TOKEN, LINE_BROADCAST_ENDPOINT) {
  var headers = {
     "Authorization": "Bearer " + LINE_TOKEN, // 認証トークンを指定するためのヘッダー
     'Content-type': 'application/json'
   }

  var postData = {
    // "to": LINE_USERID, //対象ユーザーのUserId
    "messages": [{
      "type": "text",
      "text": "どの県について調べるん？",
      "quickReply": {
        "items": [
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "大阪府",
              "text": "大阪府"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "京都府",
              "text": "京都府"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "滋賀県",
              "text": "滋賀県"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "兵庫県",
              "text": "兵庫県"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "奈良県",
              "text": "奈良県"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "和歌山県",
              "text": "和歌山県"
            }
          }
        ]
      }
    }]
  }

  var params = {
    "methods": "POST",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };

  UrlFetchApp.fetch(LINE_BROADCAST_ENDPOINT, params);
}