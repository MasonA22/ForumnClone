import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';
import { Questions } from "../../api/questions.js";
import { ActivateBadges } from "../../api/activateBadges.js";

import "./admin.html";

Template.admin.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("massNotification", false);
	Meteor.subscribe("presences");
	Meteor.subscribe("allUsers");
	Meteor.subscribe("activateBadges");
	Meteor.subscribe("questions");
});

Template.admin.helpers({
	massNotification: function(){
		const instance = Template.instance();
		if (instance.state.get("massNotification")){
			return true;
		}
		else{
			return false;
		}
	},
	onlineUsers: function(){
		var userIds = Presences.find().map(function(presence) {return presence.userId;});
		// exclude the currentUser
		return Meteor.users.find({_id: {$in: userIds, $ne: Meteor.userId()}}, {fields: {"profile": 1, "emails": 1}});
	},
	offlineUsers: function(){
		var userIds = Presences.find().map(function(presence) {return presence.userId;});
		var allIds = Meteor.users.find({}).map(function(user){
			return user._id;
		});

		allIds = allIds.filter(function(x){
			return userIds.indexOf(x) < 0;
		});
		
		// exclude the currentUser
		return Meteor.users.find({_id: {$in: allIds, $ne: Meteor.userId()}}, {fields: {"profile": 1, "emails": 1}});
	},
	activateBadges: function(){
		return ActivateBadges.find({});
	}
});

