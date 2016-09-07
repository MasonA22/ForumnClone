import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Notifications } from "../../api/notifications.js";

import "./notifications.html";

Template.notifications.onCreated(function(){
	Meteor.subscribe("notifications");
});

Template.notifications.helpers({
	notifications: function(){
		var userId = Meteor.userId();
		return Notifications.find({userId: userId, seen: false});
	},
	showNotifications: function(){
		var userId = Meteor.userId();
		var notificationCount = Notifications.find({userId: userId, seen: false}).fetch().length;
		if (notificationCount > 0){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.notifications.events({
	"click .clearNotifications": function(evt, template){
		evt.preventDefault();
		var userId = Meteor.userId();
		Meteor.call("clearNotifications", userId);
	}
});