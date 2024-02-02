/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Dropdown, ListGroup } from 'react-bootstrap';

const ChallengeList = ({ challenges, onVote, onSort }) => {
  return (
    <>
      <h2 className='mb-3'>Challenges</h2>
      <Dropdown className='mt-3' onSelect={(eventKey) => onSort(eventKey)}>
        <Dropdown.Toggle variant='outline-secondary' data-testid="sort-dropdown">Sort by  </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="votes">Votes</Dropdown.Item>
          <Dropdown.Item eventKey="createdAt">Creation Date</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ListGroup className='mt-3' data-testid="challenge-list">
        {challenges.map((challenge) => (
          <ListGroup.Item key={challenge.createdAt} className='mt-3'>
            <h3 data-testid={`challenge-title-${challenge.createdAt}`}>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <p>Tags: {challenge.tags.join(', ')}</p>
            <p>Votes: {challenge.votes}</p>
            <Button variant="danger" onClick={() => onVote(challenge)}>
              Upvote
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ChallengeList;
