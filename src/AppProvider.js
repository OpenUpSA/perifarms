import { useState, useEffect, useRef } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';

import * as content from './data/content';


export const AppProvider = ({ children }) => {

    const [crop, setCrop] = useState('abe');
    const [period, setPeriod] = useState([2022,2023]);
    const [country, setCountry] = useState('zimbabwe');
    const [data, setData] = useState({
        charts_data: [],
        impact_charts_data: [],
        tables_data: [],
        impact_scores_charts_data: [],
        farmers: []
    });

    // INIT
    useEffect(() => {

        let path = window.location.pathname.split('/');
        let currentCrop = path[1];
        let currentCountry = path[2];
        
        if (currentCrop === 'abe' || currentCrop === 'cayenne') {
            setCrop(currentCrop);
        }

        setCountry(currentCountry);

        loadData();

    }, []);

    useEffect(() => {
        // console.log(crop);        
    }, [crop] );


    const loadData = () => {

        // commercial data

        Papa.parse('/data/charts.csv', {
            download: true,
            header: true,
            complete: function (results) {

                setData(prevData => ({
                    ...prevData,
                    charts_data: results.data
                }));
            }
        });

        // tables data

        Papa.parse('/data/tables.csv', {
            download: true,
            header: true,
            complete: function (results) {

                setData(prevData => ({
                    ...prevData,
                    tables_data: results.data
                }));
            }
        });

        // farmers

        Papa.parse('/data/farmers.csv', {
            download: true,
            header: true,
            complete: function (results) {

                setData(prevData => ({
                    ...prevData,
                    farmers: results.data
                }));
            }
        });
        


    }

    useEffect(() => {
        console.log(data);
    }, [data]);
   
    // SEND
    const values = {
        content,
        crop,
        setCrop,
        period,
        setPeriod,
        country,
        setCountry,
        data
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}