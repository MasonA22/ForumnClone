Template.chronicles.onCreated(function(){
	Meteor.subscribe("questions");
});

Template.chronicles.helpers({
    questions: function(){
        return Questions.find({alreadyAsked: true});
    }
});