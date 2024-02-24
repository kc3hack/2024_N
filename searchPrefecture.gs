function searchPrefecture(LINE_TOKEN, LINE_BROADCAST_ENDPOINT, LINE_USERID) {
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
              "label": "大阪",
              "text": "大阪"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "京都",
              "text": "京都"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "滋賀",
              "text": "滋賀"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "兵庫",
              "text": "兵庫"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "奈良",
              "text": "奈良"
            }
          },
          {
            "type": "action",
            "action": {
              "type": "message",
              "label": "和歌山",
              "text": "和歌山"
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