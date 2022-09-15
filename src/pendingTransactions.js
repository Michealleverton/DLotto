const Web3 = require('web3');

class TransactionChecker {
    web3;
    web3ws;
    subscription;

    constructor() {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/a677b91fa92f47b0b027b8090ac5750b'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/a677b91fa92f47b0b027b8090ac5750b'));
        this.account = '0x3AA0Df703D0086495a3317A3e507b9C5302b42C1'.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions from ' + this.account);
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if (tx != null) {
                        if (this.account == tx.from.toLowerCase()) {
                            // console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                            const txAddress = tx.from;
                            const txValue = this.web3.utils.fromWei(tx.value, 'ether');
                            const txTimestamp = new Date();
                            const txHash = tx.hash;
                            const txStatus = tx.status;
                            console.log({ txAddress, txValue, txTimestamp, txHash, txStatus });
                            console.log({tx});
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 10000)
        });
    }
}

let txChecker = new TransactionChecker(process.env.REACT_APP_INFURA_RINKEBY_KEY, '0x3AA0Df703D0086495a3317A3e507b9C5302b42C1');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();