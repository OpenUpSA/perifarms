import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';

import './debug.scss';


const Debug = (props) => {

    const { debug } = useContext(AppContext);

   
    const objtostring = (obj) => {
        return JSON.stringify(obj, null, 2);
    }
    


    return (
        <>
            {
                debug && <div onClick={() => console.dir(objtostring(props.props))}>#</div>
            }
        </>
    );
};

export default Debug;