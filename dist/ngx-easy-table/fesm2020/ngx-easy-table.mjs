import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, ChangeDetectionStrategy, ViewChild, Input, Output, HostListener, ViewChildren, Pipe, TemplateRef, ContentChild, NgModule } from '@angular/core';
import * as i3$1 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { from, Subject } from 'rxjs';
import { groupBy, mergeMap, reduce, takeUntil, throttleTime, filter } from 'rxjs/operators';
import * as i1 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import * as i2 from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';

var STYLE;
(function (STYLE) {
    STYLE["TINY"] = "tiny";
    STYLE["BIG"] = "big";
    STYLE["NORMAL"] = "normal";
})(STYLE || (STYLE = {}));
var THEME;
(function (THEME) {
    THEME["LIGHT"] = "light";
    THEME["DARK"] = "dark";
})(THEME || (THEME = {}));

var Event;
(function (Event) {
    Event["onPagination"] = "onPagination";
    Event["onOrder"] = "onOrder";
    Event["onGlobalSearch"] = "onGlobalSearch";
    Event["onSearch"] = "onSearch";
    Event["onClick"] = "onClick";
    Event["onDoubleClick"] = "onDoubleClick";
    Event["onCheckboxSelect"] = "onCheckboxSelect";
    Event["onRadioSelect"] = "onRadioSelect";
    Event["onCheckboxToggle"] = "onCheckboxToggle";
    Event["onSelectAll"] = "onSelectAll";
    Event["onInfiniteScrollEnd"] = "onInfiniteScrollEnd";
    Event["onColumnResizeMouseDown"] = "onColumnResizeMouseDown";
    Event["onColumnResizeMouseUp"] = "onColumnResizeMouseUp";
    Event["onRowDrop"] = "onRowDrop";
    Event["onReorderStart"] = "onReorderStart";
    Event["onRowCollapsedShow"] = "onRowCollapsedShow";
    Event["onRowCollapsedHide"] = "onRowCollapsedHide";
    Event["onRowContextMenu"] = "onRowContextMenu";
})(Event || (Event = {}));

var API;
(function (API) {
    API["rowContextMenuClicked"] = "rowContextMenuClicked";
    API["setInputValue"] = "setInputValue";
    API["toggleRowIndex"] = "toggleRowIndex";
    API["toggleCheckbox"] = "toggleCheckbox";
    API["onGlobalSearch"] = "onGlobalSearch";
    API["setPaginationCurrentPage"] = "setPaginationCurrentPage";
    API["getPaginationCurrentPage"] = "getPaginationCurrentPage";
    API["getPaginationTotalItems"] = "getPaginationTotalItems";
    API["getNumberOfRowsPerPage"] = "getNumberOfRowsPerPage";
    API["getPaginationLastPage"] = "getPaginationLastPage";
    API["setPaginationRange"] = "setPaginationRange";
    API["setPaginationPreviousLabel"] = "setPaginationPreviousLabel";
    API["setPaginationNextLabel"] = "setPaginationNextLabel";
    API["setPaginationDisplayLimit"] = "setPaginationDisplayLimit";
    API["setTableClass"] = "setTableClass";
    API["setRowClass"] = "setRowClass";
    API["setCellClass"] = "setCellClass";
    API["setRowStyle"] = "setRowStyle";
    API["setCellStyle"] = "setCellStyle";
    API["setLoader"] = "setLoader";
    API["sortBy"] = "sortBy";
})(API || (API = {}));

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
const DefaultConfig = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    paginationEnabled: true,
    clickEvent: true,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    radio: false,
    resizeColumn: false,
    fixedColumnWidth: true,
    horizontalScroll: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    threeWaySort: false,
    onDragOver: false,
    tableLayout: {
        style: STYLE.NORMAL,
        theme: THEME.LIGHT,
        borderless: false,
        hover: true,
        striped: false,
    },
};
class DefaultConfigService {
}
DefaultConfigService.config = DefaultConfig;
DefaultConfigService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: DefaultConfigService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DefaultConfigService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: DefaultConfigService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: DefaultConfigService, decorators: [{
            type: Injectable
        }] });

class GroupRowsService {
    static doGroupRows(data, groupRowsBy) {
        const grouped = [];
        from(data)
            .pipe(groupBy((row) => row[groupRowsBy]), mergeMap((group) => group.pipe(reduce((acc, curr) => [...acc, curr], []))))
            .subscribe((row) => grouped.push(row));
        return grouped;
    }
}
GroupRowsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GroupRowsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
GroupRowsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GroupRowsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GroupRowsService, decorators: [{
            type: Injectable
        }] });

/* eslint-disable */
class StyleService {
    setRowClass(val) {
        const selector = `#table > tbody > tr:nth-child(${val.row})`;
        const row = document.querySelector(selector);
        if (row) {
            row.classList.add(val.className);
        }
    }
    setCellClass(val) {
        const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
        const cell = document.querySelector(selector);
        if (cell) {
            cell.classList.add(val.className);
        }
    }
    setRowStyle(val) {
        const selector = `#table > tbody > tr:nth-child(${val.row})`;
        const row = document.querySelector(selector);
        if (row) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            row.style[val.attr] = val.value;
        }
    }
    setCellStyle(val) {
        const selector = `#table > tbody > tr:nth-child(${val.row}) > td:nth-child(${val.cell})`;
        const cell = document.querySelector(selector);
        if (cell) {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            cell.style[val.attr] = val.value;
        }
    }
    pinnedWidth(pinned, column) {
        if (pinned) {
            return 150 * column + 'px';
        }
    }
}
StyleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: StyleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
StyleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: StyleService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: StyleService, decorators: [{
            type: Injectable
        }] });

class PaginationComponent {
    constructor() {
        this.updateRange = new EventEmitter();
        this.ranges = [5, 10, 25, 50, 100];
        this.showRange = false;
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = 'You are on page';
        this.previousLabel = '';
        this.nextLabel = '';
        this.directionLinks = true;
    }
    onClick(targetElement) {
        if (this.paginationRange && !this.paginationRange.nativeElement.contains(targetElement)) {
            this.showRange = false;
        }
    }
    ngOnChanges(changes) {
        const { config } = changes;
        if (config && config.currentValue) {
            this.selectedLimit = this.config.rows;
        }
    }
    onPageChange(page) {
        this.updateRange.emit({
            page,
            limit: this.selectedLimit,
        });
    }
    changeLimit(limit, callFromAPI) {
        if (!callFromAPI) {
            this.showRange = !this.showRange;
        }
        this.selectedLimit = limit;
        this.updateRange.emit({
            page: 1,
            limit,
        });
    }
}
PaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: PaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: PaginationComponent, selector: "pagination", inputs: { pagination: "pagination", config: "config", id: "id" }, outputs: { updateRange: "updateRange" }, host: { listeners: { "document:click": "onClick($event.target)" } }, viewQueries: [{ propertyName: "paginationDirective", first: true, predicate: ["paginationDirective"], descendants: true }, { propertyName: "paginationRange", first: true, predicate: ["paginationRange"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"ngx-pagination-wrapper\"\n  [style.display]=\"config.paginationEnabled ? '' : 'none'\"\n  [class.ngx-table__table--dark-pagination-wrapper]=\"config.tableLayout.theme === 'dark'\"\n>\n  <div class=\"ngx-pagination-steps\">\n    <pagination-template\n      #paginationDirective=\"paginationApi\"\n      id=\"pagination-controls\"\n      [id]=\"id\"\n      [class.ngx-table__table--dark-pagination]=\"config.tableLayout.theme === 'dark'\"\n      [maxSize]=\"config.paginationMaxSize || 5\"\n      (pageChange)=\"onPageChange($event)\"\n    >\n      <ul\n        class=\"ngx-pagination\"\n        role=\"navigation\"\n        [attr.aria-label]=\"screenReaderPaginationLabel\"\n        [class.responsive]=\"true\"\n      >\n        <li\n          class=\"pagination-previous\"\n          [class.disabled]=\"paginationDirective.isFirstPage()\"\n          *ngIf=\"directionLinks\"\n        >\n          <a\n            tabindex=\"0\"\n            *ngIf=\"1 < paginationDirective.getCurrent()\"\n            (keyup.enter)=\"paginationDirective.previous()\"\n            (click)=\"paginationDirective.previous()\"\n            [attr.aria-label]=\"previousLabel + ' ' + screenReaderPageLabel\"\n          >\n            {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </a>\n          <span *ngIf=\"paginationDirective.isFirstPage()\">\n            {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </span>\n        </li>\n        <li class=\"small-screen\">\n          {{ paginationDirective.getCurrent() }} / {{ paginationDirective.getLastPage() }}\n        </li>\n        <li\n          [class.current]=\"paginationDirective.getCurrent() === page.value\"\n          [class.ellipsis]=\"page.label === '...'\"\n          *ngFor=\"let page of paginationDirective.pages\"\n        >\n          <a\n            tabindex=\"0\"\n            (keyup.enter)=\"paginationDirective.setCurrent(page.value)\"\n            (click)=\"paginationDirective.setCurrent(page.value)\"\n            *ngIf=\"paginationDirective.getCurrent() !== page.value\"\n          >\n            <span class=\"show-for-sr\">{{ screenReaderPageLabel }} </span>\n            <span>{{ page.label }}</span>\n          </a>\n          <ng-container *ngIf=\"paginationDirective.getCurrent() === page.value\">\n            <span class=\"show-for-sr\">{{ screenReaderCurrentLabel }} </span>\n            <span>{{ page.label }}</span>\n          </ng-container>\n        </li>\n        <li\n          class=\"pagination-next\"\n          [class.disabled]=\"paginationDirective.isLastPage()\"\n          *ngIf=\"directionLinks\"\n        >\n          <a\n            tabindex=\"0\"\n            *ngIf=\"!paginationDirective.isLastPage()\"\n            (keyup.enter)=\"paginationDirective.next()\"\n            (click)=\"paginationDirective.next()\"\n            [attr.aria-label]=\"nextLabel + ' ' + screenReaderPageLabel\"\n          >\n            {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </a>\n          <span *ngIf=\"paginationDirective.isLastPage()\">\n            {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </span>\n        </li>\n      </ul>\n    </pagination-template>\n  </div>\n  <div\n    class=\"ngx-pagination-range\"\n    #paginationRange\n    [class.ngx-table__table--dark-pagination-range]=\"config.tableLayout.theme === 'dark'\"\n    *ngIf=\"config.paginationRangeEnabled\"\n  >\n    <div class=\"ngx-dropdown ngx-pagination-range-dropdown\" id=\"rowAmount\">\n      <div class=\"ngx-btn-group\">\n        <div class=\"ngx-pagination-range-dropdown-button\" (click)=\"showRange = !showRange\">\n          {{selectedLimit}} <i class=\"ngx-icon ngx-icon-arrow-down\"></i>\n        </div>\n        <ul class=\"ngx-menu\" *ngIf=\"showRange\">\n          <li\n            class=\"ngx-pagination-range-dropdown-button-item\"\n            [class.ngx-pagination-range--selected]=\"limit === selectedLimit\"\n            (click)=\"changeLimit(limit, false)\"\n            *ngFor=\"let limit of ranges\"\n          >\n            <span>{{limit}}</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.PaginationControlsDirective, selector: "pagination-template,[pagination-template]", inputs: ["id", "maxSize"], outputs: ["pageChange", "pageBoundsCorrection"], exportAs: ["paginationApi"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'pagination', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ngx-pagination-wrapper\"\n  [style.display]=\"config.paginationEnabled ? '' : 'none'\"\n  [class.ngx-table__table--dark-pagination-wrapper]=\"config.tableLayout.theme === 'dark'\"\n>\n  <div class=\"ngx-pagination-steps\">\n    <pagination-template\n      #paginationDirective=\"paginationApi\"\n      id=\"pagination-controls\"\n      [id]=\"id\"\n      [class.ngx-table__table--dark-pagination]=\"config.tableLayout.theme === 'dark'\"\n      [maxSize]=\"config.paginationMaxSize || 5\"\n      (pageChange)=\"onPageChange($event)\"\n    >\n      <ul\n        class=\"ngx-pagination\"\n        role=\"navigation\"\n        [attr.aria-label]=\"screenReaderPaginationLabel\"\n        [class.responsive]=\"true\"\n      >\n        <li\n          class=\"pagination-previous\"\n          [class.disabled]=\"paginationDirective.isFirstPage()\"\n          *ngIf=\"directionLinks\"\n        >\n          <a\n            tabindex=\"0\"\n            *ngIf=\"1 < paginationDirective.getCurrent()\"\n            (keyup.enter)=\"paginationDirective.previous()\"\n            (click)=\"paginationDirective.previous()\"\n            [attr.aria-label]=\"previousLabel + ' ' + screenReaderPageLabel\"\n          >\n            {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </a>\n          <span *ngIf=\"paginationDirective.isFirstPage()\">\n            {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </span>\n        </li>\n        <li class=\"small-screen\">\n          {{ paginationDirective.getCurrent() }} / {{ paginationDirective.getLastPage() }}\n        </li>\n        <li\n          [class.current]=\"paginationDirective.getCurrent() === page.value\"\n          [class.ellipsis]=\"page.label === '...'\"\n          *ngFor=\"let page of paginationDirective.pages\"\n        >\n          <a\n            tabindex=\"0\"\n            (keyup.enter)=\"paginationDirective.setCurrent(page.value)\"\n            (click)=\"paginationDirective.setCurrent(page.value)\"\n            *ngIf=\"paginationDirective.getCurrent() !== page.value\"\n          >\n            <span class=\"show-for-sr\">{{ screenReaderPageLabel }} </span>\n            <span>{{ page.label }}</span>\n          </a>\n          <ng-container *ngIf=\"paginationDirective.getCurrent() === page.value\">\n            <span class=\"show-for-sr\">{{ screenReaderCurrentLabel }} </span>\n            <span>{{ page.label }}</span>\n          </ng-container>\n        </li>\n        <li\n          class=\"pagination-next\"\n          [class.disabled]=\"paginationDirective.isLastPage()\"\n          *ngIf=\"directionLinks\"\n        >\n          <a\n            tabindex=\"0\"\n            *ngIf=\"!paginationDirective.isLastPage()\"\n            (keyup.enter)=\"paginationDirective.next()\"\n            (click)=\"paginationDirective.next()\"\n            [attr.aria-label]=\"nextLabel + ' ' + screenReaderPageLabel\"\n          >\n            {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </a>\n          <span *ngIf=\"paginationDirective.isLastPage()\">\n            {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n          </span>\n        </li>\n      </ul>\n    </pagination-template>\n  </div>\n  <div\n    class=\"ngx-pagination-range\"\n    #paginationRange\n    [class.ngx-table__table--dark-pagination-range]=\"config.tableLayout.theme === 'dark'\"\n    *ngIf=\"config.paginationRangeEnabled\"\n  >\n    <div class=\"ngx-dropdown ngx-pagination-range-dropdown\" id=\"rowAmount\">\n      <div class=\"ngx-btn-group\">\n        <div class=\"ngx-pagination-range-dropdown-button\" (click)=\"showRange = !showRange\">\n          {{selectedLimit}} <i class=\"ngx-icon ngx-icon-arrow-down\"></i>\n        </div>\n        <ul class=\"ngx-menu\" *ngIf=\"showRange\">\n          <li\n            class=\"ngx-pagination-range-dropdown-button-item\"\n            [class.ngx-pagination-range--selected]=\"limit === selectedLimit\"\n            (click)=\"changeLimit(limit, false)\"\n            *ngFor=\"let limit of ranges\"\n          >\n            <span>{{limit}}</span>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n" }]
        }], propDecorators: { paginationDirective: [{
                type: ViewChild,
                args: ['paginationDirective']
            }], paginationRange: [{
                type: ViewChild,
                args: ['paginationRange']
            }], pagination: [{
                type: Input
            }], config: [{
                type: Input
            }], id: [{
                type: Input
            }], updateRange: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });

