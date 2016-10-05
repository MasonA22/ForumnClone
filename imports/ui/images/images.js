import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Images } from "../../api/images.js";

import "./images.html";

Template.images.onCreated(function(){
	let self = this;
	self.autorun(function() {
		self.subscribe("images");
	});
});

Template.images.helpers({
	images: function(){
		return Images.collection.find({});
	}
});

Template.images.events({
	"focusout .name": function(evt){
		evt.preventDefault();
		let imageId = this._id;
		let name = $(evt.target).val();
		Meteor.call("editImage", imageId, name);
	},
	"click .delete": function(evt) {
		evt.preventDefault();
		let imageId = this._id;
		Meteor.call("deleteImage", imageId);
	}
});