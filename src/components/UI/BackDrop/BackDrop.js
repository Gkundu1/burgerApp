import React from 'react';
import BackDropStyle from './BackDrop.css';

const backDrop=(props)=>{
   return(
        props.show?<div className={BackDropStyle.BackDrop} onClick={props.clicked}></div>:null
   );
}

export default backDrop;