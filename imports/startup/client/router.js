import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layout/layout.js';
import '../../ui/home/home.js';
import '../../ui/login/login.js';
import '../../ui/addQuestion/addQuestion.js';
import '../../ui/scoreBoard/scoreBoard.js';
import '../../ui/badgeBoard/badgeBoard.js';
import '../../ui/chronicles/chronicles.js';
import '../../ui/chronicles/chronicle/chronicle.js';
import '../../ui/_admin/admin.js';

FlowRouter.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('layout', { main: 'home' });
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render('layout', { main: 'login' });
	}
});

let adminRoutes = privateRoutes.group({
	name: "admin",
	triggersEnter: [
		checkAdmin
	]
});

adminRoutes.route('/admin', {
	name: 'admin',
	action() {
		BlazeLayout.render('App_body', { main: 'admin' });
	}
});

let privateRoutes = FlowRouter.group({
	name: "private",
	triggersEnter: [
		checkLoggedIn
	]
});

privateRoutes.route('/addQuestion', {
	name: 'addQuestion',
	action() {
		BlazeLayout.render('App_body', { main: 'addQuestion' });
	}
});

privateRoutes.route('/scoreBoard', {
	name: 'scoreBoard',
	action() {
		BlazeLayout.render('App_body', { main: 'scoreBoard' });
	}
});

privateRoutes.route('/badgeBoard', {
	name: 'badgeBoard',
	action() {
		BlazeLayout.render('App_body', { main: 'badgeBoard' });
	}
});

privateRoutes.route('/logout', {
	name: 'Logout',
	action() {
		Meteor.logout(function() {
			FlowRouter.go('/');
		});
	},
});

privateRoutes.route('/chronicles', {
	name: 'chronicles',
	action() {
		BlazeLayout.render('App_body', { main: 'chronicles' });
	}
});

privateRoutes.route('/chronicles/:_id', {
	name: 'chronicle',
	action() {
		BlazeLayout.render('App_body', { main: 'chronicle' });
	}
});

function checkLoggedIn(ctx, redirect) {
	if (!Meteor.userId()) {
		redirect("/");
	}
}

function checkAdmin(ctx, redirect) {
	let user = Meteor.users.findOne(Meteor.userId());
	if (user && user.profile) {
		if (!user.profile.isAdmin) {
			redirect("/");
		}
	}
}

var setTitle = function(){
	document.title = "Forum Live";
}

// Router.configure({
// 	layoutTemplate: "layout"
// });

// Router.map(function(){
// 	this.route("home", {path: "/"});
// 	this.route("login", {path: "/register"});
// 	this.route("/logout", function(){
// 	},
// 	{
// 		onBeforeAction: function(){
// 			if (Meteor.userId()){
// 				Meteor.logout();
// 			}
// 			this.next();
// 		},
// 		onAfterAction: function(){
// 			Router.go("/");
// 		}
// 	});
// 	this.route("addQuestion", {path: "/addQuestion"});
// 	this.route("scoreBoard", {path: "/scoreBoard"});
// 	this.route("badgeBoard", {path: "/badgeBoard"});
// 	this.route("chronicles", {path: "/chronicles"});
// 	this.route("chronicle", {
// 		path: "/chronicles/:_id",
// 		data: function(){
// 			var question = Questions.findOne(this.params._id);
// 			return question;
// 		}
// 	});
// 	this.route("admin", {path: "/admin"});
// });

// var goToHome = function() {
//  	if (Meteor.user()) {
//  		Router.go("home");
//  	}
//  	else{
//  		this.next();
//  	}
// };

// var notAuthorized = function(){
// 	if (!Meteor.userId() && this.ready()){
// 		Router.go("login");
// 		this.next();
// 	}
// 	else{
// 		this.next();
// 	}
// }

// var notAdmin = function() {
//  	if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.isAdmin){
//  		this.next();
//  	}
//  	else{
//  		Router.go("home");
//  	}
// };

// Router.onBeforeAction(goToHome, {only: ["login"]});
// Router.onBeforeAction(notAuthorized, {except: ["login"]});
// Router.onBeforeAction(notAdmin, {only: ["addQuestion", "admin"]});
// Router.onAfterAction(setTitle);