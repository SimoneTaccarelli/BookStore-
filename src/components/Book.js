import data from '../dati/history.json'
import { Button, Col, Row, Form } from 'react-bootstrap';
import SingleBook from './singleBook';
import { useState } from 'react';




function BookCard() {
  const [visible, setVisible] = useState(12);
  function showMore() {
    setVisible(visible + 12);
  }
  const [search, setSearch] = useState('');
  const filteredData = data.filter((book) => {
    return book.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <Row>
        <Form>
          <Form.Group>
            <Form.Control 
            type="text" 
            placeholder="Cerca" 
            onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <div className="container">
        <Row className='mt-5'>
          {filteredData.slice(0, visible).map((book) => {
            return (
              <Col md={3} key={book.asin} id={book.title} className='mb-5'>
                <SingleBook book={book} />
              </Col>
            )
          })}
        </Row>
      </div>
      {visible < data.length && (
        <div className='text-center mb-4'>
          <Button onClick={showMore}>Mostra altri</Button>
        </div>
      )}
    </>
  );
}

export default BookCard;