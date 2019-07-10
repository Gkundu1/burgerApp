import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component{

    state={
        orders:[],
        loading:true
    }

    componentDidMount(){
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
            this.setState({loading:false, orders:serverOrder});
        })
        .catch(error=>{
            this.setState({loading:false});
        });
    }

    render(){
        let orderlist=this.state.orders.map(order=>(
            <Order key={order.id} ingredients={order.ingrdients} price={order.orderPrice}/>
        ));
        if(this.state.loading)
        {
            orderlist=<Spinner/>;
        }
        return(
            <div>
                {orderlist}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);