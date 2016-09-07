Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

Handlebars.registerHelper('equals', function (a, b) {
	return a === b;
});

Handlebars.registerHelper('negativeScore', function (score) {
    if (score <= 0){
        return true;
    }
    else{
        return false;
    }
});

Handlebars.registerHelper('rankPositivity', function (rankChange) {
    if (rankChange > 0){ 
        return true;
    }
    else{ 
        return false;
    }
});

Handlebars.registerHelper('absoluteValue', function (number) {
    number = Math.abs(number);
    return number;
});

Handlebars.registerHelper('or', function (v1, v2) {
    return v1 || v2;
});