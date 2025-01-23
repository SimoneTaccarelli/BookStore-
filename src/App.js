import './App.css';
import MyNav from './components/MyNav.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container } from 'react-bootstrap';
import BookCard from './components/Book.js';
import MyFooter from './components/Footer.js';



function App() {
 
  return (
    <>
      <MyNav />
      <Container>
        <BookCard className='mt-5' />
      </Container>
      <Container fluid>
        <MyFooter  />
      </Container>
    </>
  );
}

export default App;
