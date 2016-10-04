import { Template } from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';

import "./home.html";
import "../login/login.js";
import "../activeQuestion/activeQuestion.js";
import "../selectRoom/selectRoom.js";

Template.home.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("activeQuestion", true);
});

Template.home.helpers({
	showAdminSection: function(sectionType) {
		const instance = Template.instance();
		if (instance.state.get(sectionType)) {
			return true;
		}
		else {
			return false;
		}
	} 
});

Template.home.events({
	"click .adminManagementHeader": function(evt, template) {
		evt.preventDefault();
		let adminOption = $(evt.target).closest(".adminManagementContainer").attr("adminOption");
		if (template.state.get(adminOption)){
			template.state.set(adminOption, false);
		}
		else{
			template.state.set(adminOption, true);
		}
	}
});