Template.admin.events({
	"click .makeAdmin": function(evt, template){
		evt.preventDefault();
		var userId = this._id;
		var user = Meteor.users.findOne({_id: userId});
		var isAdmin = user.profile.isAdmin;

		var makeAdmin;
		if (isAdmin){
			makeAdmin = false;
		}
		else{
			makeAdmin = true;
		}
		Meteor.call("updateAdminAttribute", userId, makeAdmin);
	},
	"click .makeModerator": function(evt, template){
		evt.preventDefault();
		var userId = this._id;
		var user = Meteor.users.findOne({_id: userId});
		var isModerator = user.profile.isModerator;

		var makeModerator;
		if (isModerator){
			makeModerator = false;
		}
		else{
			makeModerator = true;
		}
		Meteor.call("updateModeratorAttribute", userId, makeModerator);
	},
	"click .assignPoints": function(evt, template){
		evt.preventDefault();

		if ($(evt.target).nextAll(".assignPointsContainer:first").is(":visible")){
			$(evt.target).nextAll(".assignPointsContainer:first").css("display", "none");
		}
		else{
			$(evt.target).nextAll(".assignPointsContainer:first").css("display", "block");
		}
	},
	"click .assignPointsBtn": function(evt, template){
		evt.preventDefault();
		
		var assignPointsReason = $(evt.target).prev().val();
		var assignPointsNumber;
		$.isNumeric($(evt.target).prev().prev().prev().val()) ? assignPointsNumber = $(evt.target).prev().prev().prev().val() : assignPointsNumber = 0;
		var userId = this._id;
		var message;
		if (assignPointsNumber > 0){
			message = "You have been awarded " + assignPointsNumber + " points. Reason: '" + assignPointsReason + "'.";
		}
		else{
			message = ":( You have been dedacted " + assignPointsNumber + " points. Reason: '" + assignPointsReason + "'.";
		}
		
		Meteor.call("updateUserScore", userId, assignPointsNumber, function(error, result){
			$(".assignPointsContainer").css("display", "none");
		});
		Meteor.call("createNotification", userId, message);
	},
	"click .massNotificationHeader": function(evt, template){
		evt.preventDefault();

		if (template.state.get("massNotification")){
			template.state.set("massNotification", false);
		}
		else{
			template.state.set("massNotification", true);
		}
	},
	"click .massNotificationBtn": function(evt, template){
		evt.preventDefault();
		
		var massNotificationMessage = template.find("#massNotificationMessage").value;
		var allIds = Meteor.users.find({}).map(function(user){
			return user._id;
		});
		var message = "Mass Notification: " + massNotificationMessage;
		$.each(allIds, function(key, value){
			Meteor.call("createNotification", value, message, function(error, result){
				template.state.set("massNotification", false);
			});
		});
	},
	"click .deleteUser": function(evt, template){
		evt.preventDefault();

		var userId = this._id;
		Meteor.call("deleteUser", userId);
	},
	"click .generateVSJson": function(evt, template){
		evt.preventDefault();

		var users = Meteor.users.find({"profile.isAdmin": false}, {sort: {"profile.score": -1}}).map(function(user){
			return user;
		});
		var cityHash = [
			  {"name": "Toronto", "distance": 700, "orientation": 230, "airport": "YYZ"},
			  {"name": "London", "distance": 1000, "orientation": 260, "airport": "LHR"},
			  {"name": "London", "distance": 1300, "orientation": 290, "airport": "AAA"},
			  {"name": "London", "distance": 1600, "orientation": 320, "airport": "BBB"},
			  {"name": "London", "distance": 1900, "orientation": 350, "airport": "CCC"},
			  {"name": "London", "distance": 2200, "orientation": 380, "airport": "DDD"},
			  {"name": "London", "distance": 2500, "orientation": 410, "airport": "EEE"},
			  {"name": "London", "distance": 2800, "orientation": 450, "airport": "FFF"},
			  {"name": "London", "distance": 3100, "orientation": 480, "airport": "GGG"},
			  {"name": "London", "distance": 3400, "orientation": 510, "airport": "HHH"}
		];

		var mciHash = [
			{
				"origin": "MCI",
				"destination": "YYZ",
				"time": "16:20",
				"carrier": "AC",
				"flight": "7320",
				"score": "1200"
			},
			{
				"origin": "MCI",
				"destination": "LHR",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "AAA",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "10000"
			},
			{
				"origin": "MCI",
				"destination": "BBB",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "CCC",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "DDD",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "EEE",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "FFF",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "GGG",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			},
			{
				"origin": "MCI",
				"destination": "HHH",
				"time": "10:15",
				"carrier": "AA",
				"flight": "1860",
				"score": "500"
			}
		];

		users = users.slice(0, 10);
		$.each(users, function(index, user){
			var username = user.username;
			var score = user.profile.score;
			cityHash[index]["name"] = username;
			mciHash[index]["score"] = "" + score + "";
		});

		console.log(JSON.stringify(cityHash));
		console.log(JSON.stringify(mciHash));
	},
	"click .generateAllJson": function(evt, template){
		evt.preventDefault();

		var questions = Questions.find({}).map(function(question){
			var answers = question.questionFormHash.answers;
			answers = answers.map(function(answer){
				answer.users = answer.users.map(function(user){
					user = Meteor.users.findOne(user);
					if (user){
						var email = user.emails[0].address;
						user = email;
					}
					return user;
				});
				return answer
			});
			
			var feedbackUsers = question.questionFormHash.feedback.feedbackUsers;
			feedbackUsers = feedbackUsers.map(function(feedbackUser){
				var user = Meteor.users.findOne(feedbackUser.userId);
				if (user){
					var email = user.emails[0].address;
					feedbackUser.userId = email;
				}
				return feedbackUser;
			});

			var rank = question.rank.map(function(rankUser){
				var user = Meteor.users.findOne(rankUser);
				if (user){
					rankUser = user.emails[0].address;
				}
				return rankUser;
			});

			question.questionFormHash.answers = answers;
			question.questionFormHash.feedback.feedbackUsers = feedbackUsers;
			question.rank = rank;

			// removing unnecessary properties that the user doesn't need to see
			delete question._id;
			delete question.questionFormHash.askOrder;
			delete question.questionFormHash.points;
			delete question.questionFormHash.roomId;
			delete question.questionFormHash.wagerEnabled;
			delete question.activeQuestion;
			delete question.showTimer;
			delete question.startTime;
			delete question.createdAt;
			delete question.alreadyAsked;

			return question;
		});
		console.log(JSON.stringify(questions));
	},
	"click .generatePollJson": function(evt, template){
		evt.preventDefault();
		var questions = Questions.find({"questionType": "isPoll"}).map(function(question){
			return question;
		});
		var questionsDataArray = [];

		$.each(questions, function(index, value){
			var question = Questions.findOne(value._id);
			var questionText = question.questionFormHash.question;
			var answersArray = question.questionFormHash.answers;
			var questionDataHash = {};
			var newAnswersArray = [];
			questionDataHash["Question"] = questionText;
			$.each(answersArray, function(index, value){
				var text = value["text"];
				var users = value["users"];
				var answerHash = {};
				var emailArray = [];
				answerHash["Text"] = text;
				$.each(users, function(index, value){
					var user = Meteor.users.findOne(value);
					user ? email = user.emails[0].address : email = "Deleted User";
					emailArray.push(email);
				});
				answerHash["Users Who Voted For This"] = emailArray;
				newAnswersArray.push(answerHash);
			});
			questionDataHash["Answers"] = newAnswersArray;
			questionsDataArray.push(questionDataHash);
		});
	},
	"click .initData": function(evt){
		evt.preventDefault();
		Meteor.call("initData");
	},
	"click .activateBadges": function(evt){
		evt.preventDefault();
		var activateBadges = ActivateBadges.find({}).count();
		if (activateBadges){
			Meteor.call("deactivateBadges");
		}
		else{
			Meteor.call("activateBadges");
		}
	}
});