import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component{

    // state={
    //     orders:[],
    //     loading:true
    // }

    componentDidMount(){
        this.props.onFetchOrderHandler(this.props.token,this.props.userId);
        // axios.get('/orders.json')
        // .then(response=>{
        //     console.log(response);
        //     const serverOrder=[];
        //     for(let key in response.data)
        //     {
        //         serverOrder.push({
        //             ...response.data[key],
        //             id:key
        //         });
        //     }
        //     this.setState({loading:false, orders:serverOrder});
        // })
        // .catch(error=>{
        //     this.setState({loading:false});
        // });
    }

    render(){
        let orderlist=<Spinner/>;
        if(!this.props.loading)
        {
            orderlist=this.props.orders.map(order=>(
                <Order key={order.id} ingredients={order.ingrdients} price={order.orderPrice}/>
            ));
        }
        return(
            <div>
                {orderlist}
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onFetchOrderHandler:(token,userId)=>dispatch(actions.fetchOrderAsync(token,userId))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));