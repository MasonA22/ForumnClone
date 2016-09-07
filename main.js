// Questions = new Mongo.Collection("questions");
// Notifications = new Mongo.Collection("notifications");
// Rooms = new Mongo.Collection("rooms");
// Badges = new Mongo.Collection("badges");
// UserBadges = new Mongo.Collection("userBadges");
// FeedbackTypes = new Mongo.Collection("feedbackTypes");
// ActivateBadges = new Mongo.Collection("activateBadges");
// ActivateQuestions = new Mongo.Collection("activateQuestions");

// var Schemas = {};

// Schemas.UserProfile = new SimpleSchema({
//     isAdmin: {
//         type: Boolean,
//         label: "isAdmin Flag",
//         defaultValue: false
//     },
//     isModerator: {
//         type: Boolean,
//         label: "isModerator Flag",
//         defaultValue: false
//     },
//     score: {
//         type: Number,
//         label: "Score",
//         defaultValue: 1000
//     },
//     currentRoomId: {
//         type: String,
//         label: "Current Room ID",
//         optional: true
//     },
//     previousScoreBoardRank: {
//         type: Number,
//         label: "Previous score board rank",
//         defaultValue: 0
//     },
//     rankChange: {
//         type: Number,
//         label: "Rank change",
//         defaultValue: 0
//     },
//     rankChangeLargestRise: {
//     	type: Number,
//     	label: "Rank change largest rise",
//     	defaultValue: 0
//     },
//     rankChangeLargestDrop: {
//     	type: Number,
//     	label: "Rank change largest drop",
//     	defaultValue: 0
//     },
//     totalVotes: {
//         type: Number,
//         label: "Total votes",
//         defaultValue: 0
//     },
//     questionsUsersHaveVotedOn: {
//     	type: [String],
//     	label: "Questions users have voted on",
//     	defaultValue: []
//     },
//     gamblingAddiction: {
//     	type: Boolean,
//     	label: "Gambling addiction flag",
//     	defaultValue: false
//     },
//     roomHopper: {
//     	type: Boolean,
//     	label: "Room Hopper Flag",
//     	defaultValue: false
//     },
//     lastRoomAQuestionWasAnsweredIn: {
//     	type: String,
//     	label: "Last room a question was answered in",
//     	optional: true
//     },
//     lastTimeAQuestionWasAnswered: {
//     	type: Date,
//     	label: "Last time a question was answered",
//     	optional: true
//     }
// });
// Schemas.User = new SimpleSchema({
//     emails: {
//         type: [Object]
//     },
//     "emails.$.address": {
//         type: String,
//         regEx: SimpleSchema.RegEx.Email
//     },
//     "emails.$.verified": {
//         type: Boolean
//     },
//     createdAt: {
//         type: Date
//     },
//     verified: {
//         type: Boolean,
//         optional: true
//     },
//     profile: {
//         type: Schemas.UserProfile
//     },
//     services: {
//         type: Object,
//         optional: true,
//         blackbox: true
//     }
// });
// Schemas.Notifications = new SimpleSchema({
// 	message: {
// 		type: String,
// 		label: "Notification Message"
// 	},
// 	userId: {
// 		type: String,
// 		label: "User ID"
// 	},
// 	seen: {
// 		type: Boolean,
// 		label: "Seen Flag",
// 		defaultValue: false
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });
// Schemas.Rooms = new SimpleSchema({
// 	name: {
// 		type: String,
// 		label: "Name",
// 		max: 200
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });
// Schemas.Badges = new SimpleSchema({
// 	"name": {
// 		type: String,
// 		label: "Badge Name",
// 		max: 200,
// 		unique: true
// 	},
// 	"description": {
// 		type: String,
// 		label: "Badge Description"
// 	},
// 	"avatar": {
// 		type: String,
// 		label: "Badge Avatar",
// 		optional: true
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });
// Schemas.UserBadges = new SimpleSchema({
// 	"userId": {
// 		type: String,
// 		label: "User ID"
// 	},
// 	"badgeId": {
// 		type: String,
// 		label: "Badge ID"
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });
// Schemas.FeedbackTypes = new SimpleSchema({
// 	name: {
// 		type: String,
// 		label: "Name",
// 		unique: true
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });
// Schemas.Answers = new SimpleSchema({
// 	text: {
// 		type: String,
// 		label: "Answer Text"
// 	},
// 	votes: {
// 		type: Number,
// 		label: "Votes",
// 		defaultValue: 0
// 	},
// 	users: {
// 		type: [String],
// 		label: "Users who have voted for this"
// 	},
// 	correct: {
// 		type: String,
// 		label: "Correct Flag",
// 		defaultValue: "",
// 		optional: true
// 	},
// 	imagePath: {
// 		type: String,
// 		label: "Question Image Path",
// 		optional: true
// 	}
// });
// Schemas.QuestionFeedbackHash = new SimpleSchema({
// 	userId: {
// 		type: String,
// 		label: "Feedback User ID",
// 	},
// 	feedbackArray: {
// 		type: [String],
// 		label: "Feedback Array"
// 	}
// });
// Schemas.QuestionFeedback = new SimpleSchema({
// 	good: {
// 		type: Number,
// 		label: "Question Good Feedback",
// 		defaultValue: 0
// 	},
// 	bad: {
// 		type: Number,
// 		label: "Question Bad Feedback",
// 		defaultValue: 0
// 	},
// 	feedbackUsers: {
// 		type: [Schemas.QuestionFeedbackHash],
// 		label: "Question Feedback Users",
// 		defaultValue: []
// 	}
// });
// Schemas.QuestionInputAnswerData = new SimpleSchema({
// 	correct: {
// 		type: Number,
// 		label: "Question Input Correct Answers",
// 		defaultValue: 0
// 	},
// 	partiallyCorrect: {
// 		type: Number,
// 		label: "Question Input Partially Correct Answers",
// 		defaultValue: 0
// 	},
// 	incorrect: {
// 		type: Number,
// 		label: "Question Input Incorrect Answers",
// 		defaultValue: 0
// 	}
// });
// Schemas.QuestionFormHash = new SimpleSchema({
// 	question: {
// 		type: String,
// 		label: "Question Text"
// 	},
// 	points: {
// 		type: Number,
// 		label: "Points",
// 		defaultValue: 0
// 	},
// 	isTrivia: {
// 		type: Boolean,
// 		label: "isTrivia Flag",
// 		optional: true
// 	},
// 	isPoll: {
// 		type: Boolean,
// 		label: "isPoll Flag",
// 		optional: true
// 	},
// 	isPicture: {
// 		type: Boolean,
// 		label: "isPicture Flag",
// 		optional: true
// 	},
// 	isInput: {
// 		type: Boolean,
// 		label: "isInput Flag",
// 		optional: true
// 	},
// 	roomId: {
// 		type: String,
// 		label: "Room ID"
// 	},
// 	answers: {
// 		type: [Schemas.Answers],
// 		label: "Answers"
// 	},
// 	wagerEnabled: {
// 		type: Boolean,
// 		label: "Wager Enabled",
// 		defaultValue: false
// 	},
// 	feedbackEnabled: {
// 		type: Boolean,
// 		label: "Feedback Enabled",
// 		defaultValue: false
// 	},
// 	feedback: {
// 		type: Schemas.QuestionFeedback,
// 		label: "Question Feedback"
// 	},
// 	inputAnswer: {
// 		type: String,
// 		label: "Input Answer",
// 		optional: true
// 	},
// 	answerData: {
// 		type: Schemas.QuestionInputAnswerData,
// 		label: "Question Input Answer Data",
// 		optional: true
// 	},
// 	sessionName: {
// 		type: String,
// 		label: "Session Name",
// 		defaultValue: "No Session Specified"
// 	},
// 	askOrder: {
// 		type: Number,
// 		label: "Question Ask Order",
// 		defaultValue: 1
// 	}
// });

