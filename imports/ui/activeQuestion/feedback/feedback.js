import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';
import { Questions } from "../../../api/questions.js";
import { FeedbackTypes } from "../../../api/feedbackTypes.js";

import "./feedback.html";

Template.feedback.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("showSuggestedFeedbackSection", false);
	
	let self = this;
	self.autorun(function() {
		self.subscribe("feedbackTypes");
	});
});

Template.feedback.helpers({
	feedbackTypes: function(){
		return FeedbackTypes.find({});
	},
	showSuggestedFeedbackSection: function(){
		const instance = Template.instance();
		if (instance.state.get("showSuggestedFeedbackSection")){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.feedback.events({
	"click .feedbackVote": function(evt, template){
		evt.preventDefault();
		var feedbackVote = $(evt.currentTarget).attr("vote");
		var questionId = this._id;
		var question = Questions.findOne(questionId);
		var questionFormHash = question.questionFormHash;
		var feedback = question.questionFormHash.feedback;
		if (feedbackVote === "good"){
			feedback["good"]++;
		}
		else{
			feedback["bad"]++;
			template.state.set("showSuggestedFeedbackSection", true);
		}
		Meteor.call("updateQuestionFeedback", questionId, feedback);
	},
	"click .feedbackSelection": function(evt){
		evt.preventDefault();
		if ($(evt.currentTarget).hasClass("active")){
			$(evt.currentTarget).removeClass("active");
		}
		else{
			$(evt.currentTarget).addClass("active");
		}
	},
	"click .feedbackSubmit": function(evt, template){
		evt.preventDefault();
		template.state.set("showSuggestedFeedbackSection", false);
		var questionId = this._id,
			question = Questions.findOne(questionId),
			feedback = question.questionFormHash.feedback;
			feedbackArray = [],
			feedbackHash = {};
		$(".feedbackSelection.active").each(function(){
			var name = $(this).attr("name");
			feedbackArray.push(name);
		});
		feedbackHash["userId"] = Meteor.userId();
		feedbackHash["feedbackArray"] = feedbackArray;
		feedback.feedbackUsers.push(feedbackHash);
		Meteor.call("updateQuestionFeedback", questionId, feedback);
	}
});