let tabBtns = []; 
let tabPanels = {};
tabBtns = Array.from(document.querySelectorAll(".tabBtn"));
for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener("click", selectTab, false);
    tabBtns[i].addEventListener("keyup", focusTab, false);
}
let x = document.querySelectorAll(".tabPanel");
for (let i = 0; i < x.length; i++) {
    tabPanels[x[i].id] = x[i];
}
function focusTab(e) {
    if (e.keyCode == 39) {
        tabBtns[(tabBtns.indexOf(e.target) + 1) % 3].focus();
    } else if (e.keyCode == 37) {
        tabBtns[((tabBtns.indexOf(e.target) - 1) < 0 ? 2 : tabBtns.indexOf(e.target) - 1)].focus();
    }
}
let nextIndex = (tabBtns.indexOf(e.target) + 1) % tabBtns.length;
let prevIndex = (tabBtns.indexOf(e.target) - 1 + tabBtns.length) % tabBtns.length;
function selectTab(e) {
    let tabPanelID = e.target.id.replace("Btn", "Panel");

    for (var i = 0; i < tabBtns.length; i++) {
        if (tabBtns[i].id == e.target.id) {
            tabPanels[tabPanelID].classList.remove("hidden");
            tabBtns[i].removeAttribute("tabindex");
            tabBtns[i].parentNode.classList.add("selectedTab");

            // Uncomment this line
            // tabBtns[i].setAttribute("aria-selected", "true");
        } else {
            tabPanels[tabBtns[i].id.replace("Btn", "Panel")].classList.add("hidden");
            tabBtns[i].setAttribute("tabindex", "-1");
            tabBtns[i].parentNode.classList.remove("selectedTab");

            // Uncomment this line
            // tabBtns[i].setAttribute("aria-selected", "false");
        }
    }
}


