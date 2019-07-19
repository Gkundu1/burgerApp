import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import LayoutStyle from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state={
        showSideDrawer:false
    }

    sideDrawerClosehandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerTogglehandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleDrawer={this.sideDrawerTogglehandler} auth={this.props.isLogin} />
                <SideDrawer auth={this.props.isLogin} open={this.state.showSideDrawer} closedDrawer={this.sideDrawerClosehandler} />
                <main className={LayoutStyle.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        isLogin:state.auth.token!==null
    };
};

export default connect(mapStateToProps,null)(Layout);

