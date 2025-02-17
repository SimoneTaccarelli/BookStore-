import './App.css';
import MyNav from './components/MyNav.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import MyFooter from './components/Footer.js';
import { BookProvider } from './components/Context.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Details from './pages/Details.js';
import Welcome from './components/Welcome.js';



function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <MyNav />
        <header>
          <Welcome />
        </header>
        <main>
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Details/:asin' element={<Details />} />
            </Routes>
          </Container>
        </main>
        <Container fluid>
          <MyFooter />
        </Container>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
