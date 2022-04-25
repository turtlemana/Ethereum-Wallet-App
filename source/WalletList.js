import {useState} from 'react';
import { ethers } from "ethers";
import crypto from "crypto";
import { Button, Card, ListGroup, ListGroupItem,Col,Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function WalletItem(props){
    const [addrText, setAddrText] = useState('');
    const [privText, setPrivText]=useState('');
    const addrCopy=()=>{
        navigator.clipboard.writeText(addrText);
        alert('Copied')
    }
    const privCopy=()=>{
        navigator.clipboard.writeText(privText);
        alert('Copied')
    }
    const [priv, setPriv]=useState('');
    const [addr, setAddr]=useState('');
    function createWallet(event){
        let privArr=[];
        let addrArr=[];
        event.preventDefault();
        const INFURA_ID = 'e413b7ae8e8546ebb1ec5ba7e505d525'
        const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${INFURA_ID}`)
    
        let id=crypto.randomBytes(32).toString('hex');
        let privateKey="0x"+id;
        setPriv(privateKey);
        setPrivText(privateKey);
        console.log(privateKey);
    
        const wallet = new ethers.Wallet(privateKey, provider)
        setAddrText(wallet.address);
        setAddr(wallet.address)
        console.log("Address "+wallet.address);
        
    }
    return (
        <div>
        <Card style={{ width: '44rem' }}>
        <Card.Header>Wallet</Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>private key: {priv}<Row><Col xs={1}><Button onClick={privCopy} disabled={!privText} variant="outline-success" style={{ fontSize: '0.75em' }}>Copy</Button></Col></Row></ListGroup.Item>
            <ListGroup.Item value={addrText}>address: {addr}<Col xs={4}><Button onClick={addrCopy} disabled={!addrText} variant="outline-success" style={{ fontSize: '0.75em' }}>Copy</Button></Col></ListGroup.Item>
        </ListGroup>
        </Card>
        <Button variant="primary" onClick={createWallet} style={{ marginBottom: '3rem' }}>Create Wallet</Button>
        </div>
    )
}
export default WalletItem;