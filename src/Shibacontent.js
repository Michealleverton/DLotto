import { React, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import clipart1126634 from "./assets/clipart1126634.png";
import "./countdownTimer";
import './Mymain.css';

const lottery_ABI = [
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			}
		],
		"name": "finalizeFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PauseContract",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			}
		],
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
		"name": "priceupdate",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Received",
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
		"inputs": [],
		"name": "UnpauseContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "updateTicketCount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "currentPlayers",
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
		"name": "randomResult",
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
		"name": "showTicketPrice",
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
		"name": "ticketCount",
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
		"name": "TokenBalance",
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
		"name": "winnerByLottery",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const token_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
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
const PROVIDER = `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_RINKEBY_KEY}`;
const LOTTERY_ADDRESS = process.env.REACT_APP_SHIBACONTRACT_ADDRESS;
const TOKEN_ADDRESS = process.env.REACT_APP_LTT_TOKEN_CONTRACTADDRESS;



const Shibacontent = () => {

	// const [TicketCount, setticketCount] = useState(0);
	const [Balance, setTokenBalance] = useState(0);
	const [TicketPrice, setTicketPrice] = useState(0);
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		const web3 = new Web3(PROVIDER);
		// web3.eth.getTransactionReceipt(
		// '0x30f1962785e1f341f3858a75deb4c30b351fdf2b1ffc2c80932a6d5eee437d6f')
		// .then(console.log);

		const contract = new web3.eth.Contract(lottery_ABI, LOTTERY_ADDRESS);

		// contract.methods.ticketCount().call()
		//   .then(setticketCount)
		contract.methods.TokenBalance().call()
			.then(setTokenBalance)
		contract.methods.showTicketPrice().call()
			.then(setTicketPrice)

	}, [])

	useEffect(() => {
		if (Web3.givenProvider) {
			const web3 = new Web3(Web3.givenProvider);
			web3.eth.getAccounts().then(setAccounts);
		}
	}, [])

	let popup = document.getElementById("popup");

	function openpopup() {
		const Veri = sessionStorage.getItem("verification");
		console.log(Veri);
		if (Veri === "Agreed") {
			handleBuy();
		} else {
			popup.classList.add("open-popup");
		}
	}

	function closepopup() {
		popup.classList.remove("open-popup");
	}

	function handleBuy() {
		Web3.givenProvider.send('eth_requestAccounts')
			.then(response => setAccounts(response.result));
		const web3 = new Web3(Web3.givenProvider);
		const tokencontract = new web3.eth.Contract(token_ABI, TOKEN_ADDRESS);
		const contract = new web3.eth.Contract(lottery_ABI, LOTTERY_ADDRESS);
		tokencontract.methods.approve(accounts[0], TicketPrice).send({ from: accounts[0], gas: 100000 });
		tokencontract.methods.transferFrom(accounts[0], LOTTERY_ADDRESS, TicketPrice).send({ from: accounts[0], gas: 100000 });
		// window.alert('By Clicking OK you agree that you are of legal age to enter into a lottery and of legal age to gamble.');
		contract.methods.updateTicketCount().send({ from: accounts[0], gas: 100000 });
	}

	function SetconfirmatointoLocalStorage() {
		sessionStorage.setItem("verification", "Agreed");
	}

	function SetdeniedtoLocalStorage() {
		sessionStorage.setItem("verification", "Denied");
	}

	return (
		<section id="home">
			<header className="maininfo">
				<div className="container px-3">

					<div className="popup pt-3" id="popup">
						<img alt="" src={clipart1126634} />
						<h2>Age Verification!</h2>
						<p>By clicking "OK" below you are agreeing that you are of age to enter into a lottery and of age to gamble.</p>
						<button type="submit" className="popbutton" onClick={() => {
							closepopup();
							handleBuy();
							SetconfirmatointoLocalStorage();
						}}>OK</button>
						<button
							type="submit"
							className="popbutton"
							onClick={() => {
								closepopup();
								SetdeniedtoLocalStorage();
							}}>
							CLOSE
						</button>
					</div>

					<div className="row gx-5 justify-content-left">
						<div className="col-lg-5">
							<div className="text-center My-6">
								<h1 className="display-5 fw-bolder text-white mb-3">WIN BIG WITH SHIB</h1>
								<h1 className="display-5 fs-3 text-white mb-4">Who Will Be The Lucky Winner</h1>
								<p className="text-white-shadow mb-5 textleft">In this lottery all tickets costs $2 in Shiba Inu coin. The lottery will run for 7 days ending on Friday. When the week ends there will be a draw and one lucky person will win 5% of the jackpot. After 5% for fees and costs, the remaining 90% of Shiba Inu coins will be burned to get the coins out of circulation.</p>
								<div className=" d-grid gap-3 d-sm-flex justify-content-left">
									<button type="submit" className="mybtn btn-warning2 px-4 me-sm-3" onClick={openpopup}>BUY TICKET</button>
									<button className="mybtn btn-warning2 px-4 py-2" href="#!">MORE DETAILS</button>
								</div>
							</div>
						</div>
					</div>
					{/* Fancy timer */}
					<div className="timecontainer">
						<div className="counter">
							<div className="time days">
								<p className="para-big ndays">00</p>
								<span className="span-small">Days</span>
							</div>
							<div className="time hours">
								<p className="para-big nhours">00</p>
								<span className="span-small">Hours</span>
							</div>
							<div className="time min">
								<p className="para-big nmins">00</p>
								<span className="span-small">Mins</span>
							</div>
							<div className="time sec">
								<p className="para-big nsecs">00</p>
								<span className="span-small">Secs</span>
							</div>
						</div>
					</div>

					<div>
						<div className="shibtoburndisplayed shibafterfees pt-4">Shib to Burn: {(ethers.utils.formatEther(Balance) / 1000) * 900} / Jackpot: {(ethers.utils.formatEther(Balance) / 1000) * 200}</div>
					</div>

				</div>
				<div className="container px-3 text-white">
					<p><span id="region"></span></p>
					<p><span id="country"></span></p>
					<p></p>
				</div>
			</header>
		</section>
	)
}

export default Shibacontent