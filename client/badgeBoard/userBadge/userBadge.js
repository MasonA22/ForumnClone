Template.userBadge.helpers({
    userName: function(){
        var user = Meteor.users.findOne(this.userId);
        if (user){
            var email = user.emails[0].address;
            var emailArray = email.split("@");
            var userName = emailArray[0].substring(0, 8);
            return userName;
        }
        else{
            return false;
        }
    }
});