class HeaderComponent {
    constructor() {
        this.update = new EventEmitter();
    }
    unifyKey(key) {
        return key.replace('.', '_');
    }
    onSearch(input) {
        this.update.emit([{ value: input.value, key: this.column.key }]);
    }
}
HeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
HeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: HeaderComponent, selector: "table-header", inputs: { column: "column" }, outputs: { update: "update" }, ngImport: i0, template: "<label for=\"search_{{ unifyKey(column.key) }}\">\n  <input\n    type=\"text\"\n    id=\"search_{{ unifyKey(column.key) }}\"\n    aria-label=\"Search\"\n    placeholder=\"{{ column.placeholder ? column.placeholder : column.title }}\"\n    class=\"ngx-table__header-search\"\n    #input\n    (input)=\"onSearch(input)\"\n  />\n</label>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'table-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label for=\"search_{{ unifyKey(column.key) }}\">\n  <input\n    type=\"text\"\n    id=\"search_{{ unifyKey(column.key) }}\"\n    aria-label=\"Search\"\n    placeholder=\"{{ column.placeholder ? column.placeholder : column.title }}\"\n    class=\"ngx-table__header-search\"\n    #input\n    (input)=\"onSearch(input)\"\n  />\n</label>\n" }]
        }], propDecorators: { column: [{
                type: Input
            }], update: [{
                type: Output
            }] } });

