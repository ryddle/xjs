/*
    xjs
*/

if (typeof module !== 'undefined' && module.exports) {
    require("./xcolor.js");
}

//Window
setMediaOptions = function (options) {
    window.mediaOptions = { breakpoints: {} };
    if (options) {
        if (options.breakpoints) {
            window.mediaOptions.breakpoints = options.breakpoints;
        }
    }
};

getMediaOptions = function () {
    return window.mediaOptions;
};

//Node
Node.prototype.appendTo = function (node) {
    node.appendChild(this);
    return this;
};

Node.prototype.prependTo = function (node) {
    node.insertBefore(this);
    return this;
};

//Element
//Element.prototype.__eh = {};

Element.prototype.unbindEvent = function (evnt) {
    this.removeEventListener(evnt, this.__eh[evnt]);
    delete this.__eh[evnt];
};

Element.prototype.bindEvent = function (evnt, method, scope, ...args) {
    this.__eh = this.__eh || {};
    this.__eh[evnt] = {};
    this.__eh[evnt]['method'] = method.bind(scope || this, ...args);
    this.__eh[evnt]['targetFunction'] = method;
    this.addEventListener(evnt, this.__eh[evnt]['method']);
    return this;
};

Document.prototype.__eh = {};

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
};

Document.prototype.unbindEvent = function (evnt, scope) {
    let ehid = evnt.concat("_", method.toString().hashCode(), scope.constructor.name.hashCode());
    this.removeEventListener(evnt, this.__eh[ehid]);
    delete this.__eh[ehid];
};

Document.prototype.bindEvent = function (evnt, method, scope, ...args) {
    let ehid = evnt.concat("_", method.toString().hashCode(), scope.constructor.name.hashCode());
    this.__eh = this.__eh || {};
    this.__eh[ehid] = method.bind(scope || this, ...args);
    this.addEventListener(evnt, this.__eh[ehid]);
    return this;
};

HTMLElement.prototype._cv = function (value) {
    if (this.variables !== undefined && typeof value == "string" && value.match(/^\$\{.*\}$/)) {
        value = value.replace(/^\$\{(.*)\}$/, '$1');
        if (this.getVariable(value) !== undefined) {
            value = this.getVariable(value);
        }
    }
    return value;
};

HTMLElement.prototype.insert = function (elm, name) {
    this[name] = elm;
    this.appendChild(elm);
    return this;
};

HTMLElement.prototype.append = function (elm) {
    this.appendChild(elm);
    return this;
};

HTMLElement.prototype.appendTo = function (elm) {
    elm.appendChild(this);
    return this;
};

HTMLElement.prototype.prepend = function (elm) {
    this.insertBefore(elm);
    return this;
};

HTMLElement.prototype.clear = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
    return this;
};

HTMLElement.prototype.delChilds = function (...elm) {
    for (let i = 0; i < elm.length; i++) {
        if (typeof elm[i] == "string") {
            this.removeChild(this.getElm(elm[i]));
        } else {
            this.removeChild(elm[i]);
        }
    }
};

HTMLElement.prototype.parent = function () {
    return this.parentElement;
};

HTMLElement.prototype.getChild = function (selector) {
    //selector can be a number or tag
    if (typeof selector == "number") {
        return this.children[selector];
    }
    return this.querySelectorAll(selector);
};

HTMLElement.prototype.setAttribute = function (attribute, value) {
    value = this._cv(value);
    Element.prototype.setAttribute.apply(this, [attribute, value]);
    return this;
};

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
};

HTMLElement.prototype.getProperty = function (property) {
    return this[property];
};

HTMLElement.prototype.setProperty = function (property, value) {
    value = this._cv(value);
    this[property] = value;
    return this;
};

HTMLElement.prototype.setProperties = function (properties) {
    if (typeof properties == "object") {
        Object.assign(this, properties);
    } else if (typeof properties == "array") {
        for (let i = 0; i < properties.length; i++) {
            this[properties[i][0]] = properties[i][1];
        }
    }
    return this;
};

HTMLElement.prototype.removeProperty = function (property) {
    delete this[property];
    return this;
};

HTMLElement.prototype.getVariable = function (variable) {
    return this.variables[variable];
};

HTMLElement.prototype.setVariable = function (variable, value) {
    this.variables = this.variables || {};
    this.variables[variable] = value;
    return this;
};

HTMLElement.prototype.removeVariable = function (variable) {
    if (!this.variables) return this;
    delete this.variables[variable];
    return this;
};

