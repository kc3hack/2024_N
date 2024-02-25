function sendQuestions(line) {
  // line: 列番号（1,4,7が入る）
  // スプレッドシートを読み込む
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const questionsSheet = ss.getSheetByName("questions");

  var lastRow = questionsSheet.getLastRow();

  // 乱数を用意
  var row = Math.ceil(Math.random() * (lastRow-1)) + 1;

  // スプレッドシートから質問を持ってくる
  var question = questionsSheet.getRange(row, line).getValue();
  console.log(question);

  // 質問に付随する点数を持ってくる
  var score = questionsSheet.getRange(row, line + 1).getValue();
  console.log(score);

  // 質問とクエスチョンが入った辞書を作成する
  var questionAndScoreSet = {"question": question, "score": score};

  // リストをメインに投げる
  return questionAndScoreSet;
}
