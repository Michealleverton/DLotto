import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import clipart1126634 from "./assets/clipart1126634.png";
import "./ODcountdownTimer";
import "./TDcountdownTimer";
import "./FFcountdownTimer";

const lottery_ABI = [
	{
		"inputs": [],
		"name": "enterDraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "finalizeFunds",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
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
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "winmsg",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lottonum",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "FreePlay",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "PauseContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "payWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ticketprice",
				"type": "uint256"
			}
		],
		"name": "priceUpdate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "randomness",
				"type": "uint256"
			}
		],
		"name": "rawFulfillRandomness",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetCurrentLottery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lottonum",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "timestamp",
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
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "destAddr",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lottonum",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TransferSent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "UnpauseContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
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
		"name": "getCurrentPlayers",
		"outputs": [
			{
				"internalType": "address payable[]",
				"name": "",
				"type": "address[]"
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
		"inputs": [],
		"name": "getTicketCount",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "lottery",
				"type": "uint256"
			}
		],
		"name": "getWinnerByLottery",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lotteryHistory",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryId",
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
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketcount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const PROVIDER = `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_RINKEBY_KEY}`;
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

	function SetconfirmatointoSessionStorage() {
		sessionStorage.setItem("verification", "Agreed");
	}

	function SetdeniedtoSessionStorage() {
		sessionStorage.setItem("verification", "Denied");
	}

	// one dollar ticket popup age gate functions
	let ODpopup = document.getElementById("ODpopup");

	function ODopenpopup() {
		const Veri = sessionStorage.getItem("verification");
		console.log(Veri);
		if (Veri === "Agreed") {
			BuyODTicket();
		} else {
			ODpopup.classList.add("ODopen-popup");
		}
	}

	function ODclosepopup() {
		ODpopup.classList.remove("ODopen-popup");
	}

	// two dollar ticket popup age gate functions
	let TDpopup = document.getElementById("TDpopup");

	function TDopenpopup() {
		const Veri = sessionStorage.getItem("verification");
		console.log(Veri);
		if (Veri === "Agreed") {
			BuyTDTicket();
		} else {
			TDpopup.classList.add("TDopen-popup");
		}
	}

	function TDclosepopup() {
		TDpopup.classList.remove("TDopen-popup");
	}

	// three dollar ticket popup age gate functions
	let FFpopup = document.getElementById("FFpopup");

	function FFopenpopup() {
		const Veri = sessionStorage.getItem("verification");
		console.log(Veri);
		if (Veri === "Agreed") {
			BuyFFTicket();
		} else {
			FFpopup.classList.add("FFopen-popup");
		}
	}

	function FFclosepopup() {
		FFpopup.classList.remove("FFopen-popup");
	}

	function BuyODTicket() {
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const contract = new web3.eth.Contract(lottery_ABI, OD_CONTRACT_ADDRESS);

		contract.methods.enterDraw()
			.send({ from: accounts[0], value: ODticketprice, gas: 200000 });
	}

	function BuyTDTicket() {
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const contract = new web3.eth.Contract(lottery_ABI, TD_CONTRACT_ADDRESS);

		contract.methods.enterDraw()
			.send({ from: accounts[0], value: TDticketprice, gas: 200000 });
	}

	function BuyFFTicket() {
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const contract = new web3.eth.Contract(lottery_ABI, FF_CONTRACT_ADDRESS);

		contract.methods.enterDraw()
			.send({ from: accounts[0], value: FFticketprice, gas: 200000 });
	}

	return (
		<section className="bg_grey_opacity border-bottom" id="tickets">
			<div className="container pb-6">

				{/* One dollar draw agegate popuup */}
				<div className="popup pt-3" id="ODpopup">
					<img alt="" src={clipart1126634} />
					<h2>Age Verification!</h2>
					<p>By clicking "OK" below you are agreeing that you are of age to enter into a lottery and of age to gamble.</p>
					<div><input type="checkbox" id="myCheck" className="texboxlarger"></input>  Don't Ask Me Again.</div>
					<button
						type="submit"
						className="popbutton"
						onClick={() => {
							
								var checkBox = document.getElementById("myCheck");
							  
								// If the checkbox is checked, display the output text
								if (checkBox.checked === true){
								  localStorage.setItem("verification", "Agreed");
								} else {
								  console.log("User didn't check the box");
								}
							
							ODclosepopup();
							SetconfirmatointoSessionStorage();
							BuyODTicket();
						}}>
						OK
					</button>
					<button
						type="submit"
						className="popbutton"
						onClick={() => {
							ODclosepopup();
							SetdeniedtoSessionStorage();
						}}>
						CLOSE
					</button>
				</div>

				{/* Two dollar draw agegate popuup */}
				<div className="popup pt-3" id="TDpopup">
					<img alt="" src={clipart1126634} />
					<h2>Age Verification!</h2>
					<p>By clicking "OK" below you are agreeing that you are of age to enter into a lottery and of age to gamble.</p>
					<button
						type="submit"
						className="popbutton"
						onClick={() => {
							TDclosepopup();
							SetconfirmatointoSessionStorage();
							BuyTDTicket();
						}}>
						OK
					</button>
					<button
						type="submit"
						className="popbutton"
						onClick={() => {
							TDclosepopup();
							SetdeniedtoSessionStorage();
						}}>
						CLOSE
					</button>
				</div>

				{/* fifty fifty draw agegate popuup */}
				<div className="popup pt-3" id="FFpopup">
					<img alt="" src={clipart1126634} />
					<h2>Age Verification!</h2>
					<p>By clicking "OK" below you are agreeing that you are of age to enter into a lottery and of age to gamble.</p>
					<button
						type="submit"
						className="popbutton"
						onClick={() => {
							FFclosepopup();
							SetconfirmatointoSessionStorage();
							BuyFFTicket();
						}}>
						OK
					</button>
					<button
						type="submit"
						className="popbutton"
						onClick={() => {
							FFclosepopup();
							SetdeniedtoSessionStorage();
						}}>
						CLOSE
					</button>
				</div>

				<div className="text-center mb-5">
					<h1 className="fw-bolder text-center text-white">TICKET OPTIONS</h1>
				</div>
				<div className="row justify-content-center">

					<div className="col-lg-6 col-xl-4" data-aos="flip-left"
						data-aos-offset="150"
						data-aos-delay="5"
						data-aos-duration="500"
						data-aos-easing="ease-in-out">
						<div className="card mb-5 mb-xl-0">
							<div className="card-body p-4">
								<div className="text-primary text-uppercase fw-bold">
									<h6 className="display-6 fs-4 text-black">Sunday Draw</h6>
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
									{/* <li className="mb-2">
										<i className="bi bi-x text-danger iconspacing"></i>
										No <a href="#!" className="goldenticket">Golden ticket NFT's</a> given out
									</li> */}
								</ul>
								<div className="d-grid"><button type="submit" onClick={ODopenpopup} className="mybtn btn-warning2 px-4 py-2">Purchase Ticket</button></div>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-xl-4" data-aos="zoom-out-up"
						data-aos-offset="150"
						data-aos-delay="5"
						data-aos-duration="500"
						data-aos-easing="ease-in-out">
						<div className="card mb-5 mb-xl-0">
							<div className="card-body p-4">
								<div className="small text-primary text-uppercase fw-bold">
									<h6 className="display-6 fs-4 text-black">Wednesday Draw</h6>
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
									{/* <li className="mb-2">
										<i className="bi bi-gem text-primary iconspacing"></i>
										1 <a href="#!" className="goldenticket">Golden ticket NFT's</a> given out
									</li> */}
								</ul>
								<div className="d-grid"><button type="submit" onClick={TDopenpopup} className="mybtn btn-warning2 px-4 py-2">Purchase Tickets</button></div>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-xl-4" data-aos="flip-right"
						data-aos-offset="150"
						data-aos-delay="5"
						data-aos-duration="500"
						data-aos-easing="ease-in-out">
						<div className="card mb-5 mb-xl-0">
							<div className="card-body p-4">
								<div className="small text-primary text-uppercase fw-bold mb-2">
									<h6 className="display-6 fs-4 text-black">50/50 Fridays</h6>
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
									{/* <li className="mb-2">
										<i className="bi bi-gem text-primary iconspacing"></i>
										3 <a href="#!" className="goldenticket">Golden ticket NFT's</a> given out
									</li> */}
								</ul>
								<div className="d-grid"><button type="submit" onClick={FFopenpopup} className="mybtn btn-warning2 px-4 py-2">Purchase Ticket</button></div>
							</div>
						</div>
					</div>

				</div>

			</div>
			<div className="bottomblackline1"></div>
		</section>
	)
}

export default Lotteries