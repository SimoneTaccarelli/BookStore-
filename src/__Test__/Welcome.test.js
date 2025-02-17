import { render, screen} from '@testing-library/react';
import Welcome from '../components/Welcome';

describe('Welcome component testing', () => {
  it('renders the welcome message', () => {
    render(<Welcome />)
    const welcomeMessage = screen.getByText(/welcome to the bookstore/i)
    expect(welcomeMessage).toBeInTheDocument()
  })
}) 