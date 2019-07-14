import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

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

export const purchaseBurgerAsync=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log('[ContactData] response success', response);
                dispatch(purchaseBurgerSuccess(response.data.name,orderData));
                
            }).catch(error => {
                console.log('[ContactData] response error', error);
                dispatch(purchaseBurgerFailed(error));
            });
    };
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

export const fetchOrderAsync=()=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
        .then(response=>{
            console.log(response);
            const serverOrder=[];
            for(let key in response.data)
            {
                serverOrder.push({
                    ...response.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess(serverOrder));
        })
        .catch(error=>{
            dispatch(fetchOrderFailed(error));
        });
    };
};