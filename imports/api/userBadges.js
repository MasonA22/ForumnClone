import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const UserBadges = new Mongo.Collection("userBadges");

UserBadges.attachSchema(new SimpleSchema({
	"userId": {
		type: String,
		label: "User ID"
	},
	"badgeId": {
		type: String,
		label: "Badge ID"
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("userBadges", function(){
		return UserBadges.find({});
	});
}

Meteor.methods({
	addUserBadge: function(userId, badgeId){
		console.log("Adding user badge...");
		UserBadges.insert({
			userId: userId,		
			badgeId: badgeId,
			createdAt: new Date()
		});
	},
	deleteUserBadges: function(userId){
		console.log("Deleting user badge...");
		UserBadges.remove({userId: userId});
	}
});