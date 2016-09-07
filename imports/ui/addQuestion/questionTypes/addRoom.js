import { Template } from "meteor/templating";

import "./addRoom.html";

Template.addRoom.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});