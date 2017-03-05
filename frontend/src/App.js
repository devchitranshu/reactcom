import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React Ecommerce App</h2>
                </div>
                <div>
                    <div className="categories">
                        <Category />
                    </div>
                    <div className="products">
                        <Product />
                    </div>
                </div>
            </div>
        );
    }
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total_count: 0
        };
    }

    componentDidMount() {
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
            <div>
                { this.state.products.map(item => {
                    let productKey = item.id + "product";
                    let imageKey;
                    return (
                        <div className="product" key={productKey}>
                            { item.custom_attributes.map(attribute => {

                                if (attribute.attribute_code === 'thumbnail') {
                                    imageKey = item.id + "image";
                                    let url = "http://m2.localhost:8061/media/catalog/product" + attribute.value;
                                    return <img className="productImage" key={imageKey} src={url} alt="{item.name}" />
                                }

                                return ''

                            })}
                            {item.name} Price: {item.price} EURO
                        </div>
                    )
                })}
            </div>
        );
    }
}

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        fetch(`http://m2.localhost:8061/rest/V1/categories`)
            .then(result => {
                return result.json()
            })
            .then(json => {
                this.setState({categories: json.children_data});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                { this.state.categories.map(item => {
                    return (
                        <div className="category">
                            {item.name}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default App;
