/* 
my old bind version
Function.prototype.addEvent = function (method, ...args) {
    var instance = this;
    return function (event) {
        instance.call(method, event || window.event, ...args);
    }
} */

Node.prototype.appendTo = function (node) {
    node.appendChild(this);
    return this;
}

Node.prototype.prependTo = function (node) {
    node.insertBefore(this);
    return this;
}

Element.prototype.__eh = {};

Element.prototype.unbindEvent = function (evnt) {
    this.removeEventListener(evnt, this.__eh[evnt]);
    delete this.__eh[evnt];
}

Element.prototype.bindEvent = function (evnt, method, scope, ...args) {
    this.__eh[evnt] = method.bind(scope || this, ...args);
    this.addEventListener(evnt, this.__eh[evnt]);
    return this;
}

HTMLElement.prototype.delChilds = function (...elm) {
    for (let i = 0; i < elm.length; i++) {
        if (typeof elm[i] == "string") {
            this.removeChild(this.getElm(elm[i]));
        } else {
            this.removeChild(elm[i]);
        }
    }
}

HTMLElement.prototype.setAttribute = function (attribute, value) {
    Element.prototype.setAttribute.apply(this, [attribute, value]);
    return this;
}

HTMLElement.prototype.setAttributes = function (attributes) {
    if (Array.isArray(attributes)) {
        for (let i = 0; i < attributes.length; i++) {
            this.setAttribute(attributes[i][0], attributes[i][1]);
        }
    } else if (typeof attributes == "object") {
        for (const key in attributes) {
            if (Object.hasOwnProperty.call(attributes, key)) {
                const value = attributes[key];
                this.setAttribute(key, value);
            }
        }
    }
    return this;
}

HTMLElement.prototype.getProperty = function (property) {
    return this[property];
}

HTMLElement.prototype.setProperty = function (property, value) {
    this[property] = value;
    return this;
}

HTMLElement.prototype.setProperties = function (properties) {
    if (typeof properties == "object") {
        Object.assign(this, properties);
    } else if (typeof properties == "array") {
        for (let i = 0; i < properties.length; i++) {
            this[properties[i][0]] = properties[i][1];
        }
    }
    return this;
}

HTMLElement.prototype.setStyle = function (_style) {
    Object.assign(this.style, _style);
    return this;
}

HTMLElement.prototype.setStyleProperty = function (property, value) {
    this.style.setProperty(property, value);
    return this;
}

/*
 * get the style property
 * @param property the property name
 * @param format the format of the return value can be "string" or "number"
 */
HTMLElement.prototype.getStyleProperty = function (property, format) {
    if (format == "number") {
        return parseInt(this.style[property]);
    } else if (format == "string") {
        return this.style[property];
    }
}

HTMLElement.prototype.queryTypes = { ID: "id", CLASS: "class", NAME: "name", TAG: "tag" };

HTMLElement.prototype.getElm = function (elm, queryType) {
    if (queryType === undefined) {
        return document.getElementById(elm);
    } else if (queryType == this.queryTypes.NAME) {
        return this.getElementsByName(elm);
    } else if (queryType == this.queryTypes.CLASS) {
        return this.getElementsByClassName(elm);
    } else if (queryType == this.queryTypes.TAG) {
        return this.getElementsByTagName(elm);
    } else {
        return document.getElementById(elm);
    }
}

Document.prototype.getElm = function (elm, queryType) {
    if (queryType === undefined) {
        return this.getElementById(elm);
    } else if (queryType == this.queryTypes.NAME) {
        return this.getElementsByName(elm);
    } else if (queryType == this.queryTypes.CLASS) {
        return this.getElementsByClassName(elm);
    } else if (queryType == this.queryTypes.TAG) {
        return this.getElementsByTagName(elm);
    } else {
        return this.getElementById(elm);
    }
}

HTMLElement.prototype.pos = function (_x, _y, _xref, _yref) {
    if (_xref !== undefined && _xref != null) {
        if (_xref == "left") {
            this.left(_x);
        } else if (_xref == "right") {
            this.right(_x);
        }
    } else {
        this.left(_x);
    }

    if (_yref !== undefined && _yref != null) {
        if (_yref == "top") {
            this.top(_y);
        } else if (_yref == "bottom") {
            this.bottom(_y);
        }
    } else {
        this.top(_y);
    }
    return this;
}

HTMLElement.prototype.left = function (_left) {
    if (_left !== undefined) {
        this.style.setProperty("left", (typeof _left === "string" && isNaN(_left)) ? _left : _left + "px");
    } else {
        return this.style.getPropertyValue("left");
    }
    return this;
}

HTMLElement.prototype.right = function (_right) {
    if (_right !== undefined) {
        this.style.setProperty("right", (typeof _right === "string" && isNaN(_right)) ? _right : _right + "px");
    } else {
        return this.style.getPropertyValue("right");
    }
    return this;
}

