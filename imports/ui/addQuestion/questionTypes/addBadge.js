import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Images } from "../../../api/images.js";

import "./addBadge.html";

Template.addBadge.onRendered(function(){
    $("form").find("input").filter(":visible:first").focus();
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

			upload.on('end', function (error, fileObj) {
				if (error) {
					alert('Error during upload: ' + error);
				} 
				else {
					let imageId = upload.config.fileId;
					badgeFormHash["avatar"] = imageId;
					Meteor.call("addBadge", badgeFormHash, function(error, result){
						if (error){
						}
						else{
							FlowRouter.go("/");
						}
					});
				}
			});
			upload.start();
			
		}
	}
});