// Schemas.Questions = new SimpleSchema({
// 	questionType: {
// 		type: String,
// 		label: "Question Type"
// 	},
// 	questionFormHash: {
// 		type: Schemas.QuestionFormHash,
// 		label: "Question Hash"
// 	},
// 	rank: {
// 		type: [String],
// 		label: "Question Rank"
// 	},
// 	activeQuestion: {
// 		type: Boolean,
// 		label: "Active Question"
// 	},
// 	alreadyAsked: {
// 		type: Boolean,
// 		label: "Question Already Asked Flag",
// 		defaultValue: false
// 	},
// 	showTimer: {
// 		type: Boolean,
// 		label: "Show Timer"
// 	},
// 	startTime: {
// 		type: Number,
// 		label: "Start Time",
// 		defaultValue: 0
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });

// Schemas.ActivateBadges = new SimpleSchema({
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });

// Schemas.ActivateQuestions = new SimpleSchema({
// 	roomId: {
// 		type: String,
// 		label: "Room ID"
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At"
// 	}
// });

// Meteor.users.attachSchema(Schemas.User);
// // Questions.attachSchema(Schemas.Questions);
// Notifications.attachSchema(Schemas.Notifications);
// Rooms.attachSchema(Schemas.Rooms);
// Badges.attachSchema(Schemas.Badges);
// UserBadges.attachSchema(Schemas.UserBadges);
// FeedbackTypes.attachSchema(Schemas.FeedbackTypes);
// ActivateBadges.attachSchema(Schemas.ActivateBadges);
// ActivateQuestions.attachSchema(Schemas.ActivateQuestions);

