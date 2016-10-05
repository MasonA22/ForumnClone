import { Template } from "meteor/templating";
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Questions } from "../../../api/questions.js";

import "./chronicleQuestionGraph.html";

Template.chronicleQuestionGraph.onRendered(function() {
    var questionId = FlowRouter.getParam("_id");
    this.autorun(function() {
        drawChart(questionId);
    });

    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    var templateThis = this;
    var id;

    window.addEventListener(orientationEvent, function() {
        if ($(".chronicleQuestionGraph").is(':visible')) {
            templateThis.autorun(function() {
                clearTimeout(id);
                id = setTimeout(doneResizing, 1000);
            });
        }
    }, false);
});

Template.chronicleQuestionGraph.helpers({
    question: function() {
        let questionId = FlowRouter.getParam("_id");
        let question = Questions.findOne(questionId);
        return question;
    }
});

function doneResizing() {
    let questionId = FlowRouter.getParam("_id");
    let question = Questions.findOne(questionId);
    drawChart(questionId);
}

function drawChart(questionId) {
    var question = Questions.findOne(questionId);
    var chronicleQuestionTypeInput = question.questionFormHash.isInput;

    if (chronicleQuestionTypeInput) {
        console.log("Generating doughnut chart...");

        var chronicleQuestionGraphContext = document.getElementById('chronicleQuestionGraph').getContext('2d');
        var answerData = question.questionFormHash.answerData;
        var data = [
            {
                value: answerData.incorrect,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Incorrect Answers"
            },
            {
                value: answerData.correct,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Correct Answers"
            },
            {
                value: answerData.partiallyCorrect,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Partially Correct Answers"
            }
        ];

        var options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,

            //String - The colour of each segment stroke
            segmentStrokeColor : "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps : 100,

            //String - Animation easing effect
            animationEasing : "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : false,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
        }

        if (window.myDoughnutChart !== undefined){
            window.myDoughnutChart.destroy();
        }

        window.myDoughnutChart = new Chart(chronicleQuestionGraphContext).Doughnut(data,options);
    }
    else {
        console.log("Generating bar chart...");
        var chronicleQuestionGraph = document.getElementById('chronicleQuestionGraph');
        if (chronicleQuestionGraph){
            var chronicleQuestionGraphContext = chronicleQuestionGraph.getContext('2d');
            var answersArray = question.questionFormHash.answers;
            answersArray = $.map(answersArray, function(element, index){
                if (element.text.length < 15){
                    return element.text;
                }
                else{
                    return element.text.substring(0, 15) + "...";
                }
            });
            var votesArray = question.questionFormHash.answers;
            votesArray = $.map(votesArray, function(element, index){
                return element.votes;
            });

            var graphData = {
                labels : answersArray,
                datasets : [
                    {
                        fillColor : "rgba(81, 98, 111, 0.95)",
                        strokeColor : "rgba(81, 98, 111, 0.95)",
                        data : votesArray
                    }

                ]
            }
            
            if (window.barChart !== undefined){
                window.barChart.destroy();
            }

            window.barChart = new Chart(chronicleQuestionGraphContext).Bar(graphData);
        }
    }
}