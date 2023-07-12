import { React, useState } from 'react';
// import { ethers } from 'ethers'
import { useQuery, gql } from "@apollo/client"
import "./TransactionList.css"

export default function TransactionList() {

    const [viewtransactionsfrom, setTransactions] = useState('')
    const userconnected = localStorage.getItem("address connected")

    const GET_OD_TRANSACTIONS = gql`
    query {
        transferReceiveds(skip: 0, orderBy: timestamp, orderDirection: desc, where: {from: "${userconnected}"}) {
            id
            from
            contractfrom
            amount
            lottonum
            timestamp
            transactionHash
        }

        freePlays(skip: 0, orderBy: timestamp, orderDirection: desc, where: {receiver: "${userconnected}"}) {
            id
            receiver
            contractfrom
            lottonum
            timestamp
            transactionHash
  }
    }
`

    const { error, data, loading } = useQuery(GET_OD_TRANSACTIONS)

    console.log({ error, loading, data })

    if (loading) return <>
    <div className="loader spinnerpadding">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div>
    <h4 className='titleSpacing text-white text-center mb-5'>Loading Your Tickets ...</h4>
    </div>
    </>

    if (error) return <div className='titleSpacing text-white'>something went wrong</div>

    function ODticketselect() {

        localStorage.setItem("Transaction Title", "One Dollar Tickets")
        localStorage.setItem("Api Node", "odticketv2")
        setTransactions(process.env.REACT_APP_ODCONTRACT_ADDRESS)
        window.location.reload()
        // document.getElementById("ticketheader").innerHTML = "One Dollar Tickets"
    }

    function TDticketselect() {

        localStorage.setItem("Transaction Title", "Two Dollar Tickets")
        localStorage.setItem("Api Node", "tdticketv2")
        setTransactions(process.env.REACT_APP_TDCONTRACT_ADDRESS)
        window.location.reload()
        // document.getElementById("ticketheader").innerHTML = "Two Dollar Tickets"
    }

    function FFticketselect() {

        localStorage.setItem("Transaction Title", "Fifty Fifty Tickets")
        localStorage.setItem("Api Node", "ffticketv2")
        setTransactions(process.env.REACT_APP_FFCONTRACT_ADDRESS)
        window.location.reload()
        // document.getElementById("ticketheader").innerHTML = "Fifty Fifty Tickets"
    }

    function SHIBticketselect() {

        localStorage.setItem("Transaction Title", "Shib Burn Tickets")
        localStorage.setItem("Api Node", "odticketv2")
        setTransactions(process.env.REACT_APP_LTT_TOKEN_CONTRACTADDRESS)
        window.location.reload()
        // document.getElementById("ticketheader").innerHTML = "Shiba Burn Tickets"
    }

    const TransactionTitle = localStorage.getItem("Transaction Title")

    console.log(viewtransactionsfrom)
    return (
        <section className='minfoholder' id="mytickets">

            <div className="container text-center pt-5">
                <h1 className="headerSpacing headersize fw-bolder text-center text-white mb-4" id='ticketheader'>{TransactionTitle}</h1>

                <div className="dropdown mb-4">
                    <button className="textBodySpacing dropbtn">&nbsp;Select a Lottery&nbsp;</button>
                    <div className="dropdown-content">
                        <a href="#/" onClick={ODticketselect}>One Dollar</a>
                        <a href="#/" onClick={TDticketselect}>Two Dollar</a>
                        <a href="#/" onClick={FFticketselect}>Fifty Fifty</a>
                        <a href="#/" onClick={SHIBticketselect}>Shiba Burn</a>
                    </div>
                </div>

            </div>

            <div className='container'>

                {/* <div className='nodata'>
                    {userconnected ? `` : "No Tickets to View"}
                </div> */}


                <div className='media-scoller'>


                    {
                        data.transferReceiveds[0] && userconnected ? (
                            data.transferReceiveds.map((transfers) => {

                                var s = new Date(transfers.timestamp * 1000).toLocaleDateString("en-US")
                                const test = new Date(s)
                                const year = new Date(s)
                                sessionStorage.setItem("Timestamp", (test.getMonth() + 1) + "/" + (test.getDate()) + "/" + year.getFullYear())
                                var timey = sessionStorage.getItem("Timestamp")

                                return (
                                    <div className='media-element text-white'>
                                        <div key={transfers.id} className="ticketholder">
                                            <h6 className='textBodySpacing'>Ticket Number: {transfers.lottonum}</h6>
                                            {/* <h6 className='textBodySpacing'>Cost: {(ethers.utils.formatEther(transfers.amount))} ETH</h6> */}
                                            <h6 className='textBodySpacing'>Purchased on: {timey}</h6>
                                            <h6 className='textBodySpacing'>Transaction: ‎
                                                <a className="cleanlinks" target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/tx/${transfers.transactionHash}`}>
                                                    {transfers.transactionHash.substring(0, 7)} ...
                                                </a>
                                            </h6>

                                            {/* <h6>Wallet: {transfers.from.substring(0, 6)} ... {transfers.from.substring(38)}</h6> */}
                                        </div>
                                    </div>
                                )

                            }))
                            : (
                                <div className='titleSpacing nodata mt-3'>
                                    <p>No Tickets to View</p>
                                </div>
                            )
                    }

                </div>
            </div>

            <h1 className="headerSpacing headersize fw-bolder text-center text-white mb-4">Free Tickets</h1>
            <div className='container'>

                <div className='media-scoller'>


                    {
                        data.freePlays[0] && userconnected ? (
                            data.freePlays.map((freeplay) => {
                                var s = new Date(freeplay.timestamp * 1000).toLocaleDateString("en-US")
                                const test = new Date(s)
                                const year = new Date(s)
                                sessionStorage.setItem("Timestamp", (test.getMonth() + 1) + "/" + (test.getDate()) + "/" + year.getFullYear())
                                var timey = sessionStorage.getItem("Timestamp")

                                return (
                                    <div className='media-element text-white'>
                                        <div key={freeplay.id} className="ticketholder text-white">
                                            <h6 className='textBodySpacing'>Ticket Number: {freeplay.lottonum}</h6>
                                            {/* <h6 className='textBodySpacing'>Cost: FREE</h6> */}
                                            <h6 className='textBodySpacing'>Purchased on: {timey}</h6>
                                            <h6 className='textBodySpacing'>Transaction: ‎
                                                <a className="cleanlinks" target="_blank" rel="noreferrer" href={`https://goerli.etherscan.io/tx/${freeplay.transactionHash}`}>
                                                    {freeplay.transactionHash.substring(0, 7)} ...
                                                </a>
                                            </h6>

                                            {/* <h6>Wallet: {freeplay.receiver.substring(0, 6)} ... {freeplay.receiver.substring(38)}</h6> */}
                                        </div>
                                    </div>
                                )

                            }))
                            : (
                                <div className='nodata mt-3'>
                                    <p>No Tickets to View</p>
                                </div>
                            )
                    }

                </div>
            </div>

        </section>
    )
}
