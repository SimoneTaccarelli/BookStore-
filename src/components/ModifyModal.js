import { useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';




function ModifyModal({ id, inviaInput }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const commentRef = useRef(null);
    const [rating, setRating] = useState(0);



    const mandaValore = () => {
            inviaInput(commentRef);
    }


    function modifyComment(id, commentRef, rating) {

        
        setLoading(true);
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzc2Y2MwNmNmOGIyNDAwMTU3NzFmYTkiLCJpYXQiOjE3NDA1NjU4ODUsImV4cCI6MTc0MTc3NTQ4NX0.cEgCgJ6aPtsBuV9Q_paSTtA4XhMx_eRQfoHurVeQ4m8"
            },
            body: JSON.stringify({
                comment: commentRef.current.value,
                rate: rating,
            }),

        })
            .then(() => {
                setLoading(false);
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



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='modify-button' variant="primary" onClick={handleShow}>
                Modify
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica commento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex flex-column align-items-center'>
                        <div>
                            <textarea
                                type="text"
                                placeholder="Inserisci il nuovo commento"
                                ref={commentRef}
                            ></textarea>
                        </div>
                        <div>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                placeholder="Inserisci la nuova valutazione"
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value >= 1 && value <= 5) {
                                        setRating(value);
                                    }
                                    else {
                                        alert('Inserisci un numero tra 1 e 5');
                                    }
                                }}
                            ></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        modifyComment(id, commentRef, rating);
                        mandaValore();
                        handleClose();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModifyModal;