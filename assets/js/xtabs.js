// Xtabs class

const xTabs = class {

    options = {
        tabBgColor: "var(--bg-color)",
        tabHoverBgColor: "var(--fg-color)",
        tabActiveBgColor: "var(--primary-color)",
        tabTextColor: "var(--primary-color)",
        tabHoverTextColor: "var(--bg-color)",
        tabActiveTextColor: "var(--bg-color)",

        containerBgColor: "var(--bg-color)",

        type: "linear",

        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
    };

    tabOptions = {
        containerBgColor: "var(--bg-color)",
        containerTextColor: "var(--primary-color)",
        constainerScroll: "y"/* x, y, both */
    };

    constructor(options = {}) {
        Object.assign(this.options, options);
        this.container = xjs.withnew(xjs.htmlElements.panel, "xTabs").setStyle({
            overflow: "hidden",
            height: this.options.height,
            width: this.options.width,
            position: "relative",
            left: this.options.left,
            top: this.options.top,
            backgroundColor: this.options.containerBgColor,
        });
        this.tabs = [];
        this.containers = [];

        return this;
    }

    addTab(name, options = {}) {
        this.#create(name, options);

        return this;
    }

    #create(name, options = {}) {
        const self = this;

        let tabOptions = Object.assign({}, this.tabOptions, options);

        const tab = xjs.withnew(xjs.htmlElements.button, name + "_tab").setHTML(name).setStyle({
            lineHeight: "20px", fontWeight: "bold", marginLeft: (this.tabs.length > 0 ? "10px" : "20px"), width: "50px",
            border: "1px solid var(--primary-color)", borderBottom: "none", borderTopLeftRadius: "4px", borderTopRightRadius: "4px",
            backgroundColor: this.options.tabActiveBgColor, color: this.options.tabActiveTextColor,
            cursor: "pointer"
        });
        if (this.tabs.length > 0) {
            tab.setStyles({
                backgroundColor: this.options.tabBgColor,
                color: this.options.tabTextColor
            });
        }

        tab.bindEvent("click", function () {
            self.selectTab(self.tabs.indexOf(tab));
        });

        const container = xjs.withnew(xjs.htmlElements.panel, name + "_container")
            .setStyles({
                width: "100%", height: "100%", padding: "10px",
                backgroundColor: tabOptions.containerBgColor, color: tabOptions.containerTextColor,
                borderTop: "1px solid var(--primary-color)"
            });
        if (tabOptions.constainerScroll == "y") {
            container.setStyles({ overflowY: "auto" });
        } else if (tabOptions.constainerScroll == "x") {
            container.setStyles({ overflowX: "auto" });
        } else if (tabOptions.constainerScroll == "both") {
            container.setStyles({ overflow: "auto" });
        }

        if (this.tabs.length > 0) {
            container.setStyle({ display: "none" });
        }

        this.container.append(tab);
        this.container.append(container);

        this.tabs.push(tab);
        this.containers.push(container);
    }

    selectTab(index) {
        if (index < 0 || index >= this.tabs.length) {
            return;
        }

        this.tabs.forEach((tab, i) => {
            if (i == index) {
                tab.bgColor(this.options.tabActiveBgColor).setStyle({ color: this.options.tabActiveTextColor });
                xjs.with(this.containers[i]).setStyle({ display: "" });
            } else {
                tab.bgColor(this.options.tabBgColor).setStyle({ color: this.options.tabTextColor });
                xjs.with(this.containers[i]).setStyle({ display: "none" });
            }
        });
    }
};