class TableTHeadComponent {
    constructor(styleService) {
        this.styleService = styleService;
        this.menuActive = false;
        this.openedHeaderActionTemplate = null;
        this.onSelectAllBinded = this.onSelectAll.bind(this);
        this.filter = new EventEmitter();
        this.order = new EventEmitter();
        this.selectAll = new EventEmitter();
        this.event = new EventEmitter();
    }
    onClick(targetElement) {
        if (this.additionalActionMenu &&
            !this.additionalActionMenu.nativeElement.contains(targetElement)) {
            this.menuActive = false;
        }
        // if click outside the header then close opened Header Action Template
        if (this.openedHeaderActionTemplate &&
            // if no header have the clicked point
            !this.headerDropdown.toArray().some((ref) => ref.nativeElement.contains(targetElement))) {
            this.openedHeaderActionTemplate = null;
        }
    }
    getColumnDefinition(column) {
        return column.searchEnabled || typeof column.searchEnabled === 'undefined';
    }
    orderBy(column) {
        this.order.emit(column);
    }
    isOrderEnabled(column) {
        const columnOrderEnabled = column.orderEnabled === undefined ? true : !!column.orderEnabled;
        return this.config.orderEnabled && columnOrderEnabled;
    }
    columnDrop(event) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
    onSearch($event) {
        this.filter.emit($event);
    }
    getColumnWidth(column) {
        if (column.width) {
            return column.width;
        }
        return this.config.fixedColumnWidth ? 100 / this.columns.length + '%' : null;
    }
    onSelectAll() {
        this.selectAll.emit();
    }
    onMouseDown(event, th) {
        if (!this.config.resizeColumn) {
            return;
        }
        this.th = th;
        this.startOffset = th.offsetWidth - event.pageX;
        this.event.emit({
            event: Event.onColumnResizeMouseDown,
            value: event,
        });
    }
    onMouseMove(event) {
        if (!this.config.resizeColumn) {
            return;
        }
        if (this.th && this.th.style) {
            this.th.style.width = this.startOffset + event.pageX + 'px';
            this.th.style.cursor = 'col-resize';
            this.th.style['user-select'] = 'none';
        }
    }
    onMouseUp(event) {
        if (!this.config.resizeColumn) {
            return;
        }
        this.event.emit({
            event: Event.onColumnResizeMouseUp,
            value: event,
        });
        this.th.style.cursor = 'default';
        this.th = undefined;
    }
    showHeaderActionTemplateMenu(column) {
        if (!column.headerActionTemplate) {
            console.error('Column [headerActionTemplate] property not defined');
        }
        if (this.openedHeaderActionTemplate === column.key) {
            this.openedHeaderActionTemplate = null;
            return;
        }
        this.openedHeaderActionTemplate = column.key;
    }
    showMenu() {
        if (!this.additionalActionsTemplate) {
            console.error('[additionalActionsTemplate] property not defined');
        }
        this.menuActive = !this.menuActive;
    }
}
TableTHeadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TableTHeadComponent, deps: [{ token: StyleService }], target: i0.ɵɵFactoryTarget.Component });
TableTHeadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: TableTHeadComponent, selector: "[table-thead]", inputs: { config: "config", columns: "columns", sortKey: "sortKey", sortState: "sortState", selectAllTemplate: "selectAllTemplate", filtersTemplate: "filtersTemplate", additionalActionsTemplate: "additionalActionsTemplate" }, outputs: { filter: "filter", order: "order", selectAll: "selectAll", event: "event" }, host: { listeners: { "document:click": "onClick($event.target)" } }, providers: [StyleService], viewQueries: [{ propertyName: "th", first: true, predicate: ["th"], descendants: true }, { propertyName: "additionalActionMenu", first: true, predicate: ["additionalActionMenu"], descendants: true }, { propertyName: "headerDropdown", predicate: ["headerDropdown"], descendants: true }], ngImport: i0, template: "<tr class=\"ngx-table__header\" *ngIf=\"config.headerEnabled && !config.columnReorder\">\n  <th *ngIf=\"config.checkboxes || config.radio\" [style.width]=\"'3%'\">\n    <ng-container\n      *ngIf=\"selectAllTemplate && config.checkboxes\"\n      [ngTemplateOutlet]=\"selectAllTemplate\"\n      [ngTemplateOutletContext]=\"{ $implicit: onSelectAllBinded }\"\n    >\n    </ng-container>\n    <label\n      class=\"ngx-form-checkbox\"\n      for=\"selectAllCheckboxes\"\n      *ngIf=\"!selectAllTemplate && config.checkboxes\"\n    >\n      <input type=\"checkbox\" id=\"selectAllCheckboxes\" (change)=\"onSelectAll()\" />\n      <em class=\"ngx-form-icon\" id=\"selectAllCheckbox\"></em>\n    </label>\n  </th>\n  <ng-container *ngFor=\"let column of columns; let colIndex = index; let last = last\">\n    <th\n      class=\"ngx-table__header-cell\"\n      [class.pinned-left]=\"column.pinned\"\n      [ngClass]=\"column.cssClass && column.cssClass.includeHeader ? column.cssClass.name : ''\"\n      [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n      #th\n      [style.width]=\"getColumnWidth(column)\"\n      (mousedown)=\"onMouseDown($event, th)\"\n      (mouseup)=\"onMouseUp($event)\"\n      (mousemove)=\"onMouseMove($event)\"\n    >\n      <div\n        (click)=\"orderBy(column)\"\n        style=\"display: inline\"\n        [class.pointer]=\"isOrderEnabled(column)\"\n      >\n        <div class=\"ngx-table__header-title\">\n          {{ column.title }}<span>&nbsp;</span>\n          <em class=\"ngx-icon ngx-icon-pin\" *ngIf=\"column.pinned\"></em>\n          <div [style.display]=\"config.orderEnabled ? 'inline' : 'none'\">\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'asc'\"\n              class=\"ngx-icon ngx-icon-arrow-up\"\n            >\n            </em>\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'desc'\"\n              class=\"ngx-icon ngx-icon-arrow-down\"\n            >\n            </em>\n          </div>\n        </div>\n      </div>\n      <div class=\"ngx-dropdown\" *ngIf=\"!!column.headerActionTemplate\" #headerDropdown>\n        <a class=\"ngx-btn ngx-btn-link\" (click)=\"showHeaderActionTemplateMenu(column)\">\n          <span class=\"ngx-icon ngx-icon-more\"></span>\n        </a>\n        <div\n          class=\"ngx-menu ngx-table__table-menu\"\n          *ngIf=\"column.key === openedHeaderActionTemplate\"\n        >\n          <ng-container [ngTemplateOutlet]=\"column.headerActionTemplate\"> </ng-container>\n        </div>\n      </div>\n      <div class=\"ngx-table__column-resizer\" *ngIf=\"config.resizeColumn && !last\"></div>\n    </th>\n  </ng-container>\n  <th\n    *ngIf=\"\n      config.additionalActions ||\n      config.detailsTemplate ||\n      config.collapseAllRows ||\n      config.groupRows\n    \"\n    class=\"ngx-table__header-cell-additional-actions\"\n  >\n    <div class=\"ngx-dropdown\" #additionalActionMenu *ngIf=\"config.additionalActions\">\n      <a class=\"ngx-btn ngx-btn-link\" (click)=\"showMenu()\">\n        <span class=\"ngx-icon ngx-icon-menu\"></span>\n      </a>\n      <ul class=\"ngx-menu ngx-table__table-menu\" *ngIf=\"menuActive\">\n        <ng-container\n          *ngIf=\"additionalActionsTemplate\"\n          [ngTemplateOutlet]=\"additionalActionsTemplate\"\n        >\n        </ng-container>\n      </ul>\n    </div>\n  </th>\n</tr>\n<tr\n  class=\"ngx-table__header ngx-table__header--draggable\"\n  *ngIf=\"config.headerEnabled && config.columnReorder\"\n  cdkDropList\n  cdkDropListOrientation=\"horizontal\"\n  (cdkDropListDropped)=\"columnDrop($event)\"\n>\n  <th *ngIf=\"config.checkboxes || config.radio\" [style.width]=\"'3%'\">\n    <ng-container\n      *ngIf=\"selectAllTemplate && config.checkboxes\"\n      [ngTemplateOutlet]=\"selectAllTemplate\"\n      [ngTemplateOutletContext]=\"{ $implicit: onSelectAllBinded }\"\n    >\n    </ng-container>\n    <label\n      class=\"ngx-form-checkbox\"\n      for=\"selectAllCheckboxes\"\n      *ngIf=\"!selectAllTemplate && config.checkboxes\"\n    >\n      <input type=\"checkbox\" id=\"selectAllCheckboxesDrag\" (change)=\"onSelectAll()\" />\n      <em class=\"ngx-form-icon\" id=\"selectAllCheckboxDrag\"></em>\n    </label>\n  </th>\n  <ng-container *ngFor=\"let column of columns; let colIndex = index; let last = last\">\n    <th\n      class=\"ngx-table__header-cell ngx-table__header-cell--draggable\"\n      cdkDragLockAxis=\"x\"\n      cdkDrag\n      [cdkDragStartDelay]=\"config.reorderDelay || 0\"\n      [class.pinned-left]=\"column.pinned\"\n      [ngClass]=\"column.cssClass && column.cssClass.includeHeader ? column.cssClass.name : ''\"\n      [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n      #th\n      [style.width]=\"getColumnWidth(column)\"\n      (mousedown)=\"onMouseDown($event, th)\"\n      (mouseup)=\"onMouseUp($event)\"\n      (mousemove)=\"onMouseMove($event)\"\n    >\n      <div\n        (click)=\"orderBy(column)\"\n        style=\"display: inline\"\n        cdkDragHandle\n        [class.pointer]=\"isOrderEnabled(column)\"\n      >\n        <div class=\"ngx-table__header-title\">\n          {{ column.title }}<span>&nbsp;</span>\n          <em class=\"ngx-icon ngx-icon-pin\" *ngIf=\"column.pinned\"></em>\n          <div [style.display]=\"config.orderEnabled ? 'inline' : 'none'\">\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'asc'\"\n              class=\"ngx-icon ngx-icon-arrow-up\"\n            >\n            </em>\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'desc'\"\n              class=\"ngx-icon ngx-icon-arrow-down\"\n            >\n            </em>\n          </div>\n        </div>\n      </div>\n      <div class=\"ngx-dropdown\" *ngIf=\"!!column.headerActionTemplate\" #headerDropdown>\n        <a class=\"ngx-btn ngx-btn-link\" (click)=\"showHeaderActionTemplateMenu(column)\">\n          <span class=\"ngx-icon ngx-icon-more\"></span>\n        </a>\n        <div\n          class=\"ngx-menu ngx-table__table-menu\"\n          *ngIf=\"column.key === openedHeaderActionTemplate\"\n        >\n          <ng-container [ngTemplateOutlet]=\"column.headerActionTemplate\"> </ng-container>\n        </div>\n      </div>\n      <div class=\"ngx-table__column-resizer\" *ngIf=\"config.resizeColumn && !last\"></div>\n    </th>\n  </ng-container>\n  <th\n    *ngIf=\"\n      config.additionalActions ||\n      config.detailsTemplate ||\n      config.collapseAllRows ||\n      config.groupRows\n    \"\n    class=\"ngx-table__header-cell-additional-actions\"\n  >\n    <div class=\"ngx-dropdown\" #additionalActionMenu *ngIf=\"config.additionalActions\">\n      <a class=\"ngx-btn ngx-btn-link\" (click)=\"showMenu()\">\n        <span class=\"ngx-icon ngx-icon-menu\"></span>\n      </a>\n      <ul class=\"ngx-menu ngx-table__table-menu\" *ngIf=\"menuActive\">\n        <ng-container\n          *ngIf=\"additionalActionsTemplate\"\n          [ngTemplateOutlet]=\"additionalActionsTemplate\"\n        >\n        </ng-container>\n      </ul>\n    </div>\n  </th>\n</tr>\n<tr\n  [style.display]=\"config.searchEnabled && !filtersTemplate ? 'table-row' : 'none'\"\n  class=\"ngx-table__search-header\"\n>\n  <th *ngIf=\"config.checkboxes || config.radio\"></th>\n  <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n    <th\n      [ngClass]=\"column.cssClass && column.cssClass.includeHeader ? column.cssClass.name : ''\"\n      [class.pinned-left]=\"column.pinned\"\n      [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n    >\n      <table-header\n        *ngIf=\"getColumnDefinition(column)\"\n        (update)=\"onSearch($event)\"\n        [column]=\"column\"\n      >\n      </table-header>\n    </th>\n  </ng-container>\n  <th *ngIf=\"config.additionalActions || config.detailsTemplate\"></th>\n</tr>\n<ng-container *ngIf=\"filtersTemplate\">\n  <tr>\n    <ng-container [ngTemplateOutlet]=\"filtersTemplate\"> </ng-container>\n  </tr>\n</ng-container>\n", styles: [".cdk-drag-preview{text-align:left;padding-top:9px;padding-left:4px;color:#50596c;border:1px solid #e7e9ed}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i3$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i3$1.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { kind: "component", type: HeaderComponent, selector: "table-header", inputs: ["column"], outputs: ["update"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TableTHeadComponent, decorators: [{
            type: Component,
            args: [{ selector: '[table-thead]', changeDetection: ChangeDetectionStrategy.OnPush, providers: [StyleService], template: "<tr class=\"ngx-table__header\" *ngIf=\"config.headerEnabled && !config.columnReorder\">\n  <th *ngIf=\"config.checkboxes || config.radio\" [style.width]=\"'3%'\">\n    <ng-container\n      *ngIf=\"selectAllTemplate && config.checkboxes\"\n      [ngTemplateOutlet]=\"selectAllTemplate\"\n      [ngTemplateOutletContext]=\"{ $implicit: onSelectAllBinded }\"\n    >\n    </ng-container>\n    <label\n      class=\"ngx-form-checkbox\"\n      for=\"selectAllCheckboxes\"\n      *ngIf=\"!selectAllTemplate && config.checkboxes\"\n    >\n      <input type=\"checkbox\" id=\"selectAllCheckboxes\" (change)=\"onSelectAll()\" />\n      <em class=\"ngx-form-icon\" id=\"selectAllCheckbox\"></em>\n    </label>\n  </th>\n  <ng-container *ngFor=\"let column of columns; let colIndex = index; let last = last\">\n    <th\n      class=\"ngx-table__header-cell\"\n      [class.pinned-left]=\"column.pinned\"\n      [ngClass]=\"column.cssClass && column.cssClass.includeHeader ? column.cssClass.name : ''\"\n      [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n      #th\n      [style.width]=\"getColumnWidth(column)\"\n      (mousedown)=\"onMouseDown($event, th)\"\n      (mouseup)=\"onMouseUp($event)\"\n      (mousemove)=\"onMouseMove($event)\"\n    >\n      <div\n        (click)=\"orderBy(column)\"\n        style=\"display: inline\"\n        [class.pointer]=\"isOrderEnabled(column)\"\n      >\n        <div class=\"ngx-table__header-title\">\n          {{ column.title }}<span>&nbsp;</span>\n          <em class=\"ngx-icon ngx-icon-pin\" *ngIf=\"column.pinned\"></em>\n          <div [style.display]=\"config.orderEnabled ? 'inline' : 'none'\">\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'asc'\"\n              class=\"ngx-icon ngx-icon-arrow-up\"\n            >\n            </em>\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'desc'\"\n              class=\"ngx-icon ngx-icon-arrow-down\"\n            >\n            </em>\n          </div>\n        </div>\n      </div>\n      <div class=\"ngx-dropdown\" *ngIf=\"!!column.headerActionTemplate\" #headerDropdown>\n        <a class=\"ngx-btn ngx-btn-link\" (click)=\"showHeaderActionTemplateMenu(column)\">\n          <span class=\"ngx-icon ngx-icon-more\"></span>\n        </a>\n        <div\n          class=\"ngx-menu ngx-table__table-menu\"\n          *ngIf=\"column.key === openedHeaderActionTemplate\"\n        >\n          <ng-container [ngTemplateOutlet]=\"column.headerActionTemplate\"> </ng-container>\n        </div>\n      </div>\n      <div class=\"ngx-table__column-resizer\" *ngIf=\"config.resizeColumn && !last\"></div>\n    </th>\n  </ng-container>\n  <th\n    *ngIf=\"\n      config.additionalActions ||\n      config.detailsTemplate ||\n      config.collapseAllRows ||\n      config.groupRows\n    \"\n    class=\"ngx-table__header-cell-additional-actions\"\n  >\n    <div class=\"ngx-dropdown\" #additionalActionMenu *ngIf=\"config.additionalActions\">\n      <a class=\"ngx-btn ngx-btn-link\" (click)=\"showMenu()\">\n        <span class=\"ngx-icon ngx-icon-menu\"></span>\n      </a>\n      <ul class=\"ngx-menu ngx-table__table-menu\" *ngIf=\"menuActive\">\n        <ng-container\n          *ngIf=\"additionalActionsTemplate\"\n          [ngTemplateOutlet]=\"additionalActionsTemplate\"\n        >\n        </ng-container>\n      </ul>\n    </div>\n  </th>\n</tr>\n<tr\n  class=\"ngx-table__header ngx-table__header--draggable\"\n  *ngIf=\"config.headerEnabled && config.columnReorder\"\n  cdkDropList\n  cdkDropListOrientation=\"horizontal\"\n  (cdkDropListDropped)=\"columnDrop($event)\"\n>\n  <th *ngIf=\"config.checkboxes || config.radio\" [style.width]=\"'3%'\">\n    <ng-container\n      *ngIf=\"selectAllTemplate && config.checkboxes\"\n      [ngTemplateOutlet]=\"selectAllTemplate\"\n      [ngTemplateOutletContext]=\"{ $implicit: onSelectAllBinded }\"\n    >\n    </ng-container>\n    <label\n      class=\"ngx-form-checkbox\"\n      for=\"selectAllCheckboxes\"\n      *ngIf=\"!selectAllTemplate && config.checkboxes\"\n    >\n      <input type=\"checkbox\" id=\"selectAllCheckboxesDrag\" (change)=\"onSelectAll()\" />\n      <em class=\"ngx-form-icon\" id=\"selectAllCheckboxDrag\"></em>\n    </label>\n  </th>\n  <ng-container *ngFor=\"let column of columns; let colIndex = index; let last = last\">\n    <th\n      class=\"ngx-table__header-cell ngx-table__header-cell--draggable\"\n      cdkDragLockAxis=\"x\"\n      cdkDrag\n      [cdkDragStartDelay]=\"config.reorderDelay || 0\"\n      [class.pinned-left]=\"column.pinned\"\n      [ngClass]=\"column.cssClass && column.cssClass.includeHeader ? column.cssClass.name : ''\"\n      [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n      #th\n      [style.width]=\"getColumnWidth(column)\"\n      (mousedown)=\"onMouseDown($event, th)\"\n      (mouseup)=\"onMouseUp($event)\"\n      (mousemove)=\"onMouseMove($event)\"\n    >\n      <div\n        (click)=\"orderBy(column)\"\n        style=\"display: inline\"\n        cdkDragHandle\n        [class.pointer]=\"isOrderEnabled(column)\"\n      >\n        <div class=\"ngx-table__header-title\">\n          {{ column.title }}<span>&nbsp;</span>\n          <em class=\"ngx-icon ngx-icon-pin\" *ngIf=\"column.pinned\"></em>\n          <div [style.display]=\"config.orderEnabled ? 'inline' : 'none'\">\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'asc'\"\n              class=\"ngx-icon ngx-icon-arrow-up\"\n            >\n            </em>\n            <em\n              *ngIf=\"sortKey === column.key && this.sortState.get(sortKey) === 'desc'\"\n              class=\"ngx-icon ngx-icon-arrow-down\"\n            >\n            </em>\n          </div>\n        </div>\n      </div>\n      <div class=\"ngx-dropdown\" *ngIf=\"!!column.headerActionTemplate\" #headerDropdown>\n        <a class=\"ngx-btn ngx-btn-link\" (click)=\"showHeaderActionTemplateMenu(column)\">\n          <span class=\"ngx-icon ngx-icon-more\"></span>\n        </a>\n        <div\n          class=\"ngx-menu ngx-table__table-menu\"\n          *ngIf=\"column.key === openedHeaderActionTemplate\"\n        >\n          <ng-container [ngTemplateOutlet]=\"column.headerActionTemplate\"> </ng-container>\n        </div>\n      </div>\n      <div class=\"ngx-table__column-resizer\" *ngIf=\"config.resizeColumn && !last\"></div>\n    </th>\n  </ng-container>\n  <th\n    *ngIf=\"\n      config.additionalActions ||\n      config.detailsTemplate ||\n      config.collapseAllRows ||\n      config.groupRows\n    \"\n    class=\"ngx-table__header-cell-additional-actions\"\n  >\n    <div class=\"ngx-dropdown\" #additionalActionMenu *ngIf=\"config.additionalActions\">\n      <a class=\"ngx-btn ngx-btn-link\" (click)=\"showMenu()\">\n        <span class=\"ngx-icon ngx-icon-menu\"></span>\n      </a>\n      <ul class=\"ngx-menu ngx-table__table-menu\" *ngIf=\"menuActive\">\n        <ng-container\n          *ngIf=\"additionalActionsTemplate\"\n          [ngTemplateOutlet]=\"additionalActionsTemplate\"\n        >\n        </ng-container>\n      </ul>\n    </div>\n  </th>\n</tr>\n<tr\n  [style.display]=\"config.searchEnabled && !filtersTemplate ? 'table-row' : 'none'\"\n  class=\"ngx-table__search-header\"\n>\n  <th *ngIf=\"config.checkboxes || config.radio\"></th>\n  <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n    <th\n      [ngClass]=\"column.cssClass && column.cssClass.includeHeader ? column.cssClass.name : ''\"\n      [class.pinned-left]=\"column.pinned\"\n      [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n    >\n      <table-header\n        *ngIf=\"getColumnDefinition(column)\"\n        (update)=\"onSearch($event)\"\n        [column]=\"column\"\n      >\n      </table-header>\n    </th>\n  </ng-container>\n  <th *ngIf=\"config.additionalActions || config.detailsTemplate\"></th>\n</tr>\n<ng-container *ngIf=\"filtersTemplate\">\n  <tr>\n    <ng-container [ngTemplateOutlet]=\"filtersTemplate\"> </ng-container>\n  </tr>\n</ng-container>\n", styles: [".cdk-drag-preview{text-align:left;padding-top:9px;padding-left:4px;color:#50596c;border:1px solid #e7e9ed}\n"] }]
        }], ctorParameters: function () { return [{ type: StyleService }]; }, propDecorators: { config: [{
                type: Input
            }], columns: [{
                type: Input
            }], sortKey: [{
                type: Input
            }], sortState: [{
                type: Input
            }], selectAllTemplate: [{
                type: Input
            }], filtersTemplate: [{
                type: Input
            }], additionalActionsTemplate: [{
                type: Input
            }], filter: [{
                type: Output
            }], order: [{
                type: Output
            }], selectAll: [{
                type: Output
            }], event: [{
                type: Output
            }], th: [{
                type: ViewChild,
                args: ['th']
            }], headerDropdown: [{
                type: ViewChildren,
                args: ['headerDropdown']
            }], additionalActionMenu: [{
                type: ViewChild,
                args: ['additionalActionMenu']
            }], onClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });

