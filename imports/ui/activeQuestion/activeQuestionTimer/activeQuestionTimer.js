import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../../api/questions.js";

import "./activeQuestionTimer.html";

Template.activeQuestionTimer.onRendered(function(){
	var roomId = Meteor.user().profile.currentRoomId;
	var activeQuestion = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId});
	var activeQuestionId = activeQuestion._id;
	var startTime = activeQuestion.startTime;

	$(".activeQuestionTimerClock").attr("data-timer", startTime);
	$(".activeQuestionTimerClock").TimeCircles({
		time: {
			Days:{show: false},
			Hours: {show: false},
			Minutes: {show: false},
			Seconds: {color: "rgb(221, 72, 20)", text: "GET READY"}
		},
		count_past_zero: false
	}).addListener(function(unit, value, total){
		if (total === 0){
			console.log("Timer complete");
			Meteor.call("updateShowTimer", activeQuestionId, false);
		}
	});
});