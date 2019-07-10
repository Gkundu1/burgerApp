import React from 'react';
import OrderStyle from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    const IngredientOutput = ingredients.map(item => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #eee',
                padding: '5px'
            }}
            key={item.name}>{item.name} ({item.amount}) </span>
    });
    return (
        <div className={OrderStyle.Order}>
            <p>Ingredients : {IngredientOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
}

export default order;