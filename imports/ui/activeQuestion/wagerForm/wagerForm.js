import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./wagerForm.html";

Template.wagerForm.onRendered(function(){
	var slider = document.getElementById('wageRangeSlider');
	var score = Meteor.user().profile.score;
	if (score > 0){
		$("#wageRangeSlider").noUiSlider({
			start: 0,
			connect: "lower",
			range: {
				'min': 0,
			    'max': score
			}
		}).on('slide', function (ev, val) {
			val = Math.floor(val);
			var newScore = score - val;
			$(".wagerTotalLeft").text(newScore);
			$(".userWager").val(val);
		});
	}
});