// var imageStore = new FS.Store.GridFS("images");
// Images = new FS.Collection("images", {
// 	stores: [imageStore]
// });

// Images.deny({
// 	insert: function(){
// 		return false;
// 	},
// 	update: function(){
// 		return false;
// 	},
// 	remove: function(){
// 		return false;
// 	},
// 	download: function(){
// 		return false;
// 	}
// });

// Images.allow({
// 	insert: function(){
// 		return true;
// 	},
// 	update: function(){
// 		return true;
// 	},
// 	remove: function(){
// 		return true;
// 	},
// 	download: function(){
// 		return true;
// 	}
// });

// if (Meteor.isServer){
// 	Meteor.publish("allUsers", function(){
// 		return Meteor.users.find({}, {fields: {"profile": 1, "emails": 1}});
// 	});
// 	Meteor.publish("questions", function(){
// 		return Questions.find({});
// 	});
// 	Meteor.publish("presences", function(){
// 		return Presences.find({});
// 	});
// 	Meteor.publish("notifications", function(){
// 		return Notifications.find({});
// 	});
// 	Meteor.publish("images", function(){
// 		return Images.find({});
// 	});
// 	Meteor.publish("rooms", function(){
// 		return Rooms.find({});
// 	});
// 	Meteor.publish("badges", function(){
// 		return Badges.find({});
// 	});
// 	Meteor.publish("userBadges", function(){
// 		return UserBadges.find({});
// 	});
// 	Meteor.publish("feedbackTypes", function(){
// 		return FeedbackTypes.find({});
// 	});
// 	Meteor.publish("activateBadges", function(){
// 		return ActivateBadges.find({});
// 	});
// 	Meteor.publish("activateQuestions", function(){
// 		return ActivateQuestions.find({});
// 	});
// }

// Meteor.methods({
// 	// addQuestion: function(questionType, questionFormHash){
// 	// 	console.log("Adding new question to the database...");
// 	// 	var rank = [];
// 	// 	Questions.insert({			
// 	// 		questionType: questionType,
// 	// 		questionFormHash: questionFormHash,
// 	// 		rank: rank,
// 	// 		activeQuestion: false,
// 	// 		showTimer: false,
// 	// 		startTime: 0,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// editQuestion: function(questionId, questionText){
// 	// 	console.log("Editing question text...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.question": questionText
// 	// 		}
// 	// 	});
// 	// },
// 	// editQuestionSessionName: function(questionId, sessionName){
// 	// 	console.log("Editing question session name...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.sessionName": sessionName
// 	// 		}
// 	// 	});
// 	// },
// 	// editQuestionAskOrder: function(questionId, askOrder){
// 	// 	console.log("Editing question ask order...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.askOrder": askOrder
// 	// 		}
// 	// 	});
// 	// },
// 	// editQuestionAnswer: function(questionId, selectedAnswerIndex, answerText){
// 	// 	console.log("Editing answer text...");
// 	// 	var question = Questions.findOne(questionId);
// 	// 	var update = { $set: {} };
// 	// 	update.$set["questionFormHash.answers." + selectedAnswerIndex + ".text"] = answerText;
// 	// 	Questions.update({_id: questionId}, update);
// 	// },
// 	// editQuestionPoints: function(questionId, points){
// 	// 	console.log("Editing question points...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.points": points
// 	// 		}
// 	// 	});
// 	// },
// 	// deleteQuestion: function(questionId){
// 	// 	console.log("Deleting the chosen question...");
// 	// 	Questions.remove(questionId);
// 	// },
// 	// toggleQuestionFeedback: function(questionId, feedbackEnabled){
// 	// 	console.log("Toggling the question feedback...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.feedbackEnabled": feedbackEnabled
// 	// 		}
// 	// 	});
// 	// },
// 	// toggleQuestionWager: function(questionId, wagerEnabled){
// 	// 	console.log("Toggling the question wager...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.wagerEnabled": wagerEnabled
// 	// 		}
// 	// 	});
// 	// },
// 	// makeActiveQuestion: function(questionId, showTimer, startTime){
// 	// 	console.log("Making this the active question...");
// 	// 	var roomId = Questions.findOne(questionId).questionFormHash.roomId;

