Template.pollQuestion.onRendered(function(){
	$("form").find("input").filter(":visible:first").focus();
});