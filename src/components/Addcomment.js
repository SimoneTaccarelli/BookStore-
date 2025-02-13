import React, { useState} from 'react';
import { Button } from 'react-bootstrap';




const AddComment = ({ book }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    //funzione per inviare il commento
    const addComment = () => {
        setLoading(true);
        fetch(`https://striveschool-api.herokuapp.com/api/comments`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzc3NDQ5NzgsImV4cCI6MTczODk1NDU3OH0.pAKu-blSFPdC9wQschCGyVUxlIzJcokrIjDynNdFl_g",
            },
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
                rate: rating,
                elementId: book.asin,
            }),
        })
            .then(() => {
                //resetta il commento e la valutazione
                setComment('');
                setRating(0);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
            })
        console.log(comment, rating, book.asin);
    }



    if (loading) {
        return (
            <div className='spinner-container'>
                <div className='spinner'>

                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className='error-container'>
                Errore: {error}
            </div>
        );
    }
    //funzione per inviare il commento
    return (
        <>
        <div>
           <div className='comment-area'>
                <textarea
                    type="text"
                    placeholder="Write your comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <input
                    type="number"
                    className='align-items-center'
                    placeholder="valuta da 1 a 5"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= 1 && value <= 5) {
                            setRating(value);
                        }
                        else {
                            alert('Inserisci un numero tra 1 e 5');
                        }
                    }}
                />
                </div>
                <Button className='send-comment ' onClick={() => addComment()}>Send Comment</Button>
            </div>
        </>
    )
}

export default AddComment;  
