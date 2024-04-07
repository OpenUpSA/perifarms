import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import MetricsList from './MetricsList';
import ColumnChart from './ColumnChart';

const CountryPage = () => {

const location = useLocation();


const { content, crop, period } = useContext(AppContext);

const [data, setData] = useState(null);
const [countryInfo, setCountryInfo] = useState({});
const [cropInfo, setCropInfo] = useState({});
const [tab, setTab] = useState('background');




useEffect(() => {

    let country = location.pathname.split('/')[2];

    let cropInfoGet = content.crops.find(c => c.slug == crop);

    setCountryInfo({
        name: cropInfoGet.name,
        slug: cropInfoGet.slug,
        short_name: cropInfoGet.short_name
    })

    let countryInfoGet = cropInfoGet.countries.find(c => c.slug == country);

    setCountryInfo({
        name: countryInfoGet.name,
        slug: countryInfoGet.slug,
    })

    setData(countryInfoGet.periods.find(p => p.period[0] == period[0] && p.period[1] == period[1]));


},[]);

useEffect(() => {
    console.log(data);
}, [data]);

return (
<>  
{countryInfo.name != undefined &&
    <div className={`${crop} dashboard-content`}>
        <div className="padding-global"></div>
        <div className="dashboard-country_info">
            <div className="country-name"><img src={`/images/${countryInfo.slug}.svg`} loading="lazy" alt="" className="country-flag"/>
                <h1 className="heading-style-h1">{countryInfo.name}</h1>
                <div className="grid-item_bg"></div>
            </div>
        </div>
        <div data-easing="ease" data-duration-in="300" data-duration-out="100" className="dashboard-content_tabs w-tabs">
            <div className="tab-menu w-tab-menu">
                {
                    data.sections?.map((section, index) => {
                        return (
                            <a key={index} data-w-tab={section.name} onClick={() => setTab(section.name)} className={`tab-link w-inline-block w-tab-link ${tab == section.name && 'w--current'}`}>
                                <div className="button-text">{section.title}</div>
                            </a>
                        )
                    })
                }
            </div>

            <div className="tab-contents w-tab-content">

                

                {/* BACKGROUND */}
                <div className={`tab-pane w-tab-pane ${tab == 'background' && 'w--tab-active'}`}>
                    <div className="padding-section-small">


                        <div className="grid">

                            <section className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Overview</h2>
                                            </div>
                                            {ReactHtmlParser(data.sections.find(s => s.name == 'background').sections.find(s => s.name == 'overview').content)}
                                            <h6>Jump to a section:</h6>
                                            <div className="button-wrapper">
                                                <a href="#key-metrics" className="button is-page-nav w-inline-block">
                                                    <div className="button-bg"></div>
                                                    <div className="page-nav_text">Key metrics</div>
                                                </a>
                                                <a href="#operational-model" className="button is-page-nav w-inline-block">
                                                    <div className="page-nav_text">Operational model</div>
                                                    <div className="button-bg"></div>
                                                </a>
                                                <a href="#assessment-anomolies"
                                                    className="button is-page-nav w-inline-block">
                                                    <div className="page-nav_text">Assessment anomalies</div>
                                                    <div className="button-bg"></div>
                                                </a>
                                                <a href="#successes" className="button is-page-nav w-inline-block">
                                                    <div className="page-nav_text">Successes, challenges &amp; Farmer feedback</div>
                                                    <div className="button-bg"></div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                           



                            <section className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <section className="grid-item is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Key metrics</h2>
                                            </div>
                                            {/* <MetricsList metrics={data.sections.find(s => s.name == 'background').sections.find(s => s.name == 'key_metrics').content}/> */}
                                        </section>
                                    </div>
                                </div>
                            </section>
                            <div className="grid-item is-desktop-full">
                                <div className="grid-card is-warning">
                                    <div className="warning-content"><img loading="lazy" src="/images/chili-exclamation.svg"
                                            alt="" className="icon"/>
                                        <p className="clear">We gathered feedback from ABE farmers about their successes and
                                            challenges</p>
                                    </div>
                                    <div className="button-wrapper">
                                        <a href="#successes" className="button is-large is-red w-inline-block">
                                            <div className="button-text">Explore Successes &amp;  Challenges</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <section className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text is-medium">Operational model</h2>
                                            </div>
                                            <ColumnChart />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text is-medium">Assessment Anomalies</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text is-long">Successes, Challenges &amp; Farmer Feedback</h2>
                                            </div>
                                            
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {/* <div data-w-id="ab587c3e-e297-2eb6-73f1-b96f7688f976" className="tab-notification_wrapper"><img
                                loading="lazy" src="/images/arrow.svg" alt="" className="tab-notification_arrow"/>
                            <div className="tab-notification">
                                <div>Start exploring the data!</div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* FARMERS */}
                <div data-w-tab="Farmers" className={`tab-pane w-tab-pane ${tab == 'farmers' && 'w--tab-active'}`}>
                    <div className="padding-section-small">
                        <div className="grid hide">
                            <div className="grid-item is-desktop-1-3 is-align-top">
                                <div className="grid-card">
                                    <div className="metric-wrapper">
                                        <div className="metric-row">
                                            <p className="metric-label">Total farmers:</p>
                                            <div className="metric-item">
                                                <div className="metric is-small">530</div>
                                            </div>
                                        </div>
                                        <div className="metric-row">
                                            <div className="bar-chart">
                                                <div className="bar-chart_bar is-1">
                                                    <div data-w-id="93d797c7-c218-d007-449b-730fc6274bb5"
                                                        className="bar-chart_overlay"></div>
                                                    <div className="tooltip">
                                                        <div className="tooltip-value">275 (52%)</div>
                                                        <div className="tooltip-notch"></div>
                                                    </div>
                                                    <div className="bar-chart_first-value">Male</div>
                                                </div>
                                                <div className="bar-chart_bar is-2 is-48">
                                                    <div className="bar-chart_overlay"></div>
                                                    <div className="bar-chart_second-value">Female</div>
                                                    <div data-w-id="93d797c7-c218-d007-449b-730fc6274bc0"
                                                        className="tooltip">
                                                        <div className="tooltip-value">255 (48%)</div>
                                                        <div className="tooltip-notch"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="metric-wrapper">
                                        <div className="metric-row">
                                            <p className="metric-label">Average income:</p>
                                            <div className="metric-item">
                                                <div className="metric is-small">30%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="metric-wrapper">
                                        <div className="metric-row">
                                            <p className="metric-label">Total farmers:</p>
                                            <div className="metric-item">
                                                <div className="metric is-small">1301</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="is--tooltip"></div>
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <div id="farming" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="metrics-list">
                                                <div className="metric-wrapper is-header">
                                                    <div className="metric-row">
                                                        <p className="metric-label"><strong>Metric</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Female</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Male</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average age of farmers:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">47</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">47</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Total farmers:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">255</div>
                                                                <div className="small-value">48%</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">275</div>
                                                                <div className="small-value">52%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Total farmers in Birchenough:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">136</div>
                                                                <div className="small-value">63%</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">79</div>
                                                                <div className="small-value">37%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Total farmers in Fuve-Zaka:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">84</div>
                                                                <div className="small-value">43%</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">112</div>
                                                                <div className="small-value">57%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper is-last">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Total farmers in Ruware:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">55</div>
                                                                <div className="small-value">46%</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">64</div>
                                                                <div className="small-value">54%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/13575755">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14049190">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14049589">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14049839">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14421041">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14430412">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14421065">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRODUCTION */}
                <div data-w-tab="Production" className={`tab-pane w-tab-pane ${tab == 'production' && 'w--tab-active'}`}>
                    <div className="padding-section-small">
                        <div className="grid">
                            <div id="farming" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Farming</h2>
                                            </div>
                                            <div className="metrics-list">
                                                <div className="metric-wrapper is-header">
                                                    <div className="metric-row">
                                                        <p className="metric-label"><strong>Metric</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Female</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Male</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Percentage of total <strong>land
                                                                used</strong><strong> for ABE</strong>: </p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">35%</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">30%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average total
                                                            <strong>irrigated farmland</strong>:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">2.25ha</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">1.49ha</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average <strong>plot size for
                                                                ABE</strong>:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">0.19ha</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">0.21ha</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average Fresh yield:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">1,216kg</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">1,326kg</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper is-last">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average yield per .25 Ha Fresh ABE (kg):
                                                        </p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">1,634kg</div>
                                                                <div className="small-value">per .25 Ha</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">1,610kg</div>
                                                                <div className="small-value">per .25 Ha</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14063536">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14063700">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14063926">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14064048">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14064123">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="costs" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Costs</h2>
                                            </div>
                                            <div className="grid-item is-no-padding is-desktop-full">
                                                <div className="grid-card is-warning">
                                                    <div className="warning-content"><img loading="lazy"
                                                            src="/images/chili-exclamation.svg" alt="" className="icon"/>
                                                        <p className="clear">To calculate the net income for farmers
                                                            requires all costs to be considered. These include the input
                                                            costs as recorded by country partner which include -
                                                            seedlings, fertilisers, and pesticides. Additionally, the
                                                            farmers also incur labour, transport, tools and sometimes
                                                            water and electricity costs related to producing ABE. These
                                                            costs are gleaned from the impact assessment interviews. The
                                                            gross income minus all these costs is how the net income is
                                                            derived.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="metrics-list">
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label"><strong>Metric</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Female</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Male</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label"><strong>Average inputs (seedlings,
                                                                fertilizer and pesticides):</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$216</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$234</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average cost of labour:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$137</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$169</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average <strong>tool cost</strong>:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$4</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$4</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average <strong>transportation
                                                                costs:</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$12</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$16</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average <strong>water &amp; electricity
                                                                costs:</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$9</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$9</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper is-last is-total">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Total Costs:<strong></strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$378</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$432</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14064642">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="income" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Income</h2>
                                            </div>
                                            <div className="metrics-list">
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label"><strong>Metric</strong></p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Female</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="small-value is-black">Male</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average <strong>gross income</strong>:
                                                        </p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$973</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$1,065</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="metric-wrapper is-last">
                                                    <div className="metric-row">
                                                        <p className="metric-label">Average <strong>net income</strong>:</p>
                                                        <div className="multi-metric">
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$595</div>
                                                            </div>
                                                            <div className="metric-item">
                                                                <div className="metric is-small">$629</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14064938">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14064997">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-scatter"
                                                        data-src="visualisation/13617032">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-scatter"
                                                        data-src="visualisation/13617501">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact */}
                <div data-w-tab="Impact" className={`tab-pane w-tab-pane ${tab == 'impact' && 'w--tab-active'}`}>
                    <div className="padding-section-small">
                        <div className="grid">
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Basic Human Needs Index</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>As the conditions farmers live in are often difficult to grasp
                                                    without first-hand experience, a numerical tool, called the basic
                                                    human needs index, was developed to both compare communities, but
                                                    most importantly to assist in understanding the impact of the
                                                    PERi-Farms initiative. The basic human needs index creates a
                                                    numerical value that measures how a community scores related to the
                                                    key basic human needs: housing, water, effluent, energy, food
                                                    security, health and education. </p>
                                                <p>The baseline assessments create the initial scores for each of these
                                                    human needs, which provides a foundation for comparison to the
                                                    impact score derived after one or multiple growing seasons. Each
                                                    area is scored on a scale of 1-10, where 1 represents the lowest
                                                    value and 10 the highest. The following reflects how each basic
                                                    human need is scored.</p>
                                                <ul role="list">
                                                    <li>Education – Easy access to schools: pre-primary through high
                                                        school, at a high quality at an affordable price, scores a 10.
                                                    </li>
                                                    <li>Healthcare – Easy access to a broad range of medical care, that
                                                        is high quality, at an affordable price, scores a 10.</li>
                                                    <li>Food Security – Access to food, which can provide a balanced
                                                        diet with the essential vitamins and minerals at an affordable
                                                        price, scores a 10.</li>
                                                    <li>Energy – Power of any type – grid or off-grid, inside the house
                                                        that is consistently available at an affordable price, scores a
                                                        10.</li>
                                                    <li>Housing - A house that is solidly built, has adequate space for
                                                        the size of the family, is waterproof, provides decent
                                                        insulation, is equipped with water, toilets, and power, scores a
                                                        10.</li>
                                                    <li>Water – Water inside the house, that is always available, is
                                                        safe for consumption and is affordable, scores a 10.</li>
                                                    <li>Effluent Removal – A house that has internal toilets that do not
                                                        pose a risk to the environment, scores a 10.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Impact Scores</h2>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14328243">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Education</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>Farmers in Zimbabwe generally have at least two children who are in
                                                    primary school, and at least one in secondary school. The average
                                                    cost of primary school is $183 per child and $361 for secondary
                                                    school. Just over 60% of farmers spent money earned from ABE on
                                                    education for their children.  They spent primarily on fees,
                                                    stationary, books and uniforms spending on average $432.  ABE
                                                    earnings were critical in maintaining their existing levels of
                                                    education access and in some cases increasing the quality or higher
                                                    education that would have otherwise been inaccessible.</p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420003">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Healthcare</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>ABE Farmers generally access their healthcare at local clinics or
                                                    hospitals where nurse and doctor visits are anywhere between $1-$10
                                                    including some basic medicines. Farmers visit medical facilities for
                                                    a range of reasons, but the most common are malaria, headaches,
                                                    diabetes, accidents and colds and flu.  73% of farmers spent ABE
                                                    earnings on healthcare for themselves and their families, spending
                                                    on average a reported $78. This money was primarily spent on
                                                    transportation, fees and basic medicines.  In some cases, the ABE
                                                    money was spent on private hospitals, doctors and medicines
                                                    previously inaccessible.</p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420555">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Food security</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>Food Security continues to be an issue for Zimbabwe farmers. This is
                                                    demonstrated by the limited amounts of protein consumed on average,
                                                    as well as the high prevalence of carbohydrates versus vegetables
                                                    and fruit. Additionally, it appears in how many farmers are
                                                    regularly hungry and experience a “hungry” season. 40% of the
                                                    farmers interviewed indicated they did not have enough to eat on a
                                                    regular basis, but it was particularly acute between September –
                                                    January when the crops they grow have the lowest harvests.  Finally,
                                                    farmers are spending on average $294 of their ABE earnings on food,
                                                    a proportionally high amount based on the average net incomes.</p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420247">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420273">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420374">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420208">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420460">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Housing</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>The farmers have on average 6-7 people per household, sleeping on
                                                    average 2-3 people per room. The housing in Zimbabwe is made with
                                                    cement bricks (62%) and mud bricks (31%) and a small percentage use
                                                    reeds and thatch. The housing structures generally have door and
                                                    window frames and are plastered. The vast majority of the floors are
                                                    cement (91%) and the balance are dirt. 52% of the farmers used their
                                                    ABE earnings on housing. This included home improvements such as
                                                    plastering, painting, floors, windows, frames, doors, roofing, and
                                                    furniture. The average ABE earnings spent on housing was $248.</p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420602">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Energy</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>The primary sources of energy for Zimbabwe farmers are wood for
                                                    cooking and heating, solar for lighting and small device charging
                                                    and batteries for lighting torches and lamps. In one of the growing
                                                    areas farmers have access to electricity if they can afford to
                                                    connect their house to the main line. The electricity is however
                                                    only available intermittently and sometimes is unaffordable. 40% of
                                                    all farmers spent ABE money on energy, spending an average of $135
                                                    in the 2021/22 season.  This money was spent on installing solar
                                                    systems, buying wood, batteries, electricity, and fuel. Most of the
                                                    money spent was for ongoing costs not sustainable energy sources.
                                                </p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420166">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14431004">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Water</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>The farmers have on average 6-7 people per household, sleeping on
                                                    average 2-3 people per room. The housing in Zimbabwe is made with
                                                    cement bricks (62%) aThe ABE farmers access water from
                                                    lakes/rivers/canals (14%), local taps borehole/well (40%),
                                                    municipality (11% - all in one community) and the balance from
                                                    neighbours. The water is carried from source to the house 2-3 times
                                                    per day, by multiple family members in 20 litre buckets. Independent
                                                    of source, water is generally not tested regularly, but its quality
                                                    varies dramatically between communities. Where sourced from a
                                                    borehole or the municipality it tends to be safer than when sourced
                                                    from a river, lake or steam. From the later sources, it is the cause
                                                    of illnesses sporadically. 18% of farmers spent ABE earning on
                                                    repairing boreholes, water fees, and chemicals for purification.
                                                     The average ABE earnings spent were $45.nd mud bricks (31%) and a
                                                    small percentage use reeds and thatch. The housing structures
                                                    generally have door and window frames and are plastered. The vast
                                                    majority of the floors are cement (91%) and the balance are dirt.
                                                    52% of the farmers used their ABE earnings on housing. This included
                                                    home improvements such as plastering, painting, floors, windows,
                                                    frames, doors, roofing, and furniture. The average ABE earnings
                                                    spent on housing was $248.</p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420632">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="education" className="grid-item is-desktop-full">
                                <div className="grid-card">
                                    <div className="grid">
                                        <div className="grid-item is-desktop-3-4 is-content">
                                            <div className="sticky-heading">
                                                <h2 className="sticky-heading_text">Effluent</h2>
                                            </div>
                                            <div className="rich-text w-richtext">
                                                <p>The effluent systems used in Zimbabwe are pit latrine, the bush, and
                                                    flush toilets by a small percentage (17%) in one community.   29% of
                                                    farmers spent ABE earnings on their effluent system, spending an
                                                    average of $146. Farmers bought the materials to build toilets, as
                                                    well as repairing existing ones and in a few cases building a new
                                                    toilet. </p>
                                            </div>
                                            <div className="divider"></div>
                                            <div className="chart-in-section">
                                                <div className="w-embed w-script">
                                                    <div className="flourish-embed flourish-chart"
                                                        data-src="visualisation/14420108">
                                                        <script
                                                            src="https://public.flourish.studio/resources/embed.js"></script>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
</>
);

}

export default CountryPage;