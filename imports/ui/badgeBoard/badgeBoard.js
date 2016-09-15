import { Template } from "meteor/templating";
import { Badges } from "../../api/badges.js";

import "./badgeBoard.html";
import "./badgeType/badgeType.js";

Template.badgeBoard.onCreated(function(){
	Meteor.subscribe("badges");
	Meteor.subscribe("images");
});

Template.badgeBoard.helpers({
    badges: function(){
        return Badges.find({});
    }
});