// 	// 	// setting all the other questions to be inactive
// 	// 	Questions.update({"questionFormHash.roomId": roomId},{
// 	// 		$set: {
// 	// 			activeQuestion: false
// 	// 		}
// 	// 	},
// 	// 		{multi: true}
// 	// 	);

// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			activeQuestion: true,
// 	// 			showTimer: showTimer,
// 	// 			startTime: startTime
// 	// 		}
// 	// 	});

// 	// 	Notifications.update({},{
// 	// 		$set: {
// 	// 			seen: true
// 	// 		}
// 	// 	},
// 	// 		{multi: true}
// 	// 	);

// 	// 	ActivateQuestions.insert({	
// 	// 		roomId: roomId,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// removeActiveQuestion: function(questionId){
// 	// 	console.log("Removing active question...");
// 	// 	var roomId = Questions.findOne(questionId).questionFormHash.roomId;
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			activeQuestion: false,
// 	// 			alreadyAsked: true
// 	// 		}
// 	// 	});

// 	// 	ActivateQuestions.remove({	
// 	// 		roomId: roomId
// 	// 	});
// 	// },
// 	// updateShowTimer: function(questionId, showTimer){
// 	// 	console.log("Updating the showTimer visibility for the active question...");
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			showTimer: showTimer
// 	// 		}
// 	// 	});
// 	// },
// 	// resetVotes: function(questionId){
// 	// 	console.log("Resetting votes of selected question...");
// 	// 	var answers = Questions.findOne(questionId).questionFormHash.answers;
// 	// 	var rank = [];
// 	// 	answers = answers.map(function(answer){
// 	// 		answer.votes = 0;
// 	// 		return answer;
// 	// 	});

// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.answers": answers,
// 	// 			"rank": rank,
// 	// 			"alreadyAsked": false
// 	// 		}
// 	// 	});
// 	// },
// 	// resetQuestionData: function(questionId){
// 	// 	console.log("Resetting data of selected question...");
// 	// 	var answers = Questions.findOne(questionId).questionFormHash.answers;
// 	// 	answers = answers.map(function(answer){
// 	// 		answer.users = [];
// 	// 		return answer;
// 	// 	});
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.answers": answers
// 	// 		}
// 	// 	});
// 	// },
// 	// voteOnActiveQuestion: function(questionId, selectedAnswerIndex, userWager){
// 	// 	console.log("Voting on the current question...");
// 	// 	var question = Questions.findOne(questionId);
// 	// 	var voteCount = question.questionFormHash.answers[selectedAnswerIndex].votes + 1;
// 	// 	var questionFormHash = question.questionFormHash;
// 	// 	questionFormHash.answers[selectedAnswerIndex].votes = voteCount;
// 	// 	var userVoteArray = questionFormHash.answers[selectedAnswerIndex].users;
// 	// 	// filtering the user vote array so we don't have duplicate entries if the user votes twice
// 	// 	userVoteArray = userVoteArray.filter(function(userVote){
// 	// 		return userVote != Meteor.userId();
// 	// 	});
// 	// 	userVoteArray.push(Meteor.userId());
// 	// 	questionFormHash.answers[selectedAnswerIndex].users = userVoteArray;
// 	// 	var message;
// 	// 	var points = questionFormHash.points;
// 	// 	var correctAnswer = questionFormHash.answers[selectedAnswerIndex].correct;
// 	// 	var roomId = Meteor.user().profile.currentRoomId;
// 	// 	var lastRoomAQuestionWasAnsweredIn = Meteor.user().profile.lastRoomAQuestionWasAnsweredIn;
// 	// 	var lastTimeAQuestionWasAnswered = Meteor.user().profile.lastTimeAQuestionWasAnswered;
// 	// 	var roomHopper = false;

