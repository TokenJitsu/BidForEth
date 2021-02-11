require('dotenv').config();
const Web3 = require('web3');
const projectId = process.env.INFURA_ID;

//$('#current-winer').html("Account:" + " " + projectID);

class TransactionChecker {
    web3;
    account;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/' + projectId));
        this.account = account.toLowerCase();
    }


    async checkBlock() {
        let block = await this.web3.eth.getBlock('latest');
        let number = block.number;
        console.log('Searching block ' + number);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                if (this.account == tx.to.toLowerCase()) {
                    console.log('Transaction found on block: ' + number);
                    console.log({ address: tx.to, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                    $('#current-winer').html({ address: tx.to, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() });
                }
            }
        }
    }

    // const account = web3.eth.getAccounts(function(error, result) {
    //     $('#account').html("Account:" + " " + result);
    // })
    let txChecker = new TransactionChecker(projectId, '0x91CF84FFdb29Ca3B99c174D9842378D6CD6c2899');
    setInterval(() => {
        txChecker.checkBlock();
    }, 15 * 1000);