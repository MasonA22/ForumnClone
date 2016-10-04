import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';
import { FeedbackTypes } from "../../api/feedbackTypes.js";

import "./feedbackTypes.html";

Template.feedbackTypes.onCreated(function() {
    this.state = new ReactiveDict();
    const instance = Template.instance();
    instance.state.set("editEnabled", false);
	Meteor.subscribe("feedbackTypes");
});

Template.feedbackTypes.helpers({
    feedbackTypes: function(){
        return FeedbackTypes.find({});
    },
    editEnabled: function() {
        const instance = Template.instance();
        if (instance.state.get("editEnabled")){
            return true;
        }
        else{
            return false;
        }
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
    },
    "click .adminManagementEdit": function(evt, template){
        evt.preventDefault();
        if (template.state.get("editEnabled")) {
            template.state.set("editEnabled", false);
        }
        else {
            template.state.set("editEnabled", true);
        }
    }
});