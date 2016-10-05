import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Badges } from "../../api/badges.js";

import "./badges.html";
import "./badge/badge.js";

Template.badges.onCreated(function() {
	let self = this;
	self.autorun(function() {
		self.subscribe("images");
		self.subscribe("badges");
	});
});

Template.badges.helpers({
    badges: function() {
        return Badges.find({});
    }
});