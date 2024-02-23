/**
 * 質問を生成し、やり取りをする関数
 * 
 */

function question() {

  sendMessage("OK! ほな、お店決めよっか！");
  //質問回数を記録
  var questionCounter = 0;

  //questionsで使用するセルのサイズをquestionsRangeシートで指定
  const questionsRangeSheet = spreadSheet.getSheetByName("questionsRange");
  const questionMaxRow = Number(questionsRangeSheet.getRange("A2").getValue());//シート縦の長さ
  const questionMaxColumn = Number(questionsRangeSheet.getRange("B2").getValue());//シートの横幅
  console.log(questionsRangeSheet);
  console.log(questionMaxColumn);

  //質問を集めたスプレッドシートを2次元配列に整列
  const questionsSheet = spreadSheet.getSheetByName("questions");
  var questions = questionsSheet(questionMaxRow, questionMaxColumn).getValues();

  //質問の回数をカウント(2ずつ増える)
  var questionCounter = 0;

  //質問をランダムで選定&生成
  var questionSelectedNumber = Math.randomInt(0, questionMaxRow);
  var question = questions[questionSelectedNumber][questionCounter];
  var answerArray = ""

  //質問文を3回生成
  while (questionCounter > questionMaxColumn) {
    sendMessage(question);
    if (messageText == "Yes"){
      answerArray = questions[questionSelectedNumber][questionCounter + 1];
      continue;
    }else if (messageText == "No"){
      continue;
    }
    //3回生成した後の処理
    if (questionCounter > questionMaxColumn){
      sendMessage("ほな、こんなお店はどうでしょう");
      for (let i; i == 3; i += 1){
        sendMessage("店舗"+i);
      }
      

    }

    }

  }



