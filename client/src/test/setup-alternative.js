// src/test/setup-alternative.js
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
    this.callback(
      [
        {
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: element.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          target: element,
          time: Date.now(),
        },
      ],
      this
    );
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }
}

// Install the mock before any tests run
global.IntersectionObserver = MockIntersectionObserver;

// Mock the window.matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
