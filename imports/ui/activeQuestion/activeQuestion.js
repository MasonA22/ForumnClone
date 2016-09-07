import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../api/questions.js";
import { Rooms } from "../../api/rooms.js";

import "./activeQuestion.html";

Template.activeQuestion.onCreated(function(){
	Meteor.subscribe("questions");
});

Template.activeQuestion.helpers({
	activeQuestion: function() {
		var roomId = Meteor.user().profile.currentRoomId;
		return Questions.find({activeQuestion: true, "questionFormHash.roomId": roomId});
	},
	answeredQuestion: function() {
		if (Meteor.user()){
			var roomId = Meteor.user().profile.currentRoomId,
				question = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId}),
				questionId;
			question ? questionId = question._id : questionId = null;
			var questions = Meteor.user().profile.questionsUsersHaveVotedOn;
			if (questions.indexOf(questionId) != -1){
				return true;
			}
			else {
				return false;
			}
		}
		else{
			return false;
		}
	},
	rankNumber: function(){
		var roomId = Meteor.user().profile.currentRoomId;
		var activeQuestion = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId});
		activeQuestion ? rankNumber = activeQuestion.rank.length + 1 : rankNumber = 0;
		return rankNumber;
	},
	triviaPointsWorth: function(){
		var roomId = Meteor.user().profile.currentRoomId;
		var question = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId});
		var points, rankIndex;
		question ? points = question.questionFormHash.points : points = 0;
		question ? rankIndex = question.rank.length + 1 : rankIndex = 1;
		var rankPoints = Math.round(points / rankIndex);
		if (rankPoints === 0){
			rankPoints = 1;
		}
		var totalPoints = points * 2 + rankPoints;
		return totalPoints;
	},
	rankPoints: function(){
		var roomId = Meteor.user().profile.currentRoomId;
		var question = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId});
		var points, rankIndex;
		question ? points = question.questionFormHash.points : points = 0;
		question ? rankIndex = question.rank.length + 1 : rankIndex = 1;
		var rankPoints = Math.round(points / rankIndex);
		if (rankPoints === 0){
			rankPoints = 1;
		}
		return rankPoints;
	},
	showActiveQuestionGraph: function(){
		if (Session.get("showActiveQuestionGraph")){
			return true;
		}
		else{
			return false;
		}
	},
	showFeedbackSection: function(){
		if (Session.get("showFeedbackSection")){
			if (Meteor.user().profile.isModerator){
				return false;
			}
			else{
				return true;
			}
		}
		else{
			return false;
		}
	},
	currentRoom: function(){
		var roomId = Meteor.user().profile.currentRoomId;
		return Rooms.findOne(roomId);
	}
});

Template.activeQuestion.events({
	"click .answerContainer": function(evt){
		evt.preventDefault();
		var $this = $(evt.currentTarget),
			questionId = $this.attr("questionId"),
			selectedAnswerIndex = $(".answerContainer").index($this),
			userWager, 
			score = Meteor.user().profile.score;

		$(".userWager").val() ? userWager = $(".userWager").val() : userWager = 0;
		$(".activeQuestion").addClass("disabled");
		$this.find(".answerContainerContent").text("Your vote is being processed...");

		Session.set("showActiveQuestionGraph", false);
		var questionFormHash = Questions.findOne(questionId).questionFormHash;
		if (questionFormHash.feedbackEnabled){
			Session.set("showFeedbackSection", true);
		}
		else{
			Session.set("showFeedbackSection", false);
		}

		if (parseInt(userWager) === score){
			Meteor.call("updateGamblingAddiction", Meteor.userId());
		}
		Meteor.call("voteOnActiveQuestion", questionId, selectedAnswerIndex, userWager);
	},
	"click .clickForGraph": function(evt){
		evt.preventDefault();
		Session.set("showActiveQuestionGraph", true);
	},
	"click .clickForDoughnut": function(evt){
		evt.preventDefault();
		Session.set("showActiveQuestionGraph", true);
	},
	"click .inputAnswerSubmit": function(evt, template){
		evt.preventDefault();

		var questionId = this._id;
		var userAnswer = template.find("#user-answer").value;
		userAnswer = userAnswer.toLowerCase().replace(/\s+/g, '');
		var userWager;
		$(".userWager").val() ? userWager = $(".userWager").val() : userWager = 0;
		Session.set("showActiveQuestionGraph", true);
		Meteor.call("answerInputQuestion", questionId, userAnswer, userWager);
	},
	"click .returnToLobby": function(evt){
		evt.preventDefault();
		var userId = Meteor.userId();
		Meteor.call("removeCurrentRoom", userId);
	}
});