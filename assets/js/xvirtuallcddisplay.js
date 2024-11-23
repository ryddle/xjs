class XVirtualLcdDisplay {

    constructor(parent, width, size, color, bgColor) {

        this.parent = parent || document.body;
        this.size = size || 8;
        this.width = width || 160;
        this.height = (this.width / this.size) * 2;
        this.color = color || "red";
        this.bgColor = bgColor || "white";
        this.lcds = [];

        this.displayContainer = document.createElement("div");
        Object.assign(this.displayContainer.style, {
            width: "100%",
            height: "100%"
        });

        for (var i = 0; i < this.size; i++) {
            var lcdElement = new XVirtualLcdElement(i, this.width / this.size, this.height, this.color, this.bgColor);

            this.lcds.push(lcdElement);
            this.displayContainer.appendChild(lcdElement.elementContainer);
        }

        parent.appendChild(this.displayContainer);
    }

    setText(text) {
        for (var i = 0; i < this.lcds.length; i++) {
            this.lcds[i].setCharacter(text[i]);
        }
    }
}

class XVirtualLcdElement {
    #characters = {
        ':': [0, 0, 0, 0, 0, 0, 0, 1],
        ' ': [0, 0, 0, 0, 0, 0, 0, 0],
        '-': [0, 0, 0, 1, 0, 0, 0, 0],
        '_': [0, 0, 0, 0, 0, 0, 1, 0],
        '|': [1, 0, 0, 0, 1, 0, 0, 0],
        '0': [1, 1, 1, 0, 1, 1, 1, 0],
        '1': [0, 0, 1, 0, 0, 0, 1, 0],
        '2': [0, 1, 1, 1, 1, 1, 0, 0],
        '3': [0, 1, 1, 1, 0, 1, 1, 0],
        '4': [1, 0, 1, 1, 0, 0, 1, 0],
        '5': [1, 1, 0, 1, 0, 1, 1, 0],
        '6': [1, 1, 0, 1, 1, 1, 1, 0],
        '7': [0, 1, 1, 0, 0, 0, 1, 0],
        '8': [1, 1, 1, 1, 1, 1, 1, 0],
        '9': [1, 1, 1, 1, 0, 1, 1, 0]
    }
    constructor(index, width, height, color, bgColor) {

        this.index = index;
        this.width = width;
        this.height = height;
        this.color = color || "red";
        this.bgColor = bgColor || "white";

        this.elementContainer = document.createElement("div");
        Object.assign(this.elementContainer.style, {
            width: this.width + "px",
            height: this.height + "px",
            margin: "0px 4px",
            display: 'inline-flex'
        });

        let thickness = this.width * 0.25;
        let margin = this.width * 0.4;

        this.leftTopSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.LEFT_TOP, thickness, (this.height / 2)+(thickness/2), this.color, this.bgColor);
        this.leftTopSegmentElm = this.leftTopSegment.segment;
        this.leftTopSegmentElm.style.position = "absolute";
        this.leftTopSegmentElm.style.left = this.index * (this.width + margin) + "px";
        this.leftTopSegmentElm.style.top = "0px";
        this.elementContainer.appendChild(this.leftTopSegmentElm);

        this.topSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.TOP, this.width, thickness, this.color, this.bgColor);
        this.topSegmentElm = this.topSegment.segment;
        this.topSegmentElm.style.position = "absolute";
        this.topSegmentElm.style.left = this.index * (this.width + margin) + "px";
        this.topSegmentElm.style.top = "0px";
        this.elementContainer.appendChild(this.topSegmentElm);

        this.rightTopSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.RIGHT_TOP, thickness, (this.height / 2)+(thickness/2), this.color, this.bgColor);
        this.rightTopSegmentElm = this.rightTopSegment.segment;
        this.rightTopSegmentElm.style.position = "absolute";
        this.rightTopSegmentElm.style.left = this.index * (this.width + margin) + this.width - thickness + "px";
        this.rightTopSegmentElm.style.top = "0px";
        this.elementContainer.appendChild(this.rightTopSegmentElm);

        this.middleSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.MIDDLE, this.width, thickness, this.color, this.bgColor);
        this.middleSegmentElm = this.middleSegment.segment;
        this.middleSegmentElm.style.position = "absolute";
        this.middleSegmentElm.style.left = this.index * (this.width + margin) + "px";
        this.middleSegmentElm.style.top = (this.height / 2) + "px";
        this.elementContainer.appendChild(this.middleSegmentElm);

        this.leftBottomSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.LEFT_BOTTOM, thickness, (this.height / 2)+(thickness/2), this.color, this.bgColor);
        this.leftBottomSegmentElm = this.leftBottomSegment.segment;
        this.leftBottomSegmentElm.style.position = "absolute";
        this.leftBottomSegmentElm.style.left = this.index * (this.width + margin) + "px";
        this.leftBottomSegmentElm.style.bottom = "0px";
        this.elementContainer.appendChild(this.leftBottomSegmentElm);

        this.bottomSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.BOTTOM, this.width, thickness, this.color, this.bgColor);
        this.bottomSegmentElm = this.bottomSegment.segment;
        this.bottomSegmentElm.style.position = "absolute";
        this.bottomSegmentElm.style.left = this.index * (this.width + margin) + "px";
        this.bottomSegmentElm.style.bottom = "0px";
        this.elementContainer.appendChild(this.bottomSegmentElm);

        this.rightBottomSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.RIGHT_BOTTOM, thickness, (this.height / 2)+(thickness/2), this.color, this.bgColor);
        this.rightBottomSegmentElm = this.rightBottomSegment.segment;
        this.rightBottomSegmentElm.style.position = "absolute";
        this.rightBottomSegmentElm.style.left = this.index * (this.width + margin) + this.width - thickness + "px";
        this.rightBottomSegmentElm.style.bottom = "0px";
        this.elementContainer.appendChild(this.rightBottomSegmentElm);

        this.twoPointsSegment = new XVirtualLcdSegment(XVirtualLcdSegment.segment_type.TWO_POINTS, thickness, this.height/2, this.color, this.bgColor);
        this.twoPointsSegmentElm = this.twoPointsSegment.segment;
        this.twoPointsSegmentElm.style.position = "absolute";
        this.twoPointsSegmentElm.style.left = this.index * (this.width + margin) + (this.width / 2 - (thickness / 2)) + "px";
        this.twoPointsSegmentElm.style.top = (this.height / 4) + "px";
        this.elementContainer.appendChild(this.twoPointsSegmentElm);

        this.segments = [this.leftTopSegment, this.topSegment, this.rightTopSegment, this.middleSegment, this.leftBottomSegment, this.bottomSegment, this.rightBottomSegment, this.twoPointsSegment];

        return this;
    }

    setCharacter(character) {
        if(this.#characters[character] == undefined) {
            return;
        }
        for (var i = 0; i < this.segments.length; i++) {
            this.segments[i].setValue(this.#characters[character][i]);
        }
    }
}

