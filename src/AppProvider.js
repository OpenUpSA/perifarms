import { useState, useEffect, useRef } from 'react';
import { AppContext } from './AppContext';

import * as content from './data/content';


export const AppProvider = ({ children }) => {

    const [crop, setCrop] = useState('abe');
    const [period, setPeriod] = useState([2022,2023]);
    const [country, setCountry] = useState('zimbabwe');

    // INIT
    useEffect(() => {

        let path = window.location.pathname.split('/');
        let currentCrop = path[1];
        let currentCountry = path[2];
        
        if (currentCrop === 'abe' || currentCrop === 'cayenne') {
            setCrop(currentCrop);
        }

        setCountry(currentCountry);


        


    }, []);

    useEffect(() => {
        console.log(crop);        
    }, [crop] );
   
    // SEND
    const values = {
        content,
        crop,
        setCrop,
        period,
        setPeriod,
        country,
        setCountry
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}