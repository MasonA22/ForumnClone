Template.badgeBoard.onCreated(function(){
	Meteor.subscribe("badges");
});

Template.badgeBoard.helpers({
    badges: function(){
        return Badges.find({});
    }
});