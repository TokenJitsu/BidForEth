async function loadWeb3() {
    if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
    } else {
        window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            // Request account access if needed
            await ethereum.enable()
                // Acccounts now exposed
            web3.eth.sendTransaction({ /* ... */ })
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
        web3.eth.sendTransaction({ /* ... */ })
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    console.log(App.web3Provider)
        //selectedAddress = web3.eth.accounts[0]
        //var account = selectedAddress

}

$('#account').html(App.web3Provider)
console.log(App.web3Provider)

function init() {
    auction.auction_end(function(error, result) {
        document.getElementById(“account”).innerHTML = result;
    });
    auction.highestBidder(function(error, result) {
        document.getElementById(“HighestBidder”).innerHTML = result;
    });
    auction.highestBid(function(error, result) {
        var bidEther = web3.fromWei(result, ‘ether’);
        document.getElementById(“HighestBid”).innerHTML = bidEther;
    });
    auction.STATE(function(error, result) {
        document.getElementById(“STATE”).innerHTML = result;
    });
    auction.Mycar(function(error, result) {
        document.getElementById(“car_brand”).innerHTML = result[0];
        document.getElementById(“registration_number”).innerHTML =
            result[1];
    });
    auction.bids(bidder, function(error, result) {
        var bidEther = web3.fromWei(result, ‘ether’);
        document.getElementById(“MyBid”).innerHTML = bidEther;
        console.log(bidder);
    });
}

var auction_owner = null;
auction.get_owner(function(error, result) {
    if (!error) {
        auction_owner = result;
        if (bidder != auction_owner) {
            $(“#auction_owner_operations”).hide();
        }
    }
});

function cancel_auction() {
    auction.cancel_auction(function(error, result) {
        console.log(result);
    });
}

function Destruct_auction() {
    auction.destruct_auction(function(error, result) {
        console.log(result);
    });
}

var BidEvent = auction.BidEvent();
BidEvent.watch(function(error, result) {
    if (!error) {
        $(“#eventslog”).html(result.args.highestBidder + ‘has bidden(‘+result.args.highestBid + ‘wei)’);
    } else {
        console.log(error);
    }
});

var CanceledEvent = auction.CanceledEvent();
CanceledEvent.watch(function(error, result) {
    if (!error) {
        $(“#eventslog”).html(result.args.message + ‘at‘ + result.args.time);
    }
});

const filter = web3.eth.filter({
    fromBlock: 0,
    toBlock: ‘latest’,
    address: contractAddress,
    topics: [web3.sha3(‘BidEvent(address, uint256)’)]
});

filter.get((error, result) => {
    if (!error) console.log(result);
});