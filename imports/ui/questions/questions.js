import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../api/questions.js";
import { Rooms } from "../../api/rooms.js";

import "./questions.html";
import "./question/question.js";

Template.questions.onCreated(function(){
	Meteor.subscribe("questions");
	Meteor.subscribe("rooms");
});

Template.questions.helpers({
	questions: function(){
		let activeQuestion = Template.currentData().activeQuestion;
		let roomId = Meteor.user().profile.currentRoomId;
		if (activeQuestion) {
			return Questions.find({activeQuestion: activeQuestion, "questionFormHash.roomId": roomId});
		}
		else {
			if (roomId){
				return Questions.find({"questionFormHash.roomId": roomId}, {sort: {"questionFormHash.askOrder": 1}});
			}
			else{
				return Questions.find({});
			}
		}
	},
	rooms: function(){
		return Rooms.find({});
	}
});

Template.questions.events({
	"click .deleteQuestion": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		Meteor.call("deleteQuestion", questionId);
	},
	"click .toggleQuestionFeedback": function(evt){
		evt.preventDefault();
		var questionId = this._id;
		var feedbackEnabled = Questions.findOne(questionId).questionFormHash.feedbackEnabled;
		if (feedbackEnabled){
			feedbackEnabled = false;
		}
		else{
			feedbackEnabled = true;
		}

		Meteor.call("toggleQuestionFeedback", questionId, feedbackEnabled);
	},
	"click .toggleQuestionWager": function(evt){
		evt.preventDefault();
		var questionId = this._id;
		var wagerEnabled = Questions.findOne(questionId).questionFormHash.wagerEnabled;
		if (wagerEnabled){
			wagerEnabled = false;
		}
		else{
			wagerEnabled = true;
		}
		Meteor.call("toggleQuestionWager", questionId, wagerEnabled);
	},
	"click .makeActiveQuestion": function(evt, template){
		evt.preventDefault();
		let questionId = this._id,
			startTime,
			showTimer = false,
			roomId = this.questionFormHash.roomId;
		$(evt.target).next().val() ? startTime = $(evt.target).next().val() : startTime = 0;
		if (startTime > 0){
			showTimer = true;
		}
		Meteor.call("makeActiveQuestion", questionId, showTimer, startTime, roomId);
	},
	"click .removeActiveQuestion": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		var roomId = Questions.findOne(questionId).questionFormHash.roomId;
		Meteor.call("removeActiveQuestion", questionId, roomId);
		Meteor.call("updateScoreBoardRanks", roomId);
	},
	"click .resetVotes": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		Meteor.call("resetVotes", questionId);
	},
	"click .questionJson": function(evt, template){
		console.log("Generating question JSON data...");

		var question = Questions.findOne(this._id);
		var questionText = question.questionFormHash.question;
		var answersArray = question.questionFormHash.answers;
		var questionDataHash = {};
		var newAnswersArray = [];
		questionDataHash["Question"] = questionText;
		$.each(answersArray, function(index, value){
			var text = value["text"];
			var users = value["users"];
			var answerHash = {};
			var emailArray = [];
			answerHash["Text"] = text;
			$.each(users, function(index, value){
				var user = Meteor.users.findOne(value);
				user ? email = user.emails[0].address : email = "Deleted User";
				emailArray.push(email);
			});
			answerHash["Users Who Voted For This"] = emailArray;
			newAnswersArray.push(answerHash);
		});
		questionDataHash["Answers"] = newAnswersArray;
		console.log(JSON.stringify(questionDataHash));
	},
	"click .resetQuestionData": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		Meteor.call("resetQuestionData", questionId);
	},
	"click .editQuestions": function(evt, template){
		evt.preventDefault();
		let editEnabled = $(evt.target).attr("editEnabled");
		let adminOption = $(evt.target).closest(".adminManagementContainer").attr("adminOption");
		if (editEnabled == "true") {
			$(".adminManagementContainer[adminOption='" + adminOption + "'] input").not(".startTimerSeconds").attr("readonly", "readonly");
			$(evt.target).attr("editEnabled", "false");
			$(evt.target).html("Edit");
		}
		else {
			$(".adminManagementContainer[adminOption='" + adminOption + "'] input").not(".startTimerSeconds").attr("readonly", false);
			$(evt.target).attr("editEnabled", "true");
			$(evt.target).html("Lock Editing");
		}
	},
	"focusout .questionText": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		var questionText = $(evt.target).val();
		Meteor.call("editQuestion", questionId, questionText);
	},
	"focusout .questionSessionName": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		var sessionName = $(evt.target).val();
		Meteor.call("editQuestionSessionName", questionId, sessionName);
	},
	"focusout .questionAskOrder": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		var askOrder = $(evt.target).val();
		Meteor.call("editQuestionAskOrder", questionId, askOrder);
	},
	"focusout .editAnswers input": function(evt, template){
		evt.preventDefault();
		var questionId = $(evt.target).attr("questionId");
		var selectedAnswerIndex = $(evt.target).attr("selectedAnswerIndex");
		var answerText = $(evt.target).val();
		Meteor.call("editQuestionAnswer", questionId, selectedAnswerIndex, answerText);
	},
	"focusout .editPoints input": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		var points = $(evt.target).val();
		if (!points){
			points = Questions.findOne(questionId).questionFormHash.points;
		}
		Meteor.call("editQuestionPoints", questionId, points);
	},
	"change .roomSelectionDropDown": function(evt, template){
		evt.preventDefault();
		var userId = Meteor.userId();
		var roomId = $(evt.target).val();
		Meteor.call("selectRoom", userId, roomId);
	}
});
