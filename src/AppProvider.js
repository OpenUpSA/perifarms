import { useState, useEffect, useRef } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';

import * as content from './data/content';
import * as homeContent from './data/home';

export const AppProvider = ({ children }) => {
    const debug = false;
    const [crop, setCrop] = useState('abe');
    const [period, setPeriod] = useState([2022, 2023]);
    const [country, setCountry] = useState('zimbabwe');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState({
        charts_data: [],
        tables_data: [],
        impact_scores_data: [],
        farmers_data: [],
        country_comparisons_data: [],
        country_comparisons_over_time_data: [],
        extra_charts: []
    });

    // INIT
    useEffect(() => {

       

        if (dataLoaded == false) {
            loadData();
        }

        let path = window.location.pathname.split('/');
        let currentCrop = path[1];
        let currentCountry = path[2];

        if (currentCrop === 'abe' || currentCrop === 'cayenne') {
            setCrop(currentCrop);
        }

        setCountry(currentCountry);





    }, []);

    useEffect(() => {
        // console.log(crop);        
    }, [crop]);

   


    const loadData = async () => {
        

        try {
            const [chartsData, tablesData, farmersData, countryComparisons, countryComparisonsOverTime, impactScores, extraCharts] = await Promise.all([
                fetchData('/data/charts.csv'),
                fetchData('/data/tables.csv'),
                fetchData('/data/farmers.csv'),
                fetchData('/data/country-comparisons.csv'),
                fetchData('/data/country-comparisons-over-time.csv'),
                fetchData('/data/impact-scores.csv'),
                fetchData('/data/extra-charts.csv')
            ]);

            setData({ 
                charts_data: chartsData, 
                tables_data: tablesData,
                farmers_data: farmersData,
                impact_scores_data: impactScores,
                country_comparisons_data: countryComparisons,
                country_comparisons_over_time_data: countryComparisonsOverTime,
                extra_charts: extraCharts
            });
            setDataLoaded(true);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const fetchData = (url) => {
        return new Promise((resolve, reject) => {
            Papa.parse(url, {
                download: true,
                header: true,
                complete: (results) => resolve(results.data),
                error: (error) => reject(error),
            });
        });
    };

    useEffect(() => {
        
    }, [data]);

    // SEND
    const values = {
        homeContent,
        content,
        crop,
        setCrop,
        period,
        setPeriod,
        country,
        setCountry,
        data,
        debug
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}