Template.scoreBoard.onCreated(function() {
	Meteor.subscribe("allUsers");
});

Template.scoreBoard.helpers({
	users: function(){
		var showAllScores = Session.get("showAllScores");
		if (showAllScores) {
			return Meteor.users.find({"profile.isAdmin": false},
									 {sort: {"profile.score": -1}},
									 {fields: {"profile": 1, "emails": 1}}
									);
		}
		else {
			return Meteor.users.find({"profile.isAdmin": false},
									 {sort: {"profile.score": -1}, limit: 10},
									 {fields: {"profile": 1, "emails": 1}}
									);
		}
	},
	showAllScores: function(){
		if (Session.get("showAllScores")){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.scoreBoard.events({
	"click .showAllScores": function(evt){
		evt.preventDefault();
		if (Session.get("showAllScores")){
			Session.set("showAllScores", false);
		}
		else{
			Session.set("showAllScores", true);
		}
	}
});