import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FeedbackTypes = new Mongo.Collection("feedbackTypes");

FeedbackTypes.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		unique: true
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("feedbackTypes", function(){
		return FeedbackTypes.find({});
	});
}

Meteor.methods({
	addFeedbackType: function(name){
		console.log("Creating new feedback type...");
		FeedbackTypes.insert({			
			name: name,
			createdAt: new Date()
		});
	},
	editFeedbackType: function(feedbackTypeId, name){
		console.log("Editing feedback type...");
		FeedbackTypes.update({_id: feedbackTypeId},{
			$set: {
				name: name
			}
		});
	},
	deleteFeedbackType: function(feedbackTypeId){
		console.log("Deleting feedback type...");
		FeedbackTypes.remove(feedbackTypeId);
	}
});