import {
  type BatchAction,
  type ColumnDefinition,
  DataTableWithActions,
  type RowAction,
} from "@nomad/ui/components/common/data-table-with-actions";
import { Button } from "@nomad/ui/components/primitives/button";
import { Input } from "@nomad/ui/components/primitives/input";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  status: "active" | "inactive" | "pending";
  role: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    status: "active",
    role: "Admin",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    age: 35,
    status: "active",
    role: "User",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 42,
    status: "inactive",
    role: "User",
  },
  {
    id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    age: 31,
    status: "pending",
    role: "Moderator",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    email: "ethan@example.com",
    age: 39,
    status: "active",
    role: "User",
  },
];

const meta = {
  title: "Common/DataTableWithActions",
  component: DataTableWithActions,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableWithActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicColumns: ColumnDefinition<User>[] = [
  { key: "name", header: "Name", width: "200px" },
  { key: "email", header: "Email", width: "250px" },
  { key: "age", header: "Age", width: "80px" },
  { key: "status", header: "Status", width: "120px" },
  { key: "role", header: "Role", width: "120px" },
];

export const Default: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    enableSelection: true,
  },
};

export const WithTitle: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    title: "User Management",
    enableSelection: true,
  },
};

export const WithActions: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    rowActions: [
      {
        label: "View",
        onClick: row => alert(`View user: ${row.name}`),
        variant: "link",
      },
      {
        label: "Edit",
        onClick: row => alert(`Edit user: ${row.name}`),
        variant: "link",
      },
      {
        label: "Delete",
        onClick: row => alert(`Delete user: ${row.name}`),
        variant: "danger",
      },
    ] as RowAction<User>[],
    enableSelection: true,
  },
};

export const WithConditionalActions: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    rowActions: [
      {
        label: "Activate",
        onClick: row => alert(`Activate user: ${row.name}`),
        variant: "default",
        show: row => row.status === "inactive",
      },
      {
        label: "Deactivate",
        onClick: row => alert(`Deactivate user: ${row.name}`),
        variant: "danger",
        show: row => row.status === "active",
      },
    ] as RowAction<User>[],
    enableSelection: true,
  },
};

export const WithBatchActions: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    enableSelection: true,
    batchActions: [
      {
        label: "✕ 删除",
        onClick: rows => alert(`Delete ${rows.length} users`),
        variant: "danger",
      },
    ] as BatchAction<User>[],
  },
};

export const WithFilterSlot: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filterSlot = (
      <div className="flex items-center gap-2">
        <span className="font-semibold whitespace-nowrap">User Name</span>
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-64"
        />
      </div>
    );

    return (
      <DataTableWithActions
        data={filteredData}
        columns={basicColumns}
        keyExtractor={row => row.id}
        filterSlot={filterSlot}
        onSearch={() => {}}
        onAdd={() => alert("Add new user")}
        enableSelection={true}
      />
    );
  },
};

export const WithCustomCells: Story = {
  args: {
    data: mockUsers,
    columns: [
      {
        key: "name",
        header: "Name",
        cell: ({ row }) => <strong>{row.name}</strong>,
      },
      {
        key: "email",
        header: "Email",
        cell: ({ value }) => (
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
            {value as string}
          </a>
        ),
      },
      {
        key: "status",
        header: "Status",
        cell: ({ value }) => {
          const status = value as string;
          const colors = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            pending: "bg-yellow-100 text-yellow-800",
          };
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}
            >
              {status}
            </span>
          );
        },
      },
    ],
    keyExtractor: row => row.id,
    enableSelection: false,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    keyExtractor: row => row.id,
    loading: true,
    enableSelection: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    keyExtractor: row => row.id,
    emptyMessage: "No users found. Click 'Add' to create one.",
    enableSelection: true,
    onAdd: () => alert("Add new user"),
  },
};

export const WithError: Story = {
  args: {
    data: [],
    columns: basicColumns,
    keyExtractor: row => row.id,
    error: new Error("Failed to load user data. Please try again."),
    enableSelection: true,
  },
};

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 3;
    const start = (page - 1) * pageSize;
    const paginatedData = mockUsers.slice(start, start + pageSize);

    return (
      <DataTableWithActions
        data={paginatedData}
        columns={basicColumns}
        keyExtractor={row => row.id}
        enableSelection={true}
        pagination={{
          page,
          pageSize,
          total: mockUsers.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

export const CompactVariant: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    variant: "compact",
    enableSelection: true,
  },
};

export const NoSelection: Story = {
  args: {
    data: mockUsers,
    columns: basicColumns,
    keyExtractor: row => row.id,
    enableSelection: false,
    rowActions: [
      {
        label: "View",
        onClick: row => alert(`View user: ${row.name}`),
        variant: "link",
      },
    ] as RowAction<User>[],
  },
};

export const ControlledSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
      new Set(["1", "3"])
    );

    return (
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <p className="font-semibold">Selected IDs:</p>
          <p>{Array.from(selectedRows).join(", ") || "None"}</p>
          <Button
            onClick={() => setSelectedRows(new Set())}
            size="sm"
            className="mt-2"
          >
            Clear Selection
          </Button>
        </div>
        <DataTableWithActions
          data={mockUsers}
          columns={basicColumns}
          keyExtractor={row => row.id}
          enableSelection={true}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    );
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const filteredData = mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(start, start + pageSize);

    const filterSlot = (
      <div className="flex items-center gap-2">
        <span className="font-semibold whitespace-nowrap">Search</span>
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-64"
        />
      </div>
    );

    const rowActions: RowAction<User>[] = [
      {
        label: "View",
        onClick: row => alert(`View user: ${row.name}`),
        variant: "link",
      },
      {
        label: "Edit",
        onClick: row => alert(`Edit user: ${row.name}`),
        variant: "link",
      },
      {
        label: "Delete",
        onClick: row => alert(`Delete user: ${row.name}`),
        variant: "link",
      },
    ];

    const batchActions: BatchAction<User>[] = [
      {
        label: "✕ 删除",
        onClick: rows => alert(`Delete ${rows.length} users`),
        variant: "danger",
      },
    ];

    return (
      <DataTableWithActions
        data={paginatedData}
        columns={basicColumns}
        keyExtractor={row => row.id}
        title="User Management"
        filterSlot={filterSlot}
        onSearch={() => {}}
        onAdd={() => alert("Add new user")}
        rowActions={rowActions}
        batchActions={batchActions}
        enableSelection={true}
        pagination={{
          page,
          pageSize,
          total: filteredData.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};