HTMLElement.prototype.setVariables = function (variables) {
    this.variables = this.variables || {};
    if (typeof variables == "object") {
        Object.assign(this.variables, variables);
    } else if (typeof variables == "array") {
        for (let i = 0; i < variables.length; i++) {
            this.variables[variables[i][0]] = variables[i][1];
        }
    }
    return this;
};


HTMLElement.prototype.setStyle = function (...args) {
    const hex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/; 
    const hexa = /^#?([a-fA-F0-9]{8}|[a-fA-F0-9]{4})$/;
    const isColor = (value) => typeof value === 'string' && value.match(hex|hexa);
    const convertColor = (value) => {
        if (typeof value !== 'string') return value;
        if (value.match(hex)) {
            return value.replace(hex, xcolor.hex2rgb(value.match(hex)[0]));
        }
        if (value.match(hexa)) {
            return value.replace(hexa, xcolor.hexa2rgba(value.match(hexa)[0]));
        }
        return value;
    };
    const camelToHyphen = (str) => {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    };
    const setStyle = (property, value, priority = "") => {
        value = this._cv(value);
        this.style.setProperty(camelToHyphen(property), isColor(value) ? convertColor(value) : value, priority);
        //this.style[property] = value;
    };

    if (args.length === 1) {
        let _style = args[0];
        if (typeof _style === 'object') {
            for (const property in _style) {
                setStyle(property, _style[property]);
            }
        } else if (typeof _style === 'string') {
            let [property, value] = _style.split(':').map(str => str.trim());
            setStyle(property, value);
        } else if (Array.isArray(_style)) {
            setStyle(_style[0], _style[1], _style[2] || "");
        }
    } else if (args.length > 1) {
        setStyle(args[0], args[1], args[2] || "");
    }
    return this;
};

HTMLElement.prototype.setStyleProperty = function (property, value, priority = "") {
    value = this._cv(value);
    this.style.setProperty(property, value, priority);
    return this;
};

/*
 * set multiple styles at once
 * @param styles an object with style properties
 * @deprecated use setStyle
 */
HTMLElement.prototype.setStyles = function (_styles) {
    return this.setStyle(_styles);
};

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
};

HTMLElement.prototype.toggleClass = function (className) {
    if (this.classList.contains(className)) {
        this.classList.remove(className);
    } else {
        this.classList.add(className);
    }
    return this;
};

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
};

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
};

HTMLElement.prototype.left = function (_left) {
    if (_left !== undefined) {
        this.style.setProperty("left", (typeof _left === "string" && isNaN(_left)) ? _left : _left + "px");
    } else {
        return parseInt(this.style.getPropertyValue("left"));
    }
    return this;
};

HTMLElement.prototype.right = function (_right) {
    if (_right !== undefined) {
        this.style.setProperty("right", (typeof _right === "string" && isNaN(_right)) ? _right : _right + "px");
    } else {
        return parseInt(this.style.getPropertyValue("right"));
    }
    return this;
};

HTMLElement.prototype.top = function (_top) {
    if (_top !== undefined) {
        this.style.setProperty("top", (typeof _top === "string" && isNaN(_top)) ? _top : _top + "px");
    } else {
        return parseInt(this.style.getPropertyValue("top"));
    }
    return this;
};

HTMLElement.prototype.bottom = function (_bottom) {
    if (_bottom !== undefined) {
        this.style.setProperty("bottom", (typeof _bottom === "string" && isNaN(_bottom)) ? _bottom : _bottom + "px");
    } else {
        return parseInt(this.style.getPropertyValue("bottom"));
    }
    return this;
};


HTMLElement.prototype.setSize = function (_w, _h) {
    if (_w !== undefined) {
        this.style.setProperty("width", (typeof _w === "string" && isNaN(_w)) ? _w : _w + "px");
    }

    if (_h !== undefined) {
        this.style.setProperty("height", (typeof _h === "string" && isNaN(_h)) ? _h : _h + "px");
    }

    return this;
};


HTMLElement.prototype.setWidth = function (width) {
    return this.style.setProperty("width", (typeof width === "string" && isNaN(width)) ? width : (width) + "px");
};

HTMLElement.prototype.getWidth = function (asNumber = false) {
    if (asNumber) {
        return parseInt(this.style.getPropertyValue("width"));
    }
    return this.style.getPropertyValue("width");
};

HTMLElement.prototype.setHeight = function (height) {
    return this.style.setProperty("height", (typeof height === "string" && isNaN(height)) ? height : (height) + "px");
};

HTMLElement.prototype.getHeight = function (asNumber = false) {
    if (asNumber) {
        return parseInt(this.style.getPropertyValue("height"));
    }
    return this.style.getPropertyValue("height");
};

