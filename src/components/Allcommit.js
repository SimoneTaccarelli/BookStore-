import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


function Allcommit({book}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { asin } = useParams();
    const [newComment, setNewComment] = useState('');
    const [AddNewComment, setAddNewComment] = useState('');
    const [rating, setRating] = useState(0);


    useEffect(() => {
        if (asin) {
            setLoading(true);
            fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzg5NTUwNTQsImV4cCI6MTc0MDE2NDY1NH0.r3tDY46smfi6LdVpeP4GZO03NMJUimF1sx5JUYNmzJs"
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setComments(data);
                })
                .catch((err) => {
                    setError(err);
                    console.log("Errore nel recupero commenti:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [asin, AddNewComment]);

    const AddComment = () => {
        setLoading(true);
        fetch(`https://striveschool-api.herokuapp.com/api/comments`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzg5NTUwNTQsImV4cCI6MTc0MDE2NDY1NH0.r3tDY46smfi6LdVpeP4GZO03NMJUimF1sx5JUYNmzJs",
            },
            method: 'POST',
            body: JSON.stringify({
                comment: newComment,
                rate: rating,
                elementId: asin,
            }),
        })
            .then(() => {
                //resetta il commento e la valutazione
                setNewComment('');
                setRating(0);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
            })
        console.log(newComment, rating, asin);
    }

    function deleteComment(id) {
        setComments(comments.filter((comment) => comment._id !== id));
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
            method: 'DELETE',
            headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzg5NTUwNTQsImV4cCI6MTc0MDE2NDY1NH0.r3tDY46smfi6LdVpeP4GZO03NMJUimF1sx5JUYNmzJs"            },
        });
    }

    function NewComment(id) {
        setLoading(true);
        setAddNewComment(prompt("Inserisci il nuovo commento"))
        console.log(AddNewComment)
        modifyComment(id, AddNewComment)
        setLoading(false);
    }

    function modifyComment(id, AddNewComment) {
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3Mzg5NTUwNTQsImV4cCI6MTc0MDE2NDY1NH0.r3tDY46smfi6LdVpeP4GZO03NMJUimF1sx5JUYNmzJs"
            },
            body: JSON.stringify({
                comment: AddNewComment,
            }),
        })
            .catch((err) => {
                setError(err);
                console.log("Errore nella modifica del commento:", err);
            });
    }

    if (error) {
        return <div>Errore nel recupero commenti</div>;
    }

    if (loading) {
        return <div className='spinner-container'>
            <div className='spinner'></div>
        </div>
    }

    return (
        <>
            <div>
                <h3 className='text-center'>{book.title}</h3>
                <div className='comment-area'>
                    <textarea
                        type="text"
                        placeholder="Write your comment here"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
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
                <Button className='send-comment ' onClick={() => AddComment()}>Send Comment</Button>
            </div>
            <div>
                {comments.map((comment) => (
                    <ul key={comment._id}>
                        <li>
                            <p data-testid='comment'>{comment.comment}</p>
                            <p>{comment.rate}</p>
                            <Button className='delete-button mx-2' variant="danger" onClick={() => deleteComment(comment._id)}>Delete</Button>
                            <Button className='modify-button' variant="warning" onClick={() => NewComment(comment._id)}>Modify</Button>
                        </li>
                    </ul>
                ))}
            </div>
        </>
    );
}

export default Allcommit;
