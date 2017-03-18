import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchProductsIfNeeded, invalidateCategory } from '../actions/catalog';
import Products from '../components/Catalog';
import Picker from '../components/Picker'
import {browserHistory} from 'react-router';

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedCategory } = this.props;
        dispatch(fetchProductsIfNeeded(selectedCategory));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedCategory !== prevProps.selectedCategory) {
            const { dispatch, selectedCategory } = this.props;
            dispatch(fetchProductsIfNeeded(selectedCategory));
        }
    }

    handleChange(nextCategory) {
        this.props.dispatch(selectCategory(nextCategory));
        this.props.dispatch(fetchProductsIfNeeded(nextCategory));
        browserHistory.push('/catalog/page/' + nextCategory);
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedCategory } = this.props;
        dispatch(invalidateCategory(selectedCategory));
        dispatch(fetchProductsIfNeeded(selectedCategory));
    }

    render() {
        const { selectedCategory, products, pageSize, totalCount, isFetching, lastUpdated } = this.props;
        return (
            <div>
                {products.length > 0 &&
                <Picker value={selectedCategory}
                        onChange={this.handleChange}
                        pageSize={pageSize}
                        totalCount={totalCount} />
                }
                <p>
                    {lastUpdated &&
                    <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
            </span>
                    }
                    {!isFetching &&
                    <a href='#'
                       onClick={this.handleRefreshClick}>
                        Refresh
                    </a>
                    }
                </p>
                {isFetching && products.length === 0 &&
                <h2>Loading...</h2>
                }
                {!isFetching && products.length === 0 &&
                <h2>Empty.</h2>
                }
                {products.length > 0 &&
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Products products={products} />
                </div>
                }
            </div>
        )
    }
}

Catalog.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    //pageSize: PropTypes.number.isRequired,
    //totalCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { selectedCategory, productsByCategory } = state.catalog;
    const {
        isFetching,
        lastUpdated,
        items: products,
        pageSize: pageSize,
        totalCount: totalCount
    } = productsByCategory[selectedCategory] || {
        isFetching: true,
        items: [],
        pageSize: 20,
        totalCount: 20
    };

    return {
        selectedCategory,
        products,
        pageSize,
        totalCount,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(Catalog);
