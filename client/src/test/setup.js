// src/test/setup.js
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = new Set();
    this.observables = new Map();
  }

  observe(element) {
    this.elements.add(element);
    const entry = [
      {
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: element.getBoundingClientRect(),
        isIntersecting: true,
        rootBounds: null,
        target: element,
        time: Date.now(),
      },
    ];
    this.callback(entry, this);
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

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
