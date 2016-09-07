import { Template } from "meteor/templating";

import "./addBadge.html";

Template.addBadge.onRendered(function(){
    $("form").find("input").filter(":visible:first").focus();
});

