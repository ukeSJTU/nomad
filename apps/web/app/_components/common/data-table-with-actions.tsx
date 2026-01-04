"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@nomad/ui/components/primitives/alert-dialog";
import { Button } from "@nomad/ui/components/primitives/button";
import { Checkbox } from "@nomad/ui/components/primitives/checkbox";
import { Skeleton } from "@nomad/ui/components/primitives/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nomad/ui/components/primitives/table";
import { cn } from "@nomad/ui/lib/utils";
import { useState } from "react";

// ============================================================================
// Types
// ============================================================================

export interface ColumnDefinition<T> {
  key: keyof T | string;
  header: string | (() => React.ReactNode);
  cell?: (props: { row: T; value: unknown }) => React.ReactNode;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  className?: string;
}

export interface RowAction<T> {
  label: string;
  onClick: (row: T) => void;
  variant?: "default" | "link" | "danger";
  show?: (row: T) => boolean;
  icon?: React.ReactNode;
  className?: string;
}

export interface BatchAction<T> {
  label: string;
  onClick: (selectedRows: T[]) => void;
  variant?: "default" | "danger";
  icon?: React.ReactNode;
  show?: (selectedRows: T[]) => boolean;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export interface DataTableWithActionsProps<T> {
  // Core data
  data: T[];
  columns: ColumnDefinition<T>[];
  keyExtractor: (row: T) => string | number;

  // Header section
  title?: string;
  filterSlot?: React.ReactNode;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  addButtonText?: string;
  showAddButton?: boolean;
  searchButtonText?: string;
  showSearchButton?: boolean;

  // Actions
  rowActions?: RowAction<T>[];
  batchActions?: BatchAction<T>[];

  // Selection
  enableSelection?: boolean;
  selectedRows?: Set<string | number>;
  onSelectionChange?: (selected: Set<string | number>) => void;

  // State
  loading?: boolean;
  error?: Error;
  emptyMessage?: string;

  // Pagination
  pagination?: PaginationConfig;

  // Styling
  className?: string;
  variant?: "default" | "compact";

  // Accessibility
  ariaLabel?: string;
}

// ============================================================================
// Main Component
// ============================================================================

export function DataTableWithActions<T extends object>({
  data,
  columns,
  keyExtractor,
  title,
  filterSlot,
  onSearch,
  onAdd,
  addButtonText = "新增",
  showAddButton = true,
  searchButtonText = "查询",
  showSearchButton = true,
  rowActions = [],
  batchActions = [],
  enableSelection = true,
  selectedRows: controlledSelectedRows,
  onSelectionChange,
  loading = false,
  error,
  emptyMessage = "暂无数据",
  pagination,
  className,
  variant = "default",
  ariaLabel,
}: DataTableWithActionsProps<T>) {
  // Internal selection state (if not controlled)
  const [internalSelectedRows, setInternalSelectedRows] = useState<
    Set<string | number>
  >(new Set());

  const selectedRows = controlledSelectedRows ?? internalSelectedRows;

  // Alert dialog state
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const handleSelectionChange = (newSelection: Set<string | number>) => {
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelectedRows(newSelection);
    }
  };

