document.addEventListener("DOMContentLoaded", function() {
	const form = document.getElementById("contactForm");
	const statusMessage = document.getElementById("statusMessage");
	const submitBtn = document.getElementById("submitBtn");

	form.addEventListener("submit", function(event) {
		// Prevent form from redirecting to the next page
		event.preventDefault();
		
		// Display the status message
		statusMessage.style.display = "block";
		
		// Set focus back to the submit button
		submitBtn.focus();
	});
});

