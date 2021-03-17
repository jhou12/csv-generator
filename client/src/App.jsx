import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Styles, { Container, Column, Title, Emoji } from './Styles.js';
import List from './List.jsx';

const App = () => {
  const [testState, setTestState] = useState([])

  useEffect(() => {
    axios('/read')
    .then(res => {
      console.log('data retrieved:', res.data)
      setTestState(res.data)
    })
    .catch(err => console.log('client GET req error:', err))
  }, [])

  if (testState.length === 0) {
    return null
  } else {
    return (
      <Container>

        <Column>
          <Title>React running!</Title>
          <Emoji>⚛️</Emoji>
          <List testState={testState}/>
        </Column>

      </Container>
    )
  }
}

export default App;