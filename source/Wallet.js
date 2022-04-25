import { ethers } from "ethers";
import crypto from "crypto";
import {useState} from 'react';



function createWallet(event){
    let privArr=[];
    let addrArr=[];
    event.preventDefault();
    const INFURA_ID = 'e413b7ae8e8546ebb1ec5ba7e505d525'
    const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${INFURA_ID}`)

    let id=crypto.randomBytes(32).toString('hex');
    let privateKey="0x"+id;
    privArr.push(privateKey)
    console.log(privateKey);

    const wallet = new ethers.Wallet(privateKey, provider)
    console.log("Address "+wallet.address);
    addrArr.push(wallet.address)
};

export default createWallet;