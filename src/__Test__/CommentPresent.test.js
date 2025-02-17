import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

it('see the comment when click to details', async () => {
    render(<App />)
    //prendi il primo bottone details
    const Bcard = screen.getAllByText(/details/i);
    
    const firstBottonCard = Bcard[0];
    //clicca sul bottone details
    fireEvent.click(firstBottonCard);
    
    // Aspetta che i commenti siano caricati
    const comments = await screen.findAllByTestId('comment');
    
    // Verifica che l'array dei commenti esista
    expect(comments).toBeTruthy();
    // Verifica che ci sia almeno un commento
    expect(comments.length).toBeGreaterThan(0);
})