import React, { useState, useEffect, useRef } from 'react';
import { Button , Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ModifyModal from './ModifyModal';


function Allcommit({book}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { asin } = useParams();
    const commentRef = useRef(null);
    const [rating, setRating] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [addNewComment, setAddNewComment] = useState('');
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [visible, setVisible] = useState(5);

    const riceviInput = (e) => {
        setAddNewComment(e);
        setShouldRefetch(true);
    }

    

    useEffect(() => {
        console.log('Nuovo commento ricevuto:', addNewComment);
        if (asin) {
            setLoading(true);
            fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3NDA1NjU4ODUsImV4cCI6MTc0MTc3NTQ4NX0.cEgCgJ6aPtsBuV9Q_paSTtA4XhMx_eRQfoHurVeQ4m8"
                },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Errore nel recupero dei commenti');
                }
                return res.json();
            })
            .then((data) => {
                setComments(data);
                setShouldRefetch(false);
            })
            .catch((err) => {
                setError(err);
                console.log("Errore nel recupero commenti:", err);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [asin, shouldRefetch, addNewComment]);

    const AddComment = () => {
        setLoading(true);
        fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3NDA1NjU4ODUsImV4cCI6MTc0MTc3NTQ4NX0.cEgCgJ6aPtsBuV9Q_paSTtA4XhMx_eRQfoHurVeQ4m8"
            },
            body: JSON.stringify({
                comment: commentRef.current.value,
                rate: rating,
                elementId: asin,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Errore nella risposta del server');
            }
            return res.json();
        })
        .then(() => {
            // Dopo aver aggiunto il commento, facciamo un nuovo fetch per aggiornare la lista
            fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3NDA1NjU4ODUsImV4cCI6MTc0MTc3NTQ4NX0.cEgCgJ6aPtsBuV9Q_paSTtA4XhMx_eRQfoHurVeQ4m8"
                },
            })
            .then(res => res.json())
            .then(newData => {
                setComments(newData);
                commentRef.current.value = '';
                setRating(0);
            });
        })
        .catch((err) => {
            console.log("Errore nell'aggiunta del commento:", err);
            setError(err);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    function deleteComment(id) {
        setComments(comments.filter((comment) => comment._id !== id));
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
            method: 'DELETE',
            headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3NDA1NjU4ODUsImV4cCI6MTc0MTc3NTQ4NX0.cEgCgJ6aPtsBuV9Q_paSTtA4XhMx_eRQfoHurVeQ4m8",},
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
                <h3 className='text-center'>Comments</h3>
                <div className='comment-area'>
                    <textarea
                        type="text"
                        placeholder="Write your comment here"
                        ref={commentRef}
                        onChange={(e) => {
                            if (commentRef.current) {
                                commentRef.current.value = e.target.value;
                            }
                        }}
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
                <Button className='send-comment' onClick={() => AddComment()}>Send Comment</Button>
            </div>
            <div>
                <Table className='mt-4'> 
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th className='text-center'>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.slice(0, visible).map((comment) => (
                            <tr key={comment._id}>
                                <td data-testid='comment'>{comment.comment}</td>
                                <td className='text-center'>{comment.rate}</td>
                                <td><Button className='delete-button mx-2' variant="danger" onClick={() => deleteComment(comment._id)}>Delete</Button></td>
                                <td><ModifyModal inviaInput={riceviInput} id={comment._id} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className='d-flex justify-content-center'>
                    <Button className='show-more ' onClick={() => setVisible(visible + 5)}>Show More</Button>
                    <div className='mx-2'>
                        <Button className='show-more ' onClick={() => setVisible(5)}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Allcommit;
