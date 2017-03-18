import React, {PropTypes, Component} from 'react';
import './Products.css';

export default class Products extends Component {
    render() {
        return (
            <div>
                {this.props.products.map((product) => {
                        let productKey = product.id + "product";
                        let imageKey;
                        return (
                            <div className="product" key={productKey}>
                                { product.custom_attributes.map(attribute => {

                                    if (attribute.attribute_code === 'thumbnail') {
                                        imageKey = product.id + "image";
                                        let url = "http://m2.localhost:8061/media/catalog/product" + attribute.value;
                                        return <img className="productImage" key={imageKey} src={url} alt="{item.name}"/>
                                    }

                                    return ''

                                })}
                                {product.name} Price: {product.price} EURO
                            </div>
                        )
                    }
                )}
            </div>
        );
    }
}

Products.propTypes = {
    products: PropTypes.array.isRequired
};
