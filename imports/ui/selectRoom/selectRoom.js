import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Rooms } from "../../api/rooms.js";

import "./selectRoom.html";

Template.selectRoom.onCreated(function(){
	Meteor.subscribe("rooms");
});

Template.selectRoom.helpers({
	rooms: function(){
		return Rooms.find({});
	}
});

Template.selectRoom.events({
	"click .selectRoom": function(evt, template){
		evt.preventDefault();
		var roomId = this._id;
		var userId = Meteor.userId();
		Meteor.call("selectRoom", userId, roomId);
	}
});