import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Questions } from "../../../api/questions.js";

import "./chronicle.html";
import "../chronicleQuestionGraph/chronicleQuestionGraph.js";
import "./feedbackUser/feedbackUser.js";

Template.chronicle.onCreated(function(){
    this.state = new ReactiveDict();
    const instance = Template.instance();
    instance.state.set("showChronicleGraph", false);
    Meteor.subscribe("allUsers");
    Meteor.subscribe("questions");
});

Template.chronicle.helpers({
    showChronicleGraph: function(){
        const instance = Template.instance();
        if (instance.state.get("showChronicleGraph")){
            return true;
        }
        else{
            return false;
        }
    },
    question: function() {
        let questionId = FlowRouter.getParam("_id");
        let question = Questions.findOne(questionId);
        return question;
    },
    rankOrder: function(){
        let questionId = FlowRouter.getParam("_id");
        let question = Questions.findOne(questionId);
        if (question){
            let rank = question.rank;
            let newRank = [];
            $.each(rank, function(index, value){
                let email = Meteor.users.findOne(value).emails[0].address;
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
    "click .chronicleGraph": function(evt, template){
        evt.preventDefault();
        if (template.state.get("showChronicleGraph")){
            template.state.set("showChronicleGraph", false);
        }
        else{
            template.state.set("showChronicleGraph", true);
        }
    }
});