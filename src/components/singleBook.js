import { Card } from 'react-bootstrap';
import { useState } from 'react';

function SingleBook({book}) {

    const [selected , setSelected] = useState(false);

    return (
        <Card 
        className={`book-card ${selected ? 'selected' : ''}`}
        onClick={() => setSelected(!selected)}
        >
            <Card.Img variant="top" src={book.img} style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{book.title.substring(0, 15)}...</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text className='text-end'>€ {book.price.toFixed(2)}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SingleBook;