HTMLElement.prototype.top = function (_top) {
    if (_top !== undefined) {
        this.style.setProperty("top", (typeof _top === "string" && isNaN(_top)) ? _top : _top + "px");
    } else {
        return this.style.getPropertyValue("top");
    }
    return this;
}

HTMLElement.prototype.bottom = function (_bottom) {
    if (_bottom !== undefined) {
        this.style.setProperty("bottom", (typeof _bottom === "string" && isNaN(_bottom)) ? _bottom : _bottom + "px");
    } else {
        return this.style.getPropertyValue("bottom");
    }
    return this;
}


HTMLElement.prototype.setSize = function (_w, _h) {
    if (_w !== undefined) {
        this.style.setProperty("width", (typeof _w === "string" && isNaN(_w)) ? _w : _w + "px");
    }

    if (_h !== undefined) {
        this.style.setProperty("height", (typeof _h === "string" && isNaN(_h)) ? _h : _h + "px");
    }

    return this;
}

//////////////////////////////////////////////////////////////////////////////

CSSStyleDeclaration.prototype.leftPos = function (_left) {
    if (_left !== undefined) {
        this.setProperty("left", (typeof _left === "string" && isNaN(_left)) ? _left : _left + "px");
    } else {
        return this.getPropertyValue("left");
    }
}

CSSStyleDeclaration.prototype.rightPos = function (_right) {
    if (_right !== undefined) {
        this.setProperty("right", (typeof _right === "string" && isNaN(_right)) ? _right : _right + "px");
    } else {
        return this.getPropertyValue("right");
    }
}

CSSStyleDeclaration.prototype.topPos = function (_top) {
    if (_top !== undefined) {
        this.setProperty("top", (typeof _top === "string" && isNaN(_top)) ? _top : _top + "px");
    } else {
        return this.getPropertyValue("top");
    }
}

CSSStyleDeclaration.prototype.bottomPos = function (_bottom) {
    if (_bottom !== undefined) {
        this.setProperty("bottom", (typeof _bottom === "string" && isNaN(_bottom)) ? _bottom : _bottom + "px");
    } else {
        return this.getPropertyValue("bottom");
    }
}


//////////////////////////////////////////////////////////////////////////////

String.prototype.asInt = function () {
    return parseInt(this);
}

String.prototype.asFloat = function () {
    return parseFloat(this);
}

String.prototype.asBool = function () {
    return (this == "true");
}

