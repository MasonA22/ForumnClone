import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Badges = new Mongo.Collection("badges");

Badges.attachSchema(new SimpleSchema({
	"name": {
		type: String,
		label: "Badge Name",
		max: 200,
		unique: true
	},
	"description": {
		type: String,
		label: "Badge Description"
	},
	"avatar": {
		type: String,
		label: "Badge Avatar",
		optional: true
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("badges", function(){
		return Badges.find({});
	});
}

Meteor.methods({
	addBadge: function(badgeFormHash){
		console.log("Creating new badge...");
		Badges.insert({			
			name: badgeFormHash.name,
			description: badgeFormHash.description,
			avatar: badgeFormHash.avatar,
			createdAt: new Date()
		});
	},
	updateBadge: function(badgeId, avatar){
		console.log("Updating badge...");
		Badges.update({_id: badgeId},
			{$set: {
				avatar: avatar
			}
		});
	},
	deleteBadge: function(badgeId){
		console.log("Deleting badge...");
		Badges.remove(badgeId);
	}
});