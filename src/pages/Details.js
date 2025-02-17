import Book from '../dati/history.json'
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Cdetails.css';
import Allcommit from '../components/Allcommit';

function Details() {
    const { asin } = useParams();
    const DetailsBook = Book.find(book => book.asin === asin);
    return (
        <Container>
            <h1>{DetailsBook.title}</h1>
            <div className='details-container row'>
                <div className='col-md-4'>
                    <img 
                    src={DetailsBook.img} 
                    style={{ height: '350px', objectFit: 'cover' }} 
                    alt={DetailsBook.title}/>
                </div>
                <div className='col-md-8'>
                    <div className='details-info'>
                        <Allcommit book={DetailsBook} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Details;
