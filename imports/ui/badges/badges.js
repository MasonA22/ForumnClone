import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Badges } from "../../api/badges.js";

import "./badges.html";
import "./badge/badge.js";

Template.badges.onCreated(function(){
	Meteor.subscribe("images");
	Meteor.subscribe("badges");
});

Template.badges.helpers({
    badges: function(){
        return Badges.find({});
    }
});