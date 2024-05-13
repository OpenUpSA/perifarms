import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { Route, Routes } from 'react-router-dom';


import HomePage from './HomePage';
import SideBar from './SideBar';
import CountryPage from './CountryPage';
import CountryComparison from './CountryComparison';

import './assets/css/normalize.css';
import './assets/css/components.css';
import './assets/css/nandos-perifarms-v2.css';
import './assets/css/peri.css';

import './app.scss';

const PeriFarms = () => {

    const { crop, country, period } = useContext(AppContext);

    return (
        <div>
            <div className="btt-wrapper">
                <a href="#page-top" className="back-to-top w-inline-block btt-btn-inline">
                    <img src="/assets/images/back-to-top.svg" loading="lazy" alt="" className="back-to-top_icon" />
                </a>
                <div id="page-top" className="content-top"></div>
            </div>
            
            <div className="page-wrapper">
                <main className="main-wrapper padding-global padding-section-small">
                    <div className="dashboard-bg"></div>
                    <div className="dashboard">
                        <SideBar />
                        <div className="dashboard-content">
                            
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/abe/zimbabwe" element={<CountryPage />} />
                                    <Route path="/abe/malawi" element={<CountryPage />} />
                                    <Route path="/abe/mozambique" element={<CountryPage />} />
                                    <Route path="/abe/comparisons" element={<CountryComparison />} />
                                    <Route path="/cayenne/malawi" element={<CountryPage />} />
                                </Routes>
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );

}

export default PeriFarms;