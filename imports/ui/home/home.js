import "./home.html";
import "../login/login.js";
import "../activeQuestion/activeQuestion.js";
import "../selectRoom/selectRoom.js";
import "../questions/questions.js";
import "../rooms/rooms.js";
import "../badges/badges.js";
import "../feedbackTypes/feedbackTypes.js";
import "../images/images.js";

Template.home.onCreated(function(){
	this.state = new ReactiveDict();
	const instance = Template.instance();
	instance.state.set("questions", false);
	instance.state.set("rooms", false);
	instance.state.set("badges", false);
	instance.state.set("feedbackTypes", false);
	instance.state.set("images", false);
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