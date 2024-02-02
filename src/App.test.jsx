import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import App from "./App";

// Mock localStorage to handle getItem and setItem
let localStorageMock = {};
global.localStorage = {
  getItem: (key) => localStorageMock[key] || null,
  setItem: (key, value) => (localStorageMock[key] = value.toString()),
  removeItem: (key) => delete localStorageMock[key],
  clear: () => (localStorageMock = {}),
};

// Mock the window.alert function
const mockAlert = jest.fn();
global.alert = mockAlert;

describe("App component", () => {
  beforeEach(() => {
    // Reset localStorage and mock functions before each test
    localStorage.clear();
    localStorageMock = {};
    mockAlert.mockClear();
  });

  test("Renders login form when not logged in", () => {
    const { getByLabelText, getByText } = render(<App />);

    // Ensure the login form is rendered
    expect(getByLabelText(/Employee ID:/i)).toBeInTheDocument();
    expect(getByText(/Log In/i)).toBeInTheDocument();
  });

  test("Handles login with valid employee ID", () => {
    const { getByLabelText, getByText } = render(<App />);

    // Enter a valid employee ID and click login
    act(() => {
      fireEvent.change(getByLabelText(/Employee ID:/i), { target: { value: "123" } });
      fireEvent.click(getByText(/Log In/i));
    });

    // Ensure the user is logged in
    expect(getByText(/Hack Ideas/i)).toBeInTheDocument();
    expect(getByText(/Employee ID: 123/i)).toBeInTheDocument();
  });

  test("Handles login with invalid employee ID", () => {
    const { getByLabelText, getByText } = render(<App />);

    // Enter an invalid employee ID and click login
    act(() => {
      fireEvent.change(getByLabelText(/Employee ID:/i), { target: { value: "999" } });
      fireEvent.click(getByText(/Log In/i));
    });

    // Ensure an alert is shown for invalid employee ID
    expect(mockAlert).toHaveBeenCalledWith("Invalid employee ID. Please try again.");
  });

  test("Handles logout", () => {
    const { getByText } = render(<App />);

    // Log in first
    act(() => {
      fireEvent.change(getByLabelText(/Employee ID:/i), { target: { value: "123" } });
      fireEvent.click(getByText(/Log In/i));
    });

    // Click the logout button
    act(() => {
      fireEvent.click(getByText(/Logout/i));
    });

    // Ensure the user is logged out
    expect(getByLabelText(/Employee ID:/i)).toBeInTheDocument();
    expect(getByText(/Log In/i)).toBeInTheDocument();
  });

  // Add more tests for ChallengeList and ChallengeForm interactions
});