class FiltersService {
    static getPath(p, o) {
        // https://github.com/dherges/ng-packagr/issues/696
        /* eslint-disable-next-line */
        const result = p.reduce((xs, x) => (xs && typeof xs[x] !== 'undefined' ? xs[x] : null), o);
        return result;
    }
}
FiltersService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: FiltersService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FiltersService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: FiltersService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: FiltersService, decorators: [{
            type: Injectable
        }] });

class SearchPipe {
    constructor() {
        this.filters = {};
    }
    transform(array, filter, filteredCountSubject, config) {
        filteredCountSubject.next(0);
        if (typeof array === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined') {
            filteredCountSubject.next(array.length);
            return array;
        }
        filter.forEach((f) => {
            this.filters[f.key] = f.value.toString().toLocaleLowerCase();
            if (Object.keys(f).length === 0 || f.value === '') {
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete this.filters[f.key];
            }
        });
        if (config && config.groupRows) {
            return array.map((arr) => this.filterGroup(arr, filteredCountSubject));
        }
        return this.filterGroup(array, filteredCountSubject);
    }
    filterGroup(array, filteredCountSubject) {
        const arr = array.filter((obj) => {
            return Object.keys(this.filters).every((c) => {
                const split = c.split('.');
                const val = FiltersService.getPath(split, obj);
                const element = typeof val === 'object' ? JSON.stringify(val) : val.toString().toLocaleLowerCase();
                const strings = this.filters[c].split(',');
                return strings.some((s) => element.indexOf(s.trim()) > -1);
            });
        });
        filteredCountSubject.next(arr.length);
        return arr;
    }
}
SearchPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: SearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
SearchPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: SearchPipe, name: "search" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: SearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'search',
                }]
        }] });

class RenderPipe {
    transform(row, key) {
        const split = key.split('.');
        return FiltersService.getPath(split, row);
    }
}
RenderPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: RenderPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RenderPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: RenderPipe, name: "render" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: RenderPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'render',
                }]
        }] });

class GlobalSearchPipe {
    transform(array, filter, filteredCountSubject) {
        filteredCountSubject.next(0);
        if (typeof array === 'undefined') {
            return;
        }
        if (typeof filter === 'undefined' || Object.keys(filter).length === 0 || filter === '') {
            filteredCountSubject.next(array.length);
            return array;
        }
        const arr = array.filter((row) => {
            const element = JSON.stringify(Object.values(row));
            const strings = filter.split(',');
            return strings.some((s) => element.toLocaleLowerCase().indexOf(s.trim().toLocaleLowerCase()) > -1);
        });
        filteredCountSubject.next(arr.length);
        return arr;
    }
}
GlobalSearchPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GlobalSearchPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
GlobalSearchPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: GlobalSearchPipe, name: "global" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: GlobalSearchPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'global',
                }]
        }] });

class SortPipe {
    constructor() {
        this.defaultArray = [];
    }
    static isNaN(aV, bV) {
        return isNaN(parseFloat(aV)) || !isFinite(aV) || isNaN(parseFloat(bV)) || !isFinite(bV);
    }
    static compare(a, b, key) {
        const split = key.split('.');
        const aPath = FiltersService.getPath(split, a);
        const bPath = FiltersService.getPath(split, b);
        const aValue = (aPath + '').toLowerCase();
        const bValue = (bPath + '').toLowerCase();
        if (SortPipe.isNaN(aPath, bPath)) {
            return aValue.localeCompare(bValue);
        }
        if (parseFloat(aPath) < parseFloat(bPath)) {
            return -1;
        }
        if (parseFloat(aPath) > parseFloat(bPath)) {
            return 1;
        }
        return 0;
    }
    transform(array, filter, config) {
        if (this.defaultArray.length === 0) {
            this.defaultArray = array;
        }
        if (!filter.key || filter.key === '') {
            return array;
        }
        if (filter.order === '') {
            return this.defaultArray;
        }
        if (filter.order === 'asc') {
            return this.sortAsc(array, filter, config);
        }
        return this.sortDesc(array, filter, config);
    }
    sortAsc(array, filter, config) {
        if (config && config.groupRows) {
            return array.map((arr) => arr.sort((a, b) => SortPipe.compare(a, b, filter.key)));
        }
        return array.sort((a, b) => SortPipe.compare(a, b, filter.key));
    }
    sortDesc(array, filter, config) {
        if (config && config.groupRows) {
            return array.map((arr) => arr.sort((a, b) => SortPipe.compare(b, a, filter.key)));
        }
        return array.sort((a, b) => SortPipe.compare(b, a, filter.key));
    }
}
SortPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: SortPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
SortPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: SortPipe, name: "sort" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: SortPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'sort',
                }]
        }] });

