import { Container } from "react-bootstrap";

function Welcome() {
    return (
        <Container className="text-center" style={{marginTop: "20px", backgroundColor: "lightgray", borderRadius: "10px", padding: "20px"}}>
            <h1>Welcome to the Bookstore</h1>
        </Container>
    )
}

export default Welcome;