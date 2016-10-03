import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Notifications } from "../../api/notifications.js";

import "./notifications.html";

Template.notifications.onCreated(function(){
	Meteor.subscribe("notifications");
});

Template.notifications.helpers({
	notifications: function(){
		return Notifications.find({});
	}
});

Template.notifications.events({
	"click .clearNotifications": function(evt, template){
		evt.preventDefault();
		var userId = Meteor.userId();
		Meteor.call("clearNotifications", userId);
	}
});