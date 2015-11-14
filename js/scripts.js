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

	switch(line.charAt(0)) {
		case "I":
			cssClass = "info-log";
		break;
		case "D":
			cssClass = "debug-log";
		break;
		case "W":
			cssClass = "warning-log";
		break;
		case "E":
			cssClass = "error-log";
		break;
		default:
			cssClass = "verbose-log";
		break;
	}
	return "<ul class=" + cssClass + ">" + line + "</ul>";
}