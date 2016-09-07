Template.badges.onCreated(function(){
	Meteor.subscribe("badges");
});

Template.badges.helpers({
    badges: function(){
        return Badges.find({});
    }
});