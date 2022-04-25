import {useState} from 'react';
import { ethers } from "ethers";
import crypto from "crypto";
import { Button, Card, ListGroup, ListGroupItem,Col,Row,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SuccessModal from '../Components/SuccessModal';
import FailModal from '../Components/FailModal';

function SendTransaction(){
    const [enteredAddr,setEnteredAddr]=useState();
    const [enteredRecAddr,setEnteredRecAddr]=useState();
    const [enteredPriv,setEnteredPriv]=useState();
    const [enteredAmount, setEnteredAmount]=useState();
    const [transactionChange, setTransactionChange]=useState(false);
    const [modalOpen, setModalOpen]=useState(false);

    const addrInputHandler= ({ target: { value } }) => {
        setEnteredAddr(value);
    }
    const receiveraddrInputHandler= ({ target: { value } }) => {
        setEnteredRecAddr(value);
    }
    const privInputHandler= ({ target: { value } }) => {
        setEnteredPriv(value);
    }
    const amountInputHandler= ({ target: { value } }) => {
        setEnteredAmount(value);
    }
    async function Transaction(){
        const INFURA_ID = 'e413b7ae8e8546ebb1ec5ba7e505d525'
        const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${INFURA_ID}`)
        const wallet = new ethers.Wallet(enteredPriv, provider)
        const recieverBalanceBefore = await provider.getBalance(enteredRecAddr)
        console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)
        try{
            const tx = await wallet.sendTransaction({
                to: enteredRecAddr,
                value: ethers.utils.parseEther(`${enteredAmount}`),
            })
            await tx.wait()
            console.log(tx)
            console.log(ethers.utils.formatEther(tx.value))
            const recieverBalanceAfter = await provider.getBalance(enteredRecAddr)
            console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
            if ((parseFloat(ethers.utils.formatEther(recieverBalanceBefore))+parseFloat(ethers.utils.formatEther(tx.value)))===parseFloat(ethers.utils.formatEther(recieverBalanceAfter))){
                setTransactionChange("success");
                setModalOpen("success");
            }
        } catch(err){
            setTransactionChange("fail");
            setModalOpen("fail");
            console.log(`트랜잭션이 유효하지 않습니다 ${err}`)
        }
    }
    
    return (
    <div>
    <Form style={{ width: '44rem' }}>
    <Form.Group className="mb-3" controlId="formPrivateKey">
        <Form.Label>Your Private Key (Sender)</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Private Key" onChange={privInputHandler}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formSenderAddress" htmlFor="formSenderAddress">
        <Form.Label>Your Address (Sender)</Form.Label>
        <Form.Control type="text" placeholder="Enter Your Address" onChange={addrInputHandler}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formReceiverAddress">
        <Form.Label>Receiver's Address (Receiver)</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" onChange={receiveraddrInputHandler}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formAmount">
        <Form.Label>Amount (Test Ethers)</Form.Label>
        <Form.Control type="number" placeholder="Enter Amount" onChange={amountInputHandler}/>
    </Form.Group>
    <Button variant="primary" onClick={Transaction}>
        Send Test Ethers
    </Button>
    {transactionChange==="success" && modalOpen==="success" && <SuccessModal modalOpen={setModalOpen}></SuccessModal>}
    {transactionChange ==="fail" && modalOpen==="fail" && <FailModal modalOpen={setModalOpen}></FailModal>}
    </Form>        
    </div>
    )
}

export default SendTransaction;