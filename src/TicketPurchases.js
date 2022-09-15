import { useState, useEffect } from "react";
const ethers = require('ethers');

const OD_lottery_ABI = [
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
      "name": "PauseContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
      "inputs": [],
      "name": "whoIsTheOwner",
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
      "stateMutability": "payable",
      "type": "receive"
  }
];

// Change below address to your contract from Remix IDE
const OD_CONTRACT_ADDRESS = process.env.REACT_APP_ODCONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_RINKEBY_KEY}` // It cam be different network
);

const contract = new ethers.Contract(OD_CONTRACT_ADDRESS, OD_lottery_ABI, provider);

export default function TicketPurchases() {
  const [txs, setTxs] = useState([]);

  const handleTransferReceived = (_from, _amount) => {
    let type;

    if (_from === _from) {
        type = "transfer";
        console.log(type);
    }else{
        type = "transferowner";
        console.log(type);
    }

    setTxs((prev) => [
        {
            _from, 
            _amount
        },
        ...prev
      ]);
  }

  useEffect(() => {
    contract.on("TransferReceived", handleTransferReceived);

    return () => {
      contract.removeAllListeners("TransferReceived");
    }
  }, []);

  return (
    <form className="m-4">
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Your Ticket Purchases
          </h1>
          <h2 className="text-xs text-gray-400 text-center mb-6 mt-2">
            {OD_CONTRACT_ADDRESS}
          </h2>

          <div>
            {txs.map((log) => (
              <div className="flex flex-row">
                <div className="text-xs w-16 mr-2">
                  {log.type === "mint" && (
                    <span className="mr-2 bg-green-400 px-3">{log.type}</span>
                  )}
                  {log.type === "transfer" && (
                    <span className="mr-2 bg-yellow-400 px-3">Transfer</span>
                  )}
                </div>
                {log.type === "transfer" && (
                  <div className="text-xs w-32">
                    {log._from.slice(0, 6)}
                  </div>
                )}
                {log.type === "mint" && (
                  <div className="text-xs w-32">
                    {log._from.slice(0, 6)}
                    </div>
                )}
                <div className="text-xs w-32">
                  ({log.amount})
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </form>
  );
}