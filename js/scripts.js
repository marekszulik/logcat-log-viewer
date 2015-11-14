function beautify() {
	var outputContainer = $("#output-container");
	outputContainer.text("");

	var inputLog = $("#pasted-log").val().split("\n");

	inputLog.forEach(function(entry) {
		outputContainer.append(parseLine(entry));
	});
}

function parseLine(line) {
	var cssClass;

	cssClass = getClassFromFirstChar(line);

	if(cssClass == "") {
		cssClass = getClassFromRegex(line);
	}

	return "<ul class=\"" + cssClass + "\">" + line + "</ul>";
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