import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Questions } from "../../api/questions.js";

import "./activeQuestionGraph.html";

Template.activeQuestionGraph.onRendered(function(){
	this.autorun(function(){
		drawChart();
	});

	var supportsOrientationChange = "onorientationchange" in window,
	    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
	var templateThis = this;
	var id;

	window.addEventListener(orientationEvent, function() {
		if ($(".activeQuestionGraph").is(':visible')){
			templateThis.autorun(function(){
				clearTimeout(id);
				id = setTimeout(doneResizing, 1000);
			});
		}
	}, false);
});

function doneResizing(){
	drawChart();
}

Template.activeQuestionGraph.helpers({
	activeQuestion: function(){
		var roomId = Meteor.user().profile.currentRoomId;
		return Questions.find({activeQuestion: true, "questionFormHash.roomId": roomId});
	}
});

function drawChart(){

	var roomId = Meteor.user().profile.currentRoomId;
	var activeQuestion = Questions.findOne({activeQuestion: true, "questionFormHash.roomId": roomId});
	var activeQuestionTypeInput = activeQuestion.questionFormHash.isInput;

	if (activeQuestionTypeInput){
		console.log("Generating doughnut chart...");

		var activeQuestionGraphContext = document.getElementById('activeQuestionGraph').getContext('2d');
		var answerData = activeQuestion.questionFormHash.answerData;
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

		window.myDoughnutChart = new Chart(activeQuestionGraphContext).Doughnut(data,options);
	}
	else{
		console.log("Generating bar chart...");
		var activeQuestionGraph = document.getElementById('activeQuestionGraph');
		if (activeQuestionGraph){
			var activeQuestionGraphContext = activeQuestionGraph.getContext('2d');
			var answersArray = activeQuestion.questionFormHash.answers;
			answersArray = $.map(answersArray, function(element, index){
				if (element.text.length < 15){
					return element.text;
				}
				else{
					return element.text.substring(0, 15) + "...";
				}
			});
			var votesArray = activeQuestion.questionFormHash.answers;
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

			window.barChart = new Chart(activeQuestionGraphContext).Bar(graphData);
		}
	}
}