String.prototype.asHex = function () {
    return Array.from(this, (char) => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

String.prototype.fromHex = function () {
    const view = new Uint8Array((this.length / 2) * 1);
    for (let i = 0; i < this.length; i += 2) {
        view[(i / 2) | 0] = parseInt(this.substring(i, 2), 16);
    }
    return String.fromCharCode(...view);
}

String.prototype.asBase64 = function () {
    return btoa(this);
}

String.prototype.fromBase64 = function () {
    return atob(this);
}

//////////////////////////////////////////////////////////////////////////////

const setProperty = function (id, property, value) {
    document.getElementById(id)[property] = value;
}

const getProperty = function (id, property) {
    return document.getElementById(id)[property];
}

const removeProperty = function (id, property) {
    document.getElementById(id)[property] = null;
}

const setStyleProperty = function (id, property, value) {
    document.getElementById(id).style[property] = value;
}

const getStyleProperty = function (id, property) {
    return document.getElementById(id).style[property];
}

const removeStyleProperty = function (id, property) {
    document.getElementById(id).style[property] = null;
}

//////////////////////////////////////////////////////////////////////////////


class _xjs {
    //// Query ////
    getElm(id, queryType, index) {
        if (queryType === undefined) {
            return document.getElementById(id);
        } else if (queryType == this.queryTypes.NAME) {
            return (index === undefined) ? document.getElementsByName(id) : document.getElementsByName(id)[index];
        } else if (queryType == this.queryTypes.CLASS) {
            return (index === undefined) ? document.getElementsByClassName(id) : document.getElementsByClassName(id);
        } else if (queryType == this.queryTypes.TAG) {
            return (index === undefined) ? document.getElementsByTagName(id) : document.getElementsByTagName(id);
        } else {
            return document.getElementById(id);
        }
    }

    //// Function ////
    lazy(creator) {
        let res;
        let processed = false;
        return function () {
            if (processed) return res;
            res = creator.apply(this, arguments);
            processed = true;
            return res;
        };
    };

    //// Property ////
    getProperty(id, property) {
        return document.getElementById(id)[property];
    }

    setProperty(id, property, value) {
        let _elm = document.getElementById(id);
        _elm[property] = value;
        return _elm;
    }

    //// Style ////
    getStyleProperty(id, property, format) {
        if (format == "number") {
            return parseInt(document.getElementById(id).style.getPropertyValue(property));
        } else {
            return document.getElementById(id).style.getPropertyValue(property);
        }
    }

    setStyleProperty(id, property, value) {
        document.getElementById(id)
        let _elm = document.getElementById(id);
        _elm.style.setProperty(property, value);
        return _elm;
    }

    //// String ////
    toBaseAscii() {
        return normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    loremipsum(length) {
        let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id nunc non turpis ultrices aliquam. Sed id cursus velit. In hac habitasse platea dictumst. Nulla facilisi. Nulla facilisi. Nullam eget consectetur sem. Donec euismod, enim ac interdum malesuada, est nunc auctor nulla, et tincidunt nibh nisi non diam. In hac habitasse platea dictumst. Sed non metus vitae erat consectetur mattis. Etiam ut ante vel tortor ultrices condimentum. Sed bibendum, mauris id pulvinar vulputate, massa felis volutpat nunc, nec luctus nisl nibh in nunc. Sed semper, est in fermentum faucibus, mauris eros viverra nisl, nec posuere est nisi in nunc. Sed euismod, neque vel pulvinar lacinia, est nunc bibendum nisl, in ultricies nisl nunc in lacus. Sed luctus, ante ac tincidunt semper, nunc neque aliquam nulla, sed commodo nisl turpis vitae nisi. Nulla facilisi.";
        return text.substring(0, length);
    }

    //// Math ////
    array2D(r, c) { [...Array(r)].map(_ => Array(c).fill(0)); }

    array3D(r, c, d) { [...Array(r)].map(_ => Array(c).map(_ => Array(d).fill(0))); }

    array4D(r, c, d, e) { [...Array(r)].map(_ => Array(c).map(_ => Array(d).map(_ => Array(e).fill(0)))); }

    map(value, start1, stop1, start2, stop2) {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    }

    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }

    invlerp(x, y, a) {
        this.clamp((a - x) / (y - x));
    }

    range(x1, y1, x2, y2, a) {
        this.lerp(x2, y2, this.invlerp(x1, y1, a));
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    };

    logistic(x, start, end) {
        return start + (end - start) * this.sigmoid((x - start) / (end - start));
    }

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    distance2(x1, y1, x2, y2) {
        return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
    }

    angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }

    angle2(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    random(min, max) {
        if (!max) { max = min; min = 0; }
        return Math.random() * (max - min) + min;
    }

    randomInt(min, max) {
        if (!max) { max = min; min = 0; }
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    median(values) {
        if (values.length === 0) {
            throw new Error('Input array is empty');
        }

        // If array length is odd, just return the middle element.
        if (values.length % 2 != 0) {
            return values[Math.floor(values.length / 2)];
        }

        // If array length is even, return the average of the two middle elements.
        const mid = values.length / 2;
        return (values[mid - 1] + values[mid]) / 2;
    }

    //// Date ////
    formatDate(format, date) {
        if (!date) {
            date = new Date();
        }

        if (!format) {
            format = "yyyy/MM/dd hh:mm:ss";
        }

        let result = format;

        const formatItems = format.match(/([a-z]+)/ig);
        const dateItems = date.toISOString().split(/[-T:.Z]/i);
        for (let i = 0; i < formatItems.length; i++) {
            switch (formatItems[i]) {
                case "yyyy":
                    result = result.replace("yyyy", dateItems[0]);
                    break;
                case "yy":
                    result = result.replace("yy", dateItems[0].slice(-2));
                    break;
                case "MM":
                    result = result.replace("MM", dateItems[1].padStart(2, '0'));
                    break;
                case "dd":
                    result = result.replace("dd", dateItems[2].padStart(2, '0'));
                    break;
                case "hh":
                    result = result.replace("hh", dateItems[3].padStart(2, '0'));
                    break;
                case "mm":
                    result = result.replace("mm", dateItems[4].padStart(2, '0'));
                    break;
                case "ss":
                    result = result.replace("ss", dateItems[5].padStart(2, '0'));
                    break;
                default:
                    result += formatItems[i];
                    break;
            }
        }
        return result;
    }

    //// Time //
    secondsToHHMMSS(sec_num, hours = false) {
        const h = Math.floor(sec_num / 3600);
        const m = Math.floor((sec_num % 3600) / 60);
        const s = Math.floor(sec_num % 60);
        return (h > 0 || hours) ?
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` :
            `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    //// URL //
    urljoin(...args) {
        args
            .join('/')
            .replace(/[\/]+/g, '/')
            .replace(/^(.+):\//, '$1://')
            .replace(/^file:/, 'file:/')
            .replace(/\/(\?|&|#[^!])/g, '$1')
            .replace(/\?/g, '&')
            .replace('&', '?');
    }

    //// HTMLElements ////
    get htmlElements() {
        return {
            panel: "panel",
            div: "div",
            span: "span",
            inputText: "inputText",
            inputPassword: "inputPassword",
            inputCheckbox: "inputCheckbox",
            inputRadio: "inputRadio",
            inputFile: "inputFile",
            inputColor: "inputColor",
            button: "button",
            submit: "submit",
            label: "label",
            alink: "alink",
            aButton: "aButton",
            img: "img",
            table: "table",
            tr: "tr",
            td: "td",
            th: "th",
            ul: "ul",
            li: "li",
            ol: "ol",
            p: "p",
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            pre: "pre",
            br: "br",
            hr: "hr",
            img: "img",
            section: "section",
            form: "form",
            select: "select",
            option: "option",
            textarea: "textarea",
            iframe: "iframe",
            audio: "audio",
            video: "video"
        };
    }
    #htmlelements = {
        panel: this.lazy(() => document.createElement("div").setStyle({ position: "absolute", left: "100px", top: "100px", width: "100px", height: "100px" })),
        div: this.lazy(() => document.createElement("div")),
        span: this.lazy(() => document.createElement("span")),
        inputText: this.lazy(() => document.createElement("input").setProperty("type", "text")),
        inputPassword: this.lazy(() => document.createElement("input").setProperty("type", "password")),
        inputCheckbox: this.lazy(() => document.createElement("input").setProperty("type", "checkbox")),
        inputRadio: this.lazy(() => document.createElement("input").setProperty("type", "radio")),
        inputFile: this.lazy(() => document.createElement("input").setProperty("type", "file")),
        inputColor: this.lazy(() => document.createElement("input").setProperty("type", "color")),
        button: this.lazy(() => document.createElement("button").setAttribute("type", "button")),
        submit: this.lazy(() => document.createElement("button").setAttribute("type", "submit")),
        label: this.lazy(() => document.createElement("label")),
        alink: this.lazy(() => document.createElement("a").setAttribute("href", "#")),
        aButton: this.lazy(() => document.createElement("a").setAttribute("href", "javascript:void(0)")),
        img: this.lazy(() => document.createElement("img")),
        table: this.lazy(() => document.createElement("table")),
        tr: this.lazy(() => document.createElement("tr")),
        td: this.lazy(() => document.createElement("td")),
        th: this.lazy(() => document.createElement("th")),
        ul: this.lazy(() => document.createElement("ul")),
        li: this.lazy(() => document.createElement("li")),
        ol: this.lazy(() => document.createElement("ol")),
        p: this.lazy(() => document.createElement("p")),
        h1: this.lazy(() => document.createElement("h1")),
        h2: this.lazy(() => document.createElement("h2")),
        h3: this.lazy(() => document.createElement("h3")),
        h4: this.lazy(() => document.createElement("h4")),
        h5: this.lazy(() => document.createElement("h5")),
        h6: this.lazy(() => document.createElement("h6")),
        pre: this.lazy(() => document.createElement("pre")),
        br: this.lazy(() => document.createElement("br")),
        hr: this.lazy(() => document.createElement("hr")),
        img: this.lazy(() => document.createElement("img")),
        section: this.lazy(() => document.createElement("section")),
        form: this.lazy(() => document.createElement("form")),
        select: this.lazy(() => document.createElement("select")),
        option: this.lazy(() => document.createElement("option")),
        textarea: this.lazy(() => document.createElement("textarea")),
        iframe: this.lazy(() => document.createElement("iframe").setStyle({ position: "absolute", left: "0px", top: "0px", width: "0px", height: "0px" })),
        audio: this.lazy(() => document.createElement("audio")),
        video: this.lazy(() => document.createElement("video"))
    };

    get xjselements() {
        return {
            xjsSelect: "xjsSelect"
        }
    }

    #xjselements = {
        xjsSelect: this.lazy(() => document.createElement("xjs-select").setAttribute("options", JSON.stringify([
            { value: "option1", textContent: "Option 1" },
            { value: "option2", textContent: "Option 2" },
            { value: "option3", textContent: "Option 3" }
        ])))
    };

    #components = {};

    with(elm) {
        if (typeof elm == "string") {
            return this.getElm(elm);
        } else {
            return elm;
        }
    }

    withnew(htmlelm, id, name, value) {
        if (typeof htmlelm == "string") {
            let elm = (htmlelm.startsWith("xjs")) ? this.#xjselements[htmlelm]().cloneNode(true) : this.#htmlelements[htmlelm]().cloneNode(true);
            if (id) {
                elm.id = id;
            }
            if (name) {
                elm.name = name;
            }
            if (value) {
                elm.value = value;
            }
            return elm;
        }
        return null;
    }

    register(name, component) {
        this.#components[name] = component.cloneNode(true);
    }

    getComponent(name) {
        return this.#components[name].cloneNode(true);
    }
}

const xjs = new _xjs();
