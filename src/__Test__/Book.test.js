import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders exatly 12 books', () => {
    //renderizza il componente
   render( <App />);
    //trova le immagini dei libri
    const bookImages = screen.getAllByRole('Card.img');
    //verifica che il numero di immagini sia 12
    expect(bookImages).toHaveLength(12);
});
 