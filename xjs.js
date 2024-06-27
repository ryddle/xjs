/*
    xjs
*/
Node.prototype.appendTo = function (node) {
    node.appendChild(this);
    return this;
};

Node.prototype.prependTo = function (node) {
    node.insertBefore(this);
    return this;
};

Element.prototype.__eh = {};

Element.prototype.unbindEvent = function (evnt) {
    this.removeEventListener(evnt, this.__eh[evnt]);
    delete this.__eh[evnt];
};

Element.prototype.bindEvent = function (evnt, method, scope, ...args) {
    this.__eh[evnt] = method.bind(scope || this, ...args);
    this.addEventListener(evnt, this.__eh[evnt]);
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
    this.__eh[ehid] = method.bind(scope || this, ...args);
    this.addEventListener(evnt, this.__eh[ehid]);
    return this;
};

HTMLElement.prototype.insert = function (elm, name) {
    this[name] = elm;
    this.appendChild(elm);
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
};

HTMLElement.prototype.setAttribute = function (attribute, value) {
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

HTMLElement.prototype.setStyle = function (_style) {
    Object.assign(this.style, _style);
    return this;
};

HTMLElement.prototype.setStyleProperty = function (property, value) {
    this.style.setProperty(property, value);
    return this;
};

HTMLElement.prototype.setStyles = function (styles) {
    if (typeof styles == "object") {
        Object.assign(this.style, styles);
    } else if (typeof styles == "array") {
        for (let i = 0; i < styles.length; i++) {
            this[styles[i][0]] = styles[i][1];
        }
    }
    return this;
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
    return this.setProperty("width", width);
};

HTMLElement.prototype.getWidth = function (asNumber = false) {
    if (asNumber) {
        return parseInt(this.style.getPropertyValue("width"));
    }
    return this.style.getPropertyValue("width");
};


HTMLElement.prototype.setHeight = function (height) {
    return this.setProperty("height", height);
};

HTMLElement.prototype.getHeight = function (asNumber = false) {
    if (asNumber) {
        return parseInt(this.style.getPropertyValue("height"));
    }
    return this.style.getPropertyValue("height");
};

HTMLElement.prototype.setClass = function (classes) {
    this.className = classes;
    return this;
};

HTMLElement.prototype.setText = function (text) {
    this.innerText = text;
    return this;
};

HTMLElement.prototype.getText = function () {
    return this.innerText;
};

HTMLElement.prototype.setHTML = function (html) {
    this.innerHTML = html;
    return this;
};

HTMLElement.prototype.getHTML = function () {
    return this.innerHTML;
};

HTMLElement.prototype.bgColor = function (_bgcolor) {
    if (_bgcolor !== undefined) {
        this.style.setProperty("background-color", _bgcolor);
    } else {
        return this.style.getPropertyValue("background-color");
    }
    return this;
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
                        ;
                        Object.keys(style).forEach((prop) => {
                            if (_self.#animationStyleGroups.pixels.includes(prop)) {
                                const startValue = parseFloat(style[prop].start) || 0;
                                const endValue = parseFloat(style[prop].end) || 0;
                                const change = endValue - startValue;
                                const ease = style[prop].ease || "linear";
                                element.style[prop] = _self.#easeFunctions[ease](elapsedTime / 1000, startValue, change, duration / 1000) + 'px';
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
        };
    }
    #htmlelements = {
        panel: this.lazy(() => document.createElement("div").setStyle({ position: "absolute", left: "0px", top: "0px", width: "100px", height: "100px" })),
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
        dialog: this.lazy(() => document.createElement("dialog"))
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
        ])))
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

    #components = {};

    registerComponent(name, component) {
        this.#components[name] = component.cloneNode(true);
    }

    hasComponent(name) {
        return this.#components[name] != null;
    }

    getComponent(name) {
        return this.#components[name].cloneNode(true);
    }
}

const xjs = new _xjs();
