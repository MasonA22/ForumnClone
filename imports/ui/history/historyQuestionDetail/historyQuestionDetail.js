import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Questions } from "../../../api/questions.js";

import "./historyQuestionDetail.html";
import "../historyQuestionGraph/historyQuestionGraph.js";
import "./feedbackUser/feedbackUser.js";

Template.historyQuestionDetail.onCreated(function(){
    this.state = new ReactiveDict();
    const instance = Template.instance();
    instance.state.set("showHistoryQuestionGraph", false);
    let self = this;
    self.autorun(function() {
        let questionId = FlowRouter.getParam("_id");
        self.subscribe("singleQuestion", questionId);
        self.subscribe("allUsers");
    });
});

Template.historyQuestionDetail.helpers({
    showHistoryQuestionGraph: function(){
        const instance = Template.instance();
        if (instance.state.get("showHistoryQuestionGraph")){
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

Template.historyQuestionDetail.events({
    "click .showGraph": function(evt, template){
        evt.preventDefault();
        if (template.state.get("showHistoryQuestionGraph")){
            template.state.set("showHistoryQuestionGraph", false);
        }
        else{
            template.state.set("showHistoryQuestionGraph", true);
        }
    }
});