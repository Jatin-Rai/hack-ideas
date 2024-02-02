/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ChallengeForm, ChallengeList } from "./components";
import { challengesData } from './mockdata/challengesData';
import { validEmployeeIds } from './mockdata/validEmployeeIds';
import { Row, Col, Container, Navbar, Form, Button } from "react-bootstrap";

const App = () => {

  const employeeIdFromLocalStorage = localStorage.getItem('employeeId');
  const initialEmployeeId = employeeIdFromLocalStorage || '';
  const initialLoggedInStatus = localStorage.getItem('loggedIn') === 'true';
  const initialChallenges = JSON.parse(localStorage.getItem('challenges')) || challengesData;

  const [challenges, setChallenges] = useState(initialChallenges);
  const [employeeId, setEmployeeId] = useState(initialEmployeeId);
  const [loggedIn, setLoggedIn] = useState(initialLoggedInStatus);

  useEffect(() => {

    localStorage.setItem('employeeId', employeeId);
    localStorage.setItem('loggedIn', loggedIn);
    localStorage.setItem('challenges', JSON.stringify(challenges));

  }, [challenges, loggedIn]);


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
      setLoggedIn(true);
    } else {
      alert('Invalid employee ID. Please try again.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }


  if (!loggedIn) {
    return (
      <>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>Welcome to Hack Ideas</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className='d-flex justify-content-center mt-5'>
          <Form>
            <h2 className='mb-5'>Employee Login</h2>
            <Form.Group controlId='formEmployeeId'>
              <Form.Label>Employee ID:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your employee ID'
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </Form.Group>
            <Button className='mt-3 w-100' variant='primary' onClick={handleLogin}>
              Log In
            </Button>
          </Form>
        </Container>
      </>

    );
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Hack Ideas</Navbar.Brand>
          <Navbar.Text>Employee ID: {employeeId}</Navbar.Text>
          <Button variant='secondary' onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>
      <Container className='mb-5'>
        <Row className='mt-3'>
          <Col md={8}>
            <ChallengeList challenges={challenges} onVote={handleVote} onSort={handleSort} />
          </Col>
          <Col md={4}>
            <ChallengeForm onAddChallenge={handleAddChallenge} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;