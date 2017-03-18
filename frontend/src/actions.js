import fetch from 'isomorphic-fetch';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY';

export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY,
        category
    };
}

export function invalidateCategory(category) {
    return {
        type: INVALIDATE_CATEGORY,
        category
    };
}

function requestPosts(category) {
    return {
        type: REQUEST_PRODUCTS,
        category
    };
}

function receivePosts(category, json) {
    return {
        type: RECEIVE_PRODUCTS,
        category,
        posts: json.items,
        receivedAt: Date.now()
    };
}

function fetchProducts(category) {
    return dispatch => {
        dispatch(requestPosts(category));
        return fetch(`http://m2.localhost:8061/rest/V1/products?searchCriteria[pageSize]=20&searchCriteria[currentPage]=` + category)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(category, json)));
    };
}

function shouldFetchPosts(state, category) {
    const posts = state.productsByCategory[category];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchProductsIfNeeded(category) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), category)) {
            return dispatch(fetchProducts(category));
        }
    };
}
