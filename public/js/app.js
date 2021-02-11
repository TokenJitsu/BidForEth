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

        web3.eth.getBalance("0xd730d54B2402cD782439A30402122534EFf1Aa98", function(error, result) {
            var pot = web3.utils.fromWei(result, 'ether');
            $('#jackpot').html("Jackpot" + " " + pot.toString(8) + " " + "eth");
        })

        // var block = web3.eth.checkBlock("0x91CF84FFdb29Ca3B99c174D9842378D6CD6c2899", function(error, result) {
        //     var block = web3.eth.getBlock('latest');
        //     var number = block.number;
        //     console.log(block);
        //     var transactions = block.transactions;
        //     console.log('Search Block: ' + transactions);

        //     if (block != null && block.transactions != null) {
        //         for (var txHash of block.transactions) {
        //             var tx = web3.eth.getTransaction(txHash);
        //             if (this.address == tx.to.toLowerCase()) {
        //                 console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
        //             }
        //         }
        //     }
        //     //var transactionChecker = new TransactionChecker('0x69fb2a80542721682bfe8daa8fee847cddd1a267');
        //     //transactionChecker.checkBlock();
        // })


        // var count = web3.eth.getTransactionCount("0x91CF84FFdb29Ca3B99c174D9842378D6CD6c2899");
        // console.log(count);
        // $('#count').html("Your Bids:" + " " + count);
        //var potBalance = web3.eth.getBalance("0xFf2daCB69D3273758D3a3098D93f34E7d5d4F1B9").then($('#jackpot').html("Jackpot" + result + " " + "ETH"));
        //var balance = web3.utils.fromWei(wei, 'ether');

        //$('#account').html(balance);

        return App.initContract();
    },

    initContract: function() {


        /*
         * Replace me...
         */

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', '.btn-action', App.bid);
        // App.eth.sendTransaction({
        //     from: accounts[0],
        //     to: 0x0e86fd1F989849985942eA987A48f9CEEBD5E9a2,
        //     value: 1,
        //     data: web3.utils.toHex("Hello World")
        // });
        //web3.eth.loadBlockchainData(function(error, result) {
        //    console.log(result);
        //})
    },

    markAdopted: function() {
        /*
         * Replace me...
         */
    },

    bid: function() {
        //TODO BID function
        web3.eth.getAccounts(function(error, result) {

            const bidder = result;
            var address = '0x91CF84FFdb29Ca3B99c174D9842378D6CD6c2899';
            console.log(bidder);


            web3.eth.sendTransaction({
                from: bidder.toString(),
                to: address,
                value: 5000000000000000
            }, function(error, hash) {
                console.log(error)
                console.log(hash)
            });
        })


    },

    handleAdopt: function(event) {

        }
        //var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
}

$(function() {
    $(window).load(function() {
        App.init();
    });
});