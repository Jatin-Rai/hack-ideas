import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ChallengeForm from "./ChallengeForm";

// Mock the onAddChallenge function
const mockOnAddChallenge = jest.fn();

// Mock window.alert
const alertSpy = jest.spyOn(window, 'alert');

beforeEach(() => {
  // Clear mock function and reset mock for window.alert before each test
  jest.clearAllMocks();
  alertSpy.mockClear();
});

afterAll(() => {
  // Restore original implementation of window.alert after all tests
  alertSpy.mockRestore();
});

test("Handles adding a new challenge", () => {
  const { getByLabelText, getByText } = render(
    <ChallengeForm onAddChallenge={mockOnAddChallenge} />
  );

  // Fill in the form fields
  act(() => {
    fireEvent.change(getByLabelText(/Title/i), { target: { value: "Test Challenge" } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: "This is a test challenge." } });
    fireEvent.change(getByLabelText(/Tags/i), { target: { value: "test, unit" } });
  });

  // Click the "Add Challenge" button
  act(() => {
    fireEvent.click(getByText(/Add Challenge/i));
  });

  // Ensure onAddChallenge is called with the correct parameters
  expect(mockOnAddChallenge).toHaveBeenCalledWith({
    title: "Test Challenge",
    description: "This is a test challenge.",
    tags: ["test", "unit"],
    votes: 0,
    createdAt: expect.any(String),
  });

  // Ensure the form fields are cleared after adding a challenge
  expect(getByLabelText(/Title/i).value).toBe("");
  expect(getByLabelText(/Description/i).value).toBe("");
  expect(getByLabelText(/Tags/i).value).toBe("");
});

test("Handles adding a new challenge with empty fields", () => {
  const { getByText } = render(
    <ChallengeForm onAddChallenge={mockOnAddChallenge} />
  );

  // Mock window.alert before clicking the "Add Challenge" button
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  // Click the "Add Challenge" button without filling in any fields
  act(() => {
    fireEvent.click(getByText(/Add Challenge/i));
  });

  // Ensure an alert is displayed for empty fields
  expect(window.alert).toHaveBeenCalledWith("Please fill in all fields.");
});
