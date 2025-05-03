import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header Component", () => {
  it("renders the header with logo and title", () => {
    render();

    expect(screen.getByText("Arcana Whispers")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
