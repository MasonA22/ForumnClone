import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';
import { Rooms } from "../../api/rooms.js";

import "./rooms.html";

Template.rooms.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("editEnabled", false);
	
	let self = this;
	self.autorun(function() {
		self.subscribe("rooms");
	});
});

Template.rooms.helpers({
	rooms: function() {
		return Rooms.find({});
	},
	editEnabled: function() {
		const instance = Template.instance();
		if (instance.state.get("editEnabled")){
			return true;
		}
		else{
			return false;
		}
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
		if (template.state.get("editEnabled")) {
			template.state.set("editEnabled", false);
		}
		else {
			template.state.set("editEnabled", true);
		}
	}
});