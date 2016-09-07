Template.feedbackTypes.onCreated(function(){
	Meteor.subscribe("feedbackTypes");
});

Template.feedbackTypes.helpers({
    feedbackTypes: function(){
        return FeedbackTypes.find({});
    }
});

Template.feedbackTypes.events({
    "click .deleteFeedbackType": function(evt){
        evt.preventDefault();
        var feedbackTypeId = this._id;
        Meteor.call("deleteFeedbackType", feedbackTypeId);
    }
});