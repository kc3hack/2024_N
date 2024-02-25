function test() {
  for (let i = 0; i < 3; i++)
  {
    var questionAndScoreSet = sendQuestions(1 + i * 3);
    console.log(questionAndScoreSet['question']);
  }
}
