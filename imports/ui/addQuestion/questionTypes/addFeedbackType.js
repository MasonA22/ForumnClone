import { Template } from "meteor/templating";

import "./addFeedbackType.html";

Template.addFeedbackType.onRendered(function(){
    $("form").find("input").filter(":visible:first").focus();
});