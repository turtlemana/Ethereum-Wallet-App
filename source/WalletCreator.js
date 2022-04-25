import createWallet from "./Wallet";
import {useState} from 'react';

function WalletCreator(props){
    return (
        <div>
            <button onClick={createWallet}>Create</button>
        </div>
    )
}

export default WalletCreator;