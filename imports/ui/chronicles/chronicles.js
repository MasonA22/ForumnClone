import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../api/questions.js";

import "./chronicles.html";

Template.chronicles.onCreated(function(){
	Meteor.subscribe("questions");
});

Template.chronicles.helpers({
    questions: function(){
        return Questions.find({alreadyAsked: true});
    }
});