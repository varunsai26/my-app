import { serverRequest } from '../axios';
import { PRODUCT_CONFIG } from './ProductServiceConstant';

export default function ProductService() {

    function getProducts(start, limit) {
        return serverRequest(PRODUCT_CONFIG.API.GET_PRODUCTS, {}, {
            'limit': limit,
            'skip': start,
            'select': 'id,title,price,rating,description,brand,thumbnail'
        });
    }
    function getProduct(id) {
        return serverRequest(PRODUCT_CONFIG.API.GET_PRODUCT, {}, {}, {
            'id': id
        });
    }
    function getCategories() {
        return serverRequest(PRODUCT_CONFIG.API.GET_CATEGORIES);
    }
    function getCategoryProducts(category) {
        return serverRequest(PRODUCT_CONFIG.API.GET_PRODUCTS_OF_CATEGORIES,{},{},{'category':category});
    }

    return Object.freeze({
        getProducts,
        getProduct,
        getCategories,
        getCategoryProducts
    });
}
