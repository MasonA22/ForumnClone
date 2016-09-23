import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
    isSuperAdmin: {
        type: Boolean,
        label: "isSuperAdmin Flag",
        defaultValue: false
    },
    isAdmin: {
        type: Boolean,
        label: "isAdmin Flag",
        defaultValue: false
    },
    isModerator: {
        type: Boolean,
        label: "isModerator Flag",
        defaultValue: false
    },
    score: {
        type: Number,
        label: "Score",
        defaultValue: 1000
    },
    currentRoomId: {
        type: String,
        label: "Current Room ID",
        optional: true
    },
    previousScoreBoardRank: {
        type: Number,
        label: "Previous score board rank",
        defaultValue: 0
    },
    rankChange: {
        type: Number,
        label: "Rank change",
        defaultValue: 0
    },
    rankChangeLargestRise: {
    	type: Number,
    	label: "Rank change largest rise",
    	defaultValue: 0
    },
    rankChangeLargestDrop: {
    	type: Number,
    	label: "Rank change largest drop",
    	defaultValue: 0
    },
    totalVotes: {
        type: Number,
        label: "Total votes",
        defaultValue: 0
    },
    questionsUsersHaveVotedOn: {
    	type: [String],
    	label: "Questions users have voted on",
    	defaultValue: []
    },
    gamblingAddiction: {
    	type: Boolean,
    	label: "Gambling addiction flag",
    	defaultValue: false
    },
    roomHopper: {
    	type: Boolean,
    	label: "Room Hopper Flag",
    	defaultValue: false
    },
    lastRoomAQuestionWasAnsweredIn: {
    	type: String,
    	label: "Last room a question was answered in",
    	optional: true
    },
    lastTimeAQuestionWasAnswered: {
    	type: Date,
    	label: "Last time a question was answered",
    	optional: true
    }
});

Meteor.users.attachSchema(new SimpleSchema({
	emails: {
	    type: [Object]
	},
	"emails.$.address": {
	    type: String,
	    regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
	    type: Boolean
	},
	createdAt: {
	    type: Date
	},
	verified: {
	    type: Boolean,
	    optional: true
	},
	profile: {
	    type: Schemas.UserProfile
	},
	services: {
	    type: Object,
	    optional: true,
	    blackbox: true
	}
}));

if (Meteor.isServer) {
	Meteor.publish("allUsers", function(){
		return Meteor.users.find({}, {fields: {"profile": 1, "emails": 1}});
	});

	Meteor.publish("presences", function(){
		return Presences.find({});
	});
}

Meteor.methods({
    updateUserScore: function(userId, points){
        console.log("Updating the current user's score...");
        var user = Meteor.users.findOne({_id: userId});
        var score = user.profile.score;
        var newScore = parseInt(score) + parseInt(points);
        
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.score": newScore
            }
        });

        console.log("Current score...");
        console.log(newScore);
    },
    updateUserVoteHistory: function(userId, questionId){
        console.log("Updating the user's vote history...");
        var user = Meteor.users.findOne(userId);
        var totalVotes = user.profile.totalVotes + 1;
        var questionsArray = user.profile.questionsUsersHaveVotedOn;
        questionsArray.push(questionId);
        questionsArray = Array.from(new Set(questionsArray));
        var roomId = user.profile.currentRoomId;

        Meteor.users.update({_id: userId},
            {$set: {
                "profile.totalVotes": totalVotes,
                "profile.questionsUsersHaveVotedOn": questionsArray,
                "profile.lastRoomAQuestionWasAnsweredIn": roomId,
                "profile.lastTimeAQuestionWasAnswered": new Date()
            }
        });
    },
    updateAdminAttribute: function(userId, makeAdmin){
        console.log("Updating the selected user's admin status...");
        var user = Meteor.users.findOne({_id: userId});
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.isAdmin": makeAdmin
            }
        });
        var points = 4000;
        var message = "Congratulations! You have been made an admin and awarded " + points + " bonus points because you are now above the law.";
        Meteor.call("updateUserScore", userId, points, function(error, result){});
        Meteor.call("createNotification", userId, message, function(error, result){});
    },
    updateModeratorAttribute: function(userId, makeModerator){
        console.log("Updating the selected user's modeator status...");
        var user = Meteor.users.findOne({_id: userId});
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.isModerator": makeModerator
            }
        });
    },
    updateGamblingAddiction: function(userId){
        console.log("Updating gambling addiction flag...");
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.gamblingAddiction": true
            }
        });
    },
    updateRoomHopper: function(userId){
        console.log("Updating room hopper flag...");
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.roomHopper": true
            }
        });
    },
    deleteUser: function(userId){
        console.log("Deleting user...");
        Meteor.users.remove(userId, function(error, result){
            if (error){
            }
            else{
                Meteor.call("deleteUserBadges", userId, function(error, result){});
            }
        });
    },
    selectRoom: function(userId, roomId){
        console.log("Selecting room...");
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.currentRoomId": roomId
            }
        });
    },
    removeCurrentRoom: function(userId){
        console.log("Removing currently selected room...");
        Meteor.users.update({_id: userId},
            {$set: {
                "profile.currentRoomId": null
            }
        });
    },
    updateScoreBoardRanks: function(roomId){
        console.log("Updating the score board ranks...");
        var users = Meteor.users.find({"profile.isAdmin": false},
                                 {sort: {"profile.score": -1}},
                                 {fields: {"profile": 1, "emails": 1}}
                                );
        users.forEach(function(user, index){
            var userId = user._id;
            var rank = index + 1;
            var rankChange;
            var previousScoreBoardRank = user.profile.previousScoreBoardRank;
            var rankChangeLargestRise = user.profile.rankChangeLargestRise;
            var rankChangeLargestDrop = user.profile.rankChangeLargestDrop;

            if (previousScoreBoardRank === 0){
                rankChange = 0;
            }
            else{
                rankChange = previousScoreBoardRank - rank;
            }
            if (rankChange > rankChangeLargestRise){
                rankChangeLargestRise = rankChange;
            }
            if (rankChange < rankChangeLargestDrop){
                rankChangeLargestDrop = rankChange;
            }

            Meteor.users.update({_id: userId, "profile.currentRoomId": roomId},
                {$set: {
                    "profile.previousScoreBoardRank": rank,
                    "profile.rankChange": rankChange,
                    "profile.rankChangeLargestRise": rankChangeLargestRise,
                    "profile.rankChangeLargestDrop": rankChangeLargestDrop
                }
            });
        });
    }
});