import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

it('border change when click on the card', () => {
    // Renderizza il componente
    render(<App />);
    
    // Verifica che le cards siano presenti
    const cards = screen.getAllByTestId('book-card');
    
    // Seleziona e clicca sulla prima card
    const singleCard = cards[0]; 
    
    // Verifica lo stato iniziale (opzionale)
    expect(singleCard).not.toHaveClass('selected');
    
    // Clicca sulla card
    fireEvent.click(singleCard);
    
    // Verifica il cambio di stile
    expect(singleCard).toHaveClass('selected');

    // Verifica che la prima card non sia selezionata
    const SecondSingleCard = cards[1];

    //clicca sulla seconda card
    fireEvent.click(SecondSingleCard);

    //verifica che la seconda card sia selezionata
    expect(SecondSingleCard).toHaveClass('selected');

    //verifica che la prima card non sia selezionata
    expect(singleCard).not.toHaveClass('selected');

});