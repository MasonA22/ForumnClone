import { Template } from "meteor/templating";

import "./triviaQuestion.html";

Template.triviaQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});