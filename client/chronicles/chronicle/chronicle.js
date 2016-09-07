Template.chronicle.onCreated(function(){
    Meteor.subscribe("allUsers");
    Meteor.subscribe("questions");
});

Template.chronicle.helpers({
    showChronicleGraph: function(){
        if (Session.get("showChronicleGraph")){
            return true;
        }
        else{
            return false;
        }
    },
    rankOrder: function(){
        var questionId = this._id;
        var question = Questions.findOne(questionId);
        if (question){
            var rank = question.rank;
            var newRank = [];
            $.each(rank, function(index, value){
                var email = Meteor.users.findOne(value).emails[0].address;
                newRank.push(email);
            });
            return newRank;
        }
        else{
            return false;
        }
    }
});

Template.chronicle.events({
    "click .chronicleGraph": function(evt){
        evt.preventDefault();
        if (Session.get("showChronicleGraph")){
            Session.set("showChronicleGraph", false);
        }
        else{
            Session.set("showChronicleGraph", true);
        }
    }
});