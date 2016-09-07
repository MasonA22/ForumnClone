import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./login.html";

Template.login.onCreated(function(){
	Meteor.subscribe("allUsers");
});

Template.login.onRendered(function(){
	$("#li-email").focus();
});

Template.login.events({
	"keyup #li-email": function(evt, template){
		evt.preventDefault();
		var email = $("#li-email").val(),
			regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			emailCheck = regex.test(email);

		if (email.length > 0 && emailCheck){
			$(".loginButton").prop("disabled", false);
		}
		else{
			$(".loginButton").prop("disabled", "disabled");
		}
	},
	"click button": function(evt, template){
		evt.preventDefault();

		$("#li-email").prop("disabled", "disabled");
		$(evt.target).prop("disabled", "disabled");
		$(evt.target).text("Logging in. Please wait...");

		var email = template.find("#li-email").value;
		email = email.toLowerCase();
		var emailAlreadyExists = Meteor.users.findOne({"emails.address": email});
		var defaultPassword = "welcome";

		if (emailAlreadyExists){
			Meteor.loginWithPassword({email}, defaultPassword);
		}
		else{
			var isAdmin = false;
			if (email === "kylebachan@gmail.com" || email === "admin@admin.com"){
				isAdmin = true;
			}

			Accounts.createUser({
				email: email,
				password: defaultPassword,
				profile: {
					isAdmin: isAdmin,
					currentRoomId: null
				}
			}, function(error, result){
				if (error){
					console.log("Error creating new user...");
					$("#li-email").prop("disabled", false);
					$(evt.target).prop("disabled", false);
					$(evt.target).text("Log in failed. Please try again.");
				}
			});
		}
	}
});