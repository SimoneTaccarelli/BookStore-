import { render, screen} from '@testing-library/react';
import App from '../App';

it('not see comment when the page is loaded', () => {
    render(<App />)
    const allTheBookComments = screen.queryAllByTestId('comment')
    expect(allTheBookComments).toHaveLength(0)
})