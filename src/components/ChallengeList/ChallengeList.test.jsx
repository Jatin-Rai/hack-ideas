import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import ChallengeList from "./ChallengeList";

const mockOnVote = jest.fn();
const mockOnSort = jest.fn();

const mockChallenges = [
    {
        title: 'Test Challenge 1',
        description: 'This is a test challenge.',
        tags: ['test', 'unit'],
        votes: 3,
        createdAt: '2024-02-02T12:30:00Z',
    },
    {
        title: 'Test Challenge 2',
        description: 'Another test challenge.',
        tags: ['test', 'integration'],
        votes: 5,
        createdAt: '2024-02-01T10:00:00Z',
    },
];



test("Renders ChallengeList component with list of challenges", () => {
    const { getByText, getByTestId } = render(
        <ChallengeList challenges={mockChallenges} onVote={mockOnVote} onSort={mockOnSort} />
    );

    expect(getByText("Test Challenge 1")).toBeInTheDocument();
    expect(getByText("Test Challenge 2")).toBeInTheDocument();

    const sortDropdown = getByTestId("sort-dropdown");
    expect(sortDropdown).toBeInTheDocument();

    act(() => {
        fireEvent.click(sortDropdown);
    });

    act(() => {
        fireEvent.click(getByText("Votes"));
    });

    expect(mockOnSort).toHaveBeenCalledWith('votes');

    act(() => {
        fireEvent.click(sortDropdown);
    });

    act(() => {
        fireEvent.click(getByText("Creation Date"));
    });

    expect(mockOnSort).toHaveBeenCalledWith('createdAt');
});


test("Handles upvote button click", () => {
    const { queryAllByText } = render(
      <ChallengeList challenges={mockChallenges} onVote={mockOnVote} onSort={mockOnSort} />
    );
  
    // Find all elements with the text "Upvote"
    const upvoteButtons = queryAllByText(/Upvote/i);
  
    // Assuming you want to click the upvote button for the first challenge
    const upvoteButtonForFirstChallenge = upvoteButtons[0];
  
    act(() => {
      fireEvent.click(upvoteButtonForFirstChallenge);
    });
  
    // Ensure onVote is called with the correct challenge
    expect(mockOnVote).toHaveBeenCalledWith(mockChallenges[0]);
  });
