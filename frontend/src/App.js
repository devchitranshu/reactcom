import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount() {
        fetch(`http://localhost:8059/api/product`)
            .then(result => {
                return result.json()
            })
            .then(json => {
                this.setState({items: json});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Items
                </p>
                <div>
                    { this.state.items.map(item => {
                        return (<div key={item.id}>{item.name} Price: {item.price} EURO</div>)
                    })}
                </div>
            </div>
        );
    }
}

export default App;
