function beautify() {
	var outputContainer = $("#output-container");
	outputContainer.text("");
	
	var inputLog = $("#pasted-log").val().split("\n");

	inputLog.forEach(function(entry) {
		outputContainer.append("<li>" + entry + "</li>");
	});
}