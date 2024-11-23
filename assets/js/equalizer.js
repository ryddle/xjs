// Equalizer class
class Equalizer {
    #css = `
        button.controls:hover {
            text-shadow: 0px 0px 15px var(--primary-color);
            box-shadow: 0 0 16px 6px var(--primary-color);
        }
        
        .settings-panel {
            max-width: 1170px;
            margin-left: auto;
            margin-right: auto;
            padding: 1em;
            display: none;
            position: absolute;
            top: 50px;
            left: 50px;
            background-color: var(--bg-comp-color);
            border: 2px solid var(--primary-color);

            form {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-gap: 20px;
            }

            .full-width {
                grid-column: 1 / 3;
            }
            
            form p {
                margin: 0;
            }

            button {
                color: var(--primary-color);
            }
        }

        input, select, textarea {
            border: 1px solid var(--bg-color);
            background-color: var(--bg-color);
            color: var(--primary-color);
        }

        select, textarea {
            width: 100%;
        }
    `;
    #filters = [30, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
    #gains = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    #ticks_marks = [
        { value: "-12", label: "-12" },
        { value: "-8", label: null },
        { value: "-4", label: null },
        { value: "0", label: "0" },
        { value: "4", label: null },
        { value: "8", label: null },
        { value: "12", label: "12" }
    ];
    eq_presets = {
        "default": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "pop": [0, 3, 2, 0, -1, 0, 1, 2, 3, 2],
        "rock": [2, 3, 1, -1, 0, 1, 2, 3, 4, 3],
        "classic": [1, 2, 0, -1, -2, 0, 1, 2, 3, 2],
        "electronic": [4, 3, 2, 0, -1, 1, 2, 3, 4, 3]
    };
    current_eq_preset = "default";
    #sliderconfig = {
        value: 0,
        min: -12,
        max: 12,
        step: 1,
        width: 10,
        height: 150,
        invert: false,
        showLabel: false,
        list: this.#ticks_marks,
        //dual_ticks: true,
        tick_mark_thumb: true,
        color: {
            trackColorBack: '#ffffff',
            trackColorOver: "var(--primary-color)",
            trackBorderColor: '#dddddd',
            thumbColor: "var(--primary-color)",
            thumbBorderColor: "#111111",
            ticksColor: "var(--primary-color)",
            labelColor: "var(--primary-color)"
        },
        callback: self.changeGain
    };
    #sliders = [];
    #eqfilters = [];
    self = null;

    constructor(parent, context, filters) {
        self = this;

        this.#filters = filters ? filters : this.#filters;

        this.container = xjs.withnew('div', 'eq_container').setClass('eq_container').setStyle({
            display: "flex",
            backgroundColor: "var(--bg-comp-color)",
            justifyContent: "space-between",
            paddingLeft: "70px",
            paddingRight: "20px",
        });

        this.eq_preset_btn_container = xjs.withnew('div', 'eq_preset_btn_container').setClass('eq_preset_btn_container').setStyle({
            float: "left",
            position: "fixed",
            marginLeft: "-65px",
            marginTop: "5px"
        });

        this.eq_preset_btn = xjs.withnew('button', 'eq-preset-btn').setClass('btn btn-secondary controls')
            .setStyle({ padding: "4px" })
            .setHTML('<i class="fa fa-solid fa-bars" style="rotate: 90deg;color: var(--primary-color);"></i>')
            .appendTo(this.eq_preset_btn_container)
            .bindEvent('click', this.showEqPresets);

        this.eq_preset_btn_container.appendTo(this.container);

        this.#filters.forEach((freq, i) => {
            const eq = context.createBiquadFilter();
            eq.frequency.value = freq;
            eq.type = 'peaking';
            eq.gain.value = 0;
            this.#eqfilters.push(eq);

            let eqbandDiv = xjs.withnew('div').setClass('eqband').setStyle({
                margin: "10px",
                textAlign: "center",
                marginBottom: "1px",
                marginTop: "5px",
                color: "#fff",
                zIndex: "10"
            });

            let eqbandLabel = xjs.withnew('label').bgColor('var(--primary-color)')
                .setHTML(`${freq < 1000 ? freq : freq / 1000 + 'k'}Hz`)
                .appendTo(eqbandDiv);

            let sliderConfig = Object.assign({}, this.#sliderconfig);
            sliderConfig.container = eqbandDiv;
            sliderConfig.callback = this.changeGain;
            sliderConfig.callbackScope = this;

            let eqbandSlider = new XverticalSlider(sliderConfig);
            eqbandSlider.setAttribute("class", "equalizer");
            eqbandSlider.setAttribute("data-filter", i);
            eqbandSlider._sliderContainer.setStyle({
                display: "block",
                height: "160px",
                width: "18px"
            }).setStyle("-webkit-appearanch", "slider-vertical");

            let eqbandOutput = document.createElement('output');
            eqbandOutput.style.color = 'var(--primary-color)';
            eqbandOutput.id = 'gain' + i;
            eqbandOutput.innerHTML = '0 dB';
            eqbandDiv.appendChild(eqbandOutput);

            this.#sliders.push(eqbandSlider);

            this.container.appendChild(eqbandDiv);
        });


        const eqPresetsPanel = xjs.withnew(xjs.htmlElements.panel, "eq-presets-panel")
            .setClass("settings-panel")
            .setStyle({ left: "49px", top: "1025px", zIndex: "999", display: "none", backgroundColor: "var(--bg-color)", width: "", height: "" })
            .append(
                xjs.withnew(xjs.htmlElements.div)
                    .setClass("wrapper")
                    .setStyle({ width: "200px" })
                    .append(
                        xjs.withnew(xjs.htmlElements.button, "eq-presets-panel-close-btn")
                            .setClass("btn btn-secondary controls")
                            .setStyle({ margin: "0px", padding: "2px", float: "right" })
                            .setHTML('<i class="fa fa-times"></i>')
                            .bindEvent('click', () => xjs.with("eq-presets-panel").setStyle({ display: "none" }))
                    )
                    .append(
                        xjs.withnew(xjs.htmlElements.div)
                            .setStyle({ padding: "0px" })
                            .append(
                                xjs.withnew(xjs.htmlElements.div)
                                    .setStyle({ display: "flex", alignItems: "start", justifyContent: "space-between", height: "50px" })
                                    .append(
                                        xjs.withnew(xjs.htmlElements.span)
                                            .setStyle({ fontSize: "22px", fontWeight: "bold", color: "var(--primary-color)" })
                                            .setText("Eq. Presets")
                                    )
                            )
                            .append(
                                xjs.withnew(xjs.htmlElements.form)
                                    .append(
                                        xjs.withnew(xjs.htmlElements.p)
                                            .setClass("full-width")
                                            .setStyle({ display: "inline-flex", alignItems: "center" })
                                            .append(
                                                xjs.withnew(xjs.htmlElements.select, "eq-preset")
                                                    .setAttribute("name", "eq-preset")
                                                    .setAttribute("size", "5")
                                                    .setClass("sized")
                                                    .append(
                                                        (() => {
                                                            let options = [];
                                                            Object.keys(this.eq_presets).forEach((key, i) => {
                                                                options.push(xjs.withnew(xjs.htmlElements.option).setAttribute("value", key).setText(key));
                                                            });
                                                            return options;
                                                        })()
                                                    ).bindEvent("change", self.applyEqPreset, self)
                                            )
                                    )
                                    /* .append(
                                        xjs.withnew(xjs.htmlElements.p)
                                            .setClass("full-width")
                                            .append(
                                                xjs.withnew(xjs.htmlElements.button, "apply-eq-preset-btn")
                                                    .setAttribute("type", "button")
                                                    .setClass("btn btn-secondary controls")
                                                    .setStyle({ float: "right", margin: "0px" })
                                                    .setText("Ok")
                                                    .bindEvent("click", self.applyEqPreset, self)
                                            )
                                    ) */
                            )
                    )
            ).appendTo(document.body);

        xjs.withcss(this.#css);

        this.container.appendTo(parent ? parent : document.body);
    }

    getFilters() {
        return this.#eqfilters;
    }

    showEqPresets(event) {
        xjs.with('eq-preset').value = this.current_eq_preset;
        let eqpresetspanel = xjs.with('eq-presets-panel');
        eqpresetspanel.pos((event.clientX + 15), (event.clientY - 150));
        eqpresetspanel.style.display = (eqpresetspanel.style.display == 'block') ? 'none' : 'block';
    }

    applyEqPreset() {
        let preset = xjs.with('eq-preset').value;
        var eq = this.eq_presets[preset];
        this.current_eq_preset = preset;
        /* forEach(this.#sliders, (slider, i) => {
            slider.self.setValue(eq[i]);
        }); */
        Object.values(this.#sliders).forEach((slider, i) => {
            slider.setValue(eq[i]);
        });
    }

    changeGain(target) {
        const value = parseFloat(target.value),
            nbFilter = target.dataset.filter,
            output = document.querySelector('#gain' + nbFilter);

        this.#eqfilters[nbFilter].gain.value = value;
        output.value = (value > 0 ? '+' : '') + value + ' dB';
    }
}