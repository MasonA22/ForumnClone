Template.feedbackUser.helpers({
    email: function(){
        var userId = this.userId;
        var email = Meteor.users.findOne(userId).emails[0].address;
        return email;
    }
});