class BaseComponent {
    constructor(cdr, scrollDispatcher, styleService) {
        this.cdr = cdr;
        this.scrollDispatcher = scrollDispatcher;
        this.styleService = styleService;
        this.unsubscribe = new Subject();
        this.filterCount = -1;
        this.filteredCountSubject = new Subject();
        this.tableClass = null;
        this.grouped = [];
        this.isSelected = false;
        this.page = 1;
        this.count = 0;
        this.sortState = new Map();
        this.sortKey = null;
        this.rowContextMenuPosition = {
            top: null,
            left: null,
            value: null,
        };
        this.sortBy = {
            key: '',
            order: 'asc',
        };
        this.selectedDetailsTemplateRowId = new Set();
        this.selectedCheckboxes = new Set();
        this.id = 'table';
        this.event = new EventEmitter();
        this.filteredCountSubject.pipe(takeUntil(this.unsubscribe)).subscribe((count) => {
            setTimeout(() => {
                this.filterCount = count;
                this.cdr.detectChanges();
            });
        });
    }
    onContextMenuClick(targetElement) {
        if (this.contextMenu && !this.contextMenu.nativeElement.contains(targetElement)) {
            this.rowContextMenuPosition = {
                top: null,
                left: null,
                value: null,
            };
        }
    }
    ngOnInit() {
        if (!this.columns) {
            console.error('[columns] property required!');
        }
        if (this.configuration) {
            this.config = this.configuration;
        }
        else {
            this.config = DefaultConfigService.config;
        }
        this.limit = this.config.rows;
        if (this.groupRowsBy) {
            this.grouped = GroupRowsService.doGroupRows(this.data, this.groupRowsBy);
        }
        this.doDecodePersistedState();
    }
    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    ngAfterViewInit() {
        const throttleValue = this.config.infiniteScrollThrottleTime
            ? this.config.infiniteScrollThrottleTime
            : 200;
        this.scrollDispatcher
            .scrolled()
            .pipe(throttleTime(throttleValue), filter((event) => {
            return (!!event &&
                this.viewPort &&
                this.viewPort.getRenderedRange().end === this.viewPort.getDataLength());
        }), takeUntil(this.unsubscribe))
            .subscribe(() => {
            this.emitEvent(Event.onInfiniteScrollEnd, null);
        });
    }
    ngOnChanges(changes) {
        const { configuration, data, pagination, groupRowsBy } = changes;
        this.toggleRowIndex = changes.toggleRowIndex;
        if (configuration && configuration.currentValue) {
            this.config = configuration.currentValue;
        }
        if (data && data.currentValue) {
            this.doApplyData(data);
        }
        if (pagination && pagination.currentValue) {
            const { count, limit, offset } = pagination.currentValue;
            this.count = count;
            this.limit = limit;
            this.page = offset;
        }
        if (groupRowsBy && groupRowsBy.currentValue) {
            this.grouped = GroupRowsService.doGroupRows(this.data, this.groupRowsBy);
        }
        if (this.toggleRowIndex && this.toggleRowIndex.currentValue) {
            const row = this.toggleRowIndex.currentValue;
            this.collapseRow(row.index);
        }
    }
    orderBy(column) {
        if (typeof column.orderEnabled !== 'undefined' && !column.orderEnabled) {
            return;
        }
        this.sortKey = column.key;
        if (!this.config.orderEnabled || this.sortKey === '') {
            return;
        }
        this.setColumnOrder(column);
        if (!this.config.orderEventOnly && !column.orderEventOnly) {
            this.sortBy.key = this.sortKey;
            this.sortBy.order = this.sortState.get(this.sortKey);
        }
        else {
            this.sortBy.key = '';
            this.sortBy.order = '';
        }
        if (!this.config.serverPagination) {
            this.data = [...this.data];
            this.sortBy = { ...this.sortBy };
        }
        const value = {
            key: this.sortKey,
            order: this.sortState.get(this.sortKey),
        };
        this.emitEvent(Event.onOrder, value);
    }
    onClick($event, row, key, colIndex, rowIndex) {
        if (this.config.selectRow) {
            this.selectedRow = rowIndex;
        }
        if (this.config.selectCol && `${colIndex}`) {
            this.selectedCol = colIndex;
        }
        if (this.config.selectCell && `${colIndex}`) {
            this.selectedRow = rowIndex;
            this.selectedCol = colIndex;
        }
        if (this.config.clickEvent) {
            const value = {
                event: $event,
                row,
                key,
                rowId: rowIndex,
                colId: colIndex,
            };
            this.emitEvent(Event.onClick, value);
        }
    }
    onDoubleClick($event, row, key, colIndex, rowIndex) {
        const value = {
            event: $event,
            row,
            key,
            rowId: rowIndex,
            colId: colIndex,
        };
        this.emitEvent(Event.onDoubleClick, value);
    }
    onCheckboxSelect($event, row, rowIndex) {
        const value = {
            event: $event,
            row,
            rowId: rowIndex,
        };
        this.emitEvent(Event.onCheckboxSelect, value);
    }
    onRadioSelect($event, row, rowIndex) {
        const value = {
            event: $event,
            row,
            rowId: rowIndex,
        };
        this.emitEvent(Event.onRadioSelect, value);
    }
    onSelectAll() {
        this.isSelected = !this.isSelected;
        this.emitEvent(Event.onSelectAll, this.isSelected);
    }
    onSearch($event) {
        if (!this.config.serverPagination) {
            this.term = $event;
        }
        this.emitEvent(Event.onSearch, $event);
    }
    onGlobalSearch(value) {
        if (!this.config.serverPagination) {
            this.globalSearchTerm = value;
        }
        this.emitEvent(Event.onGlobalSearch, value);
    }
    onPagination(pagination) {
        this.page = pagination.page;
        this.limit = pagination.limit;
        this.config.rows = pagination.limit;
        this.emitEvent(Event.onPagination, pagination);
    }
    toggleCheckbox(rowIndex) {
        /* eslint-disable @typescript-eslint/no-unused-expressions */
        this.selectedCheckboxes.has(rowIndex)
            ? this.selectedCheckboxes.delete(rowIndex)
            : this.selectedCheckboxes.add(rowIndex);
    }
    collapseRow(rowIndex) {
        if (this.selectedDetailsTemplateRowId.has(rowIndex)) {
            this.selectedDetailsTemplateRowId.delete(rowIndex);
            this.emitEvent(Event.onRowCollapsedHide, rowIndex);
        }
        else {
            this.selectedDetailsTemplateRowId.add(rowIndex);
            this.emitEvent(Event.onRowCollapsedShow, rowIndex);
        }
    }
    doDecodePersistedState() {
        if (!this.config.persistState) {
            return;
        }
        const pagination = localStorage.getItem(Event.onPagination);
        const sort = localStorage.getItem(Event.onOrder);
        const search = localStorage.getItem(Event.onSearch);
        if (pagination) {
            this.onPagination(JSON.parse(pagination));
        }
        if (sort) {
            const { key, order } = JSON.parse(sort);
            this.bindApi({
                type: API.sortBy,
                value: { column: key, order },
            });
        }
        if (search) {
            this.bindApi({
                type: API.setInputValue,
                value: JSON.parse(search),
            });
        }
    }
    isRowCollapsed(rowIndex) {
        if (this.config.collapseAllRows) {
            return true;
        }
        return this.selectedDetailsTemplateRowId.has(rowIndex);
    }
    get loadingHeight() {
        const table = document.getElementById(this.id);
        if (table && table.rows && table.rows.length > 3) {
            const searchEnabled = this.config.searchEnabled ? 1 : 0;
            const headerEnabled = this.config.headerEnabled ? 1 : 0;
            const borderTrHeight = 1;
            const borderDivHeight = 2;
            return ((table.rows.length - searchEnabled - headerEnabled) *
                (table.rows[3].offsetHeight - borderTrHeight) -
                borderDivHeight);
        }
        return 30;
    }
    get arrowDefinition() {
        return this.config.showDetailsArrow || typeof this.config.showDetailsArrow === 'undefined';
    }
    onRowContextMenu($event, row, key, colIndex, rowIndex) {
        if (!this.config.showContextMenu) {
            return;
        }
        $event.preventDefault();
        const value = {
            event: $event,
            row,
            key,
            rowId: rowIndex,
            colId: colIndex,
        };
        this.rowContextMenuPosition = {
            top: `${$event.pageY - 10}px`,
            left: `${$event.pageX - 10}px`,
            value,
        };
        this.emitEvent(Event.onRowContextMenu, value);
    }
    doApplyData(data) {
        const order = this.columns.find((c) => !!c.orderBy);
        if (order) {
            this.sortState.set(this.sortKey, order.orderBy === 'asc' ? 'desc' : 'asc');
            this.orderBy(order);
        }
        else {
            this.data = [...data.currentValue];
        }
    }
    onDragStart(event) {
        this.emitEvent(Event.onReorderStart, event);
    }
    onDrop(event) {
        this.emitEvent(Event.onRowDrop, event);
        moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    }
    // DO NOT REMOVE. It is called from parent component. See src/app/demo/api-doc/api-doc.component.ts
    apiEvent(event) {
        return this.bindApi(event);
    }
    /* eslint-disable */
    bindApi(event) {
        switch (event.type) {
            case API.rowContextMenuClicked:
                this.rowContextMenuPosition = {
                    top: null,
                    left: null,
                    value: null,
                };
                break;
            case API.toggleRowIndex:
                this.collapseRow(event.value);
                break;
            case API.toggleCheckbox:
                this.toggleCheckbox(event.value);
                break;
            case API.setInputValue:
                if (this.config.searchEnabled) {
                    event.value.forEach((input) => {
                        const element = document.getElementById(`search_${input.key}`);
                        if (!element) {
                            console.error(`Column '${input.key}' not available in the DOM. Have you misspelled a name?`);
                        }
                        else {
                            element.value = input.value;
                        }
                    });
                }
                this.onSearch(event.value);
                this.cdr.markForCheck();
                break;
            case API.onGlobalSearch:
                this.onGlobalSearch(event.value);
                this.cdr.markForCheck();
                break;
            case API.setRowClass:
                if (Array.isArray(event.value)) {
                    event.value.forEach((val) => this.styleService.setRowClass(val));
                    break;
                }
                this.styleService.setRowClass(event.value);
                this.cdr.markForCheck();
                break;
            case API.setCellClass:
                if (Array.isArray(event.value)) {
                    event.value.forEach((val) => this.styleService.setCellClass(val));
                    break;
                }
                this.styleService.setCellClass(event.value);
                break;
            case API.setRowStyle:
                if (Array.isArray(event.value)) {
                    event.value.forEach((val) => this.styleService.setRowStyle(val));
                    break;
                }
                this.styleService.setRowStyle(event.value);
                break;
            case API.setCellStyle:
                if (Array.isArray(event.value)) {
                    event.value.forEach((val) => this.styleService.setCellStyle(val));
                    break;
                }
                this.styleService.setCellStyle(event.value);
                break;
            case API.setTableClass:
                this.tableClass = event.value;
                this.cdr.markForCheck();
                break;
            case API.getPaginationTotalItems:
                return this.paginationComponent.paginationDirective.getTotalItems();
            case API.getPaginationCurrentPage:
                return this.paginationComponent.paginationDirective.getCurrent();
            case API.getPaginationLastPage:
                return this.paginationComponent.paginationDirective.getLastPage();
            case API.getNumberOfRowsPerPage:
                return this.paginationComponent.paginationDirective.isLastPage()
                    ? this.paginationComponent.paginationDirective.getTotalItems() % this.limit
                    : this.limit;
            case API.setPaginationCurrentPage:
                this.paginationComponent.paginationDirective.setCurrent(event.value);
                break;
            case API.setPaginationRange:
                this.paginationComponent.ranges = event.value;
                break;
            case API.setPaginationPreviousLabel:
                this.paginationComponent.previousLabel = event.value;
                break;
            case API.setPaginationNextLabel:
                this.paginationComponent.nextLabel = event.value;
                break;
            case API.setPaginationDisplayLimit:
                this.paginationComponent.changeLimit(event.value, true);
                break;
            case API.setLoader:
                this.configuration.isLoading = event.value;
                this.cdr.markForCheck();
                break;
            case API.sortBy:
                const column = { title: '', key: event.value.column, orderBy: event.value.order };
                this.orderBy(column);
                this.cdr.detectChanges();
                break;
            default:
                break;
        }
    }
    setColumnOrder(column) {
        const key = column.key;
        switch (this.sortState.get(key)) {
            case '':
            case undefined:
                this.sortState.set(key, column.orderBy || 'desc');
                break;
            case 'asc':
                this.config.threeWaySort ? this.sortState.set(key, '') : this.sortState.set(key, 'desc');
                break;
            case 'desc':
                this.sortState.set(key, 'asc');
                break;
        }
        if (this.sortState.size > 1) {
            const temp = this.sortState.get(key);
            this.sortState.clear();
            this.sortState.set(key, temp);
        }
    }
    emitEvent(event, value) {
        this.event.emit({ event, value });
        if (this.config.persistState) {
            localStorage.setItem(event, JSON.stringify(value));
        }
        if (this.config.logger) {
            // eslint-disable-next-line no-console
            console.log({ event, value });
        }
    }
    dragEnter($event) {
        $event.preventDefault();
        $event.stopPropagation();
    }
    dragOver($event) {
        $event.preventDefault();
        $event.stopPropagation();
    }
    dragLeave($event) {
        $event.preventDefault();
        $event.stopPropagation();
    }
    drop($event) {
        $event.preventDefault();
        $event.stopPropagation();
        const file = $event.dataTransfer?.files?.[0];
        if (file?.type !== 'application/json') {
            // eslint-disable-next-line no-console
            console.log('File not allowed');
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            this.data = JSON.parse(event?.target?.result);
            this.cdr.markForCheck();
        };
        fileReader.readAsText(file);
    }
}
BaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: BaseComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.ScrollDispatcher }, { token: StyleService }], target: i0.ɵɵFactoryTarget.Component });
BaseComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: BaseComponent, selector: "ngx-table", inputs: { configuration: "configuration", data: "data", pagination: "pagination", groupRowsBy: "groupRowsBy", id: "id", toggleRowIndex: "toggleRowIndex", detailsTemplate: "detailsTemplate", summaryTemplate: "summaryTemplate", groupRowsHeaderTemplate: "groupRowsHeaderTemplate", filtersTemplate: "filtersTemplate", selectAllTemplate: "selectAllTemplate", noResultsTemplate: "noResultsTemplate", loadingTemplate: "loadingTemplate", additionalActionsTemplate: "additionalActionsTemplate", rowContextMenu: "rowContextMenu", columns: "columns" }, outputs: { event: "event" }, host: { listeners: { "document:click": "onContextMenuClick($event.target)" } }, providers: [DefaultConfigService, GroupRowsService, StyleService], queries: [{ propertyName: "rowTemplate", first: true, predicate: TemplateRef, descendants: true }], viewQueries: [{ propertyName: "paginationComponent", first: true, predicate: ["paginationComponent"], descendants: true }, { propertyName: "contextMenu", first: true, predicate: ["contextMenu"], descendants: true }, { propertyName: "table", first: true, predicate: ["table"], descendants: true }, { propertyName: "viewPort", first: true, predicate: CdkVirtualScrollViewport, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div\n  class=\"ngx-container\"\n  [class.ngx-container--dark]=\"config.tableLayout.theme === 'dark'\"\n  (dragenter)=\"dragEnter($event)\"\n  (dragover)=\"dragOver($event)\"\n  (dragleave)=\"dragLeave($event)\"\n  (drop)=\"drop($event)\"\n>\n  <table\n    [id]=\"id\"\n    #table\n    [ngClass]=\"tableClass === null || tableClass === '' ? 'ngx-table' : tableClass\"\n    [class.ngx-table__table--tiny]=\"config.tableLayout.style === 'tiny'\"\n    [class.ngx-table__table--normal]=\"config.tableLayout.style === 'normal'\"\n    [class.ngx-table__table--big]=\"config.tableLayout.style === 'big'\"\n    [class.ngx-table__table--borderless]=\"config.tableLayout.borderless\"\n    [class.ngx-table__table--dark]=\"config.tableLayout.theme === 'dark'\"\n    [class.ngx-table__table--hoverable]=\"config.tableLayout.hover\"\n    [class.ngx-table__table--striped]=\"config.tableLayout.striped\"\n    [class.ngx-table__horizontal-scroll]=\"config.horizontalScroll && !config.isLoading\"\n  >\n    <thead\n      [class.ngx-infinite-scroll-viewport-thead]=\"config.infiniteScroll\"\n      table-thead\n      [config]=\"config\"\n      [sortKey]=\"sortKey\"\n      [sortState]=\"sortState\"\n      [selectAllTemplate]=\"selectAllTemplate\"\n      [filtersTemplate]=\"filtersTemplate\"\n      [additionalActionsTemplate]=\"additionalActionsTemplate\"\n      [columns]=\"columns\"\n      (selectAll)=\"onSelectAll()\"\n      (filter)=\"onSearch($event)\"\n      (order)=\"orderBy($event)\"\n      (event)=\"emitEvent($event.event, $event.value)\"\n    ></thead>\n    <tbody *ngIf=\"data && !config.isLoading && !config.rowReorder\">\n      <ng-container *ngIf=\"rowTemplate\">\n        <ul\n          class=\"ngx-table__table-row-context-menu\"\n          [ngStyle]=\"{\n            position: 'absolute',\n            top: rowContextMenuPosition.top,\n            left: rowContextMenuPosition.left\n          }\"\n          *ngIf=\"rowContextMenuPosition.top\"\n        >\n          <ng-container\n            [ngTemplateOutlet]=\"rowContextMenu\"\n            [ngTemplateOutletContext]=\"{ $implicit: rowContextMenuPosition.value }\"\n          >\n          </ng-container>\n        </ul>\n        <ng-container *ngIf=\"!config.infiniteScroll\">\n          <ng-container\n            *ngFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject\n                | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id }\n            \"\n          >\n            <tr\n              (click)=\"onClick($event, row, '', null, data.indexOf(row))\"\n              #contextMenu\n              (contextmenu)=\"onRowContextMenu($event, row, '', null, data.indexOf(row))\"\n              (dblclick)=\"onDoubleClick($event, row, '', null, data.indexOf(row))\"\n              [class.ngx-table__table-row--selected]=\"\n                data.indexOf(row) === selectedRow && !config.selectCell\n              \"\n            >\n              <ng-container\n                [ngTemplateOutlet]=\"rowTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: row, index: data.indexOf(row) }\"\n              >\n              </ng-container>\n              <td *ngIf=\"config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(data.indexOf(row))\n                      ? 'ngx-icon-arrow-down'\n                      : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(data.indexOf(row))\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(data.indexOf(row))) ||\n                config.collapseAllRows\n              \"\n            >\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: data.indexOf(row) }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </ng-container>\n        <cdk-virtual-scroll-viewport\n          itemSize=\"50\"\n          *ngIf=\"config.infiniteScroll\"\n          class=\"ngx-infinite-scroll-viewport\"\n        >\n          <ng-container\n            *cdkVirtualFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject;\n              let rowIndex = index\n            \"\n          >\n            <tr\n              (click)=\"onClick($event, row, '', null, rowIndex)\"\n              #contextMenu\n              (contextmenu)=\"onRowContextMenu($event, row, '', null, rowIndex)\"\n              (dblclick)=\"onDoubleClick($event, row, '', null, rowIndex)\"\n              [class.ngx-table__table-row--selected]=\"\n                rowIndex === selectedRow && !config.selectCell\n              \"\n            >\n              <ng-container\n                [ngTemplateOutlet]=\"rowTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\"\n              >\n              </ng-container>\n              <td *ngIf=\"config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(rowIndex)\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(rowIndex)) ||\n                config.collapseAllRows\n              \"\n            >\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n      </ng-container>\n      <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n        <ul\n          class=\"ngx-table__table-row-context-menu\"\n          [ngStyle]=\"{\n            position: 'absolute',\n            top: rowContextMenuPosition.top,\n            left: rowContextMenuPosition.left\n          }\"\n          *ngIf=\"rowContextMenuPosition.top\"\n        >\n          <ng-container\n            [ngTemplateOutlet]=\"rowContextMenu\"\n            [ngTemplateOutletContext]=\"{ $implicit: rowContextMenuPosition.value }\"\n          >\n          </ng-container>\n        </ul>\n        <ng-container *ngIf=\"!config.infiniteScroll\">\n          <ng-container\n            *ngFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject\n                | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id }\n            \"\n          >\n            <tr\n              [class.ngx-table__table-row--selected]=\"\n                data.indexOf(row) === selectedRow && !config.selectCell\n              \"\n            >\n              <td *ngIf=\"config.checkboxes\">\n                <label class=\"ngx-form-checkbox\">\n                  <input\n                    type=\"checkbox\"\n                    id=\"checkbox-{{ data.indexOf(row) }}\"\n                    [checked]=\"isSelected || selectedCheckboxes.has(data.indexOf(row))\"\n                    (change)=\"onCheckboxSelect($event, row, data.indexOf(row))\"\n                  />\n                  <em class=\"ngx-form-icon\"></em>\n                </label>\n              </td>\n              <td *ngIf=\"config.radio\">\n                <label>\n                  <input\n                    type=\"radio\"\n                    id=\"radio-{{ data.indexOf(row) }}\"\n                    name=\"radio\"\n                    (change)=\"onRadioSelect($event, row, data.indexOf(row))\"\n                  />\n                </label>\n              </td>\n              <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n                <td\n                  (click)=\"onClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                  #contextMenu\n                  (contextmenu)=\"\n                    onRowContextMenu($event, row, column.key, colIndex, data.indexOf(row))\n                  \"\n                  (dblclick)=\"onDoubleClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                  [class.pinned-left]=\"column.pinned\"\n                  [ngClass]=\"column.cssClass ? column.cssClass.name : ''\"\n                  [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n                  [class.ngx-table__table-col--selected]=\"\n                    colIndex === selectedCol && !config.selectCell\n                  \"\n                  [class.ngx-table__table-cell--selected]=\"\n                    colIndex === selectedCol &&\n                    data.indexOf(row) === selectedRow &&\n                    !config.selectCol &&\n                    !config.selectRow\n                  \"\n                >\n                  <div *ngIf=\"!column.cellTemplate\">{{ row | render: column.key }}</div>\n                  <ng-container\n                    *ngIf=\"column.cellTemplate\"\n                    [ngTemplateOutlet]=\"column.cellTemplate\"\n                    [ngTemplateOutletContext]=\"{\n                      $implicit: row,\n                      rowIndex: data.indexOf(row),\n                      column: column\n                    }\"\n                  >\n                  </ng-container>\n                </td>\n              </ng-container>\n              <td *ngIf=\"config.additionalActions || config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(data.indexOf(row))\n                      ? 'ngx-icon-arrow-down'\n                      : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(data.indexOf(row))\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(data.indexOf(row))) ||\n                config.collapseAllRows\n              \"\n            >\n              <td *ngIf=\"config.checkboxes || config.radio\"></td>\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: data.indexOf(row) }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </ng-container>\n        <!-- infinite scroll -->\n        <cdk-virtual-scroll-viewport\n          itemSize=\"50\"\n          *ngIf=\"config.infiniteScroll\"\n          class=\"ngx-infinite-scroll-viewport\"\n        >\n          <ng-container\n            *cdkVirtualFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject;\n              let rowIndex = index\n            \"\n          >\n            <tr\n              [class.ngx-table__table-row--selected]=\"\n                rowIndex === selectedRow && !config.selectCell\n              \"\n            >\n              <td *ngIf=\"config.checkboxes\" width=\"3%\">\n                <label class=\"ngx-form-checkbox\">\n                  <input\n                    type=\"checkbox\"\n                    id=\"checkbox-infinite-scroll-{{ rowIndex }}\"\n                    [checked]=\"isSelected || selectedCheckboxes.has(rowIndex)\"\n                    (change)=\"onCheckboxSelect($event, row, rowIndex)\"\n                  />\n                  <em class=\"ngx-form-icon\"></em>\n                </label>\n              </td>\n              <td *ngIf=\"config.radio\" width=\"3%\">\n                <label>\n                  <input\n                    type=\"radio\"\n                    id=\"radio-infinite-scroll-{{ rowIndex }}\"\n                    name=\"radio\"\n                    (change)=\"onRadioSelect($event, row, rowIndex)\"\n                  />\n                </label>\n              </td>\n              <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n                <td\n                  (click)=\"onClick($event, row, column.key, colIndex, rowIndex)\"\n                  #contextMenu\n                  (contextmenu)=\"onRowContextMenu($event, row, column.key, colIndex, rowIndex)\"\n                  (dblclick)=\"onDoubleClick($event, row, column.key, colIndex, rowIndex)\"\n                  [class.pinned-left]=\"column.pinned\"\n                  [ngClass]=\"column.cssClass ? column.cssClass.name : ''\"\n                  [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n                  [class.ngx-table__table-col--selected]=\"\n                    colIndex === selectedCol && !config.selectCell\n                  \"\n                  [class.ngx-table__table-cell--selected]=\"\n                    colIndex === selectedCol &&\n                    rowIndex === selectedRow &&\n                    !config.selectCol &&\n                    !config.selectRow\n                  \"\n                >\n                  <div *ngIf=\"!column.cellTemplate\">{{ row | render: column.key }}</div>\n                  <ng-container\n                    *ngIf=\"column.cellTemplate\"\n                    [ngTemplateOutlet]=\"column.cellTemplate\"\n                    [ngTemplateOutletContext]=\"{\n                      $implicit: row,\n                      rowIndex: rowIndex,\n                      column: column\n                    }\"\n                  >\n                  </ng-container>\n                </td>\n              </ng-container>\n              <td *ngIf=\"config.additionalActions || config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(rowIndex)\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(rowIndex)) ||\n                config.collapseAllRows\n              \"\n            >\n              <td *ngIf=\"config.checkboxes || config.radio\"></td>\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n      </ng-container>\n      <ng-container *ngIf=\"!rowTemplate && config.groupRows\">\n        <ng-container\n          *ngFor=\"\n            let group of grouped\n              | sort: sortBy:config\n              | search: term:filteredCountSubject:config\n              | global: globalSearchTerm:filteredCountSubject\n              | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n            let rowIndex = index\n          \"\n        >\n          <tr>\n            <ng-container *ngIf=\"!groupRowsHeaderTemplate\">\n              <td [attr.colspan]=\"columns.length\">\n                <div>{{ group[0][groupRowsBy] }} ({{ group.length }})</div>\n              </td>\n            </ng-container>\n            <ng-container\n              *ngIf=\"groupRowsHeaderTemplate\"\n              [ngTemplateOutlet]=\"groupRowsHeaderTemplate\"\n              [ngTemplateOutletContext]=\"{\n                total: group.length,\n                key: groupRowsBy,\n                value: group[0] ? group[0][groupRowsBy] : '',\n                group: group,\n                index: rowIndex\n              }\"\n            >\n            </ng-container>\n            <td>\n              <span\n                class=\"ngx-icon\"\n                *ngIf=\"arrowDefinition\"\n                [ngClass]=\"\n                  isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\n                \"\n                (click)=\"collapseRow(rowIndex)\"\n              >\n              </span>\n            </td>\n          </tr>\n          <ng-container *ngIf=\"selectedDetailsTemplateRowId.has(rowIndex)\">\n            <tr *ngFor=\"let row of group\">\n              <td *ngFor=\"let column of columns\">\n                {{ row | render: column.key }}\n                <!-- TODO allow users to add groupRowsTemplateRef -->\n              </td>\n              <td></td>\n            </tr>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </tbody>\n    <tbody\n      *ngIf=\"data && !config.isLoading && config.rowReorder\"\n      class=\"ngx-draggable-row-area\"\n      cdkDropList\n      (cdkDropListDropped)=\"onDrop($event)\"\n    >\n      <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n        <ng-container\n          *ngFor=\"\n            let row of data\n              | sort: sortBy\n              | search: term:filteredCountSubject\n              | global: globalSearchTerm:filteredCountSubject\n              | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id }\n          \"\n        >\n          <tr\n            class=\"ngx-draggable-row\"\n            cdkDrag\n            (cdkDragStarted)=\"onDragStart($event)\"\n            [cdkDragStartDelay]=\"config.reorderDelay || 0\"\n            cdkDragLockAxis=\"y\"\n          >\n            <td *ngIf=\"config.checkboxes\">\n              <label class=\"ngx-form-checkbox\">\n                <input\n                  type=\"checkbox\"\n                  id=\"checkbox-draggable-{{ data.indexOf(row) }}\"\n                  [checked]=\"isSelected || selectedCheckboxes.has(data.indexOf(row))\"\n                  (change)=\"onCheckboxSelect($event, row, data.indexOf(row))\"\n                />\n                <em class=\"ngx-form-icon\"></em>\n              </label>\n            </td>\n            <td *ngIf=\"config.radio\">\n              <label>\n                <input\n                  type=\"radio\"\n                  id=\"radio-draggable-{{ data.indexOf(row) }}\"\n                  name=\"radio\"\n                  (change)=\"onRadioSelect($event, row, data.indexOf(row))\"\n                />\n              </label>\n            </td>\n            <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n              <td\n                (click)=\"onClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                (dblclick)=\"onDoubleClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                [class.ngx-table__table-col--selected]=\"\n                  colIndex === selectedCol && !config.selectCell\n                \"\n                [class.ngx-table__table-cell--selected]=\"\n                  colIndex === selectedCol &&\n                  data.indexOf(row) === selectedRow &&\n                  !config.selectCol &&\n                  !config.selectRow\n                \"\n              >\n                <div *ngIf=\"!column.cellTemplate\">{{ row | render: column.key }}</div>\n                <ng-container\n                  *ngIf=\"column.cellTemplate\"\n                  [ngTemplateOutlet]=\"column.cellTemplate\"\n                  [ngTemplateOutletContext]=\"{\n                    $implicit: row,\n                    rowIndex: data.indexOf(row),\n                    column: column\n                  }\"\n                >\n                </ng-container>\n              </td>\n            </ng-container>\n          </tr>\n        </ng-container>\n      </ng-container>\n    </tbody>\n    <tbody *ngIf=\"filterCount === 0\">\n      <tr class=\"ngx-table__body-empty\">\n        <ng-container *ngIf=\"noResultsTemplate\" [ngTemplateOutlet]=\"noResultsTemplate\">\n        </ng-container>\n        <td [attr.colspan]=\"columns && columns.length + 1\" *ngIf=\"!noResultsTemplate\">\n          <div class=\"ngx-table__table-no-results\">No results</div>\n        </td>\n      </tr>\n    </tbody>\n    <tbody *ngIf=\"config.isLoading\">\n      <tr class=\"ngx-table__body-loading\">\n        <ng-container *ngIf=\"loadingTemplate\" [ngTemplateOutlet]=\"loadingTemplate\"> </ng-container>\n        <td [attr.colspan]=\"columns && columns.length + 1\" *ngIf=\"!loadingTemplate\">\n          <div [style.height.px]=\"loadingHeight\" class=\"ngx-table__table-loader-wrapper\">\n            <div class=\"ngx-table__table-loader\"></div>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n    <tfoot *ngIf=\"summaryTemplate\">\n      <tr>\n        <ng-container\n          [ngTemplateOutlet]=\"summaryTemplate\"\n          [ngTemplateOutletContext]=\"{ total: data.length, limit: limit, page: page }\"\n        >\n        </ng-container>\n      </tr>\n    </tfoot>\n  </table>\n  <pagination\n    [attr.id]=\"'pagination' + id\"\n    [id]=\"id\"\n    #paginationComponent\n    [config]=\"config\"\n    [pagination]=\"pagination\"\n    (updateRange)=\"onPagination($event)\"\n  >\n  </pagination>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3$1.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i3$1.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i1.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { kind: "directive", type: i1.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { kind: "component", type: i1.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { kind: "component", type: PaginationComponent, selector: "pagination", inputs: ["pagination", "config", "id"], outputs: ["updateRange"] }, { kind: "component", type: TableTHeadComponent, selector: "[table-thead]", inputs: ["config", "columns", "sortKey", "sortState", "selectAllTemplate", "filtersTemplate", "additionalActionsTemplate"], outputs: ["filter", "order", "selectAll", "event"] }, { kind: "pipe", type: i2.PaginatePipe, name: "paginate" }, { kind: "pipe", type: SearchPipe, name: "search" }, { kind: "pipe", type: RenderPipe, name: "render" }, { kind: "pipe", type: GlobalSearchPipe, name: "global" }, { kind: "pipe", type: SortPipe, name: "sort" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: BaseComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-table', providers: [DefaultConfigService, GroupRowsService, StyleService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ngx-container\"\n  [class.ngx-container--dark]=\"config.tableLayout.theme === 'dark'\"\n  (dragenter)=\"dragEnter($event)\"\n  (dragover)=\"dragOver($event)\"\n  (dragleave)=\"dragLeave($event)\"\n  (drop)=\"drop($event)\"\n>\n  <table\n    [id]=\"id\"\n    #table\n    [ngClass]=\"tableClass === null || tableClass === '' ? 'ngx-table' : tableClass\"\n    [class.ngx-table__table--tiny]=\"config.tableLayout.style === 'tiny'\"\n    [class.ngx-table__table--normal]=\"config.tableLayout.style === 'normal'\"\n    [class.ngx-table__table--big]=\"config.tableLayout.style === 'big'\"\n    [class.ngx-table__table--borderless]=\"config.tableLayout.borderless\"\n    [class.ngx-table__table--dark]=\"config.tableLayout.theme === 'dark'\"\n    [class.ngx-table__table--hoverable]=\"config.tableLayout.hover\"\n    [class.ngx-table__table--striped]=\"config.tableLayout.striped\"\n    [class.ngx-table__horizontal-scroll]=\"config.horizontalScroll && !config.isLoading\"\n  >\n    <thead\n      [class.ngx-infinite-scroll-viewport-thead]=\"config.infiniteScroll\"\n      table-thead\n      [config]=\"config\"\n      [sortKey]=\"sortKey\"\n      [sortState]=\"sortState\"\n      [selectAllTemplate]=\"selectAllTemplate\"\n      [filtersTemplate]=\"filtersTemplate\"\n      [additionalActionsTemplate]=\"additionalActionsTemplate\"\n      [columns]=\"columns\"\n      (selectAll)=\"onSelectAll()\"\n      (filter)=\"onSearch($event)\"\n      (order)=\"orderBy($event)\"\n      (event)=\"emitEvent($event.event, $event.value)\"\n    ></thead>\n    <tbody *ngIf=\"data && !config.isLoading && !config.rowReorder\">\n      <ng-container *ngIf=\"rowTemplate\">\n        <ul\n          class=\"ngx-table__table-row-context-menu\"\n          [ngStyle]=\"{\n            position: 'absolute',\n            top: rowContextMenuPosition.top,\n            left: rowContextMenuPosition.left\n          }\"\n          *ngIf=\"rowContextMenuPosition.top\"\n        >\n          <ng-container\n            [ngTemplateOutlet]=\"rowContextMenu\"\n            [ngTemplateOutletContext]=\"{ $implicit: rowContextMenuPosition.value }\"\n          >\n          </ng-container>\n        </ul>\n        <ng-container *ngIf=\"!config.infiniteScroll\">\n          <ng-container\n            *ngFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject\n                | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id }\n            \"\n          >\n            <tr\n              (click)=\"onClick($event, row, '', null, data.indexOf(row))\"\n              #contextMenu\n              (contextmenu)=\"onRowContextMenu($event, row, '', null, data.indexOf(row))\"\n              (dblclick)=\"onDoubleClick($event, row, '', null, data.indexOf(row))\"\n              [class.ngx-table__table-row--selected]=\"\n                data.indexOf(row) === selectedRow && !config.selectCell\n              \"\n            >\n              <ng-container\n                [ngTemplateOutlet]=\"rowTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: row, index: data.indexOf(row) }\"\n              >\n              </ng-container>\n              <td *ngIf=\"config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(data.indexOf(row))\n                      ? 'ngx-icon-arrow-down'\n                      : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(data.indexOf(row))\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(data.indexOf(row))) ||\n                config.collapseAllRows\n              \"\n            >\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: data.indexOf(row) }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </ng-container>\n        <cdk-virtual-scroll-viewport\n          itemSize=\"50\"\n          *ngIf=\"config.infiniteScroll\"\n          class=\"ngx-infinite-scroll-viewport\"\n        >\n          <ng-container\n            *cdkVirtualFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject;\n              let rowIndex = index\n            \"\n          >\n            <tr\n              (click)=\"onClick($event, row, '', null, rowIndex)\"\n              #contextMenu\n              (contextmenu)=\"onRowContextMenu($event, row, '', null, rowIndex)\"\n              (dblclick)=\"onDoubleClick($event, row, '', null, rowIndex)\"\n              [class.ngx-table__table-row--selected]=\"\n                rowIndex === selectedRow && !config.selectCell\n              \"\n            >\n              <ng-container\n                [ngTemplateOutlet]=\"rowTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\"\n              >\n              </ng-container>\n              <td *ngIf=\"config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(rowIndex)\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(rowIndex)) ||\n                config.collapseAllRows\n              \"\n            >\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n      </ng-container>\n      <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n        <ul\n          class=\"ngx-table__table-row-context-menu\"\n          [ngStyle]=\"{\n            position: 'absolute',\n            top: rowContextMenuPosition.top,\n            left: rowContextMenuPosition.left\n          }\"\n          *ngIf=\"rowContextMenuPosition.top\"\n        >\n          <ng-container\n            [ngTemplateOutlet]=\"rowContextMenu\"\n            [ngTemplateOutletContext]=\"{ $implicit: rowContextMenuPosition.value }\"\n          >\n          </ng-container>\n        </ul>\n        <ng-container *ngIf=\"!config.infiniteScroll\">\n          <ng-container\n            *ngFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject\n                | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id }\n            \"\n          >\n            <tr\n              [class.ngx-table__table-row--selected]=\"\n                data.indexOf(row) === selectedRow && !config.selectCell\n              \"\n            >\n              <td *ngIf=\"config.checkboxes\">\n                <label class=\"ngx-form-checkbox\">\n                  <input\n                    type=\"checkbox\"\n                    id=\"checkbox-{{ data.indexOf(row) }}\"\n                    [checked]=\"isSelected || selectedCheckboxes.has(data.indexOf(row))\"\n                    (change)=\"onCheckboxSelect($event, row, data.indexOf(row))\"\n                  />\n                  <em class=\"ngx-form-icon\"></em>\n                </label>\n              </td>\n              <td *ngIf=\"config.radio\">\n                <label>\n                  <input\n                    type=\"radio\"\n                    id=\"radio-{{ data.indexOf(row) }}\"\n                    name=\"radio\"\n                    (change)=\"onRadioSelect($event, row, data.indexOf(row))\"\n                  />\n                </label>\n              </td>\n              <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n                <td\n                  (click)=\"onClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                  #contextMenu\n                  (contextmenu)=\"\n                    onRowContextMenu($event, row, column.key, colIndex, data.indexOf(row))\n                  \"\n                  (dblclick)=\"onDoubleClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                  [class.pinned-left]=\"column.pinned\"\n                  [ngClass]=\"column.cssClass ? column.cssClass.name : ''\"\n                  [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n                  [class.ngx-table__table-col--selected]=\"\n                    colIndex === selectedCol && !config.selectCell\n                  \"\n                  [class.ngx-table__table-cell--selected]=\"\n                    colIndex === selectedCol &&\n                    data.indexOf(row) === selectedRow &&\n                    !config.selectCol &&\n                    !config.selectRow\n                  \"\n                >\n                  <div *ngIf=\"!column.cellTemplate\">{{ row | render: column.key }}</div>\n                  <ng-container\n                    *ngIf=\"column.cellTemplate\"\n                    [ngTemplateOutlet]=\"column.cellTemplate\"\n                    [ngTemplateOutletContext]=\"{\n                      $implicit: row,\n                      rowIndex: data.indexOf(row),\n                      column: column\n                    }\"\n                  >\n                  </ng-container>\n                </td>\n              </ng-container>\n              <td *ngIf=\"config.additionalActions || config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(data.indexOf(row))\n                      ? 'ngx-icon-arrow-down'\n                      : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(data.indexOf(row))\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(data.indexOf(row))) ||\n                config.collapseAllRows\n              \"\n            >\n              <td *ngIf=\"config.checkboxes || config.radio\"></td>\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: data.indexOf(row) }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </ng-container>\n        <!-- infinite scroll -->\n        <cdk-virtual-scroll-viewport\n          itemSize=\"50\"\n          *ngIf=\"config.infiniteScroll\"\n          class=\"ngx-infinite-scroll-viewport\"\n        >\n          <ng-container\n            *cdkVirtualFor=\"\n              let row of data\n                | sort: sortBy\n                | search: term:filteredCountSubject\n                | global: globalSearchTerm:filteredCountSubject;\n              let rowIndex = index\n            \"\n          >\n            <tr\n              [class.ngx-table__table-row--selected]=\"\n                rowIndex === selectedRow && !config.selectCell\n              \"\n            >\n              <td *ngIf=\"config.checkboxes\" width=\"3%\">\n                <label class=\"ngx-form-checkbox\">\n                  <input\n                    type=\"checkbox\"\n                    id=\"checkbox-infinite-scroll-{{ rowIndex }}\"\n                    [checked]=\"isSelected || selectedCheckboxes.has(rowIndex)\"\n                    (change)=\"onCheckboxSelect($event, row, rowIndex)\"\n                  />\n                  <em class=\"ngx-form-icon\"></em>\n                </label>\n              </td>\n              <td *ngIf=\"config.radio\" width=\"3%\">\n                <label>\n                  <input\n                    type=\"radio\"\n                    id=\"radio-infinite-scroll-{{ rowIndex }}\"\n                    name=\"radio\"\n                    (change)=\"onRadioSelect($event, row, rowIndex)\"\n                  />\n                </label>\n              </td>\n              <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n                <td\n                  (click)=\"onClick($event, row, column.key, colIndex, rowIndex)\"\n                  #contextMenu\n                  (contextmenu)=\"onRowContextMenu($event, row, column.key, colIndex, rowIndex)\"\n                  (dblclick)=\"onDoubleClick($event, row, column.key, colIndex, rowIndex)\"\n                  [class.pinned-left]=\"column.pinned\"\n                  [ngClass]=\"column.cssClass ? column.cssClass.name : ''\"\n                  [style.left]=\"styleService.pinnedWidth(column.pinned, colIndex)\"\n                  [class.ngx-table__table-col--selected]=\"\n                    colIndex === selectedCol && !config.selectCell\n                  \"\n                  [class.ngx-table__table-cell--selected]=\"\n                    colIndex === selectedCol &&\n                    rowIndex === selectedRow &&\n                    !config.selectCol &&\n                    !config.selectRow\n                  \"\n                >\n                  <div *ngIf=\"!column.cellTemplate\">{{ row | render: column.key }}</div>\n                  <ng-container\n                    *ngIf=\"column.cellTemplate\"\n                    [ngTemplateOutlet]=\"column.cellTemplate\"\n                    [ngTemplateOutletContext]=\"{\n                      $implicit: row,\n                      rowIndex: rowIndex,\n                      column: column\n                    }\"\n                  >\n                  </ng-container>\n                </td>\n              </ng-container>\n              <td *ngIf=\"config.additionalActions || config.detailsTemplate\">\n                <span\n                  class=\"ngx-icon\"\n                  *ngIf=\"arrowDefinition\"\n                  [ngClass]=\"\n                    isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\n                  \"\n                  (click)=\"collapseRow(rowIndex)\"\n                >\n                </span>\n              </td>\n            </tr>\n            <tr\n              *ngIf=\"\n                (config.detailsTemplate && selectedDetailsTemplateRowId.has(rowIndex)) ||\n                config.collapseAllRows\n              \"\n            >\n              <td *ngIf=\"config.checkboxes || config.radio\"></td>\n              <td [attr.colspan]=\"columns.length + 1\">\n                <ng-container\n                  [ngTemplateOutlet]=\"detailsTemplate\"\n                  [ngTemplateOutletContext]=\"{ $implicit: row, index: rowIndex }\"\n                >\n                </ng-container>\n              </td>\n            </tr>\n          </ng-container>\n        </cdk-virtual-scroll-viewport>\n      </ng-container>\n      <ng-container *ngIf=\"!rowTemplate && config.groupRows\">\n        <ng-container\n          *ngFor=\"\n            let group of grouped\n              | sort: sortBy:config\n              | search: term:filteredCountSubject:config\n              | global: globalSearchTerm:filteredCountSubject\n              | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id };\n            let rowIndex = index\n          \"\n        >\n          <tr>\n            <ng-container *ngIf=\"!groupRowsHeaderTemplate\">\n              <td [attr.colspan]=\"columns.length\">\n                <div>{{ group[0][groupRowsBy] }} ({{ group.length }})</div>\n              </td>\n            </ng-container>\n            <ng-container\n              *ngIf=\"groupRowsHeaderTemplate\"\n              [ngTemplateOutlet]=\"groupRowsHeaderTemplate\"\n              [ngTemplateOutletContext]=\"{\n                total: group.length,\n                key: groupRowsBy,\n                value: group[0] ? group[0][groupRowsBy] : '',\n                group: group,\n                index: rowIndex\n              }\"\n            >\n            </ng-container>\n            <td>\n              <span\n                class=\"ngx-icon\"\n                *ngIf=\"arrowDefinition\"\n                [ngClass]=\"\n                  isRowCollapsed(rowIndex) ? 'ngx-icon-arrow-down' : 'ngx-icon-arrow-right'\n                \"\n                (click)=\"collapseRow(rowIndex)\"\n              >\n              </span>\n            </td>\n          </tr>\n          <ng-container *ngIf=\"selectedDetailsTemplateRowId.has(rowIndex)\">\n            <tr *ngFor=\"let row of group\">\n              <td *ngFor=\"let column of columns\">\n                {{ row | render: column.key }}\n                <!-- TODO allow users to add groupRowsTemplateRef -->\n              </td>\n              <td></td>\n            </tr>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </tbody>\n    <tbody\n      *ngIf=\"data && !config.isLoading && config.rowReorder\"\n      class=\"ngx-draggable-row-area\"\n      cdkDropList\n      (cdkDropListDropped)=\"onDrop($event)\"\n    >\n      <ng-container *ngIf=\"!rowTemplate && !config.groupRows\">\n        <ng-container\n          *ngFor=\"\n            let row of data\n              | sort: sortBy\n              | search: term:filteredCountSubject\n              | global: globalSearchTerm:filteredCountSubject\n              | paginate: { itemsPerPage: limit, currentPage: page, totalItems: count, id: id }\n          \"\n        >\n          <tr\n            class=\"ngx-draggable-row\"\n            cdkDrag\n            (cdkDragStarted)=\"onDragStart($event)\"\n            [cdkDragStartDelay]=\"config.reorderDelay || 0\"\n            cdkDragLockAxis=\"y\"\n          >\n            <td *ngIf=\"config.checkboxes\">\n              <label class=\"ngx-form-checkbox\">\n                <input\n                  type=\"checkbox\"\n                  id=\"checkbox-draggable-{{ data.indexOf(row) }}\"\n                  [checked]=\"isSelected || selectedCheckboxes.has(data.indexOf(row))\"\n                  (change)=\"onCheckboxSelect($event, row, data.indexOf(row))\"\n                />\n                <em class=\"ngx-form-icon\"></em>\n              </label>\n            </td>\n            <td *ngIf=\"config.radio\">\n              <label>\n                <input\n                  type=\"radio\"\n                  id=\"radio-draggable-{{ data.indexOf(row) }}\"\n                  name=\"radio\"\n                  (change)=\"onRadioSelect($event, row, data.indexOf(row))\"\n                />\n              </label>\n            </td>\n            <ng-container *ngFor=\"let column of columns; let colIndex = index\">\n              <td\n                (click)=\"onClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                (dblclick)=\"onDoubleClick($event, row, column.key, colIndex, data.indexOf(row))\"\n                [class.ngx-table__table-col--selected]=\"\n                  colIndex === selectedCol && !config.selectCell\n                \"\n                [class.ngx-table__table-cell--selected]=\"\n                  colIndex === selectedCol &&\n                  data.indexOf(row) === selectedRow &&\n                  !config.selectCol &&\n                  !config.selectRow\n                \"\n              >\n                <div *ngIf=\"!column.cellTemplate\">{{ row | render: column.key }}</div>\n                <ng-container\n                  *ngIf=\"column.cellTemplate\"\n                  [ngTemplateOutlet]=\"column.cellTemplate\"\n                  [ngTemplateOutletContext]=\"{\n                    $implicit: row,\n                    rowIndex: data.indexOf(row),\n                    column: column\n                  }\"\n                >\n                </ng-container>\n              </td>\n            </ng-container>\n          </tr>\n        </ng-container>\n      </ng-container>\n    </tbody>\n    <tbody *ngIf=\"filterCount === 0\">\n      <tr class=\"ngx-table__body-empty\">\n        <ng-container *ngIf=\"noResultsTemplate\" [ngTemplateOutlet]=\"noResultsTemplate\">\n        </ng-container>\n        <td [attr.colspan]=\"columns && columns.length + 1\" *ngIf=\"!noResultsTemplate\">\n          <div class=\"ngx-table__table-no-results\">No results</div>\n        </td>\n      </tr>\n    </tbody>\n    <tbody *ngIf=\"config.isLoading\">\n      <tr class=\"ngx-table__body-loading\">\n        <ng-container *ngIf=\"loadingTemplate\" [ngTemplateOutlet]=\"loadingTemplate\"> </ng-container>\n        <td [attr.colspan]=\"columns && columns.length + 1\" *ngIf=\"!loadingTemplate\">\n          <div [style.height.px]=\"loadingHeight\" class=\"ngx-table__table-loader-wrapper\">\n            <div class=\"ngx-table__table-loader\"></div>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n    <tfoot *ngIf=\"summaryTemplate\">\n      <tr>\n        <ng-container\n          [ngTemplateOutlet]=\"summaryTemplate\"\n          [ngTemplateOutletContext]=\"{ total: data.length, limit: limit, page: page }\"\n        >\n        </ng-container>\n      </tr>\n    </tfoot>\n  </table>\n  <pagination\n    [attr.id]=\"'pagination' + id\"\n    [id]=\"id\"\n    #paginationComponent\n    [config]=\"config\"\n    [pagination]=\"pagination\"\n    (updateRange)=\"onPagination($event)\"\n  >\n  </pagination>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.ScrollDispatcher }, { type: StyleService }]; }, propDecorators: { configuration: [{
                type: Input
            }], data: [{
                type: Input
            }], pagination: [{
                type: Input
            }], groupRowsBy: [{
                type: Input
            }], id: [{
                type: Input
            }], toggleRowIndex: [{
                type: Input
            }], detailsTemplate: [{
                type: Input
            }], summaryTemplate: [{
                type: Input
            }], groupRowsHeaderTemplate: [{
                type: Input
            }], filtersTemplate: [{
                type: Input
            }], selectAllTemplate: [{
                type: Input
            }], noResultsTemplate: [{
                type: Input
            }], loadingTemplate: [{
                type: Input
            }], additionalActionsTemplate: [{
                type: Input
            }], rowContextMenu: [{
                type: Input
            }], columns: [{
                type: Input
            }], event: [{
                type: Output
            }], rowTemplate: [{
                type: ContentChild,
                args: [TemplateRef]
            }], paginationComponent: [{
                type: ViewChild,
                args: ['paginationComponent']
            }], contextMenu: [{
                type: ViewChild,
                args: ['contextMenu']
            }], table: [{
                type: ViewChild,
                args: ['table']
            }], viewPort: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport]
            }], onContextMenuClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });

