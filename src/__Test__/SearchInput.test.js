import { render, screen, fireEvent} from '@testing-library/react';
import App from '../App';


describe('filter testing', () => {
    it("finds just one result for the word 'Wild'", () => {
      render(<App />)
      const filter = screen.getByPlaceholderText(/Search/i)
      fireEvent.change(filter, { target: { value: 'Wild' } })
      const allTheBookCards = screen.getAllByTestId('book-card')
      expect(allTheBookCards).toHaveLength(1)
    })
    it("finds two results for the word 'Killers'", () => {
        render(<App />)
        const filter = screen.getByPlaceholderText(/Search/i)
        fireEvent.change(filter, { target: { value: 'Killers' } })
        const allTheBookCards = screen.getAllByTestId('book-card')
        expect(allTheBookCards).toHaveLength(2)
      })
    })