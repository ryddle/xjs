class XJSSelect extends HTMLElement {

    constructor() {
        super();
        this.connected = false;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.options = [];
        this.width = null;
        this['border-color'] = null;
        this['focus-color'] = null;
        this['arrow-color'] = null;

        let style = document.createElement('style');
        style.textContent = `
            *,
            *::before,
            *::after {
                box-sizing: border-box;
            }

            :host {
                --xjs-select-border: #777;
                --xjs-select-focus: blue;
                --xjs-select-arrow: #777;
            }

            select {
                /* A reset of styles, including removing the default dropdown arrow */
                appearance: none;
                background-color: transparent;
                border: none;
                padding: 0 1em 0 0;
                margin: 0;
                width: 100%;
                font-family: inherit;
                font-size: inherit;
                cursor: inherit;
                line-height: inherit;

                /* Stack above custom arrow */
                z-index: 1;

                /* Remove dropdown arrow in IE10 & IE11
                 * @link https://www.filamentgroup.com/lab/select-css.html
                 */
                &::-ms-expand {
                    display: none;
                }

                /* Remove focus outline, will add on alternate element */
                outline: none;
            }

            .select {
                display: grid;
                grid-template-areas: "select";
                align-items: center;
                position: relative;

                select,
                &::after {
                    grid-area: select;
                }

                /* min-width: 15ch;
                max-width: 30ch; */
                width: fit-content;

                border: 1px solid var(--xjs-select-border);
                border-radius: 0.25em;
                padding: 0.25em 0.5em;

                font-size: 1.25rem;
                cursor: pointer;
                line-height: 1.1;

                /* Optional styles remove for transparency */
                background-color: #fff;
                /* background-image: linear-gradient(to top, #f9f9f9, #fff 33%); */

                /* Custom arrow */
                /*&:not(.select--multiple)::after {
                    content: "";
                    justify-self: end;
                    width: 0.8em;
                    height: 0.5em;
                    background-color: var(--xjs-select-arrow);
                    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
                }*/
            }

            .arrow:has(+ select[size^="1"], + select:not([size])) {
                position: fixed;
                margin-right: 0.5rem;
                content: "";
                justify-self: end;
                width: 0.8em;
                height: 0.5em;
                background-color: var(--xjs-select-arrow);
                clip-path: polygon(100% 0%, 0 0%, 50% 100%);
           }

          .arrow:has(select:not([size="1"])) {
                visibility: hidden;
                display: none;
           }

            /* Interim solution until :focus-within has better support */
            select:focus + .focus {
                position: absolute;
                top: -1px;
                left: -1px;
                right: -1px;
                bottom: -1px;
                border: 2px solid var(--xjs-select-focus);
                border-radius: inherit;
            }

            select:focus {
                outline: none;
            }

            select[multiple] {
                padding-right: 0;
                background-color: transparent;

                /*
                * Safari will not reveal an option
                * unless the select height has room to 
                * show all of it
                * Firefox and Chrome allow showing 
                * a partial option
                */
                height: 6rem;

                option {
                    white-space: normal;

                    /* Only affects Chrome */
                    outline-color: var(--xjs-select-focus);
                }

                /* 
                * Experimental - styling of selected options
                * in the multiselect
                * Not supported crossbrowser
                */
                /*  
                    &:not(:disabled) option {
                     border-radius: 12px;
                     transition: 120ms all ease-in;

                     &:checked {
                       background: linear-gradient(hsl(242, 61%, 76%), hsl(242, 61%, 71%));
                       padding-left: 0.5em;
                       color: black !important;
                     }
                   }
                */
            }

            .select--disabled {
                cursor: not-allowed;
                background-color: #eee;
                background-image: linear-gradient(to top, #ddd, #eee 33%);
            }
        `;
        this.shadow.appendChild(style);
        this.createSelectElement();
    }

    connectedCallback() {
        this.connected = true;
        if (this.width != null) this.shadow.querySelector('div').style.width = "calc(" + this.width + " + 0.8em)";
        if (this["border-color"] != null) this.shadow.styleSheets[0].cssRules[1].style.setProperty('--xjs-select-border', this['border-color']);
        if (this["focus-color"] != null) this.shadow.styleSheets[0].cssRules[1].style.setProperty('--xjs-select-focus', this['focus-color']);
        if (this["arrow-color"] != null) this.shadow.styleSheets[0].cssRules[1].style.setProperty('--xjs-select-arrow', this['arrow-color']);
    }

    static get observedAttributes() {
        return ['options', 'value', 'disabled', 'placeholder', 'style', 'size', 'width', 'arrow-color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'options') {
            this.updateSelectOptions();
        }

        if (name === 'value') {
            const select = this.shadow.querySelector('select');
            if (select) {
                select.value = newValue;
            }
        }

        if (name === 'disabled') {
            const select = this.shadow.querySelector('select');
            if (select) {
                select.disabled = newValue === 'true';
            }
        }

        if (name === 'placeholder') {
            const select = this.shadow.querySelector('select');
            if (select) {
                select.placeholder = newValue;
            }
        }

        if (name == "style") {
            const div = this.shadow.querySelector('.select');
            if (div) {
                div.style = newValue;
            }
        }

        if (name === 'size') {
            const select = this.shadow.querySelector('select');
            if (select) {
                select.size = newValue;
            }
        }

        if (name == 'width') {
            const select = this.shadow.querySelector('select');
            if (select) {
                select.style.width = newValue;
                this.shadow.querySelector('div').style.width = "calc(" + newValue + " + 0.8em)";
            }
        }

        if (name == 'arrow-color') {
            const select = this.shadow.querySelector('select');
            if (select) {
                if (this.connected) {
                    this.shadow.styleSheets[0].cssRules[1].style.setProperty('--xjs-select-arrow', newValue);
                } else {
                    this[name] = newValue;
                }

            }
        }
    }

    createSelectElement() {
        const div = document.createElement('div');
        div.className = "select";
        const arrow = xjs.withnew("div");
        arrow.className = "arrow";
        const select = document.createElement('select');
        const span = document.createElement('span');
        span.className = "focus";
        //this.shadow.appendChild(select);
        select.addEventListener('change', () => {
            this.dispatchEvent(new CustomEvent('change', { detail: select.value }));
        });

        div.appendChild(arrow);
        div.appendChild(select);
        div.appendChild(span);
        this.shadow.appendChild(div);
    }

    updateSelectOptions() {
        const select = this.shadow.querySelector('select');
        if (select) {
            select.innerHTML = '';
            const options = JSON.parse(this.getAttribute('options'));
            options.forEach((option) => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.textContent;
                select.appendChild(optionElement);
            });
        }

    }
}

customElements.define('xjs-select', XJSSelect);