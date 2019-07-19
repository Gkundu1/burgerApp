import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import React from 'react'
import {configure ,shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

configure({adapter: new EnzymeAdapter()});

describe('<BurgerBuilder/>',()=>{

    let wrapper;

    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngredientsHandler ={()=>{}}/>)
    });

    it('should render <BuildControls/> when recieving ingredients' , ()=>{
        wrapper.setProps({burgerIngredients:{Cheese:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
