import WalletCreator from "../source/WalletCreator";
import WalletItem from "../source/WalletList";
import {useState} from 'react';
import { Button,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SendTransaction from "../source/SendTransaction";


function Homepage(){
  return (
  <Container fluid>  
  <h1 style={{fontWeight:'bold'}}>Create Your Wallet</h1>
  <WalletItem></WalletItem>
  <h1 style={{fontWeight:'bold'}}>Ropsten Ethers Transaction</h1>
  <SendTransaction></SendTransaction>
  </Container>
  )


}

export default Homepage;