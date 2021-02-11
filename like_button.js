'use strict';

//const e = React.createElement;

class LikeButton extends React.Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = window.web3

        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const networkId = await web3.eth.net.getId()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            daiToken: {},
            dappToken: {},
            tokenFarm: {},
            daiTokenBalance: '0',
            dappTokenBalance: '0',
            stakingBalance: '0',
            loading: true
        }
        
    }
    

    render() {
        let content
        if (this.state.loading) {
            console.log(this.state);
           // content = <p id = "loader" className = "text-center"> Loading...
        } else {
            //  content = <Main
            //  daiTokenBalance = { this.state.daiTokenBalance }
            //  dappTokenBalance = { this.state.dappTokenBalance }
            //  stakingBalance = { this.state.stakingBalance }
            //  stakeTokens = { this.stakeTokens }
            //  unstakeTokens = { this.unstakeTokens }/>
        }

        return e(
            'button', { onClick: () => $('#account').html("Your Bids:" + " " + this.state.account), className: "btn-action talk-launch bwhite" },
            'Save' 
        );
    }
}

const domContainerLike = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainerLike);
//ReactDOM.render(<LikeButton/>), document.querySelector('#like_button_container');