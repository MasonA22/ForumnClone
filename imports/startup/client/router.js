
import '../../ui/layout/layout.js';
import '../../ui/home/home.js';
import '../../ui/login/login.js';
import '../../ui/addQuestion/addQuestion.js';
import '../../ui/scoreBoard/scoreBoard.js';
import '../../ui/badgeBoard/badgeBoard.js';
import '../../ui/chronicles/chronicles.js';
import '../../ui/chronicles/chronicle/chronicle.js';
import '../../ui/_admin/admin.js';

Router.configure({
	layoutTemplate: "layout"
});

Router.map(function(){
	this.route("home", {path: "/"});
	this.route("login", {path: "/register"});
	this.route("/logout", function(){
	},
	{
		onBeforeAction: function(){
			if (Meteor.userId()){
				Meteor.logout();
			}
			this.next();
		},
		onAfterAction: function(){
			Router.go("/");
		}
	});
	this.route("addQuestion", {path: "/addQuestion"});
	this.route("scoreBoard", {path: "/scoreBoard"});
	this.route("badgeBoard", {path: "/badgeBoard"});
	this.route("chronicles", {path: "/chronicles"});
	this.route("chronicle", {
		path: "/chronicles/:_id",
		data: function(){
			var question = Questions.findOne(this.params._id);
			return question;
		}
	});
	this.route("admin", {path: "/admin"});
});

var goToHome = function() {
 	if (Meteor.user()) {
 		Router.go("home");
 	}
 	else{
 		this.next();
 	}
};

var notAuthorized = function(){
	if (!Meteor.userId() && this.ready()){
		Router.go("login");
		this.next();
	}
	else{
		this.next();
	}
}

var notAdmin = function() {
 	if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.isAdmin){
 		this.next();
 	}
 	else{
 		Router.go("home");
 	}
};

var setTitle = function(){
	document.title = "Forum Live";
}

Router.onBeforeAction(goToHome, {only: ["login"]});
Router.onBeforeAction(notAuthorized, {except: ["login"]});
Router.onBeforeAction(notAdmin, {only: ["addQuestion", "admin"]});
Router.onAfterAction(setTitle);