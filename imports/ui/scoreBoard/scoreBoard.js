import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';

import "./scoreBoard.html";
import "./scoreBoardUser/scoreBoardUser.html";

Template.scoreBoard.onCreated(function() {
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("showAllScores", false);
	Meteor.subscribe("allUsers");
});

Template.scoreBoard.helpers({
	users: function(){
		const instance = Template.instance();
		var showAllScores = instance.state.get("showAllScores");
		if (showAllScores) {
			return Meteor.users.find({"profile.isAdmin": false},
									 {sort: {"profile.score": -1}},
									 {fields: {"profile": 1, "emails": 1}}
									);
		}
		else {
			return Meteor.users.find({"profile.isAdmin": false},
									 {sort: {"profile.score": -1}, limit: 10},
									 {fields: {"profile": 1, "emails": 1}}
									);
		}
	},
	showAllScores: function(){
		const instance = Template.instance();
		if (instance.state.get("showAllScores")){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.scoreBoard.events({
	"click .showAllScores": function(evt, template){
		evt.preventDefault();
		if (template.state.get("showAllScores")){
			template.state.set("showAllScores", false);
		}
		else{
			template.state.set("showAllScores", true);
		}
	}
});