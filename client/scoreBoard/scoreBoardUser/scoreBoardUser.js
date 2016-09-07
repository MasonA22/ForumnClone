Template.scoreBoardUser.helpers({
	userName: function(){
		var user = this;
		var emailArray = user.emails[0].address.split("@");
		var userName = emailArray[0].substring(0, 8);
		return userName;
	}
});