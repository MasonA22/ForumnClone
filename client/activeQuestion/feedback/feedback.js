Template.feedback.onRendered(function(){
	Session.set("showSuggestedFeedbackSection", false);
});

Template.feedback.helpers({
	feedbackTypes: function(){
		return FeedbackTypes.find({});
	},
	showSuggestedFeedbackSection: function(){
		if (Session.get("showSuggestedFeedbackSection")){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.feedback.events({
	"click .feedbackVote": function(evt){
		evt.preventDefault();
		var feedbackVote = $(evt.currentTarget).attr("vote");
		var questionId = this._id;
		var question = Questions.findOne(questionId);
		var questionFormHash = question.questionFormHash;
		var feedback = question.questionFormHash.feedback;
		if (feedbackVote === "good"){
			feedback["good"]++;
			Session.set("showActiveQuestionGraph", true);
		}
		else{
			feedback["bad"]++;
			Session.set("showSuggestedFeedbackSection", true);
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
	"click .feedbackSubmit": function(evt){
		evt.preventDefault();
		Session.set("showActiveQuestionGraph", true);
		Session.set("showSuggestedFeedbackSection", false);
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