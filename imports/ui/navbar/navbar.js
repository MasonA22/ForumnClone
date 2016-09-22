import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActivateQuestions } from "../../api/activateQuestions.js";
import { ActivateBadges } from "../../api/activateBadges.js";

import "./navbar.html";

Template.navbar.onCreated(function(){
	Meteor.subscribe("activateBadges");
	Meteor.subscribe("activateQuestions");
});

Template.navbar.helpers({
	userName: function(){
		let user = Meteor.user();
		let emailArray = user.emails[0].address.split("@");
		let userName = emailArray[0].substring(0, 8);
		return userName;
	},
	isQuestionActive: function(){ 
		let user = Meteor.user();
		if (Meteor.user()){ 
			let currentRoomId = Meteor.user().profile.currentRoomId;
			let activeQuestion = ActivateQuestions.findOne({roomId: currentRoomId});
			if (activeQuestion){
				return true;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	},
	activateBadges: function(){
		return ActivateBadges.find({});
	},
	inRoom: function() {
		let currentRoute = FlowRouter.getRouteName();
		let user = Meteor.user();
		let currentRoomId = Meteor.user().profile.currentRoomId;
		if (currentRoute === "home" && currentRoomId) {
			return true;
		}
		else {
			return false;
		}
	}
});

Template.navbar.events({
	"click .start-menu-icon": function(){
		$(".start-menu-arrow").toggleClass("rotate");
		$(".mobile-dropdown-menu").slideToggle("fast", function(){
		});
		$(".headerImage").toggleClass("active");
	},
	"click .mobile-dropdown-menu li a": function(){
		$(".start-menu-arrow").removeClass("rotate");
		$(".mobile-dropdown-menu").slideToggle("fast", function(){
			$(".headerImage").removeClass("active");
		});
	},
	"click .returnToLobby": function(evt){
		evt.preventDefault();
		var userId = Meteor.userId();
		Meteor.call("removeCurrentRoom", userId);
	}
});