import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Questions } from "./questions.js";

export const Rooms = new Mongo.Collection("rooms");

Rooms.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("rooms", function(){
		return Rooms.find({});
	});
}

Meteor.methods({
	addRoom: function(name){
		console.log("Creating room...");
		Rooms.insert({		
			name: name,
			createdAt: new Date()
		});
	},
	deleteRoom: function(roomId){
		console.log("Deleting room...");
		Rooms.remove(roomId);
		Questions.remove({"questionFormHash.roomId": roomId});
	},
	editRoom: function(roomId, name){
		console.log("Editing room...");
		Rooms.update({_id: roomId},{
			$set: {
				name: name
			}
		});
	}
});