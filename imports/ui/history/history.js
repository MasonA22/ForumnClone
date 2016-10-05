import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../api/questions.js";

import "./history.html";
import "./historyQuestion/historyQuestion.js";

Template.history.onCreated(function() {
	let self = this;
	self.autorun(function() {
		self.subscribe("alreadyAskedQuestions");
	});
});

Template.history.helpers({
    questions: function(){
        return Questions.find({});
    }
});