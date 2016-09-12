import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Rooms } from "../../api/rooms.js";

import "./addQuestion.html";
import "./questionTypes/addRoom.js";
import "./questionTypes/addBadge.js";
import "./questionTypes/addFeedbackType.js";
import "./questionTypes/triviaQuestion.js";
import "./questionTypes/pollQuestion.js";
import "./questionTypes/pictureQuestion.js";
import "./questionTypes/inputQuestion.js";

Template.addQuestion.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("questionType", false);
	instance.state.set("showRoomSelection", false);
	Meteor.subscribe("rooms");
	Meteor.subscribe("images");
});

Template.addQuestion.helpers({
	showRoom: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isRoom"){
			return true;
		}
		else{
			return false;
		}
	},
	showBadge: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isBadge"){
			return true;
		}
		else{
			return false;
		}
	},
	showFeedbackType: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isFeedbackType"){
			return true;
		}
		else{
			return false;
		}
	},
	showTrivia: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isTrivia"){
			return true;
		}
		else{
			return false;
		}
	},
	showPoll: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isPoll"){
			return true;
		}
		else{
			return false;
		}
	},
	showPicture: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isPicture"){
			return true;
		}
		else{
			return false;
		}
	},
	showInput: function(){
		const instance = Template.instance();
		if (instance.state.get("questionType") === "isInput"){
			return true;
		}
		else{
			return false;
		}
	},
	rooms: function(){
		return Rooms.find({});
	},
	showRoomSelection: function(){
		const instance = Template.instance();
		if (instance.state.get("showRoomSelection")){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.addQuestion.events({
	"click .addQuestionButton": function(evt, template){
		evt.preventDefault();
		var questionFormInputs = $('form').serializeArray();
		var questionType = template.state.get("questionType");
		var roomId = $(".roomSelectionDropDown").val();
		var questionFormHash = {};
		var answersArray = [];
		$.each(questionFormInputs, function(key, value){
			var name = value["name"];
			var answerCount = answersArray.length + 1;

			if (name === "answer"){
				var answerHash = {};
				answerHash["text"] = value["value"];
				answerHash["votes"] = 0;
				answerHash["users"] = [];
				answersArray.push(answerHash);
			}
			else if (name === "correct"){
				var answerHash = answersArray.pop();
				answerHash["correct"] = value["value"];
				answersArray.push(answerHash);
			}
			else if (name === "inputAnswer"){
				var inputAnswer = value["value"];
				questionFormHash[name] = inputAnswer;
				var answerDataHash = {};
				answerDataHash["correct"] = 0;
				answerDataHash["partiallyCorrect"] = 0;
				answerDataHash["incorrect"] = 0;
				questionFormHash["answerData"] = answerDataHash;
			}
			else{
				questionFormHash[name] = value["value"];
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
		answersArray = answersArray.filter(function(answer){
			return answer.text != "";
		});
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
	},
	"click .addPictureQuestionButton": function(evt, template){
		evt.preventDefault();

		var questionFormInputs = $('form').serializeArray();
		var questionType = template.state.get("questionType");
		var questionFormHash = {};
		var answersArray = [];
		var caption;
		var imagePath;
		var roomId = $(".roomSelectionDropDown").val();

		$.each(questionFormInputs, function(key, value){
			var name = value["name"];
			var answerCount = answersArray.length + 1;

			if (name === "caption"){
				value["value"] ? caption = value["value"] : caption = "No caption";
			}
			else if (name === "imagePath"){
				imagePath = value["value"];
			}

			if (name === "correct"){
				var answerHash = {};
				answerHash["text"] = caption;
				answerHash["imagePath"] = imagePath;
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
	},
	"click .addAnswer": function(evt, template){
		evt.preventDefault();

		var newInput = $("<input type='text' name='answer' class='answer'>");
		$('.answer').last().after(newInput);
		$(".answer").last().focus();
	},
	"click .addTriviaAnswer": function(evt, template){
		evt.preventDefault();

		var newInput = $("<input type='text' name='answer' class='answer' />");
		var newHidden = $("<input type='hidden' name='correct' class='hiddenAnswer' value='false' />");
		var newMarkCorrect = $("<div class='markCorrect disabled'>Mark as correct answer</div>");

		$('.markCorrect').last().after(newInput);
		$('.answer').last().after(newHidden);
		$('.hiddenAnswer').last().after(newMarkCorrect);
		$(".answer").last().focus();
	},
	"click .addPictureAnswer": function(evt, template){
		evt.preventDefault();

		var newHiddenImage = $("<input type='hidden' name='imagePath' class='hiddenImagePath' value='' />");
		var newCaption = $("<input type='text' name='caption' class='pictureCaption' placeholder='Enter caption here' />");
		var newInput = $("<input type='file' name='answer' class='answer pictureAnswer' />");
		var newHidden = $("<input type='hidden' name='correct' class='hiddenAnswer' value='false' />");
		var newMarkCorrect = $("<div class='markCorrect disabled'>Mark as correct answer</div>");

		$('.markCorrect').last().after(newHiddenImage);
		$('.hiddenImagePath').last().after(newCaption);
		$('.pictureCaption').last().after(newInput);
		$('.answer').last().after(newHidden);
		$('.hiddenAnswer').last().after(newMarkCorrect);
		$(".pictureCaption").last().focus();
	},
	"click .questionType": function(evt, template){
		evt.preventDefault();
		
		var questionType = $(evt.currentTarget).attr("questionType");
		template.state.set("questionType", questionType);

		if (questionType === "isTrivia" || questionType === "isPoll" || questionType === "isPicture" || questionType === "isInput"){
			template.state.set("showRoomSelection", true);
		}
		else{
			template.state.set("showRoomSelection", false);
		}
	},
	"click .markCorrect": function(evt, template){
		evt.preventDefault();

		$(".hiddenAnswer").attr("value", false);
		$(".answer").removeClass("correctAnswer");
		$(".markCorrect").addClass("disabled");
		$(evt.target).removeClass("disabled");

		$(evt.currentTarget).prev().prev().addClass("correctAnswer");
		$(evt.currentTarget).prev().attr("value", true);
	},
	"click .wagerToggle": function(evt, template){
		evt.preventDefault();

		var wagerEnabled = $(".wagerToggle").attr("wagerEnabled");
		if (wagerEnabled === "true"){
			$(".wagerToggle").attr("wagerEnabled", false);
			$(".wagerToggle").addClass("disabled");
			$(".wagerToggle").html("Enable Point Wager");
		}
		else{
			$(".wagerToggle").attr("wagerEnabled", true);
			$(".wagerToggle").removeClass("disabled");
			$(".wagerToggle").html("Disable Point Wager");
		}
	},
	"click .feedbackToggle": function(evt, template){
		evt.preventDefault();

		var feedbackEnabled = $(".feedbackToggle").attr("feedbackEnabled");
		if (feedbackEnabled === "true"){
			$(".feedbackToggle").attr("feedbackEnabled", false);
			$(".feedbackToggle").addClass("disabled");
			$(".feedbackToggle").html("Enable Feedback");
		}
		else{
			$(".feedbackToggle").attr("feedbackEnabled", true);
			$(".feedbackToggle").removeClass("disabled");
			$(".feedbackToggle").html("Disable Feedback");
		}
	},
	"change .pictureAnswer": function(evt, template){
		evt.preventDefault();

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
	},
	"change .badgeAvatar": function(evt){
			evt.preventDefault();

			FS.Utility.eachFile(event, function(file) {
		        Images.insert(file, function (err, fileObj) {
		        	if (err){
		        	} 
		        	else {
		        		setTimeout(function(){
		        			var imagePath = "/cfs/files/images/" + fileObj._id;
		        			$(evt.target).attr("value", imagePath);
		        		}, 1000);
		        	}
		        });
			});
	},
	"click .addRoomButton": function(evt, template){
		evt.preventDefault();

		var name = template.find("#room-name").value;
		Meteor.call("addRoom", name, function(error, result){
			if (error){
			}
			else{
				FlowRouter.go("/");
			}
		});
	},
	"keyup input:first": function(evt, template){
		evt.preventDefault();

		var name = $(evt.target).val();
		if (name.length > 0){
			$(evt.target).closest(".questionForm").find("button").attr("disabled", false);
		}
		else{
			$(evt.target).closest(".questionForm").find("button").attr("disabled", "disabled");
		}
	},
	"click .addBadgeButton": function(evt, template){
		evt.preventDefault();

		var badgeFormInputs = $('form').serializeArray();
		var badgeFormHash = {};
		$.each(badgeFormInputs, function(key, value){
			var name = value["name"];
			badgeFormHash[name] = value["value"];
		});
		var badgeAvatar = $(".badgeAvatar").attr("value");
		badgeFormHash["avatar"] = badgeAvatar;
		Meteor.call("addBadge", badgeFormHash, function(error, result){
			if (error){
			}
			else{
				FlowRouter.go("/");
			}
		});
	},
	"click .addFeedbackTypeButton": function(evt, template){
		evt.preventDefault();

		var name = template.find("#feedback-name").value;
		Meteor.call("addFeedbackType", name, function(error, result){
			if (error){
			}
			else{
				template.state.set("questionType", false);
			}
		});
	}
});