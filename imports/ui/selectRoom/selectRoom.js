import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Rooms } from "../../api/rooms.js";

import "./selectRoom.html";

Template.selectRoom.onCreated(function() {
	let self = this;
	self.autorun(function() {
		self.subscribe("rooms");
	});
});

Template.selectRoom.helpers( {
	rooms: function() {
		return Rooms.find({});
	}
});

Template.selectRoom.events({
	"click .selectRoom": function(evt, template) {
		evt.preventDefault();
		let roomId = this._id;
		let userId = Meteor.userId();
		Meteor.call("selectRoom", userId, roomId);
	}
});