  // Toggle individual row selection
  const toggleRowSelection = (key: string | number) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(key)) {
      newSelection.delete(key);
    } else {
      newSelection.add(key);
    }
    handleSelectionChange(newSelection);
  };

  // Toggle all rows selection
  const toggleAllRows = () => {
    const visibleKeys = data.map(keyExtractor);
    const allVisibleSelected = visibleKeys.every(key => selectedRows.has(key));

    if (allVisibleSelected) {
      // Deselect all visible rows
      const newSelection = new Set(selectedRows);
      visibleKeys.forEach(key => newSelection.delete(key));
      handleSelectionChange(newSelection);
    } else {
      // Select all visible rows
      const newSelection = new Set(selectedRows);
      visibleKeys.forEach(key => newSelection.add(key));
      handleSelectionChange(newSelection);
    }
  };

  // Check if all visible rows are selected
  const visibleKeys = data.map(keyExtractor);
  const allRowsSelected =
    data.length > 0 && visibleKeys.every(key => selectedRows.has(key));
  const someRowsSelected = selectedRows.size > 0 && !allRowsSelected;

  // Get selected row data
  const getSelectedRowsData = (): T[] => {
    return data.filter(row => selectedRows.has(keyExtractor(row)));
  };

  // Render cell value
  const renderCellValue = (column: ColumnDefinition<T>, row: T) => {
    // Type-safe value extraction
    const value =
      typeof column.key === "string" && column.key in row
        ? (row as Record<string, unknown>)[column.key]
        : undefined;

    // Priority: cell > render > default
    if (column.cell) {
      return column.cell({ row, value });
    }
    if (column.render) {
      return column.render(value, row);
    }
    if (value === null || value === undefined) {
      return "-";
    }
    return String(value);
  };

  // Get visible actions for a row
  const getVisibleActions = (row: T): RowAction<T>[] => {
    return rowActions.filter(action => !action.show || action.show(row));
  };

  // Get visible batch actions
  const getVisibleBatchActions = (): BatchAction<T>[] => {
    const selectedData = getSelectedRowsData();
    return batchActions.filter(
      action => !action.show || action.show(selectedData)
    );
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div
      className={cn("space-y-4", className)}
      aria-label={ariaLabel || "Data table"}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {filterSlot && <div className="flex-1">{filterSlot}</div>}
        </div>

        <div className="flex items-center gap-2">
          {showSearchButton && onSearch && (
            <Button onClick={() => onSearch("")} variant="outline">
              {searchButtonText}
            </Button>
          )}
          {showAddButton && onAdd && (
            <Button onClick={onAdd}>{addButtonText}</Button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error.message || "加载数据时出错"}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {enableSelection && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={allRowsSelected}
                    onCheckedChange={toggleAllRows}
                    aria-label="全选"
                    className={cn(someRowsSelected && "opacity-50")}
                  />
                </TableHead>
              )}
              {columns.map((column, index) => (
                <TableHead
                  key={`header-${String(column.key)}-${index}`}
                  style={{ width: column.width }}
                  className={cn(column.className)}
                >
                  {typeof column.header === "function"
                    ? column.header()
                    : column.header}
                </TableHead>
              ))}
              {rowActions.length > 0 && (
                <TableHead className="text-center">操作</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {enableSelection && (
                    <TableCell>
                      <Skeleton className="h-4 w-4" />
                    </TableCell>
                  )}
                  {columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${colIndex}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                  {rowActions.length > 0 && (
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (enableSelection ? 1 : 0) +
                    (rowActions.length > 0 ? 1 : 0)
                  }
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              // Data rows
              data.map(row => {
                const rowKey = keyExtractor(row);
                const isSelected = selectedRows.has(rowKey);
                const visibleActions = getVisibleActions(row);

                return (
                  <TableRow
                    key={rowKey}
                    className={cn(
                      isSelected && "bg-muted/50",
                      variant === "compact" && "h-12"
                    )}
                  >
                    {enableSelection && (
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRowSelection(rowKey)}
                          aria-label={`选择行 ${rowKey}`}
                        />
                      </TableCell>
                    )}
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={`cell-${rowKey}-${colIndex}`}
                        className={cn(column.className)}
                      >
                        {renderCellValue(column, row)}
                      </TableCell>
                    ))}
                    {rowActions.length > 0 && (
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {visibleActions.map((action, actionIndex) => (
                            <Button
                              key={`action-${rowKey}-${actionIndex}`}
                              variant={
                                action.variant === "danger"
                                  ? "destructive"
                                  : action.variant === "link"
                                    ? "link"
                                    : "ghost"
                              }
                              size="sm"
                              onClick={() => action.onClick(row)}
                              className={cn(
                                action.variant === "link" && "h-auto p-0",
                                action.className
                              )}
                            >
                              {action.icon}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Section */}
      {(enableSelection || pagination) && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Batch Actions - Always show when selection is enabled */}
          {enableSelection && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={allRowsSelected}
                  onCheckedChange={toggleAllRows}
                  aria-label="全选"
                />
                <span className="text-sm text-muted-foreground">全选</span>
              </div>

              {getVisibleBatchActions().map((action, index) => (
                <Button
                  key={`batch-action-${index}`}
                  variant={
                    action.variant === "danger" ? "destructive" : "ghost"
                  }
                  size="sm"
                  onClick={() => {
                    // Check if any rows are selected
                    if (selectedRows.size === 0) {
                      setAlertConfig({
                        title: "提示",
                        description: "请先选择要删除的选项",
                        onConfirm: () => {
                          setShowAlert(false);
                        },
                      });
                      setShowAlert(true);
                    } else {
                      // Show confirmation dialog
                      setAlertConfig({
                        title: "确认删除",
                        description: "您确认要删除所选记录吗？",
                        onConfirm: () => {
                          action.onClick(getSelectedRowsData());
                          setShowAlert(false);
                        },
                      });
                      setShowAlert(true);
                    }
                  }}
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}

              {selectedRows.size > 0 && (
                <span className="text-sm text-muted-foreground">
                  已选择 {selectedRows.size} 项
                </span>
              )}
            </div>
          )}

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                上一页
              </Button>
              <span className="text-sm text-muted-foreground">
                第 {pagination.page} 页，共{" "}
                {Math.ceil(pagination.total / pagination.pageSize)} 页
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onPageChange(pagination.page + 1)}
                disabled={
                  pagination.page >=
                  Math.ceil(pagination.total / pagination.pageSize)
                }
              >
                下一页
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertConfig?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertConfig?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            {alertConfig?.title !== "提示" && (
              <AlertDialogAction onClick={alertConfig?.onConfirm}>
                确认
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ============================================================================
// Export convenience types
// ============================================================================

export type { ColumnDefinition as Column };
