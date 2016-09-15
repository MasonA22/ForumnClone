import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { UserBadges } from "../../../api/userBadges.js";
import { Images } from "../../../api/images.js";

import "./badgeType.html";
import "../userBadge/userBadge.js";

Template.badgeType.onCreated(function(){
	Meteor.subscribe("userBadges");
});

Template.badgeType.helpers({
    userBadges: function(){
        var badgeId = this._id;
        return UserBadges.find({badgeId: badgeId});
    },
    avatarImage: function(id) {
        let image = Images.findOne(id);
        return image;
    }
});