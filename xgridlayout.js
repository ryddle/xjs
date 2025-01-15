var counter = 0;
class xgridlayout {
    #css = `
        .grid-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            box-sizing: border-box;
        }

        .grid-row {
            display: block;
            width: 100%;
            position: relative;
            box-sizing: border-box;
        }

        .grid-col {
            display: inline-block;
            vertical-align: top;
            box-sizing: border-box;
        }
    `;
    #grid = [];
    #colsmap = {};
    #rowsmap = {};
    constructor(_id, _config) {
        this.locked = false;
        this.config = _config;
        xjs.withcss(this.#css);
        this.gridcontainer = xjs.withnew("div", _id);
        this.gridcontainer.className = 'grid-container';
        document.body.appendChild(this.gridcontainer);

        this.rows = [];

        let _self = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if ((mutation.target.isGridRow || mutation.target.isGridCol) && mutation.attributeName === 'style') {
                    if (_self.locked) {
                        _self.locked = false;
                        return;
                    }
                    _self.resizeGrid();
                }
            });
        });

        // Notify me of style changes
        this.observerConfig = {
            attributes: true,
            attributeFilter: ["style"],
            childList: true, // observe direct children
            subtree: true, // and lower descendants too
            characterData: true,
            characterDataOldValue: true // pass old data to callback
        };

        document.addEventListener('DOMContentLoaded', () => {
            this.gridcontainer.setWidth((document.body.hasScrollBarX() && document.body.hasScrollBarY()) ? 'calc(100vw - 17px)' : '100vw');
            this.resizeGrid();
        });

        window.addEventListener('resize', () => {
            this.resizeGrid();
        });

        document.body.style.margin = '0';
    }

    getColById(_id) {
        return this.#colsmap[_id];
    }

    setColById(_id, _col) {
        this.#colsmap[_id] = _col;
    }

    getRowById(_id) {
        return this.#rowsmap[_id];
    }

    setRowById(_id, _row) {
        this.#rowsmap[_id] = _row;
    }

    addRows(...rows_) {
        rows_.forEach(row => {
            if (row instanceof xgridRow) {
                this.gridcontainer.appendChild(row.el());
                this.observer.observe(row.el(), this.observerConfig);
                this.rows.push(row);
                if (row.options.id !== undefined && row.options.id !== '') {
                    this.#rowsmap[row.options.id] = row;
                }
            }
        });
        return this;
    }

    resizeGrid(_element = undefined) {
        let totalHeight = 0;
        let autoHeightRows = [];
        const breakpoint = this.getBreakpoint();
        this.rows.forEach((_row) => {
            const row = _row.el();

            if (breakpoint !== undefined && _row.options.mediaOpts !== undefined) {
                let _rowMediaOpt = _row.options.mediaOpts[breakpoint];
                if (_rowMediaOpt !== undefined) {
                    if (_rowMediaOpt.width !== undefined) {
                        row.setWidth(typeof _rowMediaOpt.width === 'function' ? _rowMediaOpt.width() : _rowMediaOpt.width);
                    }
                    if (_rowMediaOpt.display !== undefined) { //&& row.displayStatus != "locked") {
                        if (typeof _rowMediaOpt.display === 'function') {
                            row.style.display = _rowMediaOpt.display();
                        } else {
                            row.style.display = _rowMediaOpt.display;
                        }
                    }
                }
            }

            if (row.style.display === 'none') {
                return;
            }
            // calculate the row height in px
            if (row.classList.contains('auto-height')) {
                autoHeightRows.push(row);
            } else if (row.classList.contains('fit-height')) {
                totalHeight += _row.height();
            } else if (row.style.height.endsWith('px')) {
                totalHeight += row.getHeight(true);
            } else if (row.style.height.endsWith('%')) {
                totalHeight += this.gridcontainer.offsetHeight * (row.getHeight(true) / 100);
            }

            const cols = _row.cols;
            let totalWidth = 0;
            let autoWidthCells = [];

            if (cols !== undefined) {
                cols.forEach(col => {
                    const cell = col.el();
                    if (breakpoint !== undefined && col.options.mediaOpts !== undefined) {
                        let colMediaOpt = col.options.mediaOpts[breakpoint];
                        if (colMediaOpt !== undefined) {
                            if (colMediaOpt.width !== undefined && !col.isLocked()) {
                                col.setWidth(typeof colMediaOpt.width === 'function' ? colMediaOpt.width() : colMediaOpt.width);
                            }
                            if (colMediaOpt.display !== undefined) {
                                cell.style.display = typeof colMediaOpt.display === 'function' ? colMediaOpt.display() : colMediaOpt.display;
                            }
                        }
                    }

                    if (cell.style.display === 'none') {
                        return;
                    }

                    if (cell.classList.contains('auto-width')) {
                        autoWidthCells.push(cell);
                    } else if (cell.style.width.endsWith('px')) {
                        totalWidth += cell.offsetWidth;
                    } else if (cell.style.width.endsWith('%')) {
                        totalWidth += row.offsetWidth * (parseFloat(cell.style.width) / 100);
                    } else {
                        autoWidthCells.push(cell);
                    }

                    cell.style.height = (row.classList.contains('fit-height') ? `${_row.height()}px` : `${row.offsetHeight}px`);
                });

                const remainingWidth = this.gridcontainer.offsetWidth - totalWidth - (document.body.hasScrollBarX() ? (document.body.hasScrollBarY() ? 17 : 0) : 0);
                const autoWidth = remainingWidth / autoWidthCells.length;

                autoWidthCells.forEach(cell => {
                    cell.style.width = `${autoWidth}px`;
                });

                cols.forEach(col => {
                    if (col !== _element) {
                        col.resizeGrid();
                    }
                });
            }
        });

        const remainingHeight = this.gridcontainer.offsetHeight - totalHeight;
        const autoHeight = remainingHeight / autoHeightRows.length;

        autoHeightRows.forEach(row => {
            row.style.height = `${autoHeight}px`;
        });
    }

    getBreakpoint() {
        return (this.config && this.config.breakpoints) ? Object.keys(this.config.breakpoints).reduce((prev, current) => (this.config.breakpoints[prev] < this.config.breakpoints[current] && this.config.breakpoints[current] <= window.innerWidth) ? current : prev) : undefined;
    }
}

class xgridRow {
    constructor(grid, height = 'auto', options = {}) {
        this.options = { style: {}, id: undefined, mediaOpts: undefined };
        Object.assign(this.options, options);
        if (grid instanceof xgridlayout) {
            this.grid = grid;
        } else {
            throw new Error('grid must be an instance of xgridlayout');
        }
        this.cols = [];
        this.row = xjs.withnew(xjs.htmlElements.div);
        this.row.className = 'grid-row';
        if (height === 'auto') {
            this.row.classList.add('auto-height');
        } else if (height === 'fit') {
            this.row.classList.add('fit-height');
        }
        this.row.style.height = height;
        Object.assign(this.row.style, this.options.style);

        if (this.options.id) {
            this.row.id = this.options.id;
        }

        this.row.isGridRow = true;

        return this;
    }

    el() {
        return this.row;
    }

    static get(grid, height = 'auto', style = {}, id) {
        return new xgridRow(grid, height, style, id);
    }

    addCol(width = 'auto', style = {}, id) {
        const _col = xgridCol.get(grid, width, style, id);
        _col.parentRow = this;
        this.row.appendChild(_col.el());
        this.cols.push(_col);
        if (id !== undefined && id !== '') {
            this.grid.setColById(id, _col);
        }
        return this;
    }

    addCols(...cols_) {
        cols_.forEach(col => {
            if (col instanceof xgridCol) {
                col.parentRow = this;
                this.cols.push(col);
                if (col.options.id !== undefined && col.options.id !== '') {
                    this.grid.setColById(col.options.id, col);
                }
                this.row.appendChild(col.el());
            }
        });
        return this;
    }

    orderCols(order = []) {
        if (order.length !== this.cols.length) {
            throw new Error('Order length must be equal to number of columns');
        }
        let newcols = [];
        this.cols.forEach((col, index) => {
            newcols.push(this.cols[order[index]]);
            this.row.append(this.cols[order[index]].el());
        });
        this.cols = newcols;
        return this;
    }

    height() {
        return Math.max(...this.cols.map(col => col.el().offsetHeight));
    }
}

class xgridCol {
    #locked = false;
    #has_elements = false;
    options = {
        style: {},
        id: undefined,
        mediaOpts: undefined,
        maxWidth: undefined,
        minWidth: undefined,
        resizable: 'none'
    };
    constructor(grid, width = 'auto', options = {}) {
        Object.assign(this.options, options);
        if (grid instanceof xgridlayout) {
            this.grid = grid;
        } else {
            throw new Error('grid must be an instance of xgridlayout');
        }

        this.rows = [];

        xjs.withcss(`
            .resizer {
            /*
            --dot-bg: #fff;
            --dot-color: var(--primary-color);
            --dot-size: 1px;
            --dot-space: 3px;
              background:
                  linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                  linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                  var(--dot-color);
            */

            /*
            --line-bg: #fff;
            background-color: var(--line-bg);
            opacity: 1;
            background-image:  linear-gradient(135deg, var(--primary-color); 25%, transparent 25%), linear-gradient(225deg, var(--primary-color); 25%, transparent 25%), linear-gradient(45deg, var(--primary-color); 25%, transparent 25%), linear-gradient(315deg, var(--primary-color); 25%, var(--line-bg) 25%);
            background-position:  4px 0, 4px 0, 0 0, 0 0;
            background-size: 8px 8px;
            background-repeat: repeat;
            */

            /*
            --s: 5px;
            --c1: #ffffff;
            --c2: var(--primary-color);
            
            --_g: var(--c1) 90deg,#0000 90.5deg;
            background:
             conic-gradient(from 135deg,var(--_g)),
             conic-gradient(from -45deg,var(--_g)) calc(var(--s)/2) 0,
             var(--c2);
            background-size: var(--s) var(--s)
            */
            
            /* --bg-pattern: transparent;
            background: 
                linear-gradient(45deg, var(--primary-color) 25%, transparent 25%) 0 -50px,
                linear-gradient(135deg, var(--primary-color) 25%, transparent 25%) 0  -50px,
                linear-gradient(225deg, var(--primary-color) 25%, transparent 25%),
                linear-gradient(315deg, var(--primary-color) 25%, transparent 25%);	
            background-size: 12px 12px;
            background-color: #fff; */

            backgroundColor: transparent;
          }
        `);

        this.leftResizer = xjs.withnew(xjs.htmlElements.panel).setStyles({ opacity: 0, cursor: 'col-resize', zIndex: 10000, borderRight: '2px solid #fff' }).setSize('6px', '100%').pos(0, 0, 'left', 'top').setClass('resizer');
        this.leftResizer.isResizer = true;
        this.leftResizer.parentCol = this;
        this.leftResizer.bindEvent('mouseover', function () {this.opacity(1)});
        this.leftResizer.bindEvent('mouseout', function() {if(!this.isResizing)this.opacity(0)});
        this.leftResizer.bindEvent('mousedown', function() {this.isResizing = true; this.px = event.clientX; this.ow = this.parentCol.el().offsetWidth; this.parentCol.lock()});

        this.rightResizer = xjs.withnew(xjs.htmlElements.panel).setStyles({ opacity: 0, cursor: 'col-resize', zIndex: 10000, borderLeft: '2px solid #fff' }).setSize('6px', '100%').pos(0, 0, 'right', 'top').setClass('resizer');
        this.rightResizer.isResizer = true;
        this.rightResizer.parentCol = this;
        this.rightResizer.bindEvent('mouseover', function () {this.opacity(1)});
        this.rightResizer.bindEvent('mouseout', function() {if(!this.isResizing)this.opacity(0)});
        this.rightResizer.bindEvent('mousedown', function() {this.isResizing = true; this.px = event.clientX; this.ow = this.parentCol.el().offsetWidth; this.parentCol.lock()});

        document.body.bindEvent('mousemove', function (e) {
            if (this.leftResizer.isResizing) {
                this.leftResizer.parentCol.setWidth((this.leftResizer.px - e.clientX + this.leftResizer.ow) + 'px');
                document.dispatchEvent(new CustomEvent('resizeColumn', { detail: this.leftResizer.parentCol }));
            }
            if (this.rightResizer.isResizing) {
                this.rightResizer.parentCol.setWidth((e.clientX - this.rightResizer.px + this.rightResizer.ow) + 'px');
                document.dispatchEvent(new CustomEvent('resizeColumn', { detail: this.leftResizer.parentCol }));
            }
        }, this);
        document.body.bindEvent('mouseup', function (e) {
            this.leftResizer.isResizing = false;
            this.leftResizer.opacity(0);
            //this.leftResizer.parentCol.unlock();

            this.rightResizer.isResizing = false;
            this.rightResizer.opacity(0);
            //this.rightResizer.parentCol.unlock();

            document.dispatchEvent(new CustomEvent('endResizeColumn'));
        }, this);

        this.col = xjs.withnew(xjs.htmlElements.div);
        this.col.className = 'grid-col';
        if (width === 'auto') {
            this.col.classList.add('auto-width');
        }
        this.col.style.width = width;
        Object.assign(this.col.style, this.options.style);
        this.col.style.position = 'relative';

        if (this.options.id) {
            this.col.id = this.options.id;
        }

        this.col.isGridCol = true;

        let _self = this;
        _self.initialized = false;

        this.col.parent = function () {
            return _self;
        };

        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if(mutation.target.isGridCol && mutation.target.parent().options.resizable!=='none' && mutation.target.parent().initialized==false){
                    mutation.target.parent().setResizable(mutation.target.parent().options.resizable);
                    mutation.target.parent().initialized = undefined;
                }
                if ((mutation.target.isGridRow || mutation.target.isGridCol) && mutation.attributeName === 'style') {
                    _self.grid.resizeGrid(_self);
                }
            });
        });

        // Notify me of style changes
        this.observerConfig = {
            attributes: true,
            attributeFilter: ["style"],
            childList: true, // observe direct children
            subtree: true, // and lower descendants too
            characterDataOldValue: true // pass old data to callback
        };

        this.observer.observe(this.col, this.observerConfig);

        return this;
    }

    static get(grid, width = 'auto', style = {}, id) {
        return new xgridCol(grid, width, style, id);
    }

    el() {
        return this.col;
    }

    lock() {
        this.#locked = true;
        return this;
    }

    unlock() {
        this.#locked = false;
        //this.grid.resizeGrid(this);
        return this;
    }

    isLocked() {
        return this.#locked;
    }

    setWidth(width) {
        if (width === 'auto') {
            this.col.classList.add('auto-width');
        } else {
            this.col.classList.remove('auto-width');
            
            if(this.options.minWidth !== undefined && parseInt(width) < parseInt(this.options.minWidth)){
                width = this.options.minWidth;
            }
            if(this.options.maxWidth !== undefined && parseInt(width) > parseInt(this.options.maxWidth)){
                width = this.options.maxWidth;
            }
            let totalWidth = 0;
            this.parentRow.cols.forEach(col => {
                if(col.el()===this.el()) return;
                totalWidth += (col.options.minWidth !== undefined ? parseInt(col.options.minWidth) : col.el().offsetWidth);
            });
            totalWidth += parseInt(width);
            if (totalWidth > this.parentRow.el().offsetWidth){
                width = this.parentRow.el().offsetWidth - totalWidth;
            }
            
            this.col.style.width = width;
        }
        return this;
    }

    setResizable(resizable) {//left, right, both, none
        if (this.parentRow.cols.length > 1 && ['left', 'right', 'both', 'none'].indexOf(resizable) !== -1) {
            this.options.resizable = resizable;
            if(resizable === 'left' || resizable === 'both') {
                this.col.append(this.leftResizer);
                this.leftResizer.display('block');
                if(resizable === 'left') {
                    this.rightResizer.display('none');
                }
            } else {
                this.leftResizer.display('none');
            }

            if (resizable === 'right' || resizable === 'both') {
                this.col.append(this.rightResizer);
                this.rightResizer.display('block');
                if(resizable === 'right') {
                    this.leftResizer.display('none');
                }
            } else {
                this.rightResizer.display('none');
            }
        }else{
            throw new Error('this col can not be resizable');
        }

        return this;
    }

    addRow(height = 'auto', style = {}, id) {
        /* if (this.#has_elements || (this.col.children.length > 0 && this.rows.length == 0)) {
            throw new Error('xgridCol can only have xgridRow or Elements added to it, but not both');
        } */
        if (this.#has_elements) {// || (this.col.children.length > 0 && this.rows.length == 0)) {
            throw new Error('xgridCol can only have xgridRow or Elements added to it, but not both');
        } else if (this.col.children.length > 0) {
            let allResizers = true;
            for (let i = 0; i < this.col.children.length; i++) {
                const element = this.col.children[i];
                if (!element.isResizer) {
                    allResizers = false;
                    break;
                }
            }
            if (!allResizers) {
                throw new Error('xgridCol can only have xgridRow or Resizers added to it, but not both');
            }
        }
        const _row = xgridRow.get(this.grid, height, style, id);
        this.col.appendChild(_row.el());
        this.rows.push(_row);
        if (id !== undefined && id !== '') {
            this.grid.setRowById(id, _row);
        }
        return this;
    }

    addRows(...rows_) {
        if (this.#has_elements) {// || (this.col.children.length > 0 && this.rows.length == 0)) {
            throw new Error('xgridCol can only have xgridRow or Elements added to it, but not both');
        } else if (this.col.children.length > 0) {
            let allResizers = true;
            for (let i = 0; i < this.col.children.length; i++) {
                const element = this.col.children[i];
                if (!element.isResizer) {
                    allResizers = false;
                    break;
                }
            }
            if (!allResizers) {
                throw new Error('xgridCol can only have xgridRow or Resizers added to it, but not both');
            }
        }
        rows_.forEach(row => {
            if (row instanceof xgridRow) {
                this.rows.push(row);
                if (row.options.id !== undefined && row.options.id !== '') {
                    this.grid.setRowById(row.options.id, row);
                }
                this.col.appendChild(row.el());
            }
        });
        return this;
    }

    add(_element) {
        if (this.rows.length > 0) {
            throw new Error('xgridCol can only have xgridRow or Elements added to it, but not both');
        }
        this.col.appendChild(_element);
        this.#has_elements = true;
        return this;
    }

    resizeGrid() {
        let totalHeight = 0;
        let autoHeightRows = [];
        this.rows.forEach(_row => {
            const row = _row.el();
            if (row.style.display === 'none') {
                return;
            }
            // calculate the row height in px
            if (row.classList.contains('auto-height')) {
                autoHeightRows.push(row);
            } else if (row.classList.contains('fit-height')) {
                totalHeight += _row.height();
            } else if (row.style.height.endsWith('px')) {
                totalHeight += parseInt(row.style.height);
            } else if (row.style.height.endsWith('%')) {
                totalHeight += row.offsetHeight * (parseFloat(row.style.height) / 100);
            }

            //const cells = row.children;
            const cols = _row.cols;
            let totalWidth = 0;
            let autoWidthCells = [];

            if (cols !== undefined) {
                cols.forEach(col => {
                    const cell = col.el();
                    if (cell.classList.contains('auto-width')) {
                        autoWidthCells.push(cell);
                    } else if (cell.style.width.endsWith('px')) {
                        totalWidth += cell.offsetWidth;
                    } else if (cell.style.width.endsWith('%')) {
                        totalWidth += row.offsetWidth * (parseFloat(cell.style.width) / 100);
                    } else {
                        autoWidthCells.push(cell);
                    }

                    cell.style.height = (row.classList.contains('fit-height') ? `${_row.height()}px` : `${row.offsetHeight}px`);
                });
            }

            const remainingWidth = row.offsetWidth - totalWidth;
            let autoWidth = remainingWidth / autoWidthCells.length;

            autoWidthCells.forEach(cell => {
                if (cell.options && cell.options.maxWidth !== undefined && cell.autoWidth > cell.options.maxWidth) {
                    cell.style.width = `${cell.options.maxWidth}px`;
                    autoWidth = (remainingWidth - cell.options.maxWidth) / (autoWidthCells.length - 1);
                } else if (cell.options && cell.options.minWidth !== undefined && cell.autoWidth < cell.options.minWidth) {
                    cell.style.width = `${cell.options.minWidth}px`;
                    autoWidth = (remainingWidth - cell.options.minWidth) / (autoWidthCells.length - 1);
                } else {
                    cell.style.width = `${autoWidth}px`;
                }
            });

            if (cols !== undefined) {
                cols.forEach(col => {
                    col.resizeGrid();
                });
            }
        });

        if (this.col.parentElement !== undefined && this.col.parentElement.offsetHeight) {
            const remainingHeight = this.col.parentElement.offsetHeight - totalHeight;
            const autoHeight = remainingHeight / autoHeightRows.length;
            autoHeightRows.forEach(row => {
                row.style.height = `${autoHeight}px`;
            });
        }
    }
}