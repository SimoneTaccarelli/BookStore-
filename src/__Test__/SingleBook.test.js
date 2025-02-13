import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SingleBook from '../components/SingleBook';



it('see the comment when click on details', async () => {
   render( <SingleBook  />);
   //trova il bottone
    const Bdetailas = screen.getByRole('button');

    //clicca il bottone
    fireEvent.click(Bdetailas);
    //trova i commenti
    const comments = await screen.findAllByTestId('comment');
    //verifica che i commenti siano presenti
    expect(comments).toBeInTheDocument();

});
 