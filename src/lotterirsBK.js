import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import "./ODcountdownTimer";
import "./TDcountdownTimer";
import "./FFcountdownTimer";

const lottery_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "TransferReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "_destAddr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "TransferSent",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "enterDraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getShowTicketPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
const PROVIDER = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_RINKEBY_KEY}`;
const OD_CONTRACT_ADDRESS = process.env.REACT_APP_ODCONTRACT_ADDRESS;
const TD_CONTRACT_ADDRESS = process.env.REACT_APP_TDCONTRACT_ADDRESS;
const FF_CONTRACT_ADDRESS = process.env.REACT_APP_FFCONTRACT_ADDRESS;

const Lotteries = () => {

	const [ODticketprice, setODticketprice] = useState(0);
	const [TDticketprice, setTDticketprice] = useState(0);
	const [FFticketprice, setFFticketprice] = useState(0);
	const [ODbalance, setODbalance] = useState(0);
	const [TDbalance, setTDbalance] = useState(0);
	const [FFbalance, setFFbalance] = useState(0);
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		const web3 = new Web3(PROVIDER);
		const ODcontract = new web3.eth.Contract(lottery_ABI, OD_CONTRACT_ADDRESS);
		const TDcontract = new web3.eth.Contract(lottery_ABI, TD_CONTRACT_ADDRESS);
		const FFcontract = new web3.eth.Contract(lottery_ABI, FF_CONTRACT_ADDRESS);

		ODcontract.methods.getShowTicketPrice().call()
			.then(setODticketprice)
		ODcontract.methods.getBalance().call()
			.then(setODbalance)
		TDcontract.methods.getShowTicketPrice().call()
			.then(setTDticketprice)
		TDcontract.methods.getBalance().call()
			.then(setTDbalance)
		FFcontract.methods.getShowTicketPrice().call()
			.then(setFFticketprice)
		FFcontract.methods.getBalance().call()
			.then(setFFbalance)

	}, [])

	useEffect(() => {
		if (Web3.givenProvider) {
			const web3 = new Web3(Web3.givenProvider);
			web3.eth.getAccounts().then(setAccounts);
		}
	}, [])

	const BuyODTicket = e => {
		e.preventDefault();
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const contract = new web3.eth.Contract(lottery_ABI, OD_CONTRACT_ADDRESS);

		contract.methods.enterDraw()
			.send({ from: accounts[0], value: ODticketprice, gas: 200000 });
		window.alert('By Clicking OK you agree that you are of legal age to enter into a lottery and of legal age to gamble.');
	}

	const BuyTDTicket = e => {
		e.preventDefault();
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const contract = new web3.eth.Contract(lottery_ABI, TD_CONTRACT_ADDRESS);

		contract.methods.enterDraw()
			.send({ from: accounts[0], value: TDticketprice, gas: 200000 });
		window.alert('By Clicking OK you agree that you are of legal age to enter into a lottery and of legal age to gamble.');
	}

	const BuyFFTicket = e => {
		e.preventDefault();
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const contract = new web3.eth.Contract(lottery_ABI, FF_CONTRACT_ADDRESS);

		contract.methods.enterDraw()
			.send({ from: accounts[0], value: FFticketprice, gas: 200000 });
		window.alert('By Clicking OK you agree that you are of legal age to enter into a lottery and of legal age to gamble.');
	}

	return (
		<section className="bg_grey_opacity py-3 border-bottom" id="tickets">
			<div className="container px-5 my-5">
				<div className="text-center mb-5">
					<h2 className="display-5 fw-bolder text-center text-white mb-3">TICKET OPTIONS</h2>
				</div>
				<div className="row gx-5 justify-content-center">

					<div className="col-lg-6 col-xl-4" data-aos="flip-left"
						data-aos-offset="150"
						data-aos-delay="5"
						data-aos-duration="500"
						data-aos-easing="ease-in-out">
						<div className="card mb-5 mb-xl-0">
							<div className="card-body p-5">
								<div className="small text-primary text-uppercase fw-bold">
									<h6 className="display-6 fs-4 text-black">Ethereum Token</h6>
								</div>
								<div className="mb-3">
									<span className="display-4 fw-bold">$1</span>
									<span className="text-muted"> ETH.</span>
								</div>
								<div>
									<p className="display-6 fs-4 text-black">Curent Jackpot : {(ethers.utils.formatEther(ODbalance) / 1000) * 100}</p>
								</div>

								{/* Fancy timer */}
								<div className="timecontainer mb-4">
									<div className="counter">
										<div className="time days">
											<p className="my-para-big OTndays">00</p>
											<span className="my-span-small">Days</span>
										</div>
										<div className="time hours">
											<p className="my-para-big OTnhours">00</p>
											<span className="my-span-small">Hours</span>
										</div>
										<div className="time min">
											<p className="my-para-big OTnmins">00</p>
											<span className="my-span-small">Mins</span>
										</div>
										<div className="time sec">
											<p className="my-para-big OTnsecs">00</p>
											<span className="my-span-small">Secs</span>
										</div>
									</div>
								</div>

								<ul className="list-unstyled mb-4">
									<li className="mb-2">
										<i className="bi bi-check text-success iconspacing"></i>
										<strong className="text-success">Winner Takes 10% of pool</strong>
									</li>
									<li className="mb-2">
										<i className="bi bi-check text-success iconspacing"></i>
										100 Free $1 tickets given out
									</li>
									<li className="mb-2">
										<i className="bi bi-x text-danger iconspacing"></i>
										No <a href="#!" className="goldenticket">Golden ticket NFT's</a> given out
									</li>
								</ul>
								<div className="d-grid"><button onClick={BuyODTicket} className="mybtn btn-warning2 px-4 py-2">Purchase Ticket</button></div>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-xl-4" data-aos="zoom-out-up"
						data-aos-offset="150"
						data-aos-delay="5"
						data-aos-duration="500"
						data-aos-easing="ease-in-out">
						<div className="card mb-5 mb-xl-0">
							<div className="card-body p-5">
								<div className="small text-primary text-uppercase fw-bold">
									<h6 className="display-6 fs-4 text-black">Ethereum Token</h6>
								</div>
								<div className="mb-3">
									<span className="display-4 fw-bold">$2</span>
									<span className="text-muted"> ETH</span>
								</div>
								<div>
									<p className="display-6 fs-4 text-black">Curent Jackpot : {(ethers.utils.formatEther(TDbalance) / 1000) * 200}</p>
								</div>

								{/* Fancy timer */}
								<div className="timecontainer mb-4">
									<div className="counter">
										<div className="time days">
											<p className="my-para-big TDdays">00</p>
											<span className="my-span-small">Days</span>
										</div>
										<div className="time hours">
											<p className="my-para-big TDhours">00</p>
											<span className="my-span-small">Hours</span>
										</div>
										<div className="time min">
											<p className="my-para-big TDmins">00</p>
											<span className="my-span-small">Mins</span>
										</div>
										<div className="time sec">
											<p className="my-para-big TDsecs">00</p>
											<span className="my-span-small">Secs</span>
										</div>
									</div>
								</div>

								<ul className="list-unstyled mb-4">
									<li className="mb-2">
										<i className="bi bi-check text-success iconspacing"></i>
										<strong className="text-success">Winner Takes 20% of pool</strong>
									</li>
									<li className="mb-2">
										<i className="bi bi-check text-success iconspacing"></i>
										250 Free $2 tickets given out
									</li>
									<li className="mb-2">
										<i className="bi bi-gem text-primary iconspacing"></i>
										1 <a href="#!" className="goldenticket">Golden ticket NFT's</a> given out
									</li>
								</ul>
								<div className="d-grid"><button onClick={BuyTDTicket} className="mybtn btn-warning2 px-4 py-2">Purchase Tickets</button></div>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-xl-4" data-aos="flip-right"
						data-aos-offset="150"
						data-aos-delay="5"
						data-aos-duration="500"
						data-aos-easing="ease-in-out">
						<div className="card mb-5 mb-xl-0">
							<div className="card-body p-5">
								<div className="small text-primary text-uppercase fw-bold mb-2">
									<h6 className="display-6 fs-4 text-black">Ethereum Token 50/50 </h6>
								</div>

								<div className="mb-3">
									<span className="display-4 fw-bold">$5</span>
									<span className="text-muted"> ETH</span>
								</div>
								<div>
									<p className="display-6 fs-4 text-black">Curent Jackpot : {(ethers.utils.formatEther(FFbalance) / 1000) * 500}</p>
								</div>

								{/* Fancy timer */}
								<div className="timecontainer mb-4">
									<div className="counter">
										<div className="time days">
											<p className="my-para-big FFdays">00</p>
											<span className="my-span-small">Days</span>
										</div>
										<div className="time hours">
											<p className="my-para-big FFhours">00</p>
											<span className="my-span-small">Hours</span>
										</div>
										<div className="time min">
											<p className="my-para-big FFmins">00</p>
											<span className="my-span-small">Mins</span>
										</div>
										<div className="time sec">
											<p className="my-para-big FFsecs">00</p>
											<span className="my-span-small">Secs</span>
										</div>
									</div>
								</div>

								<ul className="list-unstyled mb-4">
									<li className="mb-2">
										<i className="bi bi-check text-success iconspacing"></i>
										<strong className="text-success">Winner takes 50% of pool</strong>
									</li>
									<li className="mb-2">
										<i className="bi bi-check text-success iconspacing"></i>
										500 Free $3 tickets given out
									</li>
									<li className="mb-2">
										<i className="bi bi-gem text-primary iconspacing"></i>
										3 <a href="#!" className="goldenticket">Golden ticket NFT's</a> given out
									</li>
								</ul>
								<div className="d-grid"><button onClick={BuyFFTicket} className="mybtn btn-warning2 px-4 py-2">Purchase Ticket</button></div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</section>
	)
}

export default Lotteries