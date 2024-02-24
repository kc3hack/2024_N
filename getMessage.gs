function getMessage(e, questionAndScoreSet) {
  // e: event
  // questionAndScoreSet: 質問とクエスチョンが入った辞書、mainから持ってくる
  // 

  var score = questionAndScoreSet.score;
  var json = JSON.parse(e.postData.contents);
  //返信するためのトークン取得
  var reply_token= json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたメッセージ内容を取得
  var message = json.events[0].message.text;  
  if (message == "YES")
  {
    score * -1;
    return socre;
  }
  else
  {
    return score;
  }

  // TODO: mainの方でscoreSumを定義して欲しい

}
