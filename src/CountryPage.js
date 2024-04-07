import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import MetricsList from './MetricsList';
import BarChart from './BarChart';
import RechartsBarChart from './RechartsBarChart';
import RechartsBarMulti from './RechartsBarMulti';
import ScatterChart from './ScatterChart';

const CountryPage = () => {

    const location = useLocation();

    const { content, crop, period, country, setCountry } = useContext(AppContext);

    const [data, setData] = useState(null);
    const [countryInfo, setCountryInfo] = useState({});
    const [cropInfo, setCropInfo] = useState({});
    const [tab, setTab] = useState('background');



    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        
        getData();
    }, [period, crop]);

   

    useEffect(() => {
        
    }, [data]);

    const getData = () => {

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

        setCountry(countryInfoGet.slug);

    }

    return (
        <>
            {countryInfo.name != undefined &&
                <div className={`${crop} countrypage-content`}>
                    <div className="padding-global"></div>

                    <div className="dashboard-country_info">
                        <div className="country-name"><img src={`/images/${countryInfo.slug}.svg`} loading="lazy" alt="" className="country-flag" />
                            <h1 className="heading-style-h1">{countryInfo.name} {crop == 'abe' ? 'ABE' : 'Cayenne'}</h1>
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

                            {
                                data.sections?.map((section, index) => {
                                    return (

                                        <div key={index} className={`tab-pane w-tab-pane ${tab == section.name && 'w--tab-active'}`}>
                                            <div className="padding-section-small">
                                                <div className="grid">
                                                    {
                                                        section.sections.map((subsection, i) => {
                                                            return (
                                                                <section key={i} className="grid-item is-desktop-full">
                                                                    <div className="grid-card">
                                                                        <div className="grid">
                                                                            <div className="grid-item is-content">
                                                                                {
                                                                                    subsection.title != '' && <div className="sticky-heading">
                                                                                        <h2 className="sticky-heading_text">{subsection.title}</h2>
                                                                                    </div>
                                                                                }
                                                                                {
                                                                                    subsection.type == 'text' && ReactHtmlParser(subsection.content)
                                                                                }
                                                                                {
                                                                                    subsection.type == 'missing' && <div className="missing-chart">{ReactHtmlParser(subsection.content)}</div>
                                                                                }
                                                                                {
                                                                                    subsection.type == 'cta' && <div className="grid-card is-warning"><div className="warning-content"><img loading="lazy" src="images/chili-exclamation.svg" alt="" className="icon"/><p className="clear">{subsection.content}</p></div></div>
                                                                                }
                                                                                {
                                                                                    subsection.type == 'MetricsTable' && <MetricsList props={subsection} />
                                                                                }
                                                                                {
                                                                                    subsection.type == 'BarChart' && <BarChart src={subsection.src} />
                                                                                }
                                                                                {
                                                                                    tab == section.name &&
                                                                                    subsection.type == 'RechartsBarChart' && <RechartsBarChart src={subsection.src} />
                                                                                }
                                                                                {
                                                                                    tab == section.name &&
                                                                                    subsection.type == 'RechartsBarMulti' && <RechartsBarMulti src={subsection.src} />
                                                                                }
                                                                                {
                                                                                    subsection.type == 'mixed' && <>
                                                                                        {
                                                                                            subsection.sections.map((subsubsection, i) => {
                                                                                                return (
                                                                                                    <div key={i}>
                                                                                                        {
                                                                                                            (subsubsection.type == 'text' && subsubsection.title != '') && <><div className="divider"></div><h3 className="is-highlighted">{subsubsection.title}</h3></>
                                                                                                        }
                                                                                                        {
                                                                                                            subsubsection.type == 'text' && ReactHtmlParser(subsubsection.content)
                                                                                                        }
                                                                                                        {
                                                                                                            subsubsection.type == 'missing' && <div className="missing-chart">{ReactHtmlParser(subsubsection.content)}</div>
                                                                                                        }
                                                                                                        {
                                                                                                            subsubsection.type == 'cta' && <div className="grid-card is-warning"><div className="warning-content"><img loading="lazy" src="images/chili-exclamation.svg" alt="" className="icon"/><p className="clear">{subsubsection.content}</p></div></div>
                                                                                                        }
                                                                                                        {
                                                                                                            tab == section.name &&
                                                                                                            subsubsection.type == 'MetricsTable' && <MetricsList props={subsubsection} />
                                                                                                        }
                                                                                                        {
                                                                                                            subsubsection.type == 'BarChart' && <BarChart props={subsubsection} />
                                                                                                        }
                                                                                                        {
                                                                                                            tab == section.name &&
                                                                                                            subsubsection.type == 'RechartsBarChart' && <RechartsBarChart props={subsubsection} />
                                                                                                        }
                                                                                                        {
                                                                                                            tab == section.name &&
                                                                                                            subsubsection.type == 'RechartsBarMulti' && <RechartsBarMulti props={subsubsection} />
                                                                                                        }
                                                                                                        {
                                                                                                            subsubsection.type == 'ScatterChart' && <ScatterChart props={subsubsection} />
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            })

                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );

}

export default CountryPage;