import { CONTENT_TYPE, REQUEST_TYPE } from "../../constants/CommonConstants";

export const PRODUCT_CONFIG = {
    API: {

        GET_PRODUCTS: {
            url: 'products',
            method: REQUEST_TYPE.GET,
            headers: {
                contentType: CONTENT_TYPE.JSON,
            }
        }
        ,
        GET_PRODUCT: {
            url:'products/:id',
            method: REQUEST_TYPE.GET,
            headers: {
                contentType: CONTENT_TYPE.JSON,
            }
        },
        GET_CATEGORIES: {
            url:'products/categories',
            method: REQUEST_TYPE.GET,
            headers: {
                contentType: CONTENT_TYPE.JSON,
            }
        },
        GET_PRODUCTS_OF_CATEGORIES: {
            url:'products/category/:category',
            method: REQUEST_TYPE.GET,
            headers: {
                contentType: CONTENT_TYPE.JSON,
            }
        }


    }
}