// 	// 	if (roomId != lastRoomAQuestionWasAnsweredIn){
// 	// 		console.log("Checking for illegal activity...");
// 	// 		var currentTime = new Date();
// 	// 		var timeDifference = currentTime - lastTimeAQuestionWasAnswered;
// 	// 		var timeConversion = timeDifference / 1000 ;
// 	// 		if (timeConversion <= 120){
// 	// 			roomHopper = true;
// 	// 			Meteor.call("updateRoomHopper", Meteor.userId(), function(error, result){});
// 	// 		}
// 	// 	}

// 	// 	if (correctAnswer === "true"){
// 	// 		var bonusPoints = points * 2;
// 	// 		var rank = question.rank;
// 	// 		rank.push(Meteor.userId());
// 	// 		var rankIndex = rank.indexOf(Meteor.userId()) + 1;
// 	// 		var rankPoints = Math.round(points / rankIndex);
// 	// 		if (rankPoints === 0){
// 	// 			rankPoints = 1;
// 	// 		}

// 	// 		if (userWager > 0){
// 	// 			message = "Congratulations! You have chosen the correct answer and have been awarded " + bonusPoints + " bonus points! You have also received " + 
// 	// 						rankPoints + " points for being Rank #" + rankIndex + " in answering this question and another " + userWager + " for waging your points.";
// 	// 		}
// 	// 		else{
// 	// 			message = "Congratulations! You have chosen the correct answer and have been awarded " + bonusPoints + " bonus points! You have also received " + 
// 	// 						rankPoints + " points for being Rank #" + rankIndex + " in answering this question.";
// 	// 		}
// 	// 		bonusPoints = parseInt(bonusPoints) + parseInt(rankPoints) + parseInt(userWager);
			
// 	// 		Questions.update({_id: questionId},{
// 	// 			$set: {
// 	// 				rank: rank
// 	// 			}
// 	// 		});

// 	// 		if (roomHopper){
// 	// 			bonusPoints = bonusPoints + 10000;
// 	// 			message = message + " You have also received 10,000 extra points for somehow correctly answering a question in a different room (sometimes, crime does pay)."
// 	// 		}

// 	// 		Meteor.call("updateUserScore", Meteor.userId(), bonusPoints, function(error, result){});
// 	// 		Meteor.call("createNotification", Meteor.userId(), message, function(error, result){});
// 	// 		points = 0; //setting to zero so the user doesn't get additional participation points after getting the answer correct
// 	// 	}
// 	// 	else{
// 	// 		points = parseInt(points) - parseInt(userWager);
// 	// 		var isPoll = questionFormHash.isPoll;
// 	// 		if (roomHopper && !isPoll){
// 	// 			points = -10000;
// 	// 			message = "Oh no! It looks like you have attempted to answer a question in a different room from the one you're in. Unfortunately, because you have answered the question wrong, you have been deducted 10,000 points. Sometimes, crime doesn't pay :(."
// 	// 			Meteor.call("createNotification", Meteor.userId(), message, function(error, result){});
// 	// 		}
// 	// 	}

// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			questionFormHash: questionFormHash
// 	// 		}
// 	// 	});
// 	// 	Meteor.call("updateUserScore", Meteor.userId(), points, function(error, result){});
// 	// 	Meteor.call("updateUserVoteHistory", Meteor.userId(), questionId, function(error, result){});
// 	// },
// 	// answerInputQuestion: function(questionId, userAnswer, userWager){
// 	// 	console.log("Answering the current input question...");
// 	// 	var question = Questions.findOne(questionId);
// 	// 	var correctAnswer = question.questionFormHash.inputAnswer.toLowerCase().replace(/\s+/g, '');
// 	// 	var answerData = question.questionFormHash.answerData;

// 	// 	if (userAnswer === correctAnswer){
// 	// 		answerData.correct = answerData.correct + 1;
// 	// 	}
// 	// 	else {
// 	// 		answerData.incorrect = answerData.incorrect + 1;
// 	// 	}
		
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.answerData": answerData
// 	// 		}
// 	// 	});

