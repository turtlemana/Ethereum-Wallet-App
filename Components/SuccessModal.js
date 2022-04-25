import { Button, Card, ListGroup, ListGroupItem,Col,Row,Form,Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SuccessModal({modalOpen}){
    return (
    <div>    
    <Modal.Dialog>
    <Modal.Header closeButton onClick={()=>modalOpen(false)}>
        <Modal.Title>Notice</Modal.Title>
    </Modal.Header>

    <Modal.Body>
        <p>Successfully sent Ethers</p>
    </Modal.Body>

    <Modal.Footer>
        <Button variant="secondary" onClick={()=>modalOpen(false)}>Close</Button>
    </Modal.Footer>
    </Modal.Dialog>
    </div>
    )
}

export default SuccessModal;