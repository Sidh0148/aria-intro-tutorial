// First, set some variables
let tabBtns = [];	// We'll put each tab button into an array
let tabPanels = {};	// We'll put each tab panel into an associative array

tabBtns = Array.from(document.querySelectorAll(".tabBtn"));	// Get all elements with class "tabBnt", and stick them into a proper array
for (let i =0 ; i < tabBtns.length; i++) {			// Then go through them, for each of them...
	tabBtns[i].addEventListener("click", selectTab, false);	// Run selectTab() whenever a user clicks on a tab
	tabBtns[i].addEventListener("keyup", focusTab, false);	// When someone presses a key, run focusTab() (if it's an arrow key)
}

let x = document.querySelectorAll(".tabPanel");		// get all elements with a class of tabPanel
for (let i =0 ; i < x.length; i++) {			// go through them, and
	tabPanels[x[i].id] = x[i];			// add them to an associative array with the element's unique ID value as the key, and the element as the value
}

// If left (37) or right (39) arrow keys are pressed, change the focus on the tab buttons, but do not activate.
function focusTab (e) {
	if (e.keyCode == 39) {
		tabBtns[(tabBtns.indexOf(e.target) + 1) % 3].focus();	// Focus the next tab button.  If it's the last one, focus the first one.
	} else if (e.keyCode == 37) {
		tabBtns[((tabBtns.indexOf(e.target) - 1) < 0 ? 2 : tabBtns.indexOf(e.target) - 1)].focus();	// Focus the previous tab button. If it's the first one, focus the last.
	}
} // End of focusTab

// If tab button is clicked (mouse, touch, Enter/Space) expose that tab's panel and hide the others
function selectTab(e) {
	let tabPanelID = e.target.id.replace("Btn", "Panel");

	for (var i = 0; i < tabBtns.length; i++) {
		if (tabBtns[i].id == e.target.id) {
			tabPanels[tabPanelID].classList.remove("hidden");
			tabBtns[i].removeAttribute("tabindex");
			tabBtns[i].setAttribute("aria-selected", "true");
			tabBtns[i].parentNode.classList.add("selectedTab");

			// Focus on the active panel to announce it to screen readers
			tabPanels[tabPanelID].focus();
		} else {
			tabPanels[tabBtns[i].id.replace("Btn", "Panel")].classList.add("hidden");
			tabBtns[i].setAttribute("tabindex", "-1");
			tabBtns[i].setAttribute("aria-selected", "false");
			tabBtns[i].parentNode.classList.remove("selectedTab");
		}
	}
}
} // End of selectTab



