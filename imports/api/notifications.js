import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Notifications = new Mongo.Collection("notifications");

Notifications.attachSchema(new SimpleSchema({
	message: {
		type: String,
		label: "Notification Message"
	},
	userId: {
		type: String,
		label: "User ID"
	},
	seen: {
		type: Boolean,
		label: "Seen Flag",
		defaultValue: false
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("notifications", function(){
		return Notifications.find({userId: this.userId, seen: false});
	});
}

Meteor.methods({
	createNotification: function(userId, message){
		console.log("Creating notification...");
		Notifications.insert({			
			message: message,
			userId: userId,
			createdAt: new Date()
		});
	},
	clearNotifications: function(userId){
		console.log("Clearing notifications...");
		Notifications.update({userId: userId},{
			$set: {
				seen: true
			}
		},
			{multi: true}
		);
	}
});