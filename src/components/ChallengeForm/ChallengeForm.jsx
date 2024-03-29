/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


const ChallengeForm = ({ onAddChallenge }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

//Function to add challenges
  const handleAddChallenge = () => {
    if (!title || !description || !tags) {
      alert('Please fill in all fields.');
      return;
    }

    const newChallenge = {
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    setTitle('');
    setDescription('');
    setTags('');

    onAddChallenge(newChallenge);
  };
  

  return (
    <>
      <h2 className='mt-3'>Add New Challenge</h2>
      <Form>
        <Form.Group className='mt-3' controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' />
        </Form.Group>
        <Form.Group className='mt-3' controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' />
        </Form.Group>
        <Form.Group className='mt-3' controlId="formTags">
          <Form.Label>Tags:</Form.Label>
          <Form.Control type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Enter Tags(comma separated)' />
        </Form.Group>
        <Button variant="primary" className='mt-3 w-100' onClick={handleAddChallenge}>
          Add Challenge
        </Button>
      </Form>
    </>
  );
};

export default ChallengeForm;
