import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Images } from "../../api/images.js";

import "./images.html";

Template.images.onCreated(function(){
	Meteor.subscribe("images");
});

Template.images.helpers({
	images: function(){
		return Images.collection.find({});
	}
});

Template.images.events({
	"click .delete": function(evt) {
		evt.preventDefault();
		let imageId = this._id;
		Meteor.call("deleteImage", imageId);
	}
});