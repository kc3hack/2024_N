function question() {
  //質問データ
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('question');
  var questions = getValues();
}

