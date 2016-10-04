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
		let roomId = this._id;
		let name = $(evt.target).val();
		Meteor.call("editRoom", roomId, name);
	},
	"click .delete": function(evt){
		evt.preventDefault();
		let roomId = this._id;
		Meteor.call("deleteRoom", roomId);
	},
	"click .adminManagementEdit": function(evt, template){
		evt.preventDefault();
		let editEnabled = $(evt.target).attr("editEnabled");
		let adminOption = $(evt.target).closest(".adminManagementContainer").attr("adminOption");
		if (editEnabled == "true") {
			$(".adminManagementContainer[adminOption='" + adminOption + "'] input").not(".startTimerSeconds").attr("readonly", "readonly");
			$(evt.target).attr("editEnabled", "false");
			$(evt.target).html("Edit");
		}
		else {
			$(".adminManagementContainer[adminOption='" + adminOption + "'] input").not(".startTimerSeconds").attr("readonly", false);
			$(evt.target).attr("editEnabled", "true");
			$(evt.target).html("Lock Editing");
		}
	}
});