class BaseModule {
}
BaseModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: BaseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BaseModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: BaseModule, declarations: [BaseComponent,
        HeaderComponent,
        PaginationComponent,
        TableTHeadComponent,
        // Pipes
        SearchPipe,
        RenderPipe,
        GlobalSearchPipe,
        SortPipe], imports: [CommonModule, NgxPaginationModule, DragDropModule, ScrollingModule], exports: [BaseComponent] });
BaseModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: BaseModule, imports: [CommonModule, NgxPaginationModule, DragDropModule, ScrollingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: BaseModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        BaseComponent,
                        HeaderComponent,
                        PaginationComponent,
                        TableTHeadComponent,
                        // Pipes
                        SearchPipe,
                        RenderPipe,
                        GlobalSearchPipe,
                        SortPipe,
                    ],
                    imports: [CommonModule, NgxPaginationModule, DragDropModule, ScrollingModule],
                    exports: [BaseComponent],
                }]
        }] });

class TableModule {
}
TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: TableModule, imports: [CommonModule, BaseModule], exports: [BaseComponent] });
TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TableModule, imports: [CommonModule, BaseModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, BaseModule],
                    exports: [BaseComponent],
                    providers: [],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { API, BaseComponent, DefaultConfig, Event, STYLE, THEME, TableModule };
//# sourceMappingURL=ngx-easy-table.mjs.map
//# sourceMappingURL=ngx-easy-table.mjs.map
