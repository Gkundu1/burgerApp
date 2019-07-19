import React from 'react';
import inputstyle from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputStyles=[inputstyle.InputElement];
    if(props.invalid&&props.shouldValidate&&props.touched)
    {
        inputStyles.push(inputstyle.Invalid);
        validationError = <p className={inputstyle.ValidationError}>{props.errorMessage}</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                 />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} 
                />;
            break;
        case ('select'):
            inputElement = (<select
                className={inputStyles.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed}
                />;
    }
    return (
        <div  className={inputstyle.Input}>
            <label className={inputstyle.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;