// 	// 	var points = question.questionFormHash.points;
// 	// 	var newPoints = 0;
// 	// 	var message;
// 	// 	if (userAnswer === correctAnswer){
// 	// 		newPoints = parseInt(userWager) + parseInt(points);
// 	// 		message = "Congratulations! You got the answer correct and added an additional " + newPoints + " points to your score!";
// 	// 	}
// 	// 	else{
// 	// 		newPoints = 0 - parseInt(userWager);
// 	// 		message = ":( Unfortunately, you got the answer wrong. You lost " + Math.abs(newPoints) + " points.";
// 	// 	}

// 	// 	Meteor.call("createNotification", Meteor.userId(), message, function(error, result){});
// 	// 	Meteor.call("updateUserScore", Meteor.userId(), newPoints, function(error, result){});
// 	// 	Meteor.call("updateUserVoteHistory", Meteor.userId(), questionId, function(error, result){});
// 	// },
// 	// updateQuestionFeedback: function(questionId, feedback){
// 	// 	console.log("Updating question feedback...");
// 	// 	var question = Questions.findOne(questionId);
// 	// 	Questions.update({_id: questionId},{
// 	// 		$set: {
// 	// 			"questionFormHash.feedback": feedback
// 	// 		}
// 	// 	});
// 	// },
// 	// updateUserScore: function(userId, points){
// 	// 	console.log("Updating the current user's score...");
// 	// 	var user = Meteor.users.findOne({_id: userId});
// 	// 	var score = user.profile.score;
// 	// 	var newScore = parseInt(score) + parseInt(points);
		
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.score": newScore
// 	// 		}
// 	// 	});

// 	// 	console.log("Current score...");
// 	// 	console.log(newScore);
// 	// },
// 	// updateUserVoteHistory: function(userId, questionId){
// 	// 	console.log("Updating the user's vote history...");
// 	// 	var user = Meteor.users.findOne(userId);
// 	// 	var totalVotes = user.profile.totalVotes + 1;
// 	// 	var questionsArray = user.profile.questionsUsersHaveVotedOn;
// 	// 	questionsArray.push(questionId);
// 	// 	questionsArray = Array.from(new Set(questionsArray));
// 	// 	var roomId = user.profile.currentRoomId;

// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.totalVotes": totalVotes,
// 	// 			"profile.questionsUsersHaveVotedOn": questionsArray,
// 	// 			"profile.lastRoomAQuestionWasAnsweredIn": roomId,
// 	// 			"profile.lastTimeAQuestionWasAnswered": new Date()
// 	// 		}
// 	// 	});
// 	// },
// 	// updateAdminAttribute: function(userId, makeAdmin){
// 	// 	console.log("Updating the selected user's admin status...");
// 	// 	var user = Meteor.users.findOne({_id: userId});
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.isAdmin": makeAdmin
// 	// 		}
// 	// 	});
// 	// 	var points = 4000;
// 	// 	var message = "Congratulations! You have been made an admin and awarded " + points + " bonus points because you are now above the law.";
// 	// 	Meteor.call("updateUserScore", userId, points, function(error, result){});
// 	// 	Meteor.call("createNotification", userId, message, function(error, result){});
// 	// },
// 	// updateModeratorAttribute: function(userId, makeModerator){
// 	// 	console.log("Updating the selected user's modeator status...");
// 	// 	var user = Meteor.users.findOne({_id: userId});
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.isModerator": makeModerator
// 	// 		}
// 	// 	});
// 	// },
// 	// createNotification: function(userId, message){
// 	// 	console.log("Creating notification...");
// 	// 	Notifications.insert({			
// 	// 		message: message,
// 	// 		userId: userId,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// clearNotifications: function(userId){
// 	// 	console.log("Clearing notifications...");
// 	// 	Notifications.update({userId: userId},{
// 	// 		$set: {
// 	// 			seen: true
// 	// 		}
// 	// 	},
// 	// 		{multi: true}
// 	// 	);
// 	// },
// 	// updateGamblingAddiction: function(userId){
// 	// 	console.log("Updating gambling addiction flag...");
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.gamblingAddiction": true
// 	// 		}
// 	// 	});
// 	// },
// 	// updateRoomHopper: function(userId){
// 	// 	console.log("Updating room hopper flag...");
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.roomHopper": true
// 	// 		}
// 	// 	});
// 	// },
// 	// deleteUser: function(userId){
// 	// 	console.log("Deleting user...");
// 	// 	Meteor.users.remove(userId, function(error, result){
// 	// 		if (error){
// 	// 		}
// 	// 		else{
// 	// 			Meteor.call("deleteUserBadges", userId, function(error, result){});
// 	// 		}
// 	// 	});
// 	// },
// 	// addRoom: function(name){
// 	// 	console.log("Creating room...");
// 	// 	Rooms.insert({		
// 	// 		name: name,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// deleteRoom: function(roomId){
// 	// 	console.log("Deleting room...");
// 	// 	Rooms.remove(roomId);
// 	// 	Questions.remove({"questionFormHash.roomId": roomId});
// 	// },
// 	// editRoom: function(roomId, name){
// 	// 	console.log("Editing room...");
// 	// 	Rooms.update({_id: roomId},{
// 	// 		$set: {
// 	// 			name: name
// 	// 		}
// 	// 	});
// 	// },
// 	// selectRoom: function(userId, roomId){
// 	// 	console.log("Selecting room...");
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.currentRoomId": roomId
// 	// 		}
// 	// 	});
// 	// },
// 	// removeCurrentRoom: function(userId){
// 	// 	console.log("Removing currently selected room...");
// 	// 	Meteor.users.update({_id: userId},
// 	// 		{$set: {
// 	// 			"profile.currentRoomId": null
// 	// 		}
// 	// 	});
// 	// },
// 	// updateScoreBoardRanks: function(questionId){
// 	// 	console.log("Updating the score board ranks...");
// 	// 	var users = Meteor.users.find({"profile.isAdmin": false},
// 	// 	                         {sort: {"profile.score": -1}},
// 	// 	                         {fields: {"profile": 1, "emails": 1}}
// 	// 	                        );
// 	// 	var roomId = Questions.findOne(questionId).questionFormHash.roomId;
// 	// 	users.forEach(function(user, index){
// 	// 		var userId = user._id;
// 	// 		var rank = index + 1;
// 	// 		var rankChange;
// 	// 		var previousScoreBoardRank = user.profile.previousScoreBoardRank;
// 	// 		var rankChangeLargestRise = user.profile.rankChangeLargestRise;
// 	// 		var rankChangeLargestDrop = user.profile.rankChangeLargestDrop;

