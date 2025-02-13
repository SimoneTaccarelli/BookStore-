import React from 'react';
import books from '../dati/history.json'
import { Button, Col, Row } from 'react-bootstrap';
import SingleBook from './SingleBook.js';
import { useState, useContext } from 'react';
import { BookContext } from './Context.js';





function BookCard() {
  const { selectquery } = useContext(BookContext);
  const [visible, setVisible] = useState(12);
  function showMore() {
    setVisible(visible + 12); 
  }
  const filteredBooks = books.filter((book) =>
    selectquery ? book.title.toLowerCase().includes(selectquery.toLowerCase()) : true
  );
  const [selectedBook, setSelectedBook] = useState(null);
  
  return (
    <>
          <Col >
            <Row className='mt-5'>
              {filteredBooks.slice(0, visible).map((book) => {
                return (
                  <Col md={4} lg={3} xs={12} key={book.asin}  className='Card mb-5'>
                    <SingleBook 
                    book={book} 
                    key={book.asin}
                    setSelectedBook={setSelectedBook}
                    selectedBook={selectedBook}
                    />
                  </Col>
                )
              })}
            </Row>
          </Col> 
      {visible < books.length && (
        <div className='text-center mb-4'>
          <Button onClick={showMore}>Mostra altri</Button>
        </div>
      )}
    </>
  );
}

export default BookCard;