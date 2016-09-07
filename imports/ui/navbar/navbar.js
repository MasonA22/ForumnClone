import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ActivateQuestions } from "../../api/activateQuestions.js";
import { ActivateBadges } from "../../api/activateBadges.js";

import "./navbar.html";

Template.navbar.onCreated(function(){
	Meteor.subscribe("activateBadges");
	Meteor.subscribe("activateQuestions");
});

Template.navbar.helpers({
	userName: function(){
		var user = Meteor.user();
		var emailArray = user.emails[0].address.split("@");
		var userName = emailArray[0].substring(0, 8);
		return userName;
	},
	isQuestionActive: function(){ 
		var user = Meteor.user();
		if (Meteor.user()){ 
			var currentRoomId = Meteor.user().profile.currentRoomId;
			var activeQuestion = ActivateQuestions.findOne({roomId: currentRoomId});
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
	}
});

Template.navbar.events({
	"click .start-menu-icon": function(){
		$(".start-menu-arrow").toggleClass("rotate");
		$(".mobile-dropdown-menu").slideToggle("fast", function(){
		});
		$(".headerImage").toggleClass("headerImageActive");
	},
	"click .mobile-dropdown-menu li a": function(){
		$(".start-menu-arrow").removeClass("rotate");
		$(".mobile-dropdown-menu").slideToggle("fast", function(){
			$(".headerImage").removeClass("headerImageActive");
		});
	}
});