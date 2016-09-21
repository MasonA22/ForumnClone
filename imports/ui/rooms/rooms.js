import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Rooms } from "../../api/rooms.js";

import "./rooms.html";

Template.rooms.onCreated(function(){
	Meteor.subscribe("rooms");
});

Template.rooms.helpers({
	rooms: function(){
		return Rooms.find({});
	}
});

Template.rooms.events({
	"focusout .name": function(evt){
		evt.preventDefault();
		var roomId = this._id;
		var name = $(evt.target).val();
		Meteor.call("editRoom", roomId, name);
	},
	"click .delete": function(evt){
		evt.preventDefault();
		var roomId = this._id;
		Meteor.call("deleteRoom", roomId);
	}
});