// 	// 		if (previousScoreBoardRank === 0){
// 	// 			rankChange = 0;
// 	// 		}
// 	// 		else{
// 	// 			rankChange = previousScoreBoardRank - rank;
// 	// 		}
// 	// 		if (rankChange > rankChangeLargestRise){
// 	// 			rankChangeLargestRise = rankChange;
// 	// 		}
// 	// 		if (rankChange < rankChangeLargestDrop){
// 	// 			rankChangeLargestDrop = rankChange;
// 	// 		}

// 	// 		Meteor.users.update({_id: userId, "profile.currentRoomId": roomId},
// 	// 			{$set: {
// 	// 				"profile.previousScoreBoardRank": rank,
// 	// 				"profile.rankChange": rankChange,
// 	// 				"profile.rankChangeLargestRise": rankChangeLargestRise,
// 	// 				"profile.rankChangeLargestDrop": rankChangeLargestDrop
// 	// 			}
// 	// 		});
// 	// 	});
// 	// },
// 	// addBadge: function(badgeFormHash){
// 	// 	console.log("Creating new badge...");
// 	// 	Badges.insert({			
// 	// 		name: badgeFormHash.name,
// 	// 		description: badgeFormHash.description,
// 	// 		avatar: badgeFormHash.avatar,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// updateBadge: function(badgeId, avatar){
// 	// 	console.log("Updating badge...");
// 	// 	Badges.update({_id: badgeId},
// 	// 		{$set: {
// 	// 			avatar: avatar
// 	// 		}
// 	// 	});
// 	// },
// 	// deleteBadge: function(badgeId){
// 	// 	console.log("Deleting badge...");
// 	// 	Badges.remove(badgeId);
// 	// },
// 	// addFeedbackType: function(name){
// 	// 	console.log("Creating new feedback type...");
// 	// 	FeedbackTypes.insert({			
// 	// 		name: name,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// deleteFeedbackType: function(feedbackTypeId){
// 	// 	console.log("Deleting feedback type...");
// 	// 	FeedbackTypes.remove(feedbackTypeId);
// 	// },
// 	// addUserBadge: function(userId, badgeId){
// 	// 	console.log("Adding user badge...");
// 	// 	UserBadges.insert({
// 	// 		userId: userId,		
// 	// 		badgeId: badgeId,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// deleteUserBadges: function(userId){
// 	// 	console.log("Deleting user badge...");
// 	// 	UserBadges.remove({userId: userId});
// 	// },
// 	// activateBadges: function(){
// 	// 	console.log("Activating Badges...");
// 	// 	ActivateBadges.insert({
// 	// 		createdAt: new Date()
// 	// 	});
// 	// 	var users = Meteor.users.find({isAdmin: false, isModerator: false});
// 	// 	var badgeId,
// 	// 		largestRankRiseNumber = 0,
// 	// 		largestRankDropNumber = 0,
// 	// 		largestRankRiseUser = null,
// 	// 		largestRankDropUser = null,
// 	// 		totalQuestions = Questions.find({}).count();

