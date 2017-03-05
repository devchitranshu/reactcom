import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
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
                            <Route exact={true} path="/" component={Product} />
                            <Route path="/page/:pageNumber" component={Product} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

function fetchProducts(parent, page) {
    let pageNumber = 1;
    if (typeof page !== 'undefined') {
        pageNumber = page;
    }

    let url = 'http://m2.localhost:8061/rest/V1/products?searchCriteria[pageSize]=20&searchCriteria[currentPage]=' + pageNumber;
    fetch(url)
        .then(result => {
            return result.json()
        })
        .then(json => {
            parent.setState({products: json.items});
            parent.setState({total_count: json.total_count});
            parent.setState({pageNumber: pageNumber});
        })
        .catch(function (error) {
            console.log(error);
        });
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            total_count: 0,
            pageNumber: 1
        };
    }

    componentDidMount() {
        fetchProducts(this, this.props.match.params.pageNumber);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.pageNumber !== prevProps.match.params.pageNumber) {
            fetchProducts(this, this.props.match.params.pageNumber);
        }
    }

    render() {
        return (
            <div>
                <Pagination pageNumber={this.state.pageNumber} />
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

const Pagination = ({pageNumber}) => {
    let nextPage = parseInt(pageNumber) + 1.;
    let prevPage = parseInt(pageNumber) - 1;
    return(
        <p>
            <span className="page">
                <Link to={`/page/${prevPage}`}>Prev</Link>
            </span>
            <span className="page">
                <Link to={`/page/${nextPage}`}>Next</Link>
            </span>
        </p>
    )
};

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
                        <div className="category" key={item.id}>
                            {item.name}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default App;
