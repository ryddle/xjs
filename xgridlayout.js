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
        }`;
    #grid = [];
    constructor(_id, _config) {
        this.config = _config;
        xjs.withcss(this.#css);
        this.gridcontainer = xjs.withnew("div", _id);
        this.gridcontainer.className = 'grid-container';
        document.body.appendChild(this.gridcontainer);

        this.rows = [];

        let _self = this;
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'style') {
                    _self.resizeGrid();
                }
            });
        });

        // Notify me of style changes
        this.observerConfig = {
            attributes: true,
            attributeFilter: ["style"]
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

    addRows(...rows_) {
        rows_.forEach(row => {
            if (row instanceof xgridRow) {
                this.gridcontainer.appendChild(row.el());
                this.observer.observe(row.el(), this.observerConfig);
                this.rows.push(row);
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

            if (_row.options.mediaOpts !== undefined) {

            }

            if (row.style.display === 'none') {
                return;
            }
            // calcular el alto de la fila en px
            if (row.classList.contains('auto-height')) {
                autoHeightRows.push(row);
            } else if (row.classList.contains('fit-height')) {
                totalHeight += _row.height();
            } else if (row.style.height.endsWith('px')) {
                totalHeight += parseInt(row.style.height);
            } else if (row.style.height.endsWith('%')) {
                totalHeight += this.gridcontainer.offsetHeight * (parseInt(row.style.height) / 100);
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
                            if (colMediaOpt.width !== undefined) {
                                cell.setWidth(colMediaOpt.width);
                            }
                            if (colMediaOpt.display !== undefined) {
                                cell.style.display = colMediaOpt.display;
                            }
                        }
                    }

                    if (cell.style.display === 'none') {
                        //return;
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
                    } else {
                        console.log('Same element');
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
        this.options = {style: {}, id: undefined, mediaOpts: undefined};
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

        return this;
    }

    el() {
        return this.row;
    }

    static get(grid, height = 'auto', style = {}, id) {
        return new xgridRow(grid, height, style, id);
    }

    addCol(width = 'auto', style = {}, id) {
        const _col = xgridCol.get(width, style, id);
        this.row.appendChild(_col.el());
        this.cols.push(_col);
        return this;
    }

    addCols(...cols_) {
        cols_.forEach(col => {
            if (col instanceof xgridCol) {
                this.cols.push(col);
                this.row.appendChild(col.el());
            }
        });
        return this;
    }

    height() {
        return Math.max(...this.cols.map(col => col.el().offsetHeight));
    }
}

class xgridCol {
    #has_elements = false;
    constructor(grid, width = 'auto', options = {}) {
        this.options = options;
        if (grid instanceof xgridlayout) {
            this.grid = grid;
        } else {
            throw new Error('grid must be an instance of xgridlayout');
        }

        this.rows = [];

        this.col = xjs.withnew(xjs.htmlElements.div);
        this.col.className = 'grid-col';
        if (width === 'auto') {
            this.col.classList.add('auto-width');
        }
        this.col.style.width = width;
        Object.assign(this.col.style, this.options.style);

        if (this.options.id) {
            this.col.id = this.options.id;
        }

        let _self = this;

        this.col.parent = function () {
            return _self;
        };

        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'style') {
                    _self.grid.resizeGrid(_self);
                }
            });
        });

        // Notify me of style changes
        this.observerConfig = {
            attributes: true,
            attributeFilter: ["style"]
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

    addRow(height = 'auto', style = {}, id) {
        if (this.#has_elements || (this.col.children.length > 0 && this.rows.length == 0)) {
            throw new Error('xgridCol can only have xgridRow or Elements added to it, but not both');
        }
        const _row = xgridRow.get(this.grid, height, style, id);
        this.col.appendChild(_row.el());
        this.rows.push(_row);
        return this;
    }

    addRows(...rows_) {
        if (this.#has_elements || (this.col.children.length > 0 && this.rows.length == 0)) {
            throw new Error('xgridCol can only have xgridRow or Elements added to it, but not both');
        }
        rows_.forEach(row => {
            if (row instanceof xgridRow) {
                this.rows.push(row);
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
            // calcular el alto de la fila en px
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

            const remainingWidth = row.offsetWidth - totalWidth;// - (document.body.hasScrollBar() ? 17 : 0);
            const autoWidth = remainingWidth / autoWidthCells.length;

            autoWidthCells.forEach(cell => {
                cell.style.width = `${autoWidth}px`;
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