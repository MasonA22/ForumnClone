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
    let self = this;
    self.autorun(function() {
        let questionId = FlowRouter.getParam("_id");
        self.subscribe("singleQuestion", questionId);
        self.subscribe("allUsers");
    });
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
        let question = Questions.findOne();
        return question;
    },
    emailAddress: function(userId) {
        let user = Meteor.users.findOne(userId);
        return user.emails[0].address;
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