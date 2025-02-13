import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

it('border change when click on the card', () => {
    // Renderizza il componente
    render(<App />);
    
    // Verifica che le cards siano presenti
    const cards = screen.getAllByTestId('book-card');
    expect(cards).toHaveLength(12);
    
    // Seleziona e clicca sulla prima card
    const singleCard = cards[0]; // Nota: ho cambiato da 1 a 0 per il primo elemento
    
    // Verifica lo stato iniziale (opzionale)
    expect(singleCard).not.toHaveStyle('border: 3px solid red');
    
    // Clicca sulla card
    fireEvent.click(singleCard);
    
    // Verifica il cambio di stile
    expect(singleCard).toHaveStyle('border: 3px solid red');
});