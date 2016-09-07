import { Template } from "meteor/templating";

import "./pollQuestion.html";

Template.pollQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});