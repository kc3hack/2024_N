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
  var questions = questionsSheet(questionMaxRow, questionMaxColumn);
  //質問の回数をカウント
  questionCounter = 0;
  //質問をランダムで選定&生成
  questionSelectedNumber = Math.randomInt(0, questionMaxRow);
  //question = questions[][];

  while (true) {

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

}

