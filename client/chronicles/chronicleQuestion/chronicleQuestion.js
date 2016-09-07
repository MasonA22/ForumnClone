Template.chronicleQuestion.helpers({
    correctAnswer: function(){
        var answers = this.questionFormHash.answers;
        var correctAnswer;
        $.each(answers, function(index, value){
            if (value.correct === "true"){
                correctAnswer = value.text;
            }
        });
        return correctAnswer;
    }
});