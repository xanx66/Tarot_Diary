import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TarotCard from "../TarotCard";

describe("TarotCard Component", () => {
  it("renders correctly with default props", () => {
    render();

    // Check if the card is rendered with the back image visible
    const cardElement = document.querySelector(".tarot-card");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).not.toHaveClass("revealed");
  });

  it("calls onClick when clicked and not selected", () => {
    const mockOnClick = vi.fn();
    const cardId = 5;

    render();

    const cardElement = document.querySelector(".tarot-card");
    fireEvent.click(cardElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(cardId);
  });

  it("does not call onClick when already selected", () => {
    const mockOnClick = vi.fn();

    render();

    const cardElement = document.querySelector(".tarot-card");
    fireEvent.click(cardElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("shows front image when revealed", () => {
    const frontImage = "/cards/major/fool.jpg";
    const backImage = "/cards/back.png";

    render();

    const cardElement = document.querySelector(".tarot-card");
    expect(cardElement).toHaveClass("revealed");

    const cardFront = document.querySelector(".card-front");
    expect(cardFront).toHaveStyle(`background-image: url(${frontImage})`);
  });

  it("displays position indicator when specified", () => {
    const position = "Future";

    render();

    expect(screen.getByText(position)).toBeInTheDocument();
  });

  it("applies reversed class when isReversed is true", () => {
    render();

    const cardElement = document.querySelector(".tarot-card");
    expect(cardElement).toHaveClass("reversed");
  });
});
