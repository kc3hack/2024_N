function createMessage() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const questionSheet = ss.getSheetByName("questions");
  message = questionSheet.getRange('A2').getValue();
  return sendMessage(message);
}
