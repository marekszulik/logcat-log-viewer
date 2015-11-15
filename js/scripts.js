var errorCount = 0;
var currentError = 0;
var nextErrorDirection = true;

function beautify() {
	hideInputWindow();
	var outputContainer = $("#output-container");
	outputContainer.text("");

	var inputLog = $("#pasted-log").val().split("\n");

	inputLog.forEach(function(entry) {
		outputContainer.append(parseLine(entry));
	});
}

function hideInputWindow() {
	var pastedLogTextarea = $('#pasted-log');
	pastedLogTextarea.focus(function () {
		$(this).animate({ height: "30em" }, 500);
	});
	pastedLogTextarea.blur(function () {
		$(this).animate({ height: "1em" }, 500);	
	});
	pastedLogTextarea.blur();
}

function parseLine(line) {
	var cssClass;

	cssClass = getClassFromFirstChar(line);

	if(cssClass == "") {
		cssClass = getClassFromRegex(line);
	}

	if(cssClass == "error-log"){
		errorCount++;
		return "<ul class=\"" + cssClass + "\" id=\"error-" + errorCount + "\">" + escapeHtml(line) + "</ul>";
	}

	return "<ul class=\"" + cssClass + "\">" + escapeHtml(line) + "</ul>";
}

function getClassFromFirstChar(line) {
	switch(line.charAt(0)) {
		case "V":
			return "verbose-log";
		case "I":
			return "info-log";
		case "D":
			return "debug-log";
		case "W":
			return "warning-log";
		case "E":
			return "error-log";
		default:
			return "";
	}
}

function getClassFromRegex(line) {
	switch(line.charAt(line.search(/ [VIDWE]\//)+1)) {
		case "I":
			return "info-log";
		case "D":
			return "debug-log";
		case "W":
			return "warning-log";
		case "E":
			return "error-log";
		default:
			return "verbose-log";
	}
}

function goToNextError() {
	if(!nextErrorDirection){
		nextErrorDirection = true;
		currentError++;
	}
	if(currentError >= errorCount){
		currentError = 0;
	}
	$('html, body').animate({
		scrollTop: $("#error-" + ++currentError).offset().top
	}, 500);
}

function goToPreviousError() {
	if(nextErrorDirection){
		nextErrorDirection = false;
		currentError--;
	}
	if(currentError <= 0){
		currentError = errorCount;
	}
	$('html, body').animate({
		scrollTop: $("#error-" + currentError--).offset().top
	}, 500);
}