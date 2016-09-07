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
    "click .deleteFeedbackType": function(evt){
        evt.preventDefault();
        var feedbackTypeId = this._id;
        Meteor.call("deleteFeedbackType", feedbackTypeId);
    }
});