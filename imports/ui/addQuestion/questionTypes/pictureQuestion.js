import { Template } from "meteor/templating";

import "./pictureQuestion.html";

Template.pictureQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});