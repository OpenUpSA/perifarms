import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { useLocation, useNavigate } from 'react-router-dom';


const NotFound = () => {

   

    return (
        <div className={`countrypage-content`}>
            <div className="padding-global"></div>
            <h2>No such Page</h2>
        </div>
    )
}

export default NotFound;