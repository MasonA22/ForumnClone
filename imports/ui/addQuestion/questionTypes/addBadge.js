import { Template } from "meteor/templating";
import { Images } from "../../../api/images.js";

import "./addBadge.html";

Template.addBadge.onCreated(function(){
	this.currentUpload = new ReactiveVar(false);
});

Template.addBadge.onRendered(function(){
    $("form").find("input").filter(":visible:first").focus();
});

Template.addBadge.helpers({
	currentUpload: function () {
		return Template.instance().currentUpload.get();
	}
});

Template.addBadge.events({
	"click .addBadgeButton": function(evt, template){
		evt.preventDefault();

		var badgeFormInputs = $('form').serializeArray();
		var badgeFormHash = {};
		$.each(badgeFormInputs, function(key, value){
			var name = value["name"];
			badgeFormHash[name] = value["value"];
		});
		
		if ($(".badgeAvatar")[0].files && $(".badgeAvatar")[0].files[0]) {
			var upload = Images.insert({
				file: $(".badgeAvatar")[0].files[0],
				streams: 'dynamic',
				chunkSize: 'dynamic'
			}, false);

			upload.on('start', function () {
				template.currentUpload.set(this);
			});

			upload.on('end', function (error, fileObj) {
				if (error) {
					alert('Error during upload: ' + error);
				} 
				else {
					alert('File "' + fileObj.name + '" successfully uploaded');
				}
				template.currentUpload.set(false);
			});
			upload.start();
			let imageId = upload.config.fileId;
			badgeFormHash["avatar"] = imageId;
		}

		Meteor.call("addBadge", badgeFormHash, function(error, result){
			if (error){
			}
			else{
				FlowRouter.go("/");
			}
		});
	}
});