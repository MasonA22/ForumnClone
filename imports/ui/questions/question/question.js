import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../../api/questions.js";
import { Rooms } from "../../../api/rooms.js";

import "./question.html";

Template.question.helpers({
	room: function(){
		var roomId = this.questionFormHash.roomId;
		return Rooms.findOne(roomId);
	},
	activeQuestionAttributes: function(){
		var questionId = this._id;
		var question = Questions.findOne(questionId);
		var activeQuestion = question.activeQuestion;
		var alreadyAsked = question.alreadyAsked;
		if (activeQuestion){
			return {
				class: "question activeQuestion"
			}
		}
		else{
			if (alreadyAsked){
				return {
					class: "question alreadyAsked"
				}
			}
			else{
				return {
					class: "question"
				}
			}
		}
	}
});