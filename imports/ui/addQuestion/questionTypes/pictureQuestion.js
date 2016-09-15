import { Template } from "meteor/templating";
import { Images } from "../../../api/images.js";

import "./pictureQuestion.html";

Template.pictureQuestion.onCreated(function(){
	this.currentUpload = new ReactiveVar(false);
});

Template.pictureQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});

Template.pictureQuestion.helpers({
	currentUpload: function () {
		return Template.instance().currentUpload.get();
	}
});

Template.pictureQuestion.events({
	"change .pictureAnswer": function(evt, template){
		evt.preventDefault();

		if (evt.currentTarget.files && evt.currentTarget.files[0]) {
			// We upload only one file, in case 
			// multiple files were selected
			var upload = Images.insert({
				file: evt.currentTarget.files[0],
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
					var imagePath = "/" + fileObj.link;

					console.log(fileObj);

					$(evt.target).css("background", "url('" + imagePath + "')");
					$(evt.target).prev().prev().attr("value", imagePath);
				}
				template.currentUpload.set(false);
			});
			upload.start();
		}

		// FS.Utility.eachFile(event, function(file) {
	 //        Images.insert(file, function (err, fileObj) {
	 //        	if (err){
	 //        	} 
	 //        	else {
	 //        		setTimeout(function(){
	 //        			var imagePath = "/cfs/files/images/" + fileObj._id;
	 //        			$(evt.target).css("background-image", "url('" + imagePath + "')");
	 //        			$(evt.target).prev().prev().attr("value", imagePath);
	 //        		}, 1000);
	 //        	}
	 //        });
		// });
	}
});