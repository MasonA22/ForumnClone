import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FeedbackTypes } from "../../api/feedbackTypes.js";

import "./feedbackTypes.html";

Template.feedbackTypes.onCreated(function(){
	Meteor.subscribe("feedbackTypes");
});

Template.feedbackTypes.helpers({
    feedbackTypes: function(){
        return FeedbackTypes.find({});
    }
});

Template.feedbackTypes.events({
	"focusout .name": function(evt){
		evt.preventDefault();
		let feedbackTypeId = this._id;
		let name = $(evt.target).val();
		Meteor.call("editFeedbackType", feedbackTypeId, name);
	},
    "click .delete": function(evt){
        evt.preventDefault();
        let feedbackTypeId = this._id;
        Meteor.call("deleteFeedbackType", feedbackTypeId);
    }
});