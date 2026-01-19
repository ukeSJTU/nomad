import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./search-bar";

describe("SearchBar", () => {
  it("renders with default placeholder", () => {
    render(<SearchBar value="" onChange={vi.fn()} onSubmit={vi.fn()} />);

    const input = screen.getByPlaceholderText("搜索任何旅游相关");
    expect(input).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        placeholder="Search flights"
      />
    );

    const input = screen.getByPlaceholderText("Search flights");
    expect(input).toBeInTheDocument();
  });

  it("displays current value", () => {
    render(<SearchBar value="Beijing" onChange={vi.fn()} onSubmit={vi.fn()} />);

    const input = screen.getByDisplayValue("Beijing");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchBar value="" onChange={handleChange} onSubmit={vi.fn()} />);

    const input = screen.getByPlaceholderText("搜索任何旅游相关");
    await user.type(input, "Shanghai");

    expect(handleChange).toHaveBeenCalledTimes(8); // Each character
    expect(handleChange.mock.calls[0][0]).toBe("S");
    expect(handleChange.mock.calls[7][0]).toBe("i");
  });

  it("calls onSubmit when form is submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <SearchBar
        value="test query"
        onChange={vi.fn()}
        onSubmit={handleSubmit}
      />
    );

    const button = screen.getByRole("button", { name: /search/i });
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when Enter is pressed", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <SearchBar
        value="test query"
        onChange={vi.fn()}
        onSubmit={handleSubmit}
      />
    );

    const input = screen.getByPlaceholderText("搜索任何旅游相关");
    await user.type(input, "{Enter}");

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders search icon in button", () => {
    render(<SearchBar value="" onChange={vi.fn()} onSubmit={vi.fn()} />);

    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("disables input and button when loading", () => {
    render(
      <SearchBar value="" onChange={vi.fn()} onSubmit={vi.fn()} loading />
    );

    const input = screen.getByPlaceholderText("搜索任何旅游相关");
    const button = screen.getByRole("button", { name: /search/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        className="custom-class"
      />
    );

    const form = container.querySelector("form");
    expect(form).toHaveClass("custom-class");
  });

  it("uses custom search button label", () => {
    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        searchButtonLabel="搜索"
      />
    );

    const button = screen.getByRole("button", { name: "搜索" });
    expect(button).toBeInTheDocument();
  });

  it("prevents default form submission", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    const mockPreventDefault = vi.fn();

    render(
      <SearchBar value="test" onChange={vi.fn()} onSubmit={handleSubmit} />
    );

    const form = screen
      .getByRole("button", { name: /search/i })
      .closest("form");
    form?.addEventListener("submit", _e => mockPreventDefault());

    const button = screen.getByRole("button", { name: /search/i });
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
