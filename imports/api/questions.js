import { Mongo } from "meteor/mongo";
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ActivateQuestions } from "./activateQuestions.js";
import { Notifications } from "./notifications.js";

export const Questions = new Mongo.Collection("questions");

var Schemas = {};
Schemas.Answers = new SimpleSchema({
	text: {
		type: String,
		label: "Answer Text"
	},
	votes: {
		type: Number,
		label: "Votes",
		defaultValue: 0
	},
	users: {
		type: [String],
		label: "Users who have voted for this"
	},
	correct: {
		type: String,
		label: "Correct Flag",
		defaultValue: "",
		optional: true
	},
	imagePath: {
		type: String,
		label: "Question Image Path",
		optional: true
	}
});
Schemas.QuestionFeedbackHash = new SimpleSchema({
	userId: {
		type: String,
		label: "Feedback User ID",
	},
	feedbackArray: {
		type: [String],
		label: "Feedback Array"
	}
});
Schemas.QuestionFeedback = new SimpleSchema({
	good: {
		type: Number,
		label: "Question Good Feedback",
		defaultValue: 0
	},
	bad: {
		type: Number,
		label: "Question Bad Feedback",
		defaultValue: 0
	},
	feedbackUsers: {
		type: [Schemas.QuestionFeedbackHash],
		label: "Question Feedback Users",
		defaultValue: []
	}
});
Schemas.QuestionInputAnswerData = new SimpleSchema({
	correct: {
		type: Number,
		label: "Question Input Correct Answers",
		defaultValue: 0
	},
	partiallyCorrect: {
		type: Number,
		label: "Question Input Partially Correct Answers",
		defaultValue: 0
	},
	incorrect: {
		type: Number,
		label: "Question Input Incorrect Answers",
		defaultValue: 0
	}
});
Schemas.QuestionFormHash = new SimpleSchema({
	question: {
		type: String,
		label: "Question Text"
	},
	points: {
		type: Number,
		label: "Points",
		defaultValue: 0
	},
	isTrivia: {
		type: Boolean,
		label: "isTrivia Flag",
		optional: true
	},
	isPoll: {
		type: Boolean,
		label: "isPoll Flag",
		optional: true
	},
	isPicture: {
		type: Boolean,
		label: "isPicture Flag",
		optional: true
	},
	isInput: {
		type: Boolean,
		label: "isInput Flag",
		optional: true
	},
	roomId: {
		type: String,
		label: "Room ID"
	},
	answers: {
		type: [Schemas.Answers],
		label: "Answers"
	},
	wagerEnabled: {
		type: Boolean,
		label: "Wager Enabled",
		defaultValue: false
	},
	feedbackEnabled: {
		type: Boolean,
		label: "Feedback Enabled",
		defaultValue: false
	},
	feedback: {
		type: Schemas.QuestionFeedback,
		label: "Question Feedback"
	},
	inputAnswer: {
		type: String,
		label: "Input Answer",
		optional: true
	},
	answerData: {
		type: Schemas.QuestionInputAnswerData,
		label: "Question Input Answer Data",
		optional: true
	},
	sessionName: {
		type: String,
		label: "Session Name",
		defaultValue: "No Session Specified"
	},
	askOrder: {
		type: Number,
		label: "Question Ask Order",
		defaultValue: 1
	}
});

Questions.attachSchema(new SimpleSchema({
	questionType: {
		type: String,
		label: "Question Type"
	},
	questionFormHash: {
		type: Schemas.QuestionFormHash,
		label: "Question Hash"
	},
	rank: {
		type: [String],
		label: "Question Rank"
	},
	activeQuestion: {
		type: Boolean,
		label: "Active Question"
	},
	alreadyAsked: {
		type: Boolean,
		label: "Question Already Asked Flag",
		defaultValue: false
	},
	showTimer: {
		type: Boolean,
		label: "Show Timer"
	},
	startTime: {
		type: Number,
		label: "Start Time",
		defaultValue: 0
	},
	createdAt: {
		type: Date,
		label: "Created At"
	}
}));

if (Meteor.isServer) {
	Meteor.publish("questions", function(){
		return Questions.find({});
	});
}

