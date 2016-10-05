import { Template } from "meteor/templating";
import { Badges } from "../../api/badges.js";

import "./badgeBoard.html";
import "./badgeType/badgeType.js";

Template.badgeBoard.onCreated(function(){
	let self = this;
	self.autorun(function() {
		self.subscribe("images");
		self.subscribe("badges");
	});
});

Template.badgeBoard.helpers({
    badges: function(){
        return Badges.find({});
    }
});