App = {
    web3Provider: null,
    contracts: {},

    init: async function() {


        // Load pets.
        $.getJSON('../pets.json', function(data) {
            var petsRow = $('#petsRow');
            var petTemplate = $('#petTemplate');

            for (i = 0; i < data.length; i++) {
                petTemplate.find('.panel-title').text(data[i].name);
                petTemplate.find('img').attr('src', data[i].picture);
                petTemplate.find('.pet-breed').text(data[i].breed);
                petTemplate.find('.pet-age').text(data[i].age);
                petTemplate.find('.pet-location').text(data[i].location);
                petTemplate.find('.btn-action').attr('data-id', data[i].id);

                petsRow.append(petTemplate.html());
            }
        });

        return await App.initWeb3();

    },


    initWeb3: async function() {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://mainnet.infura.io/v3/9dd7bf8458d145328acb640fcd0b1179');
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
        web3 = new Web3(App.web3Provider);
        // web3.eth.getBalance(0xFf2daCB69D3273758D3a3098D93f34E7d5d4F1B9, (err, wei) => {
        //     balance = web3.utils.fromWei(wei, 'ether');
        //     $('#account').html("I have" + balance + "ETH on Ropsten Network");
        //     console.log("I have" + balance + "ETH on Ropsten Network")
        // })
        //const block = web3.eth.getBlockNumber().then(console.log);



        web3.eth.getBlockNumber(function(error, result) {
            $('#block').html("Block:" + " " + result);
        })

        web3.eth.getAccounts(function(error, result) {
            $('#account').html("Account:" + " " + result);
        })

        web3.eth.getBalance("0x91CF84FFdb29Ca3B99c174D9842378D6CD6c2899", function(error, result) {
            var pot = web3.utils.fromWei(result, 'ether');
            $('#jackpot').html("Jackpot" + " " + pot.toString(8) + " " + "eth");
        })

        var count = web3.eth.getTransactionCount("0x91CF84FFdb29Ca3B99c174D9842378D6CD6c2899");
        console.log(count);
        $('#count').html("Your Bids:" + " " + count);
        //var potBalance = web3.eth.getBalance("0xFf2daCB69D3273758D3a3098D93f34E7d5d4F1B9").then($('#jackpot').html("Jackpot" + result + " " + "ETH"));
        //var balance = web3.utils.fromWei(wei, 'ether');

        //$('#account').html(balance);

        web3.eth.getTransactionsByAccount(function(myaccount, startBlockNumber, endBlockNumber) {
            if (endBlockNumber == null) {
                endBlockNumber = eth.blockNumber;
                console.log("Using endBlockNumber: " + endBlockNumber);
            }
            if (startBlockNumber == null) {
                startBlockNumber = endBlockNumber - 5;
                console.log("Using startBlockNumber: " + startBlockNumber);
            }
            console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks " + startBlockNumber + " and " + endBlockNumber);

            for (var i = startBlockNumber; i <= endBlockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
                var block = eth.getBlock(i, true);
                if (block != null && block.transactions != null) {
                    block.transactions.forEach(function(e) {
                        if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                            console.log("  tx hash          : " + e.hash + "\n" +
                                "   nonce           : " + e.nonce + "\n" +
                                "   blockHash       : " + e.blockHash + "\n" +
                                "   blockNumber     : " + e.blockNumber + "\n" +
                                "   transactionIndex: " + e.transactionIndex + "\n" +
                                "   from            : " + e.from + "\n" +
                                "   to              : " + e.to + "\n" +
                                "   value           : " + e.value + "\n" +
                                "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n" +
                                "   gasPrice        : " + e.gasPrice + "\n" +
                                "   gas             : " + e.gas + "\n" +
                                "   input           : " + e.input);
                        }
                    })
                }
            }
        })


        return App.initContract();
    },
}

$(function() {
    $(window).load(function() {
        App.init();
    });
});