import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { UserBadges } from "../../../api/userBadges.js";

import "./badgeType.html";

Template.badgeType.onCreated(function(){
	Meteor.subscribe("userBadges");
});

Template.badgeType.helpers({
    userBadges: function(){
        var badgeId = this._id;
        return UserBadges.find({badgeId: badgeId});
    }
});