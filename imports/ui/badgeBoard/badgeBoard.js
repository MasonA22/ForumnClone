import { Template } from "meteor/templating";
import { Badges } from "../../api/badges.js";

import "./badgeBoard.html";

Template.badgeBoard.onCreated(function(){
	Meteor.subscribe("badges");
});

Template.badgeBoard.helpers({
    badges: function(){
        return Badges.find({});
    }
});