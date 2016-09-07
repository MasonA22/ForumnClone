import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ActivateQuestions = new Mongo.Collection("activateQuestions");

ActivateQuestions.attachSchema(new SimpleSchema({
	roomId: {
		type: String,
		label: "Room ID"
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("activateQuestions", function(){
		return ActivateQuestions.find({});
	});
}

Meteor.methods({
	activateQuestions: function(questionId, roomId){
		console.log("Creating active question object...");
		ActivateQuestions.insert({
			questionId: questionId,		
			roomId: roomId,
			createdAt: new Date()
		});
	}
});