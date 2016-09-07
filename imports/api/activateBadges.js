import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ActivateBadges = new Mongo.Collection("activateBadges");

ActivateBadges.attachSchema(new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("activateBadges", function(){
		return ActivateBadges.find({});
	});
}

Meteor.methods({
	activateBadges: function(){
		console.log("Activating Badges...");
		ActivateBadges.insert({
			createdAt: new Date()
		});
		var users = Meteor.users.find({isAdmin: false, isModerator: false});
		var badgeId,
			largestRankRiseNumber = 0,
			largestRankDropNumber = 0,
			largestRankRiseUser = null,
			largestRankDropUser = null,
			totalQuestions = Questions.find({}).count();

		users.forEach(function(user){
			//checking for negative points badge
			var score = user.profile.score;
			if (score < 0){
				badgeId = Badges.findOne({"name": "There is no rock bottom"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}

			//rank change rise badge
			var rankChangeLargestRise = user.profile.rankChangeLargestRise;
			if (rankChangeLargestRise > 35){
				badgeId = Badges.findOne({"name": "Can we get much higher?"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}

			//rank change drop badge
			var rankChangeLargestDrop = user.profile.rankChangeLargestDrop;
			if (rankChangeLargestDrop < -35){
				badgeId = Badges.findOne({"name": "Baby, I've got the bends"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}

			//largest rank change rise of all users badge
			if (rankChangeLargestRise > largestRankRiseNumber){
				largestRankRiseNumber = rankChangeLargestRise;
				largestRankRiseUser = user._id;
			}

			//largest rank change drop of all users badge
			if (rankChangeLargestDrop < largestRankDropNumber){
				largestRankDropNumber = rankChangeLargestDrop;
				largestRankDropUser = user._id;
			}

			//voted in over 20 sessions badge
			var totalVotes = user.profile.totalVotes;
			if (totalVotes > 20){
				badgeId = Badges.findOne({"name": "I heart Forum-Live"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}

			// voted on every single question badge
			if (totalVotes >= totalQuestions){
				badgeId = Badges.findOne({"name": "Til the bitter end"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}

			// never tell me the odds badge
			var gamblingAddiction = user.profile.gamblingAddiction;
			if (gamblingAddiction){
				badgeId = Badges.findOne({"name": "Never Tell Me the Odds"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}

			//room hopper
			var roomHopper = user.profile.roomHopper;
			if (roomHopper){
				badgeId = Badges.findOne({"name": "Room Hopper"})._id;
				Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
			}
		});

		//awarding largest rank change rise of all users badge
		if (largestRankRiseUser){
			badgeId = Badges.findOne({"name": "Rank Change Royalty"})._id;
			Meteor.call("addUserBadge", largestRankRiseUser, badgeId, function(error, result){});
		}

		//awarding largest rank change drop of all users badge
		if (largestRankDropUser){
			badgeId = Badges.findOne({"name": "Fatality"})._id;
			Meteor.call("addUserBadge", largestRankDropUser, badgeId, function(error, result){});
		}
	},
	deactivateBadges: function(){
		console.log("Deactivating Badges...");
		ActivateBadges.remove({});
	}
});