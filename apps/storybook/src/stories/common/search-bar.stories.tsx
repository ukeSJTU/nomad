import { SearchBar } from "@nomad/ui/components/common";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Common/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    loading: { control: "boolean" },
    searchButtonLabel: { control: "text" },
    onChange: { action: "changed" },
    onSubmit: { action: "submitted" },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState("");
    return <SearchBar {...args} value={value} onChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: args => {
    const [value, setValue] = useState("Beijing to Shanghai");
    return <SearchBar {...args} value={value} onChange={setValue} />;
  },
};

export const Loading: Story = {
  render: args => {
    const [value, setValue] = useState("Searching...");
    return <SearchBar {...args} value={value} onChange={setValue} loading />;
  },
};

export const CustomPlaceholder: Story = {
  render: args => {
    const [value, setValue] = useState("");
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={setValue}
        placeholder="Search flights, hotels, and more"
      />
    );
  },
};

export const CustomSearchButtonLabel: Story = {
  render: args => {
    const [value, setValue] = useState("");
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={setValue}
        searchButtonLabel="搜索"
      />
    );
  },
};

export const WithCustomClassName: Story = {
  render: args => {
    const [value, setValue] = useState("");
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={setValue}
        className="max-w-md mx-auto"
      />
    );
  },
};

export const Interactive: Story = {
  render: args => {
    const [value, setValue] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const handleSubmit = () => {
      if (value.trim()) {
        setResults(prev => [...prev, value]);
      }
    };

    return (
      <div className="space-y-4">
        <SearchBar
          {...args}
          value={value}
          onChange={setValue}
          onSubmit={handleSubmit}
        />
        {results.length > 0 && (
          <div className="p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Search History:</h3>
            <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={index} className="text-sm">
                  {index + 1}. {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
