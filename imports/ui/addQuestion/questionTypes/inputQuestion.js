import { Template } from "meteor/templating";

import "./inputQuestion.html";

Template.inputQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});