import { createContext, useState } from 'react';

export const BookContext = createContext();

export const BookProvider = ({children}) => {
    const [selectquery, setSelectquery] = useState('');

    const contextValue = {  
        selectquery,
        setSelectquery,
    }

    return (
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    )
}

export default BookProvider;