// 	// 	users.forEach(function(user){
// 	// 		//checking for negative points badge
// 	// 		var score = user.profile.score;
// 	// 		if (score < 0){
// 	// 			badgeId = Badges.findOne({"name": "There is no rock bottom"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}

// 	// 		//rank change rise badge
// 	// 		var rankChangeLargestRise = user.profile.rankChangeLargestRise;
// 	// 		if (rankChangeLargestRise > 35){
// 	// 			badgeId = Badges.findOne({"name": "Can we get much higher?"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}

// 	// 		//rank change drop badge
// 	// 		var rankChangeLargestDrop = user.profile.rankChangeLargestDrop;
// 	// 		if (rankChangeLargestDrop < -35){
// 	// 			badgeId = Badges.findOne({"name": "Baby, I've got the bends"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}

// 	// 		//largest rank change rise of all users badge
// 	// 		if (rankChangeLargestRise > largestRankRiseNumber){
// 	// 			largestRankRiseNumber = rankChangeLargestRise;
// 	// 			largestRankRiseUser = user._id;
// 	// 		}

// 	// 		//largest rank change drop of all users badge
// 	// 		if (rankChangeLargestDrop < largestRankDropNumber){
// 	// 			largestRankDropNumber = rankChangeLargestDrop;
// 	// 			largestRankDropUser = user._id;
// 	// 		}

// 	// 		//voted in over 20 sessions badge
// 	// 		var totalVotes = user.profile.totalVotes;
// 	// 		if (totalVotes > 20){
// 	// 			badgeId = Badges.findOne({"name": "I heart Forum-Live"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}

// 	// 		// voted on every single question badge
// 	// 		if (totalVotes >= totalQuestions){
// 	// 			badgeId = Badges.findOne({"name": "Til the bitter end"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}

// 	// 		// never tell me the odds badge
// 	// 		var gamblingAddiction = user.profile.gamblingAddiction;
// 	// 		if (gamblingAddiction){
// 	// 			badgeId = Badges.findOne({"name": "Never Tell Me the Odds"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}

// 	// 		//room hopper
// 	// 		var roomHopper = user.profile.roomHopper;
// 	// 		if (roomHopper){
// 	// 			badgeId = Badges.findOne({"name": "Room Hopper"})._id;
// 	// 			Meteor.call("addUserBadge", user._id, badgeId, function(error, result){});
// 	// 		}
// 	// 	});

// 	// 	//awarding largest rank change rise of all users badge
// 	// 	if (largestRankRiseUser){
// 	// 		badgeId = Badges.findOne({"name": "Rank Change Royalty"})._id;
// 	// 		Meteor.call("addUserBadge", largestRankRiseUser, badgeId, function(error, result){});
// 	// 	}

// 	// 	//awarding largest rank change drop of all users badge
// 	// 	if (largestRankDropUser){
// 	// 		badgeId = Badges.findOne({"name": "Fatality"})._id;
// 	// 		Meteor.call("addUserBadge", largestRankDropUser, badgeId, function(error, result){});
// 	// 	}
// 	// },
// 	// deactivateBadges: function(){
// 	// 	console.log("Deactivating Badges...");
// 	// 	ActivateBadges.remove({});
// 	// },
// 	// activateQuestions: function(questionId, roomId){
// 	// 	console.log("Creating active question object...");
// 	// 	ActivateQuestions.insert({
// 	// 		questionId: questionId,		
// 	// 		roomId: roomId,
// 	// 		createdAt: new Date()
// 	// 	});
// 	// },
// 	// deactivateQuestions: function(questionId, roomId){
// 	// 	console.log("Removing active question object...");


// 	// }
// });