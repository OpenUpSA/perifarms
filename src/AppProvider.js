import { useState, useEffect, useRef } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';

import * as content from './data/content';
import * as homeContent from './data/home';

export const AppProvider = ({ children }) => {
    const debug = false;
    const [allCrops, setAllCrops] = useState([]);
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

        getAllCrops();
        

        if (dataLoaded == false) {
            loadData();
        }

       

    }, []);

   

   

    const getAllCrops = () => {
        let theCrops = [];

        content.crops.forEach(crop => {
            theCrops.push({
                crop: crop.name,
                slug: crop.slug,
                short_name: crop.short_name,
                periods: []
            });
        });

        content.crops.forEach(crop => {
            crop.countries.forEach(country => {
                country.periods.forEach(period => {
                    theCrops.find(c => c.crop === crop.name).periods.push(
                        { 
                            period: period.period.join('-')
                        }
                    );
                });
            });
        })

        theCrops.forEach(crop => {
            crop.periods = crop.periods.filter((v,i,a)=>a.findIndex(t=>(t.period === v.period))===i);
        })

        theCrops.forEach(crop => {

            crop.periods.forEach(period => {

                period.countries = [];
                period.comparisons = false;

                let currentCrop = content.crops.find(c => c.name === crop.crop);

                currentCrop.countries.forEach(country => {
                    country.periods.forEach(p => {
                        if (p.period.join('-') === period.period) {
                            period.countries.push({
                                country: country.name,
                                slug: country.slug
                            });
                        }
                    });
                });


                if(currentCrop.comparisons != undefined && currentCrop.comparisons.length > 0) {
                    currentCrop.comparisons.forEach(comparison => {
                        if(comparison.period.join('-') === period.period) {
                            period.comparisons = true;
                        }
                    })
                }
                

            });
        })

        setAllCrops(theCrops);


    }


   


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

   

    // SEND
    const values = {
        homeContent,
        content,
        allCrops,
        
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