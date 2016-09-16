import { Template } from "meteor/templating";
import { Images } from "../../../api/images.js";

import "./pictureQuestion.html";

Template.pictureQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
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

			upload.on('end', function (error, fileObj) {
				if (error) {
					alert('Error during upload: ' + error);
				} 
				else {
					let fileId = fileObj._id;
					$(evt.target).prev().prev().val(fileId);
				}
			});
			upload.start();
		}
	},
	"click .addPictureQuestionButton": function(evt, template){
		evt.preventDefault();
		var questionFormInputs = $('form').serializeArray();
		var questionType = "isPicture";
		var questionFormHash = {};
		var answersArray = [];
		var caption;
		var imageId;
		var roomId = $(".roomSelectionDropDown").val();

		$.each(questionFormInputs, function(key, value){
			var name = value["name"];
			var answerCount = answersArray.length + 1;

			if (name === "caption"){
				value["value"] ? caption = value["value"] : caption = "No caption";
			}
			else if (name === "imageId"){
				imageId = value["value"];
			}

			if (name === "correct"){
				var answerHash = {};
				answerHash["text"] = caption;
				answerHash["imageId"] = imageId;
				answerHash["votes"] = 0;
				answerHash["users"] = [];
				answerHash["correct"] = value["value"];
				answersArray.push(answerHash);
			}
			else{
				if (name != "caption"){
					questionFormHash[name] = value["value"];
				}
			}
		});
		
		var wagerEnabled = $(".wagerToggle").attr("wagerEnabled");
		if (wagerEnabled === "true"){
			questionFormHash["wagerEnabled"] = true;
		}
		var feedbackEnabled = $(".feedbackToggle").attr("feedbackEnabled");
		if (feedbackEnabled === "true"){
			questionFormHash["feedbackEnabled"] = true;
			questionFormHash["feedback"] = {};
			questionFormHash["feedback"]["good"] = 0;
			questionFormHash["feedback"]["bad"] = 0;
		}
		questionFormHash[questionType] = true;
		questionFormHash["answers"] = answersArray;
		questionFormHash["roomId"] = roomId;

		Meteor.call("addQuestion", questionType, questionFormHash, function(error, result){
			if (error){
			}
			else{
				FlowRouter.go("/");
			}
		});
	}
});