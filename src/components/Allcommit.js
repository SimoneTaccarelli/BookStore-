import React, { useState, useEffect } from 'react';
import { Button , Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ModifyModal from './ModifyModal';


function Allcommit({book}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { asin } = useParams();
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [addNewComment, setAddNewComment] = useState('');
    const [visible, setVisible] = useState(5);

    const riceviInput = (e) => {
        setAddNewComment(e);
    }


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
        console.log(addNewComment);
    }, [asin, addNewComment]);

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
                <Table className='mt-4'> 
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th className='text-center'>Rate</th>
                        </tr>
                    </thead>
                {comments.slice(0, visible).map((comment) => (
                    <tr key={comment._id}>
                        <td data-testid='comment'>{comment.comment}</td>
                        <td className='text-center'>{comment.rate}</td>
                        <td ><Button className='delete-button mx-2' variant="danger" onClick={() => deleteComment(comment._id)}>Delete</Button></td>
                        <td><ModifyModal inviaInput={riceviInput} id={comment._id} /></td>
                    </tr>
                    ))}
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
