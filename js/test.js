// class TestButton extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             name: 'J',
//             apppVersion: '1'
//         }
//     }

//     render() {
//         return(
//             <>
//                 <h2>Hello {this.state.name || 'Friend'}! Welcome Back.</h2>
//                 {
//                     this.state.apppVersion && this.state.apppVersion < 2
//                     ? <p>Your app is out of date. Please download the new version and take a look at all the new features.</p> 
//                     : ''
//                 }
//             </>
//         )
//     }
// ReactDOM.render(<TestButton/>), document.querySelector('#test');
const e = React.createElement;

const ListItem = props => {
    return e('li', { className: 'list-item' }, props.id);
}

class List extends React.Component {
    constructor() {
        super();
        this.state = { items: ['Apple', 'Banana'] };
    }
    render() {
        return e('div',
            null, [
                e('ul', { key: 'fruit-list' }, this.state.items.map(item => {
                    return e(ListItem, { title: item, key: item });
                }))
            ]);
    }
}
const domContainer = document.querySelector('#test');
ReactDOM.render(e(List), domContainer);