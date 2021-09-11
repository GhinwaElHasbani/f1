import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { defaultPaginatorConfig } from '../../configs';
import { DataTable, DataTableColumnDefinition, PaginatorConfig } from '../../models/frontend';
import { PageChangeEvent } from '../../interfaces';
import { HelpersBaseClass } from '../../bases/helper.base';
import { DATA_TABLE_COLUMN_FORMAT } from '../../enums';

@Component({
  selector: 'f1-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.sass']
})
export class CustomDataTableComponent extends HelpersBaseClass implements OnInit {
  @Input('columnsDefinition') columnsDefinition?: DataTableColumnDefinition[];
  @Input('expColumnsDefinition') expColumnsDefinition?: DataTableColumnDefinition[];
  @Input('paginatorConfig') paginatorConfig: PaginatorConfig = defaultPaginatorConfig;
  @Input('rowExpandable') rowExpandable = false;
  @Input('expandedData') expandedDataProp = '';
  @Input('data') data?: DataTable<any>;
  @Input('noResultMessage') noResultMessage = 'No Results Found.';
  @Output('more') more = new EventEmitter<PageChangeEvent>();
  @Output('rowExpand') rowExpand = new EventEmitter<any>();

  columnFormat = DATA_TABLE_COLUMN_FORMAT;
  columnsProperty?: string[];
  private pageChangeEvent?: PageChangeEvent;
  displayLoadMore: boolean = false;

  constructor(
  ) {
    super();
  }

  /** Table Related */

  ngOnChanges(changes: SimpleChanges) {
    const columnsChange = changes['columnsDefinition'];
    const dataChange = changes['data'];
    if (this.isDefined(dataChange) && this.data) {
      // Show and hide the load more button if all the rows were loaded
      this.displayLoadMore = <number>this.data.currentlyVisibleRows?.length < <number>this.data.totalNumberOfVisibleRows;
    }

    // Update the columns in case they changed
    if (this.isDefined(columnsChange)) {
      const columnsDidChange = columnsChange.previousValue !== columnsChange.currentValue;
      if (columnsDidChange) {
        this.extractValuableInfoFromColumns(this.columnsDefinition);
      }
    }
  }

  /**
   * init the paginator
   */
  ngOnInit() {
    this.pageChangeEvent = {
      offset: this.paginatorConfig.offset,
      limit: this.paginatorConfig.limit
    };
  }

  /**
   * Clear the data table
   */
  clearDataTable() {
    this.data = {
      currentlyVisibleRows: [],
      totalNumberOfVisibleRows: this.paginatorConfig.length
    };
  }

  /**
   * On reset table: reset data in table and paginator
   */
  resetDataTable() {
    this.clearDataTable();
    this.resetPaginator();
  }

  isColumnDefined(column: DataTableColumnDefinition) {
    return this.isDefined(column);
  }

  isColumnsDefined(columns: DataTableColumnDefinition[]) {
    return this.isDefined(columns);
  }

  extractValuableInfoFromColumns(columns: DataTableColumnDefinition[]) {
    if (this.isColumnsDefined(columns)) {
      this.columnsProperty = columns.filter(col => col.visible).map(col => col.property);
    }
  }

  /**
   * Add a class to the cell element based on the column type
   * @param column 
   * @returns 
   */
  getCellClass(column: DataTableColumnDefinition) {
    if (this.isColumnDefined(column)) {
      var result = {};
      switch (column.format) {
        case this.columnFormat.Date:
          result = { 'date-cell': true };
          break;
        case this.columnFormat.Link:
          result = { 'link-cell': true };
          break;
        default:
          break;
      }
      if (column.customClasses) {
        column.customClasses.forEach(className => result[className] = true)
      }
    }
    return result;
  }

  /**
   * Format the displayed value based on the column type
   * @param column 
   * @param row 
   * @returns 
   */
  formatCellValue(column: DataTableColumnDefinition, row: any): string {
    let columnValue = '';
    if (this.isColumnDefined(column)) {
      switch (column.format) {
        case DATA_TABLE_COLUMN_FORMAT.Combination:
          columnValue = this.frameworkHelper.getValueFromCombinedProp(row, column.property);
          break;
        default:
          columnValue = this.frameworkHelper.getPropValue(row, column.property);
          break;
      }
    }
    return columnValue;
  }

  /**
   * Open an external link in new tab
   * @param link 
   */
  openWindow(link) {
    window.open(link, "_blank");
  }

  expandRow(row) {
    if (this.rowExpandable) {
      row.expanded = !row.expanded;
      this.rowExpand.emit(row);
    }
  }

  /** Pagination Related */

  /**
   * Increment the offset to indicate the next page
   * Emit the event to get the data for next page
   */
  public clickViewMore() {
    this.setPageChangeEvent(
      {
        offset: this.pageChangeEvent.offset + 1,
        limit: this.pageChangeEvent.limit
      }
    )
    this.more.emit(this.pageChangeEvent);
  }

  resetPaginator() {
    this.setPageChangeEvent(this.paginatorConfig);
  }

  /**
   * 
   * @param pageEvent 
   */
  setPageChangeEvent(pageEvent: PageChangeEvent) {
    if (this.isPaginatorEnabled()) {
      this.pageChangeEvent = {
        offset: pageEvent.offset,
        limit: pageEvent.limit
      };
    }
  }

  isPaginatorEnabled() {
    return this.paginatorConfig.enabled;
  }

  getPageChangeEvent() {
    return this.pageChangeEvent;
  }
}
