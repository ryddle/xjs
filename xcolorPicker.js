class xcolorPicker {
    #copyIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#454545"></path> </g></svg>';
    #gridIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C9.65685 1 11 2.34315 11 4V8C11 9.65685 9.65685 11 8 11H4C2.34315 11 1 9.65685 1 8V4C1 2.34315 2.34315 1 4 1H8ZM8 3C8.55228 3 9 3.44772 9 4V8C9 8.55228 8.55228 9 8 9H4C3.44772 9 3 8.55228 3 8V4C3 3.44772 3.44772 3 4 3H8Z" fill="#0F0F0F"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 13C9.65685 13 11 14.3431 11 16V20C11 21.6569 9.65685 23 8 23H4C2.34315 23 1 21.6569 1 20V16C1 14.3431 2.34315 13 4 13H8ZM8 15C8.55228 15 9 15.4477 9 16V20C9 20.5523 8.55228 21 8 21H4C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H8Z" fill="#0F0F0F"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H16C14.3431 1 13 2.34315 13 4V8C13 9.65685 14.3431 11 16 11H20C21.6569 11 23 9.65685 23 8V4ZM21 4C21 3.44772 20.5523 3 20 3H16C15.4477 3 15 3.44772 15 4V8C15 8.55228 15.4477 9 16 9H20C20.5523 9 21 8.55228 21 8V4Z" fill="#0F0F0F"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20 13C21.6569 13 23 14.3431 23 16V20C23 21.6569 21.6569 23 20 23H16C14.3431 23 13 21.6569 13 20V16C13 14.3431 14.3431 13 16 13H20ZM20 15C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 20.5523 15 20V16C15 15.4477 15.4477 15 16 15H20Z" fill="#0F0F0F"/></svg>';
    #listIcon = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 6C9 4.34315 7.65685 3 6 3H4C2.34315 3 1 4.34315 1 6V8C1 9.65685 2.34315 11 4 11H6C7.65685 11 9 9.65685 9 8V6ZM7 6C7 5.44772 6.55228 5 6 5H4C3.44772 5 3 5.44772 3 6V8C3 8.55228 3.44772 9 4 9H6C6.55228 9 7 8.55228 7 8V6Z" fill="#0F0F0F"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9 16C9 14.3431 7.65685 13 6 13H4C2.34315 13 1 14.3431 1 16V18C1 19.6569 2.34315 21 4 21H6C7.65685 21 9 19.6569 9 18V16ZM7 16C7 15.4477 6.55228 15 6 15H4C3.44772 15 3 15.4477 3 16V18C3 18.5523 3.44772 19 4 19H6C6.55228 19 7 18.5523 7 18V16Z" fill="#0F0F0F"/><path d="M11 7C11 6.44772 11.4477 6 12 6H22C22.5523 6 23 6.44772 23 7C23 7.55228 22.5523 8 22 8H12C11.4477 8 11 7.55228 11 7Z" fill="#0F0F0F"/><path d="M11 17C11 16.4477 11.4477 16 12 16H22C22.5523 16 23 16.4477 23 17C23 17.5523 22.5523 18 22 18H12C11.4477 18 11 17.5523 11 17Z" fill="#0F0F0F"/></svg>';

    constructor(event, colorCode) {
        this.color = xcolor.getXcolor('#ff0000');
        this.htmlcolor = { name: "", value: "" };

        if (colorCode !== undefined) {
            this.color = xcolor.getXcolor(colorCode);
        }

        this.tabcontentStyle = {
            display: 'none',
            padding: '6px 12px',
            border: '1px solid #ccc',
            borderTop: 'none'
        };

        this.tabActiveStyle = {
            backgroundColor: '#eee',
            float: 'left',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease 0s',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'rgb(70 70 70)',
            height: '22px',
            marginTop: '30px',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            border: '1px solid #ccc'
        };


        this.tabStyle = {
            backgroundColor: 'inherit',
            float: 'left',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease 0s',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'rgb(68, 68, 68)',
            height: '20px',
            marginTop: '32px',
            borderTop: '1px solid #eee',
            borderRight: '1px solid #eee'
        };

        this.#createColorForms();

        this.#createColorPickerPanel(event);

        this.#updateRgbForm();
        this.#updateRgbPickers();
        this.#updateHslForm();
        this.#updateHslPickers();
        this.#updateHsbForm();
        this.#updateHsbPickers();
        this.#updateHtmlForm();

        return this.colorPickerDialog;
    }

    #createInputColorElm(id, type, label, value, params = {}) {
        if (!xjs.hasComponent("inputColorElmForm")) {
            const labelsStyle = {
                fontFamily: 'monospace',
                fontSize: '1.2em'
            };
            const inputsStyle = {
                width: "60px",
                fontFamily: 'monospace',
                fontSize: '1.2em',
                marginBottom: '10px',
                textAlign: 'right'
            };

            let inputColorElmForm = xjs.withnew(xjs.htmlElements.div)
                .setStyle({ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' });

            let inputColorElmLabel = xjs.withnew(xjs.htmlElements.label)
                .setText(label)
                .setAttribute("for", id)
                .setStyle(labelsStyle);

            let inputColorElm = xjs.withnew(xjs.htmlElements.input[type], id, null, value)
                .setAttributes({ "min": params.min || "0", "max": params.max || "100" })
                .setStyle(inputsStyle);

            if (params.style !== undefined && typeof params.style === 'object') {
                Object.assign(inputColorElm.style, params.style);
            }

            xjs.registerComponent("inputColorElmForm", inputColorElmForm);
            xjs.registerComponent("inputColorElmLabel", inputColorElmLabel);
            xjs.registerComponent("inputColorElm", inputColorElm);

            return { form: inputColorElmForm, label: inputColorElmLabel, input: inputColorElm };
        } else {
            let inputColorElmLabel = xjs.getComponent("inputColorElmLabel").setAttribute("for", id).setText(label);
            let inputColorElm = xjs.getComponent("inputColorElm")
                .setStyle(params.style)
                .setAttributes({"type": type,"id": id, "value": value, "min": params.min || "0", "max": params.max || "100" });
            return { form: xjs.getComponent("inputColorElmForm"), label: inputColorElmLabel, input: inputColorElm };
        }
    }

    #createSlider() {
        let slider01 = xjs.withnew(xjs.htmlElements.div).setAttribute("class", "IroSlider")
            .setStyle({ position: "relative", width: "350px", height: "44px", borderRadius: "22px", overflow: "visible", display: "block", marginTop: "12px" });

        let slider02 = xjs.withnew(xjs.htmlElements.panel).setAttribute("class", "IroSliderGradient")
            .setStyle({ top: "0px", left: "0px", width: "100%", height: "100%", borderRadius: "22px", boxSizing: "border-box", border: "4px solid rgb(255, 255, 255)" });

        return { slider01: slider01, slider02: slider02 };
    }

    #createCircle(left, top) {
        let _circleOut = xjs.withnew(xjs.htmlElements.panel)
            .setStyle({
                border: '2px solid #444',
                borderRadius: '13px',
                willChange: 'transform',
                top: top + 'px',
                left: left + 'px',
                width: '24px',
                height: '24px',
                overflow: 'visible'
            });

        xjs.withnew(xjs.htmlElements.panel)
            .setStyle({
                border: '2px solid rgb(255, 255, 255)',
                borderRadius: '12px',
                top: '0px',
                left: '0px',
                width: '20px',
                height: '20px',
                overflow: 'visible'
            })
            .appendTo(_circleOut);

        return _circleOut;
    }

    #createCopyButton(copyElm) {
        let _copyButton = xjs.withnew(xjs.htmlElements.button)
            .setProperty("innerHTML", this.#copyIcon)
            .setStyle({ width: '24px', height: '24px', padding: '0px' })
            .bindEvent("click", function () {
                navigator.clipboard.writeText(copyElm.value);
            });

        return _copyButton;
    }

    #createFormPanel() {
        /// form panel
        let _formPanel = document.createElement("div")
            .setStyle({
                padding: '5px',
                float: "right",
                width: "220px",
                height: "520px",
                backgroundColor: "rgb(241, 241, 241)",
                border: "1px solid #ccc",
                borderRadius: "4px"
            });

        return _formPanel;
    }

    #createFormPanelColor() {
        let _formPanelColor = xjs.withnew(xjs.htmlElements.div)
            .setStyle({
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: this.color.getRgbString(),
                height: "50px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "10px"
            });

        return _formPanelColor;
    }

    #createColorForms() {
        let _self = this;
        /// rgb form
        // red
        let _rgbRedForm = this.#createInputColorElm("rgbRed", "number", "Red", this.color.rgb.r, { min: 0, max: 255 });
        this.rgbRedForm = _rgbRedForm.form;
        this.rgbRedLabel = _rgbRedForm.label;
        this.rgbRedInput = _rgbRedForm.input;
        this.rgbRedInput.onchange = function () {
            _self.color = xcolor.getRgb(this.value, _self.color.rgb.g, _self.color.rgb.b);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.rgbRedForm.appendChild(this.rgbRedLabel);
        this.rgbRedForm.appendChild(this.rgbRedInput);
        // green
        let _rgbGreenForm = this.#createInputColorElm("rgbGreen", "number", "Green", this.color.rgb.g, { min: 0, max: 255 });
        this.rgbGreenForm = _rgbGreenForm.form;
        this.rgbGreenLabel = _rgbGreenForm.label;
        this.rgbGreenInput = _rgbGreenForm.input;
        this.rgbGreenInput.onchange = function () {
            _self.color = xcolor.getRgb(_self.color.rgb.r, this.value, _self.color.rgb.b);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.rgbGreenForm.appendChild(this.rgbGreenLabel);
        this.rgbGreenForm.appendChild(this.rgbGreenInput);
        // blue
        let _rgbBlueForm = this.#createInputColorElm("rgbBlue", "number", "Blue", this.color.rgb.b, { min: 0, max: 255 });
        this.rgbBlueForm = _rgbBlueForm.form;
        this.rgbBlueLabel = _rgbBlueForm.label;
        this.rgbBlueInput = _rgbBlueForm.input;
        this.rgbBlueInput.onchange = function () {
            _self.color = xcolor.getRgb(_self.color.rgb.r, _self.color.rgb.g, this.value);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.rgbBlueForm.appendChild(this.rgbBlueLabel);
        this.rgbBlueForm.appendChild(this.rgbBlueInput);
        // rgb
        let _rgbRgbForm = this.#createInputColorElm("rgbRgb", "text", "RGB", this.color.getRgbString(), { style: { width: '160px', marginTop: '10px', textAlign: 'left' } });
        this.rgbRgbForm = _rgbRgbForm.form;
        this.rgbRgbLabel = _rgbRgbForm.label;
        this.rgbRgbInput = _rgbRgbForm.input;
        this.rgbRgbInput.onchange = function () {
            _self.color = xcolor.getXcolor(this.value);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.copyIconRgb = this.#createCopyButton(this.rgbRgbInput);

        this.rgbRgbForm.appendChild(this.rgbRgbLabel);
        this.rgbRgbForm.appendChild(this.rgbRgbInput);
        this.rgbRgbForm.appendChild(this.copyIconRgb);
        ////////////////////////////////////////////////////////////////////////////////////////
        /// hex form
        // red
        let _hexRedForm = this.#createInputColorElm("hexRed", "text", "Red", this.color.hex.r);
        this.hexRedForm = _hexRedForm.form;
        this.hexRedLabel = _hexRedForm.label;
        this.hexRedInput = _hexRedForm.input;
        this.hexRedInput.onchange = function () {
            _self.color = xcolor.getXcolor('#' + this.value + _self.color.hex.g + _self.color.hex.b);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.hexRedForm.appendChild(this.hexRedLabel);
        this.hexRedForm.appendChild(this.hexRedInput);
        // green
        let _hexGreenForm = this.#createInputColorElm("hexGreen", "text", "Green", this.color.hex.g);
        this.hexGreenForm = _hexGreenForm.form;
        this.hexGreenLabel = _hexGreenForm.label;
        this.hexGreenInput = _hexGreenForm.input;
        this.hexGreenInput.onchange = function () {
            _self.color = xcolor.getXcolor('#' + _self.color.hex.r + this.value + _self.color.hex.b);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.hexGreenForm.appendChild(this.hexGreenLabel);
        this.hexGreenForm.appendChild(this.hexGreenInput);
        // blue
        let _hexBlueForm = this.#createInputColorElm("hexBlue", "text", "Blue", this.color.hex.b);
        this.hexBlueForm = _hexBlueForm.form;
        this.hexBlueLabel = _hexBlueForm.label;
        this.hexBlueInput = _hexBlueForm.input;
        this.hexBlueInput.onchange = function () {
            _self.color = xcolor.getXcolor('#' + _self.color.hex.r + _self.color.hex.g + this.value);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.hexBlueForm.appendChild(this.hexBlueLabel);
        this.hexBlueForm.appendChild(this.hexBlueInput);
        // hex
        let _hexHexForm = this.#createInputColorElm("hexHex", "text", "HEX", this.color.getRgbString(), { style: { width: '160px', marginTop: '10px', textAlign: 'left' } });
        this.hexHexForm = _hexHexForm.form;
        this.hexHexLabel = _hexHexForm.label;
        this.hexHexInput = _hexHexForm.input;
        this.hexHexInput.onchange = function () {
            _self.color = xcolor.getXcolor(this.value);
            _self.rgbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateRgbForm();
            _self.#updateRgbPickers();
        };
        this.copyIconHex = this.#createCopyButton(this.hexHexInput);

        this.hexHexForm.appendChild(this.hexHexLabel);
        this.hexHexForm.appendChild(this.hexHexInput);
        this.hexHexForm.appendChild(this.copyIconHex);
        ////////////////////////////////////////////////////////////////////////////////////////
        /// hsl form
        // hue
        let _hslHueForm = this.#createInputColorElm("hslHue", "number", "Hue", this.color.hsl.h, { min: 0, max: 360 });
        this.hslHueForm = _hslHueForm.form;
        this.hslHueLabel = _hslHueForm.label;
        this.hslHueInput = _hslHueForm.input;
        this.hslHueInput.onchange = function () {
            _self.color = xcolor.getHsl(this.value, _self.color.hsl.s, _self.color.hsl.l);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.hslHueForm.appendChild(this.hslHueLabel);
        this.hslHueForm.appendChild(this.hslHueInput);
        // sat
        let _hslSatForm = this.#createInputColorElm("hslSat", "number", "Sat", this.color.hsl.s);
        this.hslSatForm = _hslSatForm.form;
        this.hslSatLabel = _hslSatForm.label;
        this.hslSatInput = _hslSatForm.input;
        this.hslSatInput.onchange = function () {
            _self.color = xcolor.getHsl(_self.color.hsl.h, this.value, _self.color.hsl.l);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.hslSatForm.appendChild(this.hslSatLabel);
        this.hslSatForm.appendChild(this.hslSatInput);
        // light
        let _hslLightForm = this.#createInputColorElm("hslLight", "number", "Light", this.color.hsl.l);
        this.hslLightForm = _hslLightForm.form;
        this.hslLightLabel = _hslLightForm.label;
        this.hslLightInput = _hslLightForm.input;
        this.hslLightInput.onchange = function () {
            _self.color = xcolor.getHsl(_self.color.hsl.h, _self.color.hsl.s, this.value);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.hslLightForm.appendChild(this.hslLightLabel);
        this.hslLightForm.appendChild(this.hslLightInput);
        // hsl
        let _hslHslForm = this.#createInputColorElm("hslHsl", "text", "HSL", this.color.getRgbString(), { style: { width: '160px', marginTop: '10px', textAlign: 'left' } });
        this.hslHslForm = _hslHslForm.form;
        this.hslHslLabel = _hslHslForm.label;
        this.hslHslInput = _hslHslForm.input;
        this.hslHslInput.onchange = function () {
            _self.color = xcolor.getXcolor(this.value);
            _self.hslWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHslForm();
            _self.#updateHslPickers();
        };
        this.copyIconHsl = this.#createCopyButton(this.hslHslInput);

        this.hslHslForm.appendChild(this.hslHslLabel);
        this.hslHslForm.appendChild(this.hslHslInput);
        this.hslHslForm.appendChild(this.copyIconHsl);
        ////////////////////////////////////////////////////////////////////////////////////////
        /// hsb form
        // hue
        let _hsbHueForm = this.#createInputColorElm("hsbHue", "number", "Hue", this.color.hsb.h, { min: 0, max: 360 });
        this.hsbHueForm = _hsbHueForm.form;
        this.hsbHueLabel = _hsbHueForm.label;
        this.hsbHueInput = _hsbHueForm.input;
        this.hsbHueInput.onchange = function () {
            _self.color = xcolor.getHsb(this.value, _self.color.hsb.s, _self.color.hsb.b);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.hsbHueForm.appendChild(this.hsbHueLabel);
        this.hsbHueForm.appendChild(this.hsbHueInput);
        // sat
        let _hsbSatForm = this.#createInputColorElm("hsbSat", "number", "Sat", this.color.hsb.s);
        this.hsbSatForm = _hsbSatForm.form;
        this.hsbSatLabel = _hsbSatForm.label;
        this.hsbSatInput = _hsbSatForm.input;
        this.hsbSatInput.onchange = function () {
            _self.color = xcolor.getHsb(_self.color.hsb.h, this.value, _self.color.hsb.b);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.hsbSatForm.appendChild(this.hsbSatLabel);
        this.hsbSatForm.appendChild(this.hsbSatInput);
        // bright
        let _hsbBrightForm = this.#createInputColorElm("hsbBright", "number", "Bright", this.color.hsb.b);
        this.hsbBrightForm = _hsbBrightForm.form;
        this.hsbBrightLabel = _hsbBrightForm.label;
        this.hsbBrightInput = _hsbBrightForm.input;
        this.hsbBrightInput.onchange = function () {
            _self.color = xcolor.getHsb(_self.color.hsb.h, _self.color.hsb.s, this.value);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.hsbBrightForm.appendChild(this.hsbBrightLabel);
        this.hsbBrightForm.appendChild(this.hsbBrightInput);
        // hsb
        let _hsbHsbForm = this.#createInputColorElm("hsbHsb", "text", "HSB", this.color.getRgbString(), { style: { width: '160px', marginTop: '10px', textAlign: 'left' } });
        this.hsbHsbForm = _hsbHsbForm.form;
        this.hsbHsbLabel = _hsbHsbForm.label;
        this.hsbHsbInput = _hsbHsbForm.input;
        this.hsbHsbInput.onchange = function () {
            _self.color = xcolor.getXcolor(this.value);
            _self.hsbWheelPanel.style.backgroundColor = _self.color.getRgbString();
            _self.#updateHsbForm();
            _self.#updateHsbPickers();
        };
        this.copyIconHsb = this.#createCopyButton(this.hsbHsbInput);

        this.hsbHsbForm.appendChild(this.hsbHsbLabel);
        this.hsbHsbForm.appendChild(this.hsbHsbInput);
        this.hsbHsbForm.appendChild(this.copyIconHsb);
        ////////////////////////////////////////////////////////////////////////////////////////
    }

    #openTab(evt, tab) {
        for (let i = 0; i < this.tabcontents.length; i++) {
            this.tabcontents[i].style.display = "none";
            this.tablinks[i].style.backgroundColor = "inherit";
            Object.assign(this.tablinks[i].style, this.tabStyle);
        }
        var tabcontent = this.tabcontents.find(element => element.id == tab.tabPanel);
        tabcontent.style.display = "block";
        tab.className += " active";
        Object.assign(tab.style, this.tabActiveStyle);
    }

    #calculateWheelColor(event) {
        var cx = 175;
        var cy = 175;

        var angle = angleFor(cx, cy, event.layerX, event.layerY);
        var distance = distFor(cx, cy, event.layerX, event.layerY);

        return { angle: angle, distance: distance };
    }

    #updateRgbForm() {
        this.rgbRedInput.value = this.color.rgb.r;
        this.rgbGreenInput.value = this.color.rgb.g;
        this.rgbBlueInput.value = this.color.rgb.b;

        this.hexRedInput.value = this.color.hex.r.toUpperCase();
        this.hexGreenInput.value = this.color.hex.g.toUpperCase();
        this.hexBlueInput.value = this.color.hex.b.toUpperCase();

        this.rgbRgbInput.value = this.color.getRgbString();
        this.hexHexInput.value = this.color.getHexString().toUpperCase();

        this.rgbFormPanelColor.style.backgroundColor = this.color.getRgbString();
    }

    #updateRgbPickers() {
        let wx = map(this.color.hsb.s, 0, 100, 0, 322);
        let wy = map(this.color.hsb.b, 0, 100, 322, 0);

        this.rgbWheelSliderCircleOut.left(wx);
        this.rgbWheelSliderCircleOut.top(wy);

        this.rgbHueSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsb.h, 0, 360, 8, 315))));

        this.rgbSaturationSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsb.s, 0, 100, 8, 315))));
        this.rgbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";

        this.rgbLightSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsb.b, 0, 100, 8, 315))));
        this.rgbLightSlider02.style.background = "linear-gradient(to right, rgb(255, 255, 255) 0%, " + this.color.getRgbString() + " 100%)";
    }

    #updateHslForm() {
        this.hslHueInput.value = this.color.hsl.h;
        this.hslSatInput.value = this.color.hsl.s;
        this.hslLightInput.value = this.color.hsl.l;

        this.hslHslInput.value = this.color.getHslString();

        this.hslFormPanelColor.style.backgroundColor = this.color.getRgbString();
    }

    #updateHslPickers() {
        let wangle = this.color.hsl.h;
        let wdistance = map(this.color.hsl.l, 0, 100, 0, 175);

        let cos = Math.cos(wangle * Math.PI / 180);
        let sin = Math.sin(wangle * Math.PI / 180);
        let wx = 175 + (cos * wdistance);
        wx = wx - (12 * (Math.max(wx, 0.01) / 175));
        let wy = 175 + (sin * wdistance);
        wy = wy - (12 * (Math.max(wy, 0.01) / 175));

        this.hslWheelSliderCircleOut.pos(wx, wy);

        this.hslSaturationSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsl.s, 0, 100, 8, 315))));
        this.hslSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";

        this.hslLightnessSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsl.l, 0, 100, 8, 315))));

        this.hslLightnessSlider02.setStyles({
            background: "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)",
            border: "4px solid " + xcolor.getHsl(0, 0, map(parseInt(this.hslLightnessSliderCircleOut.style.left), 8, 322, 100, 90)).getHexString()
        });
    }

    #updateHsbForm() {
        this.hsbHueInput.value = this.color.hsb.h;
        this.hsbSatInput.value = this.color.hsb.s;
        this.hsbBrightInput.value = this.color.hsb.b;

        this.hsbHsbInput.value = this.color.getHsbString();

        this.hsbFormPanelColor.style.backgroundColor = this.color.getRgbString();
    }

    #updateHsbPickers() {
        let wangle = this.color.hsb.h;
        let wdistance = map(this.color.hsb.b, 0, 100, 0, 175);

        let cos = Math.cos(wangle * Math.PI / 180);
        let sin = Math.sin(wangle * Math.PI / 180);
        let wx = 175 + (cos * wdistance);
        wx = wx - (12 * (Math.max(wx, 0.01) / 175));
        let wy = 175 + (sin * wdistance);
        wy = wy - (12 * (Math.max(wy, 0.01) / 175));

        this.hsbWheelSliderCircleOut.pos(wx, wy);

        this.hsbSaturationSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsb.s, 0, 100, 8, 315))));
        this.hsbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hsbBrightnessSliderCircleOut.left(Math.max(8, Math.min(315, map(this.color.hsb.b, 0, 100, 8, 315))));
        this.hsbBrightnessSlider02.style.background = "linear-gradient(to right, rgb(255, 255, 255) 0%, " + this.color.getRgbString() + " 100%)";
    }

    #updateHtmlForm() {
        let htmlcolorName = Object.keys(xhtmlColors).find(name => xhtmlColors[name] === this.color.getHexString());
        if (htmlcolorName) {
            this.htmlcolor = { name: htmlcolorName, color: xhtmlColors[htmlcolorName] };
            this.labelhcHtml.innerText = this.htmlcolor.name;
            this.hcformPanelColor.style.backgroundColor = this.htmlcolor.color;
            this.copyIconhcHtml.style.display = "inherit";
        } else {
            this.htmlcolor = { name: '', color: '' };
            this.labelhcHtml.innerText = "";
            this.hcformPanelColor.style.backgroundColor = this.color.getHexString();
            this.copyIconhcHtml.style.display = "none";
        }

        this.hcRgbInput.value = this.color.getRgbString();
        this.hcHexInput.value = this.color.getHexString();
        this.hcHslInput.value = this.color.getHslString();
        this.hcHsbInput.value = this.color.getHsbString();
    }

    /**
     * Creates a color picker panel component
     * @return {HTMLDivElement} the color picker panel element
     */
    #createColorPickerPanel(event) {
        let _self = this;

        this.colorPickerDialog = xjs.withnew(xjs.htmlElements.dialog, "favDialog")
            .setStyle({ width: '672px', height: '672px', padding: '0px', border: '0px' });

        this.colorPickerForm = xjs.withnew(xjs.htmlElements.form)
            .setAttribute("method", "dialog")
            .appendTo(this.colorPickerDialog);

        this.colorPickerPanel = xjs.withnew(xjs.htmlElements.div, "colorPickerPanel")
            .setStyle({
                width: '650px',
                height: '650px',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                border: '1px solid gray',
                borderRadius: '3px',
                backgroundColor: 'white'
            })
            .appendTo(this.colorPickerForm);

        this.tabPanel = xjs.withnew(xjs.htmlElements.div)
            .setClass("tab")
            .setStyle({
                padding: '0px 0px 0px 0px !important',
                overflow: 'hidden',
                border: '1px solid #ccc',
                backgroundColor: '#f1f1f1'
            });

        this.rgbTab = xjs.withnew(xjs.htmlElements.button)
            .setClass("tablinks active")
            .setProperty("tabPanel", "rgbPanel")
            .setText("RGB/HEX")
            .setStyle(this.tabActiveStyle)
            .bindEvent("click", function (event) {
                this.#updateRgbForm();
                this.#updateRgbPickers();
                this.#openTab(event, this.rgbTab);
            }, this)
            .appendTo(this.tabPanel);

        this.hslTab = xjs.withnew(xjs.htmlElements.button)
            .setClass("tablinks")
            .setProperty("tabPanel", "hslPanel")
            .setText("HSL")
            .setStyle(this.tabStyle)
            .bindEvent("click", function (event) {
                _self.#updateHslForm();
                _self.#updateHslPickers();
                _self.#openTab(event, this.hslTab);
            }, this)
            .appendTo(this.tabPanel);

        this.hsbTab = xjs.withnew(xjs.htmlElements.button)
            .setClass("tablinks")
            .setProperty("tabPanel", "hsbPanel")
            .setText("HSB")
            .setStyle(this.tabStyle)
            .bindEvent("click", function (event) {
                _self.#updateHsbForm();
                _self.#updateHsbPickers();
                _self.#openTab(event, this.hsbTab);
            }, this)
            .appendTo(this.tabPanel);

        this.htmlTab = xjs.withnew(xjs.htmlElements.button)
            .setClass("tablinks")
            .setProperty("tabPanel", "htmlPanel")
            .setText("HTML")
            .setStyle(this.tabStyle)
            .bindEvent("click", function (event) {
                _self.#updateHtmlForm();
                _self.#openTab(event, this.htmlTab);
            }, this)
            .appendTo(this.tabPanel);

        this.tablinks = [this.rgbTab, this.hslTab, this.hsbTab, this.htmlTab];
        for (var i = 0; i < this.tablinks.length; i++) {
            this.tablinks[i].onmouseover = function () {
                (this.className.indexOf("active") == -1) ? this.style.backgroundColor = "#ddd" : this.style.backgroundColor = "#ccc";
            };

            this.tablinks[i].onmouseout = function () {
                (this.className.indexOf("active") == -1) ? this.style.backgroundColor = "inherit" : this.style.backgroundColor = "#ccc";
            };
        }

        this.closeBtnPanel = xjs.withnew(xjs.htmlElements.div)
            .setStyle({
                float: "right",
                width: "24px",
                height: "24px",
                margin: "2px"
            });

        this.closeBtn = xjs.withnew(xjs.htmlElements.button)
            .setText("X")
            .setStyle({
                width: "24px",
                height: "24px",
                padding: "0px",
                fontWeight: "900",
                color: "#353535",
                borderRadius: "3px"
            })
            .bindEvent("click", function () {
                this.colorPickerDialog.close();
            }, this)
            .appendTo(this.closeBtnPanel);

        this.tabPanel.appendChild(this.closeBtnPanel);

        this.colorPickerPanel.appendChild(this.tabPanel);

        this.tabcontents = [];

        this.colorPickerPanel.appendChild(this.#createRgbPanel(true));
        this.colorPickerPanel.appendChild(this.#createHslPanel(false));
        this.colorPickerPanel.appendChild(this.#createHsbPanel(false));
        this.colorPickerPanel.appendChild(this.#createHtmlPanel(false));

        this.divCmdButtons = xjs.withnew(xjs.htmlElements.div)
            .setStyle({
                width: "100%",
                height: "50px",
                alignContent: "end"
            });

        this.acceptBtn = xjs.withnew(xjs.htmlElements.button)
            .setText("Accept")
            .setStyle({
                float: "right",
            })
            .bindEvent("click", function () {
                this.acceptBtn.focus();
                this.colorPickerDialog.returnValue = _self.color.getHexString();
                this.colorPickerDialog.close();
            }, this)
            .appendTo(this.divCmdButtons);

        this.colorPickerPanel.appendChild(this.divCmdButtons);

        return this.colorPickerPanel;
    }

    #createRgbPanel(isActive) {
        let _self = this;

        this.rgbPanel = xjs.withnew(xjs.htmlElements.div, "rgbPanel")
            .setClass("tabcontent")
            .setStyle(this.tabcontentStyle);
        if (isActive) {
            this.rgbPanel.style.display = "";
            this.rgbTab.style.backgroundColor = "#ccc";
        }

        /// rgb form panel
        this.rgbFormPanel = this.#createFormPanel();
        this.rgbFormPanelColor = this.#createFormPanelColor();
        this.rgbFormPanel.appendChild(this.rgbFormPanelColor);

        ////////////RGB/////////////////////////////////

        this.rgbFormPanel.appendChild(this.rgbRedForm);
        this.rgbFormPanel.appendChild(this.rgbGreenForm);
        this.rgbFormPanel.appendChild(this.rgbBlueForm);
        this.rgbFormPanel.appendChild(this.rgbRgbForm);

        ////////////HEX/////////////////////////////////

        this.rgbFormPanel.appendChild(this.hexRedForm);
        this.rgbFormPanel.appendChild(this.hexGreenForm);
        this.rgbFormPanel.appendChild(this.hexBlueForm);
        this.rgbFormPanel.appendChild(this.hexHexForm);

        // form panel
        this.rgbPanel.appendChild(this.rgbFormPanel);

        ///////////////////////////////////////////////////

        this.rgbWheelPanelContainer = xjs.withnew(xjs.htmlElements.div)
            .setClass("IroColorPicker")
            .setStyle({
                display: 'block'
            });

        this.rgbWheelPanel = xjs.withnew(xjs.htmlElements.div)
            .setClass("IroWheel")
            .setStyle({
                width: '350px',
                height: '350px',
                position: 'relative',
                overflow: 'visible',
                display: 'block',
                backgroundColor: xcolor.getHsb(this.color.hsb.h, 100, 100).getRgbString()
            })
            .bindEvent("click", function (event) {
                if (event.target.className == "") return;
                let x = event.layerX - 13;
                let y = event.layerY - 13;

                this.rgbWheelSliderCircleOut.pos(x, y);

                this.rgbSaturationSliderCircleOut.left(Math.max(8, Math.min(315, (map(x, 0, 350, 8, 315)))));
                this.rgbLightSliderCircleOut.left(Math.max(8, Math.min(315, map(y, 0, 350, 315, 8))));

                this.color = xcolor.getHsb(this.color.hsb.h, map(this.rgbSaturationSliderCircleOut.left(), 8, 315, 0, 100), map(this.rgbLightSliderCircleOut.left(), 8, 315, 0, 100));
                // @ts-nocheck
                this.#updateRgbForm();

                // @ts-ignore
                this.#updateRgbPickers();
            }, this);

        this.rgbWheelPanel = xjs.withnew(xjs.htmlElements.div)
            .setClass("IroWheel")
            .setStyle({
                width: '350px',
                height: '350px',
                position: 'relative',
                overflow: 'visible',
                display: 'block',
                backgroundColor: xcolor.getHsb(this.color.hsb.h, 100, 100).getRgbString()
            })
            .bindEvent("click", function (event) {
                if (event.target.className == "") return;
                let x = event.layerX - 13;
                let y = event.layerY - 13;

                this.rgbWheelSliderCircleOut.pos(x, y);

                this.rgbSaturationSliderCircleOut.left(Math.max(8, Math.min(315, (map(x, 0, 350, 8, 315)))));
                this.rgbLightSliderCircleOut.left(Math.max(8, Math.min(315, map(y, 0, 350, 315, 8))));

                this.color = xcolor.getHsb(this.color.hsb.h, map(this.rgbSaturationSliderCircleOut.left(), 8, 315, 0, 100), map(this.rgbLightSliderCircleOut.left(), 8, 315, 0, 100));
                // @ts-nocheck
                this.#updateRgbForm();

                // @ts-ignore
                this.#updateRgbPickers();
            }, this);

        this.rgbWheelSliderCircleOut = this.#createCircle(250, 161);
        this.rgbWheelSliderCircleOut.style.zIndex = "9000";

        this.rgbWheelPanel.appendChild(this.rgbWheelSliderCircleOut);

        this.rgbWheelLight = xjs.withnew(xjs.htmlElements.panel)
            .setClass("IroWheelLight")
            .setStyle({
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                background: 'linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)'
            })
            .appendTo(this.rgbWheelPanel);

        this.rgbWheelSat = xjs.withnew(xjs.htmlElements.panel)
            .setClass("IroWheelSaturation")
            .setStyle({
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                background: 'linear-gradient(to bottom, transparent 0%, #000 100%)'
            })
            .appendTo(this.rgbWheelPanel);

        this.rgbWheelPanelContainer.appendChild(this.rgbWheelPanel);

        let hueSlider = this.#createSlider();
        this.rgbHueSlider01 = hueSlider.slider01;
        this.rgbHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.rgbHueSlider02 = hueSlider.slider02;
        this.rgbHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.rgbHueSlider02.bindEvent("click", function (e) {
            let newleft = e.layerX - 13;
            this.rgbHueSliderCircleOut.left(newleft);
            this.color = xcolor.getHsb(map(newleft, 8, 315, 0, 360), this.color.hsb.s, this.color.hsb.b);
            this.rgbWheelPanel.style.backgroundColor = xcolor.getHsb(this.color.hsb.h, 100, 100).getRgbString();
            this.#updateRgbForm();
            this.#updateRgbPickers();
        }, this).appendTo(this.rgbHueSlider01);

        this.rgbHueSliderCircleOut = this.#createCircle(315, 8);
        this.rgbHueSliderCircleOut.bindEvent("mousedown", function (e) {
            this.isDragging = true;
            this.initialPosition = { x: this.left(), y: this.top() };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        }).bindEvent("mousemove", function (e) {
            let me = e.target;
            if (me.isDragging) {
                let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                newleft = Math.max(8, Math.min(315, newleft));
                me.left(newleft);

                this.color = xcolor.getHsb(map(me.left(), 8, 315, 0, 360), this.color.hsb.s, this.color.hsb.b);
                this.rgbWheelPanel.style.backgroundColor = xcolor.getHsb(this.color.hsb.h, 100, 100).getRgbString();
                this.#updateRgbForm();
                this.#updateRgbPickers();
            }
        }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.rgbHueSlider01);

        this.rgbWheelPanelContainer.appendChild(this.rgbHueSlider01);

        let satSlider = this.#createSlider();
        this.rgbSaturationSlider01 = satSlider.slider01;
        this.rgbSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.rgbSaturationSlider02 = satSlider.slider02;
        this.rgbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.rgbSaturationSlider02.bindEvent("click", function (e) {
            let newleft = e.layerX - 13;
            this.rgbSaturationSliderCircleOut.left(newleft);
            this.color = xcolor.getHsb(_self.color.hsb.h, map(newleft, 8, 315, 0, 100), this.color.hsb.b);
            this.#updateRgbForm();
            this.#updateRgbPickers();
        }, this).appendTo(this.rgbSaturationSlider01);

        this.rgbSaturationSliderCircleOut = this.#createCircle(315, 8);
        this.rgbSaturationSliderCircleOut.bindEvent("mousedown", function (e) {
            this.isDragging = true;
            this.initialPosition = { x: this.left(), y: this.top() };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (me.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsb(this.color.hsb.h, map(me.left(), 8, 315, 0, 100), this.color.hsb.b);
                    this.#updateRgbForm();
                    this.#updateRgbPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.rgbSaturationSlider01);

        this.rgbWheelPanelContainer.appendChild(this.rgbSaturationSlider01);

        let lightSlider = this.#createSlider();
        this.rgbLightSlider01 = lightSlider.slider01;
        this.rgbLightSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.rgbLightSlider02 = lightSlider.slider02;
        this.rgbLightSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.rgbLightSlider02.bindEvent("click", function (e) {
            let newleft = e.layerX - 13;
            this.rgbLightSliderCircleOut.left(newleft);
            this.color = xcolor.getHsb(this.color.hsb.h, this.color.hsb.s, map(newleft, 8, 315, 0, 100));
            this.#updateRgbForm();
            this.#updateRgbPickers();
        }, this).appendTo(this.rgbLightSlider01);

        this.rgbLightSliderCircleOut = this.#createCircle(315, 8);
        this.rgbLightSliderCircleOut.bindEvent("mousedown", function (e) {
            this.isDragging = true;
            this.initialPosition = { x: this.left(), y: this.top() };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (me.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsb(this.color.hsb.h, this.color.hsb.s, map(me.left(), 8, 315, 0, 100));
                    this.#updateRgbForm();
                    this.#updateRgbPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.rgbLightSlider01);

        this.rgbWheelPanelContainer.appendChild(this.rgbLightSlider01);
        /////////////////////////////////////////////////////

        this.rgbPanel.appendChild(this.rgbWheelPanelContainer);

        this.tabcontents.push(this.rgbPanel);

        return this.rgbPanel;
    }

    #createHslPanel(isActive) {
        let _self = this;

        this.hslPanel = xjs.withnew("div", "hslPanel")
            .setClass("tabcontent")
            .setStyle(this.tabcontentStyle);

        if (isActive) {
            this.hslPanel.style.display = "";
            this.hslTab.style.backgroundColor = "#ccc";
        }

        /// hsl form panel
        this.hslFormPanel = this.#createFormPanel();
        this.hslFormPanelColor = this.#createFormPanelColor();
        this.hslFormPanel.appendChild(this.hslFormPanelColor);

        ////////////HSL/////////////////////////////////

        this.hslFormPanel.appendChild(this.hslHueForm);
        this.hslFormPanel.appendChild(this.hslSatForm);
        this.hslFormPanel.appendChild(this.hslLightForm);
        this.hslFormPanel.appendChild(this.hslHslForm);

        // form panel
        this.hslPanel.appendChild(this.hslFormPanel);

        ///////////////////////////////////////////////////
        this.hslWheelPanelContainer = xjs.withnew("div")
            .setClass("IroColorPicker")
            .setStyleProperty("display", "block");

        this.hslWheelPanel = xjs.withnew("div")
            .setClass("IroWheel")
            .setStyle({
                width: "350px",
                height: "350px",
                position: "relative",
                overflow: "visible",
                display: "block"
            }).bindEvent("click", function (event) {
                if (event.target.className == "") return;
                let data = this.#calculateWheelColor(event);
                this.hslWheelSliderCircleOut.pos(event.layerX - 13, event.layerY - 13);

                this.hslHueSliderCircleOut.left(Math.max(8, Math.min(315, (map(data.angle, 0, 360, 8, 315)))));
                this.hslLightnessSliderCircleOut.left(Math.max(8, Math.min(315, map(data.distance, 0, 175, 8, 315))));

                this.color = xcolor.getHsl(data.angle, this.color.hsl.s, map(data.distance, 0, 175, 0, 100));
                this.#updateHslForm();
                this.#updateHslPickers();
            }, this);

        this.hslWheelSliderCircleOut = this.#createCircle(250, 161);
        this.hslWheelSliderCircleOut.style.zIndex = "9000";

        this.hslWheelPanel.appendChild(this.hslWheelSliderCircleOut);

        this.hslWheelHue = xjs.withnew(xjs.htmlElements.panel)
            .setClass("IroWheelHue")
            .setStyle({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxSizing: "border-box",
                transform: "rotateZ(90deg)",
                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
            }).appendTo(this.hslWheelPanel);

        this.hslWheelSat = xjs.withnew(xjs.htmlElements.panel)
            .setClass("IroWheelSaturation")
            .setStyle({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxSizing: "border-box",
                background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 40%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%)"
            }).appendTo(this.hslWheelPanel);

        this.hslWheelBorder = xjs.withnew(xjs.htmlElements.panel)
            .setClass("IroWheelBorder")
            .setStyle({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxSizing: "border-box",
                border: "4px solid rgb(255, 255, 255)"
            }).appendTo(this.hslWheelPanel);

        this.hslWheelPanelContainer.appendChild(this.hslWheelPanel);

        let hueSlider = this.#createSlider();
        this.hslHueSlider01 = hueSlider.slider01;
        this.hslHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hslHueSlider02 = hueSlider.slider02;
        this.hslHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.hslHueSlider02
            .bindEvent("click", function (e) {
                let newleft = e.layerX - 13;
                this.hslHueSliderCircleOut.left(newleft);
                this.color = xcolor.getHsl(map(newleft, 8, 315, 0, 360), this.color.hsl.s, this.color.hsl.l);
                this.#updateHslForm();
                this.#updateHslPickers();
            }, this)
            .appendTo(this.hslHueSlider01);

        this.hslHueSliderCircleOut = this.#createCircle(315, 8);
        this.hslHueSliderCircleOut
            .bindEvent("mousedown", function (e) {
                this.isDragging = true;
                this.initialPosition = { x: this.left(), y: this.top() };
                this.initDragPosition = { x: e.clientX, y: e.clientY };
            })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (me.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsl(map(me.left(), 8, 315, 0, 360), this.color.hsl.s, this.color.hsl.l);
                    this.#updateHslForm();
                    this.#updateHslPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.hslHueSlider01);

        this.hslWheelPanelContainer.appendChild(this.hslHueSlider01);

        let satSlider = this.#createSlider();
        this.hslSaturationSlider01 = satSlider.slider01;
        this.hslSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hslSaturationSlider02 = satSlider.slider02;
        this.hslSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hslSaturationSlider02
            .bindEvent("click", function (e) {
                let newleft = e.layerX - 13;
                this.hslSaturationSliderCircleOut.left(newleft);
                this.color = xcolor.getHsl(this.color.hsl.h, map(newleft, 8, 315, 0, 100), this.color.hsl.l);
                this.#updateHslForm();
                this.#updateHslPickers();
            }, this)
            .appendTo(this.hslSaturationSlider01);

        this.hslSaturationSliderCircleOut = this.#createCircle(315, 8);
        this.hslSaturationSliderCircleOut
            .bindEvent("mousedown", function (e) {
                this.isDragging = true;
                this.initialPosition = { x: this.left(), y: this.top() };
                this.initDragPosition = { x: e.clientX, y: e.clientY };
            })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (me.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsl(this.color.hsl.h, map(me.left(), 8, 315, 0, 100), this.color.hsl.l);
                    this.#updateHslForm();
                    this.#updateHslPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.hslSaturationSlider01);

        this.hslWheelPanelContainer.appendChild(this.hslSaturationSlider01);

        let lightSlider = this.#createSlider();
        this.hslLightnessSlider01 = lightSlider.slider01;
        this.hslLightnessSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hslLightnessSlider02 = lightSlider.slider02;
        this.hslLightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.hslLightnessSlider02
            .bindEvent("click", function (e) {
                let newleft = e.layerX - 13;
                this.hslLightnessSliderCircleOut.left(newleft);
                this.color = xcolor.getHsl(this.color.hsl.h, this.color.hsl.s, map(newleft, 8, 315, 0, 100));
                this.#updateHslForm();
                this.#updateHslPickers();
            }, this)
            .appendTo(this.hslLightnessSlider01);

        this.hslLightnessSliderCircleOut = this.#createCircle(154, 8);
        this.hslLightnessSliderCircleOut
            .bindEvent("mousedown", function (e) {
                this.isDragging = true;
                this.initialPosition = { x: this.left(), y: this.top() };
                this.initDragPosition = { x: e.clientX, y: e.clientY };
            })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (me.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsl(this.color.hsl.h, this.color.hsl.s, map(me.left(), 8, 315, 0, 100));
                    this.#updateHslForm();
                    this.#updateHslPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.hslLightnessSlider01);

        this.hslWheelPanelContainer.appendChild(this.hslLightnessSlider01);
        /////////////////////////////////////////////////////

        this.hslPanel.appendChild(this.hslWheelPanelContainer);

        this.tabcontents.push(this.hslPanel);

        return this.hslPanel;
    }

    #createHsbPanel(isActive) {
        let _self = this;

        this.hsbPanel = xjs.withnew("div", "hsbPanel")
            .setClass("tabcontent")
            .setStyle(this.tabcontentStyle);
        if (isActive) {
            this.style.display = "";
            this.hsbTab.style.backgroundColor = "#ccc";
        }

        /// hsl form panel
        this.hsbFormPanel = this.#createFormPanel();
        this.hsbFormPanelColor = this.#createFormPanelColor();
        this.hsbFormPanel.appendChild(this.hsbFormPanelColor);

        ////////////HSL/////////////////////////////////

        this.hsbFormPanel.appendChild(this.hsbHueForm);
        this.hsbFormPanel.appendChild(this.hsbSatForm);
        this.hsbFormPanel.appendChild(this.hsbBrightForm);
        this.hsbFormPanel.appendChild(this.hsbHsbForm);

        // form panel
        this.hsbPanel.appendChild(this.hsbFormPanel);

        ///////////////////////////////////////////////////

        this.hsbWheelPanelContainer = xjs.withnew("div")
            .setClass("IroColorPicker")
            .setStyle({
                display: "block"
            });

        this.hsbWheelPanel = xjs.withnew("div")
            .setClass("IroWheel")
            .setStyle({
                width: "350px",
                height: "350px",
                position: "relative",
                overflow: "visible",
                display: "block"
            }).bindEvent("click", function (event) {
                if (event.target.className == "") return;
                let data = _self.#calculateWheelColor(event);
                this.hsbWheelSliderCircleOut.pos(event.layerX - 13, event.layerY - 13);

                this.hsbHueSliderCircleOut.left(Math.max(8, Math.min(315, (map(data.angle, 0, 360, 8, 315)))));
                this.hsbBrightnessSliderCircleOut.left(Math.max(8, Math.min(315, map(data.distance, 0, 175, 8, 315))));

                this.color = xcolor.getHsl(data.angle, this.color.hsb.s, map(data.distance, 0, 175, 0, 100));
                this.#updateHsbForm();
                this.#updateHsbPickers();
            }, this);

        this.hsbWheelSliderCircleOut = this.#createCircle(250, 161);
        this.hsbWheelSliderCircleOut.style.zIndex = "9000";

        this.hsbWheelPanel.appendChild(this.hsbWheelSliderCircleOut);

        this.hsbWheelHue = xjs.withnew("panel")
            .setClass("IroWheelHue")
            .setStyle({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxSizing: "border-box",
                transform: "rotateZ(90deg)",
                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
            }).appendTo(this.hsbWheelPanel);

        this.hsbWheelSat = xjs.withnew("panel")
            .setClass("IroWheelSaturation")
            .setStyle({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxSizing: "border-box",
                background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 10%, transparent 20%, transparent 40%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,1) 100%)"
            }).appendTo(this.hsbWheelPanel);

        this.hsbWheelBorder = xjs.withnew("panel")
            .setClass("IroWheelBorder")
            .setStyle({
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                boxSizing: "border-box",
                border: "4px solid rgb(255, 255, 255)"
            }).appendTo(this.hsbWheelPanel);

        this.hsbWheelPanelContainer.appendChild(this.hsbWheelPanel);

        let hueSlider = this.#createSlider();
        this.hsbHueSlider01 = hueSlider.slider01;
        this.hsbHueSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hsbHueSlider02 = hueSlider.slider02;
        this.hsbHueSlider02.style.background = "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 16.666%, rgb(0, 255, 0) 33.333%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 66.666%, rgb(255, 0, 255) 83.333%, rgb(255, 0, 0) 100%)";
        this.hsbHueSlider02
            .bindEvent("click", function (e) {
                let newleft = e.layerX - 13;
                this.hsbHueSliderCircleOut.left(newleft);
                this.color = xcolor.getHsb(map(newleft, 8, 315, 0, 360), this.color.hsb.s, this.color.hsb.b);
                this.#updateHsbForm();
                this.#updateHsbPickers();
            }, this)
            .appendTo(this.hsbHueSlider01);

        this.hsbHueSliderCircleOut = this.#createCircle(315, 8);
        this.hsbHueSliderCircleOut.bindEvent("mousedown", function (e) {
            this.isDragging = true;
            this.initialPosition = { x: this.left(), y: this.top() };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (me.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsb(map(me.left(), 8, 315, 0, 360), this.color.hsb.s, this.color.hsb.b);
                    this.#updateHsbForm();
                    this.#updateHsbPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.hsbHueSlider01);

        this.hsbWheelPanelContainer.appendChild(this.hsbHueSlider01);

        let satSlider = this.#createSlider();
        this.hsbSaturationSlider01 = satSlider.slider01;
        this.hsbSaturationSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";//"conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hsbSaturationSlider02 = satSlider.slider02;
        this.hsbSaturationSlider02.style.background = "linear-gradient(to right, rgb(0, 0, 0) 0%, " + this.color.getRgbString() + " 100%)";
        this.hsbSaturationSlider02.bindEvent("click", function (e) {
            let newleft = e.layerX - 13;
            this.hsbSaturationSliderCircleOut.left(newleft);
            this.color = xcolor.getHsb(this.color.hsb.h, map(newleft, 8, 315, 0, 100), this.color.hsb.b);
            this.#updateHsbForm();
            this.#updateHsbPickers();
        }, this)
            .appendTo(this.hsbSaturationSlider01);

        this.hsbSaturationSliderCircleOut = this.#createCircle(315, 8);
        this.hsbSaturationSliderCircleOut.bindEvent("mousedown", function (e) {
            this.isDragging = true;
            this.initialPosition = { x: this.left(), y: this.top() };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (this.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsb(this.color.hsb.h, map(me.left(), 8, 315, 0, 100), this.color.hsb.b);
                    this.#updateHsbForm();
                    this.#updateHsbPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.hsbSaturationSlider01);

        this.hsbWheelPanelContainer.appendChild(this.hsbSaturationSlider01);

        let brightSlider = this.#createSlider();
        this.hsbBrightnessSlider01 = brightSlider.slider01;
        this.hsbBrightnessSlider01.style.background = "conic-gradient(rgb(204, 204, 204) 25%, rgb(255, 255, 255) 0deg, rgb(255, 255, 255) 50%, rgb(204, 204, 204) 0deg, rgb(204, 204, 204) 75%, rgb(255, 255, 255) 0deg) 0% 0% / 8px 8px";

        this.hsbBrightnessSlider02 = brightSlider.slider02;
        this.hsbBrightnessSlider02.style.background = "linear-gradient(to right, " + this.color.getRgbString() + " 0%, rgb(255, 255, 255) 100%)";
        this.hsbBrightnessSlider02.bindEvent("click", function (e) {
            let newleft = e.layerX - 13;
            this.hsbBrightnessSliderCircleOut.left(newleft);
            this.color = xcolor.getHsb(this.color.hsb.h, this.color.hsb.s, map(newleft, 8, 315, 0, 100));
            this.#updateHsbForm();
            this.#updateHsbPickers();
        }, this)
            .appendTo(this.hsbBrightnessSlider01);

        this.hsbBrightnessSliderCircleOut = this.#createCircle(315, 8);
        this.hsbBrightnessSliderCircleOut.bindEvent("mousedown", function (e) {
            this.isDragging = true;
            this.initialPosition = { x: this.left(), y: this.top() };
            this.initDragPosition = { x: e.clientX, y: e.clientY };
        })
            .bindEvent("mousemove", function (e) {
                let me = e.target;
                if (this.isDragging) {
                    let newleft = (e.clientX > me.initDragPosition.x) ? me.initialPosition.x + (e.clientX - me.initDragPosition.x) : me.initialPosition.x - (me.initDragPosition.x - e.clientX);
                    newleft = Math.max(8, Math.min(315, newleft));
                    me.left(newleft);

                    this.color = xcolor.getHsb(this.color.hsb.h, this.color.hsb.s, map(me.left(), 8, 315, 0, 100));
                    this.#updateHsbForm();
                    this.#updateHsbPickers();
                }
            }, this)
            .bindEvent("mouseup", function (e) {
                this.isDragging = false;
                this.initialPosition = { x: this.left(), y: this.top() };
            })
            .appendTo(this.hsbBrightnessSlider01);

        this.hsbWheelPanelContainer.appendChild(this.hsbBrightnessSlider01);
        /////////////////////////////////////////////////////

        this.hsbPanel.appendChild(this.hsbWheelPanelContainer);

        this.tabcontents.push(this.hsbPanel);

        return this.hsbPanel;
    }

    #createHtmlPanel(isActive) {
        let _self = this;

        this.htmlPanel = xjs.withnew("div", "htmlPanel")
            .setClass("tabcontent")
            .setStyle(this.tabcontentStyle);
        if (isActive) {
            this.htmlPanel.style.display = "";
            this.htmlTab.style.backgroundColor = "#ccc";
        }

        /// rgb form panel
        this.hcFormPanel = this.#createFormPanel();
        this.hcformPanelColor = this.#createFormPanelColor();
        this.hcFormPanel.appendChild(this.hcformPanelColor);

        this.hcformHTML = xjs.withnew("div")
            .setStyle({
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontFamily: 'monospace'
            });

        this.labelhcHtml = xjs.withnew("label")
            .setStyle({
                fontFamily: 'monospace',
                fontSize: '1.2em'
            })
            .setAttribute("for", "rgbStr")
            .setText(this.htmlcolor != null ? this.htmlcolor.value : "")
            .appendTo(this.hcformHTML);

        this.copyIconhcHtml = xjs.withnew("button")
            .setStyle({
                width: '24px',
                height: '24px',
                padding: '0px'
            })
            .setHTML(this.#copyIcon)
            .bindEvent("click", function () { navigator.clipboard.writeText(_self.labelhcHtml.innerText); }, this)
            .appendTo(this.hcformHTML);

        this.hcFormPanel.appendChild(this.hcformHTML);

        this.hcRgbForm = (function () { let _rgbRgbForm = this.rgbRgbForm.cloneNode(true); _rgbRgbForm.childNodes[1].disabled = true; _rgbRgbForm.childNodes[1].style.backgroundColor = 'white'; return _rgbRgbForm; }).call(this);
        this.hcHexForm = (function () { let _hexHexForm = this.hexHexForm.cloneNode(true); _hexHexForm.childNodes[1].disabled = true; _hexHexForm.childNodes[1].style.backgroundColor = 'white'; return _hexHexForm; }).call(this);
        this.hcHslForm = (function () { let _hslHslForm = this.hslHslForm.cloneNode(true); _hslHslForm.childNodes[1].disabled = true; _hslHslForm.childNodes[1].style.backgroundColor = 'white'; return _hslHslForm; }).call(this);
        this.hcHsbForm = (function () { let _hsbHsbForm = this.hsbHsbForm.cloneNode(true); _hsbHsbForm.childNodes[1].disabled = true; _hsbHsbForm.childNodes[1].style.backgroundColor = 'white'; return _hsbHsbForm; }).call(this);

        this.hcRgbInput = this.hcRgbForm.childNodes[1];
        this.hcHexInput = this.hcHexForm.childNodes[1];
        this.hcHslInput = this.hcHslForm.childNodes[1];
        this.hcHsbInput = this.hcHsbForm.childNodes[1];

        this.hcFormPanel.appendChild(this.hcRgbForm);
        this.hcFormPanel.appendChild(this.hcHexForm);
        this.hcFormPanel.appendChild(this.hcHslForm);
        this.hcFormPanel.appendChild(this.hcHsbForm);

        this.htmlPanel.appendChild(this.hcFormPanel);

        /////////////////HTML COLORS///////////////////////

        this.htmlBoardPanel = xjs.withnew("div")
            .setStyle({
                padding: '5px',
                float: "left",
                width: "360px",
                height: "520px",
                backgroundColor: "rgb(241, 241, 241)",
                border: "1px solid #ccc",
                borderRadius: "4px"
            });

        this.htmlSearchPanel = xjs.withnew("div")
            .setStyle({
                marginBottom: "10px"
            });

        this.htmlInputSearch = xjs.withnew(xjs.htmlElements.input.text)
            .setAttribute("value", "")
            .setAttribute("placeholder", "search color")
            .bindEvent("keyup", function () {
                let search = this.value.toLowerCase();
                if (this.htmlBtnResetLayout.mode == "box") {
                    let boxes = document.getElementsByClassName("htmlBoxColor");
                    for (let i = 0; i < boxes.length; i++) {
                        let title = boxes[i].title.toLowerCase();
                        if (title.includes(search)) {
                            boxes[i].style.visibility = "visible";
                        } else {
                            boxes[i].style.visibility = "hidden";
                        }
                    }
                } else if (this.htmlBtnResetLayout.mode == "list") {
                    let lists = document.getElementsByClassName("htmlListColor");
                    for (let i = 0; i < lists.length; i++) {
                        let title = lists[i].title.toLowerCase();
                        if (title.includes(search)) {
                            lists[i].style.display = "";
                        } else {
                            lists[i].style.display = "none";
                        }
                    }
                }
            }, this)
            .appendTo(this.htmlSearchPanel);

        this.htmlBtnResetSearch = xjs.withnew(xjs.htmlElements.button)
            .setText("Reset")
            .bindEvent("click", function () {
                this.htmlInputSearch.value = "";
                this.htmlInputSearch.onkeyup();
            }, this)
            .appendTo(this.htmlSearchPanel);

        this.htmlBtnResetLayout = xjs.withnew(xjs.htmlElements.button)
            .setProperty("modes", "box,list")
            .setProperty("mode", "box")
            .setHTML(this.#listIcon)
            .setStyle({
                float: 'right',
                width: '24px',
                height: '24px',
                padding: '0px'
            })
            .bindEvent("click", function () {
                if (this.mode === "box") {
                    this.htmlBoxPanel.style.display = "none";
                    this.htmlListPanel.style.display = "block";
                    this.mode = "list";
                    this.innerHTML = this.#gridIcon;
                } else if (this.mode === "list") {
                    this.htmlBoxPanel.style.display = "block";
                    this.htmlListPanel.style.display = "none";
                    this.mode = "box";
                    this.innerHTML = this.#listIcon;
                }
                this.htmlInputSearch.value = "";
                this.htmlInputSearch.onkeyup();
            }, this)
            .appendTo(this.htmlSearchPanel);

        this.htmlBoardPanel.appendChild(this.htmlSearchPanel);

        /////////List panel
        this.htmlListPanel = xjs.withnew(xjs.htmlElements.div)
            .setStyle({
                overflow: "scroll",
                height: "490px",
                display: 'none'
            });

        this.htmlListColors = xjs.withnew(xjs.htmlElements.ul)
            .setStyle({
                listStyle: 'none',
                padding: '0px',
                float: "left",
                width: "341px",
                height: "520px",
                backgroundColor: "rgb(241, 241, 241)",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: '50px'
            })
            .appendTo(this.htmlListPanel);

        this.htmlBoardPanel.appendChild(this.htmlListPanel);

        for (let i = 0; i < Object.keys(xhtmlColors).length; i++) {
            let htmlListColor = xjs.withnew(xjs.htmlElements.li)
                .setClass("htmlListColor")
                .setAttribute("title", (Object.keys(xhtmlColors)[i]));

            let htmlListBtn = xjs.withnew(xjs.htmlElements.button)
                .setAttribute("title", (Object.keys(xhtmlColors)[i]))
                .setStyle({
                    width: "341px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center"
                })
                .bindEvent("click", function () {
                    this.color = xcolor.getXcolor(this.querySelector(".htmlListBoxColor").style.backgroundColor);
                    this.htmlcolor = { name: this.title, color: this.querySelector(".htmlListBoxColor").style.backgroundColor };
                    this.#updateHtmlForm();
                    this.#updateRgbForm();
                    this.#updateRgbPickers();
                    this.#updateHslForm();
                    this.#updateHslPickers();
                    this.#updateHsbForm();
                    this.#updateHsbPickers();
                }, this);

            let htmlBoxColor = xjs.withnew(xjs.htmlElements.div)
                .setClass("htmlListBoxColor")
                .setStyle({
                    backgroundColor: xhtmlColors[(Object.keys(xhtmlColors)[i])],
                    height: "20px",
                    width: "20px",
                    marginRight: "10px"
                })
                .appendTo(htmlListBtn);

            let htmlColorName = xjs.withnew(xjs.htmlElements.div)
                .setClass("htmlColorName")
                .setText(Object.keys(xhtmlColors)[i])
                .setStyle({
                    fontFamily: "monospace"
                })
                .appendTo(htmlListBtn);

            htmlListColor.appendChild(htmlListBtn);

            this.htmlListColors.appendChild(htmlListColor);
        }


        /////Box panel
        this.htmlBoxPanel = xjs.withnew(xjs.htmlElements.div);
        /* this.htmlBoxPanel = document.createElement("div"); */

        this.htmlSectionPanel = xjs.withnew(xjs.htmlElements.section)
            .setStyle({
                display: 'grid',
                gridTemplateColumns: 'repeat(10, 1fr)',
                gridTemplateRows: 'repeat(14, 1fr)'
            })
            .appendTo(this.htmlBoxPanel);

        this.htmlBoardPanel.appendChild(this.htmlBoxPanel);

        for (let i = 0; i < Object.keys(xhtmlColors).length; i++) {
            let htmlBoxPanel = xjs.withnew(xjs.htmlElements.div)
                .setClass("htmlBoxColor")
                .setAttribute("title", (Object.keys(xhtmlColors)[i]))
                .setStyle({
                    backgroundColor: xhtmlColors[(Object.keys(xhtmlColors)[i])],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '30px'
                })
                .bindEvent("click", function (e) {
                    let me = e.target;
                    this.color = xcolor.getXcolor(me.style.backgroundColor);
                    this.htmlcolor = { name: me.title, color: me.style.backgroundColor };
                    this.#updateHtmlForm();
                    this.#updateRgbForm();
                    this.#updateRgbPickers();
                    this.#updateHslForm();
                    this.#updateHslPickers();
                    this.#updateHsbForm();
                    this.#updateHsbPickers();
                }, this)
                .appendTo(this.htmlSectionPanel);
        }

        this.htmlPanel.appendChild(this.htmlBoardPanel);

        this.tabcontents.push(this.htmlPanel);

        return this.htmlPanel;
    }

}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = xcolorPicker;
}