import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total_count: 0
        };
    }

    componentWillMount() {
        fetch(`http://m2.localhost:8061/rest/V1/products?searchCriteria[pageSize]=20`)
            .then(result => {
                return result.json()
            })
            .then(json => {
                this.setState({products: json.items});
                this.setState({total_count: json.total_count});
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
                    Items ({ this.state.total_count })
                </p>
                <div>
                    { this.state.products.map(item => {
                        var productKey = item.id + "product";
                        var imageKey;
                        return (<div className="product" key={productKey}>
                            { item.custom_attributes.map(attribute => {

                                if (attribute.attribute_code === 'thumbnail') {
                                    imageKey = item.id + "image";
                                    var url = "http://m2.localhost:8061/media/catalog/product" + attribute.value;
                                    return <img className="productImage" key={imageKey} src={url} alt="{item.name}" />
                                }

                                return ''

                            })}
                            {item.name} Price: {item.price} EURO
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}

export default App;
