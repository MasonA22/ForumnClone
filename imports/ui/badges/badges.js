import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Badges } from "../../api/badges.js";

import "./badges.html";

Template.badges.onCreated(function(){
	Meteor.subscribe("badges");
});

Template.badges.helpers({
    badges: function(){
        return Badges.find({});
    }
});