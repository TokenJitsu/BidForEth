class TransactionChecker {
    constructor(address) {
        this.address = address.toLowerCase();
        this.web3 = new Web3("https://mainnet.infura.io/v3/60968ff3b2f84a0ebdff7a993f4d080b");
    }

    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        let transactions = block.transactions;
        //console.log('Search Block: ' + transactions);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                if (this.address == tx.to.toLowerCase()) {
                    console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
                }
            }
        }
    }
}

var transactionChecker = new TransactionChecker('0x69fb2a80542721682bfe8daa8fee847cddd1a267');
transactionChecker.checkBlock();