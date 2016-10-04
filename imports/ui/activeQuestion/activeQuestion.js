import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';
import { Questions } from "../../api/questions.js";
import { Rooms } from "../../api/rooms.js";
import { Images } from "../../api/images.js";

import "./activeQuestion.html";
import "./activeQuestionGraph/activeQuestionGraph.js";
import "./activeQuestionTimer/activeQuestionTimer.js";
import "./feedback/feedback.js";
import "./wagerForm/wagerForm.js";

Template.activeQuestion.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("showActiveQuestionGraph", false);
	instance.state.set("showFeedbackSection", false);
	Meteor.subscribe("images");
	let self = this;
	self.autorun(function() {
		let roomId = Meteor.user().profile.currentRoomId;
		self.subscribe("activeQuestion", roomId);
	});
});

Template.activeQuestion.helpers({
	activeQuestion: function() {
		let roomId = Meteor.user().profile.currentRoomId;
		return Questions.find({activeQuestion: true, "questionFormHash.roomId": roomId});
	},
	answeredQuestion: function() {
		if (Meteor.user()){
			let roomId = Meteor.user().profile.currentRoomId,
				question = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId}),
				questionId;
			question ? questionId = question._id : questionId = null;
			let questions = Meteor.user().profile.questionsUsersHaveVotedOn;
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
		let roomId = Meteor.user().profile.currentRoomId,
			questionId = this._id,
			question = Questions.findOne(questionId),
			rankNumber = question.rank.length + 1;
		return rankNumber;
	},
	triviaPointsWorth: function(){
		let roomId = Meteor.user().profile.currentRoomId,
			questionId = this._id,
			question = Questions.findOne(questionId),
			points = question.questionFormHash.points, 
			rankIndex = question.rank.length + 1,
			rankPoints = Math.round(points / rankIndex);
		if (rankPoints === 0){
			rankPoints = 1;
		}
		let totalPoints = points * 2 + rankPoints;
		return totalPoints;
	},
	rankPoints: function(){
		let roomId = Meteor.user().profile.currentRoomId,
			questionId = this._id,
			question = Questions.findOne(questionId),
			points = question.questionFormHash.points, 
			rankIndex = question.rank.length + 1,
			rankPoints = Math.round(points / rankIndex);
		if (rankPoints === 0){
			rankPoints = 1;
		}
		return rankPoints;
	},
	showActiveQuestionGraph: function(){
		const instance = Template.instance();
		if (instance.state.get("showActiveQuestionGraph")){
			return true;
		}
		else{
			return false;
		}
	},
	showFeedbackSection: function(){
		const instance = Template.instance();
		if (instance.state.get("showFeedbackSection")){
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
	},
	avatarImage: function(id) {
        let image = Images.findOne(id);
        return image;
    }
});

Template.activeQuestion.events({
	"click .answerContainer": function(evt, template){
		evt.preventDefault();
		var $this = $(evt.currentTarget),
			questionId = $this.attr("questionId"),
			selectedAnswerIndex = $(".answerContainer").index($this),
			userWager, 
			score = Meteor.user().profile.score;

		$(".userWager").val() ? userWager = $(".userWager").val() : userWager = 0;
		$this.closest(".activeQuestion").addClass("disabled");
		$this.find(".answerContainerContent").text("Your vote is being processed...");
		template.state.set("showActiveQuestionGraph", false);
		var questionFormHash = Questions.findOne(questionId).questionFormHash;
		if (questionFormHash.feedbackEnabled){
			template.state.set("showFeedbackSection", true);
		}
		else{
			template.state.set("showFeedbackSection", false);
		}

		if (parseInt(userWager) === score){
			Meteor.call("updateGamblingAddiction", Meteor.userId());
		}
		Meteor.call("voteOnActiveQuestion", questionId, selectedAnswerIndex, userWager);
	},
	"click .clickForGraph": function(evt, template){
		evt.preventDefault();
		template.state.set("showActiveQuestionGraph", true);
	},
	"click .clickForDoughnut": function(evt, template){
		evt.preventDefault();
		template.state.set("showActiveQuestionGraph", true);
	},
	"click .inputAnswerSubmit": function(evt, template){
		evt.preventDefault();
		var questionId = this._id;
		var userAnswer = template.find("#user-answer").value;
		userAnswer = userAnswer.toLowerCase().replace(/\s+/g, '');
		var userWager;
		$(".userWager").val() ? userWager = $(".userWager").val() : userWager = 0;
		template.state.set("showActiveQuestionGraph", true);
		Meteor.call("answerInputQuestion", questionId, userAnswer, userWager);
	},
	"click .returnToLobby": function(evt){
		evt.preventDefault();
		var userId = Meteor.userId();
		Meteor.call("removeCurrentRoom", userId);
	},
	"click .feedbackVote": function(evt, template){
		evt.preventDefault();
		var feedbackVote = $(evt.currentTarget).attr("vote");
		if (feedbackVote === "good"){
			template.state.set("showActiveQuestionGraph", true);
		}
	},
	"click .feedbackSubmit": function(evt, template){
		evt.preventDefault();
		template.state.set("showActiveQuestionGraph", true);
	}
});