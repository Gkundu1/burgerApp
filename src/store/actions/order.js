import * as actionTypes from './actionTypes';
//import axios from '../../axios-config';

export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

export const purchaseBurgerFailed=(error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    };
};

export const  purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurgerAsync = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SAGA,
        orderData: orderData,
        token:token
    };

    // return dispatch=>{
    //     dispatch(purchaseBurgerStart());
    //     axios.post('/orders.json?auth='+token, orderData)
    //         .then(response => {
    //             console.log('[ContactData] response success', response);
    //             dispatch(purchaseBurgerSuccess(response.data.name,orderData));
                
    //         }).catch(error => {
    //             console.log('[ContactData] response error', error);
    //             dispatch(purchaseBurgerFailed(error));
    //         });
    // };
};

export const purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orderList:orders
    };
};

export const fetchOrderFailed=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAILED,
        error:error
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    };
};

//'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

export const fetchOrderAsync = (token, userId) => {
    
    return {
        type: actionTypes.FETCH_ORDER_SAGA,
        token: token,
        userId:userId
    };

    // return dispatch=>{
    //     dispatch(fetchOrderStart()); 
    //     //const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    //     const tokenQueryParams='?auth='+ token;
    //     axios.get('/orders.json'+tokenQueryParams)
    //     .then(response=>{
    //         console.log(response);
    //         const serverOrder=[];
    //         for(let key in response.data)
    //         {
    //             serverOrder.push({
    //                 ...response.data[key],
    //                 id:key
    //             });
    //         }
    //         dispatch(fetchOrderSuccess(serverOrder));
    //     })
    //     .catch(error=>{
    //         dispatch(fetchOrderFailed(error));
    //     });
    // };
};