import { combineReducers } from 'redux';
import {
    SELECT_CATEGORY, INVALIDATE_CATEGORY,
    REQUEST_PRODUCTS, RECEIVE_PRODUCTS
} from '../actions/catalog';

function selectedCategory(state = '1', action) {
    switch (action.type) {
        case SELECT_CATEGORY:
            return action.category;
        default:
            return state;
    }
}

function posts(state = { catalog: {
    isFetching: false,
    didInvalidate: false,
    items: []
}}, action) {
    switch (action.type) {
        case INVALIDATE_CATEGORY:
            return Object.assign({}, state.catalog, {
                didInvalidate: true
            });
        case REQUEST_PRODUCTS:
            return Object.assign({}, state.catalog, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_PRODUCTS:
            return Object.assign({}, state.catalog, {
                isFetching: false,
                didInvalidate: false,
                items: action.products,
                pageSize: action.pageSize,
                currentPage: action.currentPage,
                totalCount: action.totalCount,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

function productsByCategory(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_CATEGORY:
        case RECEIVE_PRODUCTS:
        case REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                [action.category]: posts(state[action.category], action)
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    productsByCategory,
    selectedCategory
});

export default rootReducer;
