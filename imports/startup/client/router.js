import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layout/layout.js';
import '../../ui/home/home.js';
import '../../ui/addQuestion/addQuestion.js';
import '../../ui/scoreBoard/scoreBoard.js';
import '../../ui/badgeBoard/badgeBoard.js';
import '../../ui/chronicles/chronicles.js';
import '../../ui/chronicles/chronicle/chronicle.js';
import '../../ui/_admin/admin.js';

document.title = "Forum Live";

let privateRoutes = FlowRouter.group({
	name: "private",
	triggersEnter: [
		checkLoggedIn
	]
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
		BlazeLayout.render('layout', { main: 'admin' });
	}
});

adminRoutes.route('/addQuestion', {
	name: 'addQuestion',
	action() {
		BlazeLayout.render('layout', { main: 'addQuestion' });
	}
});

privateRoutes.route('/', {
	name: 'home',
	action() {
		BlazeLayout.render('layout', { main: 'home' });
	}
});

privateRoutes.route('/scoreBoard', {
	name: 'scoreBoard',
	action() {
		BlazeLayout.render('layout', { main: 'scoreBoard' });
	}
});

privateRoutes.route('/badgeBoard', {
	name: 'badgeBoard',
	action() {
		BlazeLayout.render('layout', { main: 'badgeBoard' });
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
		BlazeLayout.render('layout', { main: 'chronicles' });
	}
});

privateRoutes.route('/chronicles/:_id', {
	name: 'chronicle',
	action() {
		BlazeLayout.render('layout', { main: 'chronicle' });
	}
});

function checkLoggedIn(ctx, redirect) {
	if (!Meteor.userId()) {
		FlowRouter.go('/');
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