import { ethers } from "ethers";

const INFURA_ID = 'e413b7ae8e8546ebb1ec5ba7e505d525'
const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${INFURA_ID}`)

const privateKey = '0xe85e6b5da1dd9166f80be23b3af6d4dec6fddbc2a1c8c37983c9f1dd9123157a' // Private key of account 1
const wallet = new ethers.Wallet(privateKey, provider)

const account1 = '0xC80f7Ec1d8Aca3CB02CF59b0dD04311A5F11FA6a' // Your account address 1
const account2 = '0x0DDF5be346aADc5113dA68c9E05BC64940bCd1F5' // Your account address 2

const main = async () => {
    const senderBalanceBefore = await provider.getBalance(account1)
    const recieverBalanceBefore = await provider.getBalance(account2)

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)
// Send Ether to account2
    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther("0.025"),
    })
// Wait for transaction to be mined
    await tx.wait()
    console.log(tx)

    const senderBalanceAfter = await provider.getBalance(account1)
    const recieverBalanceAfter = await provider.getBalance(account2)

    console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()