import React from 'react';
import { Card , Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';




function SingleBook({book, setSelectedBook, selectedBook}) {
    const isSelected = selectedBook === book.asin;

  
   
    return (
        <>
        <Card data-testid="book-card"
        className={`book-card ${isSelected ? 'selected' : ''}`}
        onClick={() => setSelectedBook(isSelected ? null : book.asin)}
        >
            <Card.Img variant="top" role="Card.img" src={book.img} style={{ height: '350px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{book.title.substring(0, 15)}...</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text className='text-center'>€ {book.price.toFixed(2)}</Card.Text>
                <Button 
                role="details-button"
                 as={Link} to={`/Details/${book.asin}`} 
                 variant="primary">Details</Button>
            </Card.Body>

        </Card>
        
        </>

    )
}

export default SingleBook;