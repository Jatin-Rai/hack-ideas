/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ChallengeForm, ChallengeList } from "./components";
import { Row, Col, Container, Navbar, Form, Button } from "react-bootstrap";

const App = () => {
  const defaultChallenges = [
    {
      title: 'Build a Real-time Chat Application',
      description: 'Create a chat app with real-time messaging using React and WebSocket.',
      tags: ['tech', 'feature'],
      votes: 5,
      createdAt: '2023-01-02T12:30:00Z',
    },
    {
      title: 'Design a Creative Landing Page',
      description: 'Design an eye-catching landing page for a fictional product or service.',
      tags: ['design', 'feature'],
      votes: 8,
      createdAt: '2023-01-01T10:00:00Z',
    },
  ];

  const validEmployeeIds = ['123', '456', '789', '111', '222', '333'];

  // Load challenges from localStorage or use defaultChallenges if not present
  const initialChallenges = JSON.parse(localStorage.getItem('challenges')) || defaultChallenges;

  
  const [challenges, setChallenges] = useState(initialChallenges);
  const [employeeId, setEmployeeId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    // Save challenges to localStorage whenever the challenges state changes
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  const handleAddChallenge = (newChallenge) => {
    setChallenges([...challenges, newChallenge]);
  };

  const handleVote = (selectedChallenge) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge === selectedChallenge
        ? { ...challenge, votes: challenge.votes + 1 }
        : challenge
    );
    setChallenges(updatedChallenges);
  };

  const handleSort = (sortBy) => {
    const sortedChallenges = [...challenges].sort((a, b) => {
      if (sortBy === 'votes') return b.votes - a.votes;
      if (sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
    setChallenges(sortedChallenges);
  };

  const handleLogin = () => {
    if (validEmployeeIds.includes(employeeId)) {
      setLoggedIn(prev => !prev);
    } else {
      alert('Invalid employee ID. Please try again.');
    }
  };

  if (!loggedIn) {
    return (
      <Container className='mb-5'>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>Welcome to Hack Ideas</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          <Form className='mt-3'>
            <Form.Group controlId='formEmployeeId'>
              <Form.Label>Employee ID:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your employee ID'
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </Form.Group>
            <Button className='mt-3' variant='primary' onClick={handleLogin}>
              Log In
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }

  return (
    <Container className='mb-5'>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Hack Ideas</Navbar.Brand>
          <Navbar.Text>Employee ID: {employeeId}</Navbar.Text>
          <Button variant='secondary' onClick={handleLogin}>Logout</Button>
        </Container>
      </Navbar>
      <Container>
        <Row className='mt-3'>
          <Col md={8}>
            <ChallengeList challenges={challenges} onVote={handleVote} onSort={handleSort} />
          </Col>
          <Col md={4}>
            <ChallengeForm onAddChallenge={handleAddChallenge} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default App;