HTMLElement.prototype.setClass = function (classes) {
    classes = this._cv(classes);
    this.className = classes;
    return this;
};

HTMLElement.prototype.setText = function (text) {
    text = this._cv(text);
    this.innerText = text;
    return this;
};

HTMLElement.prototype.getText = function () {
    return this.innerText;
};

HTMLElement.prototype.setHTML = function (html) {
    html = this._cv(html);
    this.innerHTML = html;
    return this;
};

HTMLElement.prototype.getHTML = function () {
    return this.innerHTML;
};

HTMLElement.prototype.bgColor = function (_bgcolor) {
    if (_bgcolor !== undefined) {
        this.setStyleProperty("background-color", _bgcolor);
    } else {
        return this.style.getPropertyValue("background-color");
    }
    return this;
};

HTMLElement.prototype.bg = function () {
    return new (function (_parent) {
        this.hex = function (_h) {
            if (_h !== undefined) {
                _parent.style.backgroundColor = _h;
                return _parent;
            }
            let _c = _parent.style.backgroundColor;
            return (_c[0] == "#") ? _c : (_c.startsWith("rgb")) ? this.rgb2hex(_c) : xhtmlColors.get(_c);
        };
        this.rgb = function (...args) {
            if (args !== undefined) {
                if (args.length == 1) {
                    let arg = args[0];
                    if (Array.isArray(arg)) {
                        if (arg.length == 3) {
                            _parent.style.backgroundColor = `rgb(${arg[0]}, ${arg[1]}, ${arg[2]})`;
                        } else if (arg.length == 4) {
                            _parent.style.backgroundColor = `rgba(${arg[0]}, ${arg[1]}, ${arg[2]}, ${arg[3]})`;
                        }
                    } else {
                        _parent.style.backgroundColor = arg;
                    }
                } else if (args.length == 3) {
                    _parent.style.backgroundColor = `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
                } else if (args.length == 4) {
                    _parent.style.backgroundColor = `rgba(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
                }
            }
            let _c = _parent.style.backgroundColor;
            return (_c[0] == "#") ? this.hex2rgb(_c) : (_c.startsWith("rgb")) ? _c : this.hex2rgb(xhtmlColors.get(_c));
        };
        this.rgb2hex = function (color) {
            return '#' + color.match(/[\d\.]+/g).map((x, i) => Math.round((+x) * (i < 3 ? 1 : 255)).toString(16).padStart(2, 0)).join``;
        };
        this.hex2rgb = function (color) {
            let [r, g, b] = color.match(/\w\w/g).map(x => +`0x${x}`);
            return `rgb(${r},${g},${b})`;
        };
        this.image = function () {
            return new (function (_parent) {
                this.parent = _parent;
                this._url = null;
                this._repeat = "no-repeat";
                this._origin = "50% 50%";
                this._position = "center";
                this._attachment = "scroll";
                this._size = "";
                this._blendMode = "normal";
                this._clip = "auto";
                this.url = function (_url) {
                    this._url = _url;
                    return this;
                };
                this.repeat = function (_repeat) {
                    this._repeat = _repeat;
                    return this;
                };
                this.origin = function (_origin) {
                    this._origin = _origin;
                    return this;
                };
                this.position = function (_position) {
                    this._position = _position;
                    return this;
                };
                this.attachment = function (_attachment) {
                    this._attachment = _attachment;
                    return this;
                };
                this.size = function (_x, _y) {
                    if (typeof _x === "string") {
                        this._size = _x;
                    } else {
                        this._size = `${_x}px ${_y}px`;
                    }
                    return this;
                };
                this.blendMode = function (_blendMode) {
                    this._blendMode = _blendMode;
                    return this;
                };
                this.clip = function (_clip) {
                    this._clip = _clip;
                    return this;
                };
                this.set = function () {
                    _parent.style.setProperty("background-image", `url(${this._url})`);
                    if (this._repeat !== null) _parent.style.setProperty("background-repeat", this._repeat);
                    if (this._origin !== null) _parent.style.setProperty("background-origin", this._origin);
                    if (this._position !== null) _parent.style.setProperty("background-position", this._position);
                    if (this._attachment !== null) _parent.style.setProperty("background-attachment", this._attachment);
                    if (this._size !== null) _parent.style.setProperty("background-size", this._size);
                    if (this._blendMode !== null) _parent.style.setProperty("background-blend-mode", this._blendMode);
                    if (this._clip !== null) _parent.style.setProperty("background-clip", this._clip);
                    return _parent;
                };
                this.clear = function () {
                    _parent.style.removeProperty("background-image");
                    _parent.style.removeProperty("background-repeat");
                    _parent.style.removeProperty("background-origin");
                    _parent.style.removeProperty("background-position");
                    _parent.style.removeProperty("background-attachment");
                    _parent.style.removeProperty("background-size");
                    _parent.style.removeProperty("background-blend-mode");
                    _parent.style.removeProperty("background-clip");
                    return _parent;
                };
            })(_parent);
        };
        this.gradient = function () {
            return new (function (_parent) {
                this.parent = _parent;
                this.options = {
                    colors: [],
                    type: "linear",
                    repeating: false,
                    angle: null,
                    direction: null,
                    side: null,
                    from: null,
                    at: null
                };
                this.linear = function () {
                    this.options.type = "linear";
                    return this;
                };
                this.radial = function () {
                    this.options.type = "radial";
                    return this;
                };
                this.conic = function () {
                    this.options.type = "conic";
                    return this;
                };
                this.repeat = function () {
                    this.options.repeating = true;
                    return this;
                };
                this.angle = function (_angle) {
                    if (this.options.type == "linear") {
                        this.options.angle = _angle;
                    } else if (this.options.type == "conic") {
                        this.options.angle = "from " + _angle;
                    }
                    return this;
                };
                this.direction = function (_direction) {
                    if (this.options.type == "linear") {
                        this.options.direction = _direction;
                    }
                    return this;
                };
                this.side = function (_side) {
                    if (this.options.type == "radial") {
                        this.options.side = _side;
                    }
                    return this;
                };
                this.from = function (_angle) {
                    if (this.options.type == "conic") {
                        this.options.from = "from " + _angle;
                    }
                    return this;
                };
                this.at = function (_per01, _per02) {
                    if (this.options.type == "conic") {
                        this.options.at = "at " + _per01 + "% " + _per02 + "%";
                    }
                    return this;
                };
                this.color = function (_color, _percentage_or_angle) {
                    /* if (this.options.type == "linear" || this.options.type == "radial") {
                        this.options.colors.push(percentage_or_angle !== undefined ? `${_color} ${percentage_or_angle}%` : _color);
                    }
                    if (this.options.type == "conic") {
                        this.options.colors.push((percentage_or_angle !== undefined ? `${_color} ${percentage_or_angle}deg` : _color));
                    } */
                    this.options.colors.push({ color: _color, percentage_or_angle: _percentage_or_angle });
                    return this;
                };
                this.set = function (_options) {
                    if (_options !== undefined) {
                        this.options = _options;
                    }
                    let colors = [];
                    for (const color of this.options.colors) {
                        let unit = "%";
                        if (this.options.type == "conic") {
                            unit = "deg";
                        }
                        colors.push(color.percentage_or_angle !== undefined ? `${color.color} ${color.percentage_or_angle}${unit}` : color.color);
                    }

                    if (this.options.angle != null) {
                        this.parent.style.background = `${this.options.repeating ? "repeating-" : ""}${this.options.type}-gradient(${this.options.angle}deg, ${colors.join(", ")})`;
                    } else if (this.options.direction != null) {
                        this.parent.style.background = `${this.options.repeating ? "repeating-" : ""}${this.options.type}-gradient(${this.options.direction}, ${colors.join(", ")})`;
                    } else if (this.options.side != null) {
                        this.parent.style.background = `${this.options.repeating ? "repeating-" : ""}${this.options.type}-gradient(${this.options.side}, ${colors.join(", ")})`;
                    } else if (this.options.from != null) {
                        this.parent.style.background = `${this.options.repeating ? "repeating-" : ""}${this.options.type}-gradient(${this.options.from}, ${colors.join(", ")})`;
                    } else if (this.options.at != null) {
                        this.parent.style.background = `${this.options.repeating ? "repeating-" : ""}${this.options.type}-gradient(${this.options.at}, ${colors.join(", ")})`;
                    } else {
                        this.parent.style.background = `${this.options.repeating ? "repeating-" : ""}${this.options.type}-gradient(${colors.join(", ")})`;
                    }
                    this.parent.bgGradientOptions = this.options;
                    return this.parent;
                };
                this.clear = function () {
                    this.parent.style.removeProperty("background");
                    return this.parent;
                };
            })(_parent);
        };
    })(this);
};

HTMLElement.prototype.hasScrollBars = function () {
    return this.hasScrollBarX() || this.hasScrollBarY();
};

HTMLElement.prototype.hasScrollBarY = function () {
    return this.scrollHeight > this.offsetHeight;
};

HTMLElement.prototype.hasScrollBarX = function () {
    return this.scrollWidth > this.offsetWidth;
};

//////////////////////////////////////////////////////////////////////////////
CSSStyleDeclaration.prototype.leftPos = function (_left) {
    if (_left !== undefined) {
        this.setProperty("left", (typeof _left === "string" && isNaN(_left)) ? _left : _left + "px");
    } else {
        return this.getPropertyValue("left");
    }
};

CSSStyleDeclaration.prototype.rightPos = function (_right) {
    if (_right !== undefined) {
        this.setProperty("right", (typeof _right === "string" && isNaN(_right)) ? _right : _right + "px");
    } else {
        return this.getPropertyValue("right");
    }
};

CSSStyleDeclaration.prototype.topPos = function (_top) {
    if (_top !== undefined) {
        this.setProperty("top", (typeof _top === "string" && isNaN(_top)) ? _top : _top + "px");
    } else {
        return this.getPropertyValue("top");
    }
};

CSSStyleDeclaration.prototype.bottomPos = function (_bottom) {
    if (_bottom !== undefined) {
        this.setProperty("bottom", (typeof _bottom === "string" && isNaN(_bottom)) ? _bottom : _bottom + "px");
    } else {
        return this.getPropertyValue("bottom");
    }
};


//////////////////////////////////////////////////////////////////////////////
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.asInt = function () {
    return parseInt(this);
};

String.prototype.asFloat = function () {
    return parseFloat(this);
};

String.prototype.asBool = function () {
    return (this == "true");
};

String.prototype.asHex = function () {
    return Array.from(this, (char) => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
};

String.prototype.fromHex = function () {
    const view = new Uint8Array((this.length / 2) * 1);
    for (let i = 0; i < this.length; i += 2) {
        view[(i / 2) | 0] = parseInt(this.substring(i, 2), 16);
    }
    return String.fromCharCode(...view);
};

String.prototype.asBase64 = function () {
    return btoa(this);
};

String.prototype.fromBase64 = function () {
    return atob(this);
};

String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


//////////////////////////////////////////////////////////////////////////////
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

/* (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}()); */

const setProperty = function (id, property, value) {
    document.getElementById(id)[property] = value;
};

const getProperty = function (id, property) {
    return document.getElementById(id)[property];
};

const removeProperty = function (id, property) {
    document.getElementById(id)[property] = null;
};

const setStyleProperty = function (id, property, value) {
    document.getElementById(id).style[property] = value;
};

const getStyleProperty = function (id, property) {
    return document.getElementById(id).style[property];
};

const removeStyleProperty = function (id, property) {
    document.getElementById(id).style[property] = null;
};

//////////////////////////////////////////////////////////////////////////////


class _xjs {
    //// Constants ////
    GradientDirection = {
        TO_TOP: 'to top',
        TO_RIGHT: 'to right',
        TO_BOTTOM: 'to bottom',
        TO_LEFT: 'to left'
    };

    GradientSide = {
        CLOSEST_SIDE: "closest-side",
        FARTHEST_SIDE: "farthest-side",
        CLOSEST_CORNER: "closest-corner",
        FARTHEST_SIDE: "farthest-corner"
    };

    BgImageOrigin = {
        BORDER_BOX: 'border-box',
        PADDING_BOX: 'padding-box',
        CONTENT_BOX: 'content-box'
    };

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
    #timers = {};
    registerTimer(name, object, callback, interval, ...args) {
        this.#timers[name] = setInterval(callback.bind(object, ...args), interval);
    }

    unregisterTimer(name) {
        clearInterval(this.#timers[name]);
        delete this.#timers[name];
    }

    timeOut(callback, time, object, ...args) {
        if (object !== undefined) {
            setTimeout(callback.bind(object, ...args), time);
        } else {
            setTimeout(callback, time);
        }
    }

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

    //// Animation ////
    get easeTypes() {
        return {
            linear: "linear",
            ease: "ease",
            easeIn: "easeIn",
            easeOut: "easeOut",
            easeInOut: "easeInOut",
            easeInElastic: "easeInElastic",
            easeOutElastic: "easeOutElastic",
        };
    };

    #easeFunctions = {
        linear: this.easeLinear,
        ease: this.easeInOutQuad,
        easeIn: this.easeInQuad,
        easeOut: this.easeOutQuad,
        easeInOut: this.easeInOutQuad,
        easeInElastic: this.easeInElastic,
        easeOutElastic: this.easeOutElastic
    };

    async animate(elements, styles, time, callback) {
        return Promise.all([
            this.#animateElements(elements, styles, time)
        ]).then(() => {
            console.log('Animations completed');
            if (callback) callback();
        });
    }
    #animationStyleGroups = {
        pixels: ["top", "left", "right", "bottom", "width", "height", "margin", "padding", "borderRadius", "borderWidth", "fontSize"],
        opacity: ["opacity"],
        colors: ["backgroundColor", "color", "borderColor", "outlineColor", "fontColor"],
        gradient: ["bg_gradient_angle"]
    };
    #animateElements(elements, styles, duration) {
        const promises = [];

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const style = styles[i];
            const _self = this;
            const promise = new Promise((resolve) => {
                const start = performance.now();

                function animate(currentTime) {
                    const elapsedTime = currentTime - start;

                    if (elapsedTime < duration) {
                        Object.keys(style).forEach((prop) => {
                            if (_self.#animationStyleGroups.pixels.includes(prop)) {
                                const startValue = parseFloat(style[prop].start) || 0;
                                const endValue = parseFloat(style[prop].end) || 0;
                                const change = endValue - startValue;
                                const ease = style[prop].ease || "linear";
                                element.style[prop] = Math.round(_self.#easeFunctions[ease](elapsedTime / 1000, startValue, change, duration / 1000)) + 'px';
                            }
                            if (_self.#animationStyleGroups.opacity.includes(prop)) {
                                const startValue = parseFloat(style[prop].start) || 0;
                                const endValue = parseFloat(style[prop].end) || 0;
                                const change = endValue - startValue;
                                const ease = style[prop].ease || "linear";
                                element.style[prop] = _self.#easeFunctions[ease](elapsedTime / 1000, startValue, change, duration / 1000);
                            }
                            if (_self.#animationStyleGroups.colors.includes(prop)) {
                                const startRgba = _self.#hexaToRgbaArray(style[prop].start);
                                const endRgba = _self.#hexaToRgbaArray(style[prop].end);
                                const changeRgba = [endRgba[0] - startRgba[0], endRgba[1] - startRgba[1], endRgba[2] - startRgba[2], endRgba[3] - startRgba[3]];
                                let progress = [];
                                changeRgba.forEach((value, index) => {
                                    progress[index] = (elapsedTime / duration) * value;
                                });
                                element.style[prop] = `rgba(${startRgba[0] + progress[0]}, ${startRgba[1] + progress[1]}, ${startRgba[2] + progress[2]}, ${startRgba[3] + progress[3]})`;
                            }
                            if (_self.#animationStyleGroups.gradient.includes(prop)) {
                                const startValue = parseFloat(style[prop].start) || 0;
                                const endValue = parseFloat(style[prop].end) || 0;
                                const change = endValue - startValue;
                                const ease = style[prop].ease || "linear";
                                element.bgGradientOptions.angle = _self.#easeFunctions[ease](elapsedTime / 1000, startValue, change, duration / 1000);
                                element.bg().gradient().set(element.bgGradientOptions);
                            }
                        });
                        requestAnimationFrame(animate);
                    } else {
                        Object.keys(style).forEach((prop) => {
                            if (_self.#animationStyleGroups.pixels.includes(prop)) {
                                element.style[prop] = style[prop].end + 'px';
                            }
                            if (_self.#animationStyleGroups.opacity.includes(prop)) {
                                element.style[prop] = style[prop].end;
                            }
                            if (_self.#animationStyleGroups.colors.includes(prop)) {
                                element.style[prop] = style[prop].end;
                            }
                        });
                        resolve();
                    }
                }

                requestAnimationFrame(animate);
            });

            promises.push(promise);
        }

        return Promise.all(promises);
    }

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
        document.getElementById(id);
        let _elm = document.getElementById(id);
        _elm.style.setProperty(property, value);
        return _elm;
    }

    withcss(css) {
        let style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    getCssVar(name, selector) {
        let r = document.querySelector(selector || ':root');
        let rs = getComputedStyle(r);
        return rs.getPropertyValue(name) || null;
    }

    setCssVar(name, value, selector) {
        if (!selector) selector = ':root';
        let r = document.querySelector(selector);
        r.style.setProperty(name, value);
    }

    //// String ////
    toBaseAscii() {
        return normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    loremipsum(length) {
        let text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id nunc non turpis ultrices aliquam. Sed id cursus velit. In hac habitasse platea dictumst. Nulla facilisi. Nulla facilisi. Nullam eget consectetur sem. Donec euismod, enim ac interdum malesuada, est nunc auctor nulla, et tincidunt nibh nisi non diam. In hac habitasse platea dictumst. Sed non metus vitae erat consectetur mattis. Etiam ut ante vel tortor ultrices condimentum. Sed bibendum, mauris id pulvinar vulputate, massa felis volutpat nunc, nec luctus nisl nibh in nunc. Sed semper, est in fermentum faucibus, mauris eros viverra nisl, nec posuere est nisi in nunc. Sed euismod, neque vel pulvinar lacinia, est nunc bibendum nisl, in ultricies nisl nunc in lacus. Sed luctus, ante ac tincidunt semper, nunc neque aliquam nulla, sed commodo nisl turpis vitae nisi. Nulla facilisi.";
        if (length > text.length) {
            while (text.length < length) {
                text += ' ' + text;
            }
        }
        return (length) ? text.substring(0, length) : text;
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

    easeLinear(t, b, c, d) {
        return c * t / d + b;
    }

    easeInQuad(t, b, c, d) {
        return c * (t /= d) * t + b;
    }

    easeOutQuad(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    }

    easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }

    easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }

    easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }

    easeInExpo(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }

    easeOutExpo(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }

    easeInOutExpo(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    easeInCirc(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }

    easeOutCirc(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }

    easeInOutCirc(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }

    easeInCubic(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    }

    easeOutCubic(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }

    easeInElastic(t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }

    easeOutElastic(t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    };

    logistic(x, start, end) {
        return start + (end - start) * this.sigmoid((x - start) / (end - start));
    }

    range(x1, y1, x2, y2, a) {
        this.lerp(x2, y2, this.invlerp(x1, y1, a));
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

    //// Color ////
    #hexaToRgbaArray(hexa) {
        const r = parseInt(hexa.slice(1, 3), 16);
        const g = parseInt(hexa.slice(3, 5), 16);
        const b = parseInt(hexa.slice(5, 7), 16);
        const a = (hexa.length === 9) ? parseInt(hexa.slice(7, 9), 16) / 255 : 1;
        return [r, g, b, a];
    }

    //// Date ////
    formatDate(format = "yyyy/MM/dd hh:mm:ss", date = new Date()) {
        const f = {
            yyyy: date.getFullYear().toString(),
            yy: date.getFullYear().toString().slice(-2),
            MM: (date.getMonth() + 1).toString().padStart(2, '0'),
            dd: date.getDate().toString().padStart(2, '0'),
            hh: date.getHours().toString().padStart(2, '0'),
            mm: date.getMinutes().toString().padStart(2, '0'),
            ss: date.getSeconds().toString().padStart(2, '0')
        };
        return format.replace(/yyyy|yy|MM|dd|hh|mm|ss/g, matched => f[matched]);
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
            input: {
                text: "inputText",
                number: "inputNumber",
                password: "inputPassword",
                checkbox: "inputCheckbox",
                radio: "inputRadio",
                file: "inputFile",
                color: "inputColor",
            },
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
            i: "i",
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
            video: "video",
            dialog: "dialog",
            style: "style"
            /* canvas: "canvas",
            applet: "applet",
            object: "object",
            embed: "embed",
            object: "object",
            param: "param",
            map: "map",
            area: "area",
            noscript: "noscript",
            script: "script",
            link: "link",
            meta: "meta",
            base: "base",
            head: "head",
            body: "body",
            html: "html",
            svg: "svg",
            path: "path",
            circle: "circle",
            ellipse: "ellipse",
            rect: "rect",
            line: "line",
            polyline: "polyline",
            polygon: "polygon",
            text: "text",
            use: "use",
            g: "g",
            defs: "defs",
            clipPath: "clipPath",
            mask: "mask",
            filter: "filter",
            symbol: "symbol",
            linearGradient: "linearGradient",
            radialGradient: "radialGradient",
            stop: "stop",
            image: "image",
            foreignObject: "foreignObject",
            desc: "desc",
            title: "title" */
        };
    }
    #htmlelements = {
        panel: this.lazy(() => document.createElement("div").setStyle({ position: "absolute", width: "100px", height: "100px" })),
        div: this.lazy(() => document.createElement("div")),
        span: this.lazy(() => document.createElement("span")),
        inputText: this.lazy(() => document.createElement("input").setProperty("type", "text")),
        inputNumber: this.lazy(() => document.createElement("input").setProperty("type", "number")),
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
        i: this.lazy(() => document.createElement("i")),
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
        video: this.lazy(() => document.createElement("video")),
        dialog: this.lazy(() => document.createElement("dialog")),
        style: this.lazy(() => document.createElement("style")),
    };

    #xjselementsMap = {
        xjsSelect: "xjsSelect",
        xjsXcolorPickerBtn: "xjsXcolorPickerBtn"
    };
    get xjselements() {
        return this.#xjselementsMap;
    }

    #xjselements = {
        xjsSelect: this.lazy(() => document.createElement("xjs-select").setAttribute("options", JSON.stringify([
            { value: "option1", textContent: "Option 1" },
            { value: "option2", textContent: "Option 2" },
            { value: "option3", textContent: "Option 3" }
        ]))),
    };

    /**
     * 
     * @param {string} name - it must start with xjs
     * @param {string} tag - the tag name 
     */
    registerXJSElement(name, tag) {
        if (!name.startsWith("xjs")) {
            throw new Error("name must start with xjs");
        }

        if (this.#xjselements[name] != null) {
            throw new Error("name already exists");
        }
        this.#xjselementsMap[name] = name;
        this.#xjselements[name] = this.lazy(() => document.createElement(tag));
    }

    with(elm) {
        if (typeof elm == "string") {
            if (elm.startsWith(".")) {
                return document.querySelectorAll(elm);
            } else if (elm.startsWith("#")) {
                return document.querySelectorAll(elm)[0];
            }
            return this.getElm(elm);
        } else {
            return elm;
        }
    }

    withnew(htmlelm, id, name, value, mediaOpts = undefined) {
        if (typeof htmlelm == "string") {
            let elm = (htmlelm.startsWith("xjs")) ? this.#xjselements[htmlelm]().cloneNode(true) : this.#htmlelements[htmlelm]().cloneNode(true);
            if (id) elm.setAttribute("id", id);
            if (name) elm.setAttribute("name", name);
            if (value) elm.setAttribute("value", value);
            if (mediaOpts) {
                elm.setAttribute("mediaOpts", mediaOpts);
                xjs.registerResponsiveElement({ mediaOpts: mediaOpts, elm: elm });
            }
            return elm;
        }
        return null;
    }

    #responsiveElements = [];

    registerResponsiveElement(responsiveElm) {
        this.#responsiveElements.push(responsiveElm);
    }

    checkMediaOptions() {
        if (window.mediaOptions !== undefined) {
            let breakpoints = mediaOptions.breakpoints;
            let breakpoint = (breakpoints) ? Object.keys(breakpoints).reduce((prev, current) => (breakpoints[prev] < breakpoints[current] && breakpoints[current] <= window.innerWidth) ? current : prev) : undefined;
            if (breakpoint) {
                this.#responsiveElements.forEach(relm => {
                    if (relm.mediaOpts && relm.mediaOpts[breakpoint]) {
                        let elmMediaOpt = relm.mediaOpts[breakpoint];
                        if (elmMediaOpt.display !== undefined) {
                            relm.elm.style.display = typeof elmMediaOpt.display === 'function' ? elmMediaOpt.display() : elmMediaOpt.display;
                        }
                    }
                });
            }
        }
    }

    #components = {};

    registerComponent(name, component) {
        this.#components[name] = {};

        this.#components[name].component = component.cloneNode(true).outerHTML;

        if (component.__eh) {
            this.#components[name].__eh = component.__eh;
        }

        if (component.variables) {
            this.#components[name].variables = component.variables;
        }
    }

    hasComponent(name) {
        return this.#components[name] != null;
    }

    getComponent(name, withevents = false, variables = null) {
        var component = {};
        let strcomp = this.#components[name].component;
        let newvars = null;
        if (variables) {
            newvars = {};
            Object.keys(variables).forEach(variable => {
                strcomp = strcomp.replaceAll('${' + variable + '}', variables[variable]);
                newvars[variable] = variables[variable];
            });
        }
        var wrapper = xjs.withnew(this.htmlElements.div).setHTML(strcomp);
        component = wrapper.firstChild;
        component.setVariables(newvars);

        wrapper.remove();

        if (withevents) {
            var events = this.#components[name].__eh;
            if (events) {
                for (var i = 0; i < Object.keys(events).length; i++) {
                    component.bindEvent(Object.keys(events)[i], events[Object.keys(events)[i]]['targetFunction'], component);
                }
            }
        }

        if (this.#components[name].variables) {
            component.setVariables(this.#components[name].variables);
        }

        return component;
    }
}

const xjs = new _xjs();

window.addEventListener("resize", () => {
    xjs.checkMediaOptions();
});

window.addEventListener("load", () => {
    xjs.checkMediaOptions();
});
