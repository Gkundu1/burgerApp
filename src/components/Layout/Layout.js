import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import LayoutStyle from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar toggleDrawer={this.sideDrawerTogglehandler} />
                <SideDrawer open={this.state.showSideDrawer} closedDrawer={this.sideDrawerClosehandler} />
                <main className={LayoutStyle.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;

