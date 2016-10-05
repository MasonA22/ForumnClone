import { Template } from "meteor/templating";

import "./historyQuestion.html";

Template.historyQuestion.helpers({
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