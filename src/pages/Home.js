import React from 'react';
import { Container } from 'react-bootstrap';
import BookCard from '../components/Book';  

function Home() {
  return (
    <Container>
      <BookCard />
    </Container>
  );
}

export default Home;