class XVirtualLcdSegment {
    static segment_type = { LEFT_TOP: 0, LEFT_BOTTOM: 1, RIGHT_TOP: 2, RIGHT_BOTTOM: 3, TOP: 4, BOTTOM: 5, MIDDLE: 6, TWO_POINTS: 7 };
    constructor(type, width, height, color, bgColor) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.color = color;
        this.bgColor = bgColor;
    
        if (this.type == XVirtualLcdSegment.segment_type.LEFT_TOP) {
            this.segment = this.createLeftTopSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.LEFT_BOTTOM) {
            this.segment = this.createLeftBottomSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.RIGHT_TOP) {
            this.segment = this.createRightTopSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.RIGHT_BOTTOM) {
            this.segment = this.createRightBottomSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.TOP) {
            this.segment = this.createTopSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.BOTTOM) {
            this.segment = this.createBottomSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.MIDDLE) {
            this.segment = this.createMiddleSegment();
        }
        if (this.type == XVirtualLcdSegment.segment_type.TWO_POINTS) {
            this.segment = this.createTwoPointsSegment();
        }

        return this;
    }

    createLeftTopSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)"
        });
        return vsegment;
    }

    createLeftBottomSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)"
        });
        return vsegment;
    }

    createRightTopSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(100% 0%, 100% 100%, 0% 70%, 0% 30%)"
        });
        return vsegment;
    }

    createRightBottomSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(100% 0%, 100% 100%, 0% 70%, 0% 30%)"
        });
        return vsegment;
    }

    createTopSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)"
        });
        return vsegment;
    }

    createBottomSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(0% 100%, 30% 0%, 70% 0%, 100% 100%)"
        });
        return vsegment;
    }

    createMiddleSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(0% 50%, 20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)"
        });
        return vsegment;
    }

    createTwoPointsSegment() {
        var vsegment = document.createElement("div");
        Object.assign(vsegment.style, {
            width: this.width + "px",
            height: this.height + "px",
            backgroundColor: this.color,
            clipPath: "polygon(0% 20%,0% 0%, 100% 0%, 100% 20%, 0% 20%, 0% 80%, 0% 100%, 100% 100%, 100% 80%, 0% 80%)"
        });
        return vsegment;
    }

    setValue(value) {
        if (value==1) {
            this.segment.style.backgroundColor = this.color;
        } else {
            this.segment.style.backgroundColor = this.bgColor;
        }
    }
}