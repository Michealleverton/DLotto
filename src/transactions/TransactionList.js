import { React, useState } from 'react';
import { ethers } from 'ethers'
import { useQuery, gql } from "@apollo/client"
import "./TransactionList.css"

export default function TransactionList(z) {

    const [viewtransactionsfrom, setTransactions] = useState('0xCA5480152F30BCF9d147E0fcdfdF865EB5995e05')

    const userconnected = localStorage.getItem("address connected")

    const GET_OD_TRANSACTIONS = gql`
    query {
        transferReceiveds(skip: 0, first: 4, orderBy: timestamp, orderDirection: desc, where: {from: "${userconnected}"}) {
            id
            from
            amount
            lottonum
            timestamp
        }

        freePlays(skip: 0, first: 4, orderBy: timestamp, orderDirection: desc, where: {receiver: "${userconnected}"}) {
            id
            receiver
            lottonum
            timestamp
  }
    }
`

    const { error, data, loading } = useQuery(GET_OD_TRANSACTIONS)

    console.log({ error, loading, data })

    if (loading) return <div className="loader spinnerpadding">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>

    if (error) return <div className='text-white'>something went wrong</div>

    function ODticketselect() {
        setTransactions(process.env.REACT_APP_ODCONTRACT_ADDRESS)
        document.getElementById("ticketheader").innerHTML = "One Dollar Tickets"
    }

    function TDticketselect() {
        setTransactions(process.env.REACT_APP_TDCONTRACT_ADDRESS)
        document.getElementById("ticketheader").innerHTML = "Two Dollar Tickets"
    }

    function FFticketselect() {
        setTransactions(process.env.REACT_APP_FFCONTRACT_ADDRESS)
        document.getElementById("ticketheader").innerHTML = "Fifty Fifty Tickets"
    }

    function SHIBticketselect() {
        setTransactions(process.env.REACT_APP_SHIBACONTRACT_ADDRESS)
        document.getElementById("ticketheader").innerHTML = "Shiba Burn Tickets"
    }

    console.log(viewtransactionsfrom)
    return (
        <section id="mytickets">
            <div className="TransactionList pb-5">

                <div className="container text-center pb-4 pt-5">
                    <h1 className="fw-bolder text-center text-white mb-4" id='ticketheader'>One Dollar Tickets</h1>

                    <div className="dropdown mb-3">
                        <button className="dropbtn">&nbsp;Select a Lottery&nbsp;</button>
                        <div className="dropdown-content">
                            <a href="#/" onClick={ODticketselect}>One Dollar</a>
                            <a href="#/" onClick={TDticketselect}>Two Dollar</a>
                            <a href="#/" onClick={FFticketselect}>Fifty Fifty</a>
                            <a href="#/" onClick={SHIBticketselect}>Shiba Burn</a>
                        </div>
                    </div>

                </div>

                {data.transferReceiveds.map((transfers) => {

                    var s = new Date(transfers.timestamp * 1000).toLocaleDateString("en-US")
                    const test = new Date(s)
                    const year = new Date(s)
                    sessionStorage.setItem("Timestamp", (test.getDate()) + "/" + (test.getMonth() + 1) + "/" + year.getFullYear())
                    var timey = sessionStorage.getItem("Timestamp")

                    return (
                        <div key={transfers.id} className="ticketholder">
                            <h6>Transaction: ‎
                                <a className="cleanlinks" target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/tx/${transfers.id.substring(0, 66)}`}>
                                    {transfers.id.substring(0, 10)} ...
                                </a>
                            </h6>

                            <h6>Wallet: {transfers.from.substring(0, 6)} ... {transfers.from.substring(38)}</h6>
                            <h6>Amount: {(ethers.utils.formatEther(transfers.amount))} ETH</h6>
                            <h6>Lottery Number: {transfers.lottonum}</h6>
                            <h6>Purchased on: {timey}</h6>
                        </div>
                    )
                }
                )}

                <div className="container text-center text-white pb-5 pt-5">
                    <h1 className="fw-bolder text-center text-white">Free Play Tickets</h1>
                </div>
                {data.freePlays.map((freeplay) => {
                    var s = new Date(freeplay.timestamp * 1000).toLocaleDateString("en-US")
                    const test = new Date(s)
                    const year = new Date(s)
                    sessionStorage.setItem("Timestamp", (test.getDate() + 1) + "/" + (test.getMonth() + 1) + "/" + year.getFullYear())
                    var timey = sessionStorage.getItem("Timestamp")

                    return (
                        <div key={freeplay.id} className="ticketholder text-white mb-5">
                            <h6>Transaction: ‎
                                <a className="cleanlinks" target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/tx/${freeplay.id.substring(0, 66)}`}>
                                    {freeplay.id.substring(0, 10)} ...
                                </a>
                            </h6>

                            <h6>Wallet: {freeplay.receiver.substring(0, 6)} ... {freeplay.receiver.substring(38)}</h6>
                            <h6>Lottery Number: {freeplay.lottonum}</h6>
                            <h6>Purchased on: {timey}</h6>
                        </div>
                    );
                })}

            </div>
        </section>
    )
}
