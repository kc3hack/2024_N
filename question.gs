function question() {
  
  sendMessage("OK! ほな、お店決めよっか！");
  //質問回数を記録
  var questionCounter = 0;

  //questionsで使用するセルの範囲を指定
  const questionsRangeSheet = spreadSheet.getSheetByName("questionsRange");
  const questionVariation = questionsRangeSheet("B2");
  const questionMaxNumber = question


  //質問を集めたスプレッドシートを2次元配列に整列
  const questionsSheet = spreadSheet.getSheetByName("questions");
  var questions = questionsSheet(5,9);
  question = 
  //questionNumberでセルの横列、questionCounterで縦列を特定
  questionNumber = Math.randomInt(0,);
  question = questions[questionCounter][question];

  while (true){

  }



  function doPost(e) {
    //ユーザが送信したデータ
    const json = JSON.parse(e.postData.contents);
    const reply_token = json.events[0].replyToken;
    const messageId = json.events[0].message.id;
    const messageType = json.events[0].message.type;
    const messageText = json.events[0].message.text;

    //検証時に正常処理値(200)を返す
    if (typeof reply_token === 'underfined') {
      return;
    }



    

    
    
  }

}

