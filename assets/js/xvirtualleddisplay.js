//letter definitions 5x7
const letters = {
    'a': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1]],
    'b': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 0, 1, 1, 0]],
    'c': [[0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1]],
    'd': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 0]],
    'e': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1]],
    'f': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0]],
    'g': [[0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 1, 0, 1], [1, 0, 0, 0, 1, 1, 1]],
    'h': [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1]],
    'i': [[0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
    'j': [[0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 0]],
    'k': [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0], [1, 1, 0, 0, 0, 1, 1]],
    'l': [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
    'm': [[1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1]],
    'n': [[1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1]],
    'o': [[0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 0]],
    'p': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0]],
    'q': [[0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0], [0, 1, 1, 1, 1, 0, 1]],
    'r': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 0, 1, 1]],
    's': [[0, 1, 1, 0, 0, 1, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 0, 0, 1, 1, 0]],
    't': [[1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0]],
    'u': [[1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 0]],
    'v': [[1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 0, 0]],
    'w': [[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1]],
    'x': [[1, 1, 0, 0, 0, 1, 1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0], [1, 1, 0, 0, 0, 1, 1]],
    'y': [[1, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1], [0, 0, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0]],
    'z': [[1, 0, 0, 0, 0, 1, 1], [1, 0, 0, 0, 1, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 0, 0, 1], [1, 1, 0, 0, 0, 0, 1]],
    ' ': [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
    '.': [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
    ':': [[0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
    ',': [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0]],
    '-': [[0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0]],
    '_': [[0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
    '/': [[0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0]],
    '|': [[0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 0]],
    '(': [[0, 0, 1, 1, 1, 0, 0], [0, 1, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 1]],
    ')': [[1, 0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 1, 0], [0, 0, 1, 1, 1, 0, 0]],
    '[': [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1]],
    ']': [[1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1]],
    '#': [[0, 0, 1, 0, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 0, 1, 0, 0]],
    '@': [[0, 0, 1, 1, 1, 0, 0], [0, 1, 0, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 0, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1], [0, 1, 0, 0, 1, 0, 1], [0, 0, 1, 1, 0, 0, 0]],
    '%': [[1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1]],
    '&': [[0, 1, 1, 0, 1, 1, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 1, 0, 1], [0, 1, 1, 0, 0, 1, 0], [0, 0, 0, 0, 1, 0, 1]],
    '0': [[0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 0, 1, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 1, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 0]],
    '1': [[0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
    '2': [[0, 1, 0, 0, 0, 1, 1], [1, 0, 0, 0, 1, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 0, 0, 0, 1]],
    '3': [[0, 1, 0, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 0, 1, 1, 0]],
    '4': [[1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1]],
    '5': [[1, 1, 1, 1, 0, 1, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1, 0]],
    '6': [[0, 1, 1, 1, 1, 1, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 1, 1, 0]],
    '7': [[1, 0, 0, 0, 0, 1, 1], [1, 0, 0, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0, 0], [1, 0, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0]],
    '8': [[0, 1, 1, 0, 1, 1, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 0, 1, 1, 0]],
    '9': [[0, 1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 1, 1, 1, 0]],
    '♥': [[0, 1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 0, 0, 0]],
    '☺': [[0, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 0, 1, 1], [1, 1, 0, 1, 1, 0, 1], [1, 1, 1, 1, 1, 0, 1], [1, 1, 0, 1, 1, 0, 1], [1, 1, 1, 1, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]],
    '♦': [[0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 0, 0, 1, 0], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]

};

const Array2D = (r, c) => [...Array(r)].map(_ => Array(c).fill(0));

class XVirtualLedDisplay {
    #options = {
        'mode': 'production', // 'production' or 'development'
        'width': 625,
        'height': 60,
        'rotationSpeed': 200,
        'spreadFactor': 0.3 /* 0.0 - 1.0 */
    };
    constructor(container_, options_) {
        this.container = container_ != null ? container_ : document.body;
        if (options_ !== undefined && typeof (options_) == 'object') {
            Object.assign(this.#options, options_);
        }

        this.#options.spreadFactor = this.#options.spreadFactor < 0 ? 0 : this.#options.spreadFactor > 1 ? 1 : this.#options.spreadFactor;

        this.lineheight = 5;
        this.rowlength = 7;
        this.collength = 89;

        this.#createMatrixContainer();

        this.mat = Array2D(this.rowlength, this.collength);
        this.vmat = new Array();

        this.rotationL = 0;
        this.rotationR = 0;

        this.start_index = 0;
        this.end_index = -1;
        this.start_anim_index = 0;

        this.vmatrowlength = 0;

        this.leftOffset = 0;
        this.rightOffset = this.vmatrowlength;

        if (this.#options.mode == 'development') {
            ///draw listeners
            this.isDrawing = false;
            document.addEventListener("mousedown", function (e) {
                if (e.button == 0) {
                    this.isDrawing = true;
                }
            }
            );

            document.addEventListener("mouseup", function (e) {
                if (e.button == 0) {
                    this.isDrawing = false;
                }
            }
            );
        }

        this.__led = this.#createLed();

        for (var i = 0; i < 7; i++) {
            this.mat[i] = this.newLine();
        }
    }

    #createMatrixContainer() {
        this.matrix = document.createElement('div');
        this.matrix.id = 'matrix';
        this.matrix.className = 'matrix';
        this.matrix.style.alignContent = 'center';
        this.matrix.style.boxSizing = 'unset';
        if (this.#options.width) {
            this.matrix.style.width = this.#options.width + 'px';
        }
        if (this.#options.height) {
            this.matrix.style.height = this.#options.height + 'px';
        }
        this.lineheight = Math.floor((this.#options.height - (this.rowlength * 2)) / this.rowlength);
        this.collength = Math.floor(this.#options.width / (this.lineheight + 2));
        var root = document.querySelector(':root');
        var rs = getComputedStyle(root);
        root.style.setProperty('--lineheight', this.lineheight + 'px');

        this.matrix.style.fontSize = this.lineheight + 'px';
        this.matrix.style.lineHeight = '0.8em';

        this.container.appendChild(this.matrix);
    }

    resizeMatrix(width, height) {
        this.matrix.style.width = width + 'px';
        this.matrix.style.height = height + 'px';
        this.lineheight = Math.floor((height - (this.rowlength * 2)) / this.rowlength);
        this.collength = Math.floor(width / (this.lineheight + 2));
        var root = document.querySelector(':root');
        var rs = getComputedStyle(root);
        root.style.setProperty('--lineheight', this.lineheight + 'px');
        this.matrix.style.fontSize = this.lineheight + 'px';
        this.matrix.style.lineHeight = '0.8em';

        this.matrix.innerHTML = '';

        this.mat = Array2D(this.rowlength, this.collength);
        this.vmat = new Array();
        for (var i = 0; i < 7; i++) {
            this.mat[i] = this.newLine();
        }
    }

    #createLed() {
        var led = document.createElement('div');
        led.className = 'led';
        Object.assign(led.style, {
            width: this.lineheight + 'px',
            height: this.lineheight + 'px',
            WebkitBoxShadow: '0px 0px 0px 0px rgba(255, 255, 190, .75)',
            MozBoxShadow: '0px 0px 0px 0px rgba(255, 255, 190, .75)',
            boxShadow: '0px 0px 0px 0px rgba(255, 255, 190, .75)'
        });

        return led;
    }

    newLine() {
        var self = this;
        var line = new Array();
        for (var i = 0; i < this.collength; i++) {
            var led = this.__led.cloneNode();
            if (this.#options.mode == 'development') {
                led.onclick = function () { self.onOff(this) };
                led.onmouseover = function () {
                    if (this.isDrawing) {
                        this.className = "led";
                    }
                };
            }
            led.className = "led off";
            this.matrix.appendChild(led);
            line[i] = led;
        }
        return line;
    }

    // Tturning on/off
    onOff(led) {
        if (led.className == "led off") {
            this.on(led);
        } else {
            this.off(led);
        }
    }

    on(led) {
        led.className = "led";
        Object.assign(led.style, {
            WebkitBoxShadow: '0px 0px ' + this.lineheight * 1 + 'px ' + this.lineheight * this.#options.spreadFactor + 'px rgba(var(--primary-color-rgb, var(--xvld-primary-color, rgb(255, 0, 0))), .75)',
            MozBoxShadow: '0px 0px ' + this.lineheight * 1 + 'px ' + this.lineheight * this.#options.spreadFactor + 'px rgba(var(--primary-color-rgb, var(--xvld-primary-color, rgb(255, 0, 0))), .75)',
            boxShadow: '0px 0px ' + this.lineheight * 1 + 'px ' + this.lineheight * this.#options.spreadFactor + 'px rgba(var(--primary-color-rgb, var(--xvld-primary-color, rgb(255, 0, 0))), .75)'
        });
    }

    off(led) {
        let _bs = '0px 0px 0px 0px rgba(255, 255, 190, .75)';
        led.className = "led off";
        Object.assign(led.style, {
            WebkitBoxShadow: _bs,
            MozBoxShadow: _bs,
            boxShadow: _bs
        });
    }

    write(arr) {
        var i = 0;
        while (i < arr.length) {
            this.on(this.mat[arr[i++]][arr[i++]]);
        }
    }

    drawText(text_, start_index_, end_index_) {
        this.start_index = (start_index_ !== undefined && start_index_ != null && start_index_ > -1) ? start_index_ : this.start_index;
        this.end_index = (end_index_ !== undefined && end_index_ != null && (end_index_ == -1 || end_index_ > 0)) ? end_index_ : this.end_index;
        if (this.start_index > 0 && (this.end_index != -1 && this.end_index < this.start_index)) {
            alert("End index must be greater than start index or -1(-1==end of text)");
            return;
        }
        if (this.start_index > 0) {
            if (this.end_index == -1) {
                this.vmatrowlength = this.start_index;
            } else {
                this.vmatrowlength = this.start_index;
            }
        } else {
            if (this.end_index == -1) {
                this.vmatrowlength = 0
            } else {
                this.vmatrowlength = this.vmatrowlength;
            }
        }
        var text = text_.toLowerCase();
        text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var textarr = text.split("");

        //set  this.vmat
        if (this.end_index == -1) {
            for (var c = 0; c < textarr.length - 1; c++) {
                var arr = letters[textarr[c]];
                this.vmatrowlength += arr.length;
            }
            this.vmatrowlength += (textarr.length - 1);
        }

        for (var i = 0; i < 7; i++) {
            if (this.start_index > 0) {
                if (this.end_index == -1) {
                    this.vmat[i] = this.vmat[i].slice(0, this.start_index).concat(new Array(this.vmatrowlength + this.start_index).fill(0));
                } else {
                    this.vmat[i] = this.vmat[i].slice(0, this.start_index).concat(new Array(this.end_index - this.start_index).fill(0)).concat(this.vmat[i].slice(this.end_index));
                }
            } else {
                if (this.end_index == -1) {
                    this.vmat[i] = new Array(this.vmatrowlength).fill(0);
                } else {
                    this.vmat[i] = this.vmat[i].slice(0, this.start_index).concat(new Array(this.end_index - this.start_index).fill(0)).concat(this.vmat[i].slice(this.end_index));
                }
            }
        }

        var offset = 0 + this.start_index;
        for (var c = 0; c < textarr.length; c++) {
            var arr = letters[textarr[c]];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i].length; j++) {
                    let y = (j * this.collength) % this.collength;
                    let x = i;
                    this.vmat[j][i + offset] = arr[i][j];
                }
            }
            offset += (arr.length + 1);
        }
        this.draw();
    }

    getCoords() {
        var coords = new Array();
        for (var i = 0; i < this.mat.length; i++)
            for (var j = 0; j < this.mat[i].length; j++)
                if (this.mat[i][j].className == "led") {
                    coords.push(i);
                    coords.push(j);
                }
        return coords;
    }

    getCoordsChar(pixels) {
        var coords = Array2D(pixels, 7);
        for (var i = 0; i < this.mat.length; i++)
            for (var j = 0; j < pixels; j++)
                if (this.mat[i][j].className == "led") {
                    coords[j][i] = 1;
                } else {
                    coords[j][i] = 0;
                }
        return JSON.stringify(coords);
    }

    draw() {
        for (var i = 0; i < this.mat.length; i++) {
            var max = (this.end_index == -1) ? (this.mat[i].length - 1) : this.end_index;
            for (var j = 0 + this.start_index; j < max; j++) {
                (this.vmat[i][j] == 1) ? this.on(this.mat[i][j]) : this.off(this.mat[i][j]);
            }
        }
    }

    stop() {
        clearInterval(this.rotationL);
        clearInterval(this.rotationR);
        clearInterval(this.timer);
        this.rotationL = 0;
        this.leftOffset = 0;
        this.rotationR = 0;
        this.rightOffset = 0;
        this.timer = 0;
    }

    rotate(dir, start_anim_index_) {
        var self = this;
        this.dir = dir== "left" ? "left" : "right";
        this.start_anim_index = start_anim_index_ || this.start_anim_index;
        if (this.dir == "left" && this.rotationL == 0) {
            this.rotationL = setInterval(function () { self.moveLeft() }, this.#options.rotationSpeed);
            clearInterval(this.rotationR);
            this.rotationR = 0;
        }
        else if (this.dir == "right" && this.rotationR == 0) {
            this.rotationR = setInterval(function () { self.moveRight() }, this.#options.rotationSpeed);
            clearInterval(this.rotationL);
            this.rotationL = 0;
        }
    }

    moveLeft0() {
        for (var i = 0; i < this.mat.length; i++) {
            var first = this.mat[i][0].className;
            for (var j = 0; j < this.mat[i].length - 1; j++) {
                (this.mat[i][j + 1].className == "led") ? this.on(this.mat[i][j]) : this.off(this.mat[i][j]);
            }
            (first == "led") ? this.on(this.mat[i][this.mat[i].length - 1]) : this.off(this.mat[i][this.mat[i].length - 1]);
        }
    }

    moveLeft() {
        if (this.vmatrowlength < this.collength) { this.moveLeft0(); return; }

        for (var i = 0; i < this.mat.length; i++) {
            var calcLeftOffset = this.leftOffset + this.start_anim_index;
            for (var j = calcLeftOffset; j < this.mat[i].length + this.leftOffset - 1; j++) {
                var _led = this.mat[i][(j - this.leftOffset) % this.vmatrowlength];
                (this.vmat[i][((j - this.start_anim_index + 1) % (this.vmatrowlength)) + this.start_anim_index] == 1) ? this.on(_led) : this.off(_led);
            }
        }
        this.leftOffset++;
        if (this.leftOffset >= this.vmatrowlength) {
            this.leftOffset = 0;
        }
    }

    moveRight() {
        if (this.vmatrowlength < this.collength) { this.moveRight0(); return; }

        for (var i = 0; i < this.mat.length; i++) {
            var calcRightOffset = this.rightOffset + this.start_anim_index;
            for (var j = calcRightOffset; j < this.mat[i].length + this.rightOffset - 1; j++) {
                var _led = this.mat[i][(j - this.rightOffset) % this.vmatrowlength];
                (this.vmat[i][(j - (this.start_anim_index + 1)) % this.vmatrowlength] == 1) ? this.on(_led) : this.off(_led);
            }
        }
        this.rightOffset--;
        if (this.rightOffset <= 0) {
            this.rightOffset = this.vmatrowlength;
        }
    }

    moveRight0() {
        for (var i = 0; i < this.mat.length; i++) {
            var last = this.mat[i][this.mat[i].length - 1].className;
            for (var j = this.mat[i].length - 1; j > 0; j--) {
                (this.mat[i][j - 1].className == "led") ? this.on(this.mat[i][j]) : this.off(this.mat[i][j]);
            }
            (last == "led") ? this.on(this.mat[i][0]) : this.off(this.mat[i][0]);
        }
    }

    clearM() {
        for (var i = 0; i < this.mat.length; i++) {
            for (var j = 0; j < this.mat[i].length; j++) {
                this.off(this.mat[i][j]);
            }
        }
    }

    fill() {
        for (var i = 0; i < this.mat.length; i++) {
            for (var j = 0; j < this.mat[i].length; j++) {
                this.on(this.mat[i][j]);
            }
        }
    }

    getSpeed() {
        return this.#options.rotationSpeed;
    }

    setSpeed(speed) {
        if (speed && typeof speed == 'number' && speed > 0) {
            this.#options.rotationSpeed = speed;
            self = this;
            if (this.dir == "left") {
                clearInterval(this.rotationL);
                this.rotationL = setInterval(function () { self.moveLeft() }, this.#options.rotationSpeed);
                clearInterval(this.rotationR);
                this.rotationR = 0;
            }
            else if (this.dir == "right") {
                clearInterval(this.rotationR);
                this.rotationR = setInterval(function () { self.moveRight() }, this.#options.rotationSpeed);
                clearInterval(this.rotationL);
                this.rotationL = 0;
            }
        }
    }

    getSpreadFactor() {
        return this.#options.spreadFactor;
    }

    setSpreadFactor(spreadFactor) {
        if(spreadFactor && typeof spreadFactor == 'number' && spreadFactor >= 0 && spreadFactor <= 1){
            this.#options.spreadFactor = spreadFactor;

            if(this.dir!=="left" && this.dir!=="right"){
                let onleds = selectedVledDisplay.container.querySelectorAll(".led:not(.off)");
                for (var i = 0; i < onleds.length; i++) {
                    onleds[i].style.boxShadow = '0px 0px ' + this.lineheight * 1 + 'px ' + this.lineheight * this.#options.spreadFactor + 'px rgba(var(--primary-color-rgb, var(--xvld-primary-color, rgb(255, 0, 0))), .75)';
                }
            }
                
        }
    }

    printFormattedMatrix(matrix) {
        // print formated array
        console.log(JSON.stringify(matrix).replace(/(\[\[)(.*)(\]\])/g, '[\n  [$2]\n]').replace(/],/g, '],\n  '));
    }

}