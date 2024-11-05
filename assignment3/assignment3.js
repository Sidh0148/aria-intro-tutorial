// Define the Tabs class
class Tabs {
    constructor(groupNode) {
        this.tablistNode = groupNode;
        this.tabs = Array.from(this.tablistNode.querySelectorAll(".tabBtn"));
        this.tabPanels = [];

        // Initialize the first and last tab references
        this.firstTab = this.tabs[0];
        this.lastTab = this.tabs[this.tabs.length - 1];

        // Set up each tab and its corresponding panel
        this.tabs.forEach(tab => {
            const tabPanel = document.getElementById(tab.getAttribute('aria-controls'));
            tab.tabIndex = -1;
            tab.setAttribute('aria-selected', 'false');
            tabPanel.setAttribute('role', 'tabpanel'); // Adding role for accessibility
            this.tabPanels.push(tabPanel);

            // Event listeners for keyboard and click events
            tab.addEventListener("keydown", this.onKeydown.bind(this));
            tab.addEventListener("click", this.onClick.bind(this));
        });

        this.setSelectedTab(this.firstTab); // Set the initial selected tab
    }

    setSelectedTab(currentTab) {
        this.tabs.forEach((tab, index) => {
            const tabPanel = this.tabPanels[index];
            if (currentTab === tab) {
                tab.setAttribute('aria-selected', 'true');
                tab.removeAttribute('tabindex');
                tabPanel.classList.remove("hidden");
            } else {
                tab.setAttribute('aria-selected', 'false');
                tab.tabIndex = -1;
                tabPanel.classList.add("hidden");
            }
        });
    }

    moveFocusToTab(currentTab) {
        currentTab.focus();
    }

    moveFocusToPreviousTab(currentTab) {
        const index = this.tabs.indexOf(currentTab);
        const prevTab = index === 0 ? this.lastTab : this.tabs[index - 1];
        this.moveFocusToTab(prevTab);
    }

    moveFocusToNextTab(currentTab) {
        const index = this.tabs.indexOf(currentTab);
        const nextTab = index === this.lastTab ? this.firstTab : this.tabs[index + 1];
        this.moveFocusToTab(nextTab);
    }

    // EVENT HANDLERS
    onKeydown(event) {
        const tgt = event.currentTarget;

        switch (event.key) {
            case 'ArrowLeft':
                this.moveFocusToPreviousTab(tgt);
                event.preventDefault(); // Prevent scrolling
                break;

            case 'ArrowRight':
                this.moveFocusToNextTab(tgt);
                event.preventDefault(); // Prevent scrolling
                break;

            case 'Home':
                this.moveFocusToTab(this.firstTab);
                event.preventDefault(); // Prevent scrolling
                break;

            case 'End':
                this.moveFocusToTab(this.lastTab);
                event.preventDefault(); // Prevent scrolling
                break;

            case 'Enter':
            case ' ':
                this.setSelectedTab(tgt);
                event.preventDefault(); // Prevent form submission or scrolling
                break;

            default:
                break;
        }
    }

    onClick(event) {
        this.setSelectedTab(event.currentTarget);
    }
}

// Initialize the tabs on window load
window.addEventListener('load', () => {
    const tablists = document.querySelectorAll('[role=tablist].manual');
    tablists.forEach(tablist => new Tabs(tablist));
});


