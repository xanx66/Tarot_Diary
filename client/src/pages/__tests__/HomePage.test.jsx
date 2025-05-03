import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../HomePage";

// Mock react-router-dom's useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("HomePage Component", () => {
  it("renders question prompt and input", () => {
    render();

    expect(
      screen.getByText(/What would you like to talk/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/My question is/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Start Reading/i })
    ).toBeInTheDocument();
  });

  it("displays error message when submitting without a question", () => {
    render();

    const startButton = screen.getByRole("button", { name: /Start Reading/i });
    fireEvent.click(startButton);

    expect(screen.getByText(/Please enter a question/i)).toBeInTheDocument();
  });

  it("updates question state when typing in input", () => {
    render();

    const input = screen.getByPlaceholderText(/My question is/i);
    fireEvent.change(input, { target: { value: "Will I find love?" } });

    expect(input.value).toBe("Will I find love?");
  });
});
