Template.badgeType.onCreated(function(){
	Meteor.subscribe("userBadges");
});

Template.badgeType.helpers({
    userBadges: function(){
        var badgeId = this._id;
        return UserBadges.find({badgeId: badgeId});
    }
});