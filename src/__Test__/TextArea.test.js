import { render, screen} from '@testing-library/react';
import AddComment from '../components/Addcomment';


it('renders CommentArea component', () => {
    render(<AddComment />)
    const inputField = screen.getByPlaceholderText(
      /Write your comment here/i
    )
    expect(inputField).toBeInTheDocument()
  })