Meteor.methods({
	addQuestion: function(questionType, questionFormHash){
		console.log("Adding new question to the database...");
		var rank = [];
		Questions.insert({			
			questionType: questionType,
			questionFormHash: questionFormHash,
			rank: rank,
			activeQuestion: false,
			showTimer: false,
			startTime: 0,
			createdAt: new Date()
		});
	},
	editQuestion: function(questionId, questionText){
		console.log("Editing question text...");
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.question": questionText
			}
		});
	},
	editQuestionSessionName: function(questionId, sessionName){
		console.log("Editing question session name...");
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.sessionName": sessionName
			}
		});
	},
	editQuestionAskOrder: function(questionId, askOrder){
		console.log("Editing question ask order...");
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.askOrder": askOrder
			}
		});
	},
	editQuestionAnswer: function(questionId, selectedAnswerIndex, answerText){
		console.log("Editing answer text...");
		var question = Questions.findOne(questionId);
		var update = { $set: {} };
		update.$set["questionFormHash.answers." + selectedAnswerIndex + ".text"] = answerText;
		Questions.update({_id: questionId}, update);
	},
	editQuestionPoints: function(questionId, points){
		console.log("Editing question points...");
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.points": points
			}
		});
	},
	deleteQuestion: function(questionId){
		console.log("Deleting the chosen question...");
		Questions.remove(questionId);
	},
	toggleQuestionFeedback: function(questionId, feedbackEnabled){
		console.log("Toggling the question feedback...");
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.feedbackEnabled": feedbackEnabled
			}
		});
	},
	toggleQuestionWager: function(questionId, wagerEnabled){
		console.log("Toggling the question wager...");
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.wagerEnabled": wagerEnabled
			}
		});
	},
	makeActiveQuestion: function(questionId, showTimer, startTime){
		console.log("Making this the active question...");
		var roomId = Questions.findOne(questionId).questionFormHash.roomId;

		// setting all the other questions to be inactive
		Questions.update({"questionFormHash.roomId": roomId},{
			$set: {
				activeQuestion: false
			}
		},
			{multi: true}
		);

		Questions.update({_id: questionId},{
			$set: {
				activeQuestion: true,
				showTimer: showTimer,
				startTime: startTime
			}
		});

		Notifications.update({},{
			$set: {
				seen: true
			}
		},
			{multi: true}
		);

		ActivateQuestions.insert({	
			roomId: roomId,
			createdAt: new Date()
		});
	},
	removeActiveQuestion: function(questionId, roomId){
		console.log("Removing active question...");
		Questions.update({_id: questionId},{
			$set: {
				activeQuestion: false,
				alreadyAsked: true
			}
		});

		ActivateQuestions.remove({	
			roomId: roomId
		});
	},
	updateShowTimer: function(questionId, showTimer){
		console.log("Updating the showTimer visibility for the active question...");
		Questions.update({_id: questionId},{
			$set: {
				showTimer: showTimer
			}
		});
	},
	resetVotes: function(questionId){
		console.log("Resetting votes of selected question...");
		var answers = Questions.findOne(questionId).questionFormHash.answers;
		var rank = [];
		answers = answers.map(function(answer){
			answer.votes = 0;
			return answer;
		});

		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.answers": answers,
				"rank": rank,
				"alreadyAsked": false
			}
		});
	},
	resetQuestionData: function(questionId){
		console.log("Resetting data of selected question...");
		var answers = Questions.findOne(questionId).questionFormHash.answers;
		answers = answers.map(function(answer){
			answer.users = [];
			return answer;
		});
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.answers": answers
			}
		});
	},
	voteOnActiveQuestion: function(questionId, selectedAnswerIndex, userWager){
		console.log("Voting on the current question...");
		var question = Questions.findOne(questionId);
		var voteCount = question.questionFormHash.answers[selectedAnswerIndex].votes + 1;
		var questionFormHash = question.questionFormHash;
		questionFormHash.answers[selectedAnswerIndex].votes = voteCount;
		var userVoteArray = questionFormHash.answers[selectedAnswerIndex].users;
		// filtering the user vote array so we don't have duplicate entries if the user votes twice
		userVoteArray = userVoteArray.filter(function(userVote){
			return userVote != Meteor.userId();
		});
		userVoteArray.push(Meteor.userId());
		questionFormHash.answers[selectedAnswerIndex].users = userVoteArray;
		var message;
		var points = questionFormHash.points;
		var correctAnswer = questionFormHash.answers[selectedAnswerIndex].correct;
		var roomId = Meteor.user().profile.currentRoomId;
		var lastRoomAQuestionWasAnsweredIn = Meteor.user().profile.lastRoomAQuestionWasAnsweredIn;
		var lastTimeAQuestionWasAnswered = Meteor.user().profile.lastTimeAQuestionWasAnswered;
		var roomHopper = false;

		if (roomId != lastRoomAQuestionWasAnsweredIn){
			console.log("Checking for illegal activity...");
			var currentTime = new Date();
			var timeDifference = currentTime - lastTimeAQuestionWasAnswered;
			var timeConversion = timeDifference / 1000 ;
			if (timeConversion <= 120){
				roomHopper = true;
				Meteor.call("updateRoomHopper", Meteor.userId(), function(error, result){});
			}
		}

		if (correctAnswer === "true"){
			var bonusPoints = points * 2;
			var rank = question.rank;
			rank.push(Meteor.userId());
			var rankIndex = rank.indexOf(Meteor.userId()) + 1;
			var rankPoints = Math.round(points / rankIndex);
			if (rankPoints === 0){
				rankPoints = 1;
			}

			if (userWager > 0){
				message = "Congratulations! You have chosen the correct answer and have been awarded " + bonusPoints + " bonus points! You have also received " + 
							rankPoints + " points for being Rank #" + rankIndex + " in answering this question and another " + userWager + " for waging your points.";
			}
			else{
				message = "Congratulations! You have chosen the correct answer and have been awarded " + bonusPoints + " bonus points! You have also received " + 
							rankPoints + " points for being Rank #" + rankIndex + " in answering this question.";
			}
			bonusPoints = parseInt(bonusPoints) + parseInt(rankPoints) + parseInt(userWager);
			
			Questions.update({_id: questionId},{
				$set: {
					rank: rank
				}
			});

			if (roomHopper){
				bonusPoints = bonusPoints + 10000;
				message = message + " You have also received 10,000 extra points for somehow correctly answering a question in a different room (sometimes, crime does pay)."
			}

			Meteor.call("updateUserScore", Meteor.userId(), bonusPoints, function(error, result){});
			Meteor.call("createNotification", Meteor.userId(), message, function(error, result){});
			points = 0; //setting to zero so the user doesn't get additional participation points after getting the answer correct
		}
		else{
			points = parseInt(points) - parseInt(userWager);
			var isPoll = questionFormHash.isPoll;
			if (roomHopper && !isPoll){
				points = -10000;
				message = "Oh no! It looks like you have attempted to answer a question in a different room from the one you're in. Unfortunately, because you have answered the question wrong, you have been deducted 10,000 points. Sometimes, crime doesn't pay :(."
				Meteor.call("createNotification", Meteor.userId(), message, function(error, result){});
			}
		}

		Questions.update({_id: questionId},{
			$set: {
				questionFormHash: questionFormHash
			}
		});
		Meteor.call("updateUserScore", Meteor.userId(), points, function(error, result){});
		Meteor.call("updateUserVoteHistory", Meteor.userId(), questionId, function(error, result){});
	},
	answerInputQuestion: function(questionId, userAnswer, userWager){
		console.log("Answering the current input question...");
		var question = Questions.findOne(questionId);
		var correctAnswer = question.questionFormHash.inputAnswer.toLowerCase().replace(/\s+/g, '');
		var answerData = question.questionFormHash.answerData;

		if (userAnswer === correctAnswer){
			answerData.correct = answerData.correct + 1;
		}
		else {
			answerData.incorrect = answerData.incorrect + 1;
		}
		
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.answerData": answerData
			}
		});

		var points = question.questionFormHash.points;
		var newPoints = 0;
		var message;
		if (userAnswer === correctAnswer){
			newPoints = parseInt(userWager) + parseInt(points);
			message = "Congratulations! You got the answer correct and added an additional " + newPoints + " points to your score!";
		}
		else{
			newPoints = 0 - parseInt(userWager);
			message = ":( Unfortunately, you got the answer wrong. You lost " + Math.abs(newPoints) + " points.";
		}

		Meteor.call("createNotification", Meteor.userId(), message, function(error, result){});
		Meteor.call("updateUserScore", Meteor.userId(), newPoints, function(error, result){});
		Meteor.call("updateUserVoteHistory", Meteor.userId(), questionId, function(error, result){});
	},
	updateQuestionFeedback: function(questionId, feedback){
		console.log("Updating question feedback...");
		var question = Questions.findOne(questionId);
		Questions.update({_id: questionId},{
			$set: {
				"questionFormHash.feedback": feedback
			}
		});
	},
});