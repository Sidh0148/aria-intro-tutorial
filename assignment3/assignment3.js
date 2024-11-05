class Tabs {
    constructor(tablistNode) {
        this.tablistNode = tablistNode;
        this.tabBtns = Array.from(this.tablistNode.querySelectorAll(".tabBtn"));
        this.tabPanels = {};

        // Initialize tab panels
        this.tabBtns.forEach(tabBtn => {
            const panelId = tabBtn.getAttribute('aria-controls');
            this.tabPanels[panelId] = document.getElementById(panelId);
            tabBtn.setAttribute('tabindex', '-1'); // Set initial tabindex
            tabBtn.setAttribute('aria-selected', 'false');

            // Attach event listeners
            tabBtn.addEventListener("click", this.selectTab.bind(this));
            tabBtn.addEventListener("keyup", this.focusTab.bind(this));
        });

        this.setSelectedTab(this.tabBtns[0]); // Set the first tab as selected by default
    }

    setSelectedTab(currentTab) {
        this.tabBtns.forEach((tabBtn, index) => {
            const panelId = tabBtn.getAttribute('aria-controls');
            const panel = this.tabPanels[panelId];

            if (tabBtn === currentTab) {
                tabBtn.setAttribute('aria-selected', 'true');
                tabBtn.removeAttribute("tabindex");
                panel.classList.remove("hidden");
            } else {
                tabBtn.setAttribute('aria-selected', 'false');
                tabBtn.setAttribute("tabindex", "-1");
                panel.classList.add("hidden");
            }
        });
    }

    focusTab(event) {
        const currentTab = event.target;

        if (event.keyCode === 39) { // Right arrow
            const nextIndex = (this.tabBtns.indexOf(currentTab) + 1) % this.tabBtns.length;
            this.tabBtns[nextIndex].focus();
        } else if (event.keyCode === 37) { // Left arrow
            const prevIndex = (this.tabBtns.indexOf(currentTab) - 1 + this.tabBtns.length) % this.tabBtns.length;
            this.tabBtns[prevIndex].focus();
        } else if (event.key === 'Enter' || event.key === ' ') { // Enter or Space
            this.selectTab(event);
        }
    }

    selectTab(event) {
        const selectedTab = event.currentTarget;
        this.setSelectedTab(selectedTab);
    }
}

// Initialize the Tabs on window load
window.addEventListener('load', () => {
    const tablists = document.querySelectorAll('[role="tablist"]');
    tablists.forEach(tablist => new Tabs(tablist));
});


