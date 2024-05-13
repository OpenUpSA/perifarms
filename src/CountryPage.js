import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Protect from 'react-app-protect';

import Table from './Table';
import ChartBar from './ChartBar';
import MultiChart from './MultiChart';
import Swarmchart from './Swarmchart';
import ChartPie from './ChartPie';
import ChartLine from './ChartLine';

const CountryPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { content, crop, period, country, setCountry } = useContext(AppContext);

    const [pageContent, setPageContent] = useState(null);
    const [countryInfo, setCountryInfo] = useState({});
    const [cropInfo, setCropInfo] = useState({});
    const [tab, setTab] = useState('background');


    useEffect(() => {
        getContent();
    }, [location]);

    useEffect(() => {
        getContent();
    }, []);
   
    // useEffect(() => {
        
    // }, [pageContent]);

    const getContent = () => {

        let country = location.pathname.split('/')[3];

        let period = location.pathname.split('/')[2].split('-');


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

        setPageContent(countryInfoGet.periods.find(p => p.period[0] == period[0] && p.period[1] == period[1]));

        setCountry(countryInfoGet.slug);

    }

    return (
        <>
            {countryInfo.name != undefined &&
                <Protect sha512={countryInfo.slug == 'zimbabwe' ? '73dcdeec4c71de9454038b0abeb86e21338a0f375c28dbc50dbde0c0f7e25f7376a04e7d169b805ea84036853ced5c270f7aadc5612fc04755ee454156ab6768' : countryInfo.slug == 'malawi' ? 'c42d696a0bfbef19fcf60145ce246e8259b7c6fa220fcd33dda165ddd1968c518c046be360f58e129f6647c6f16fff62f3bbc459999ddb1d0eff2da6d6b3ffb3' : 'a64f81afec0733dfc01bea235119519a3e1825556d670b3aaf177212668e2c7f4f743773abe029be24aaa01b9108d5c0c6e226e732675a706c7ec0c23b5dfcd5'}>
                    <div className={`${crop} countrypage-content`}>
                        <div className="padding-global"></div>

                        <div className="dashboard-country_info">
                            <div className="country-name"><img src={`/assets/images/${countryInfo.slug}.svg`} loading="lazy" alt="" className="country-flag" />
                                <h1 className="heading-style-h1">{countryInfo.name} {crop == 'abe' ? 'ABE' : 'Cayenne'}</h1>
                                <div className="grid-item_bg"></div>
                            </div>
                        </div>

                        <div data-easing="ease" data-duration-in="300" data-duration-out="100" className="dashboard-content_tabs w-tabs">
                            <div className="tab-menu w-tab-menu">
                                {
                                    pageContent.sections?.map((section, index) => {
                                        return (
                                            <a key={index} data-w-tab={section.name} onClick={() => setTab(section.name)} className={`tab-link w-inline-block w-tab-link ${tab == section.name && 'w--current'}`}>
                                                <div className="button-text">{section.title}</div>
                                            </a>
                                        )
                                    })
                                }
                                <div className="period">
                                    <div className="period-content">
                                        <div className="period-content_text">{period[0]} - {period[1]}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-contents w-tab-content">

                                {
                                    pageContent.sections?.map((section, index) => {
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
                                                                                            <h2 id={subsection.name} className="sticky-heading_text">{subsection.title}</h2>
                                                                                        </div>
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'text' && ReactHtmlParser(subsection.content?.replace('<h4>','<h4 className="is-highlighted">'))
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'missing' && <div className="missing-chart">{ReactHtmlParser(subsection.content)}</div>
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'cta' && <div className="grid-card is-warning"><div className="warning-content"><img loading="lazy" src="/assets/images/chili-exclamation.svg" alt="" className="icon"/><p className="clear">{subsection.content}</p></div></div>
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'jump' && 
                                                                                        <><h6>Jump to a section:</h6>
                                                                                        <div className="button-wrapper">
                                                                                            
                                                                                            {
                                                                                                subsection.sections.map((jump, i) => {
                                                                                                    return (
                                                                                                        <a key={i} href={`#${jump.name}`} className="button is-page-nav w-inline-block">
                                                                                                            <div className="button-bg"></div>
                                                                                                            <div className="page-nav_text">{jump.title}</div>
                                                                                                        </a>
                                                                                                    )
                                                                                                })
                                                                                            }
                            
                                                                                        </div></>
                                                                                    }
                                                                                    {
                                                                                        
                                                                                        subsection.type == 'Table' && <Table props={subsection} />
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'BarChart' && <ChartBar props={subsection} />
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'LineChart' && <ChartLine props={subsection} />
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'SwarmChart' && <Swarmchart props={subsection} />
                                                                                    }
                                                                                    {
                                                                                        tab == section.name &&
                                                                                        subsection.type == 'MultiChart' && <MultiChart props={subsection} />
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
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'text' && ReactHtmlParser(subsubsection.content)
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'missing' && <div className="missing-chart">{ReactHtmlParser(subsubsection.content)}</div>
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'cta' && <div className="grid-card is-warning"><div className="warning-content"><img loading="lazy" src="/assets/images/chili-exclamation.svg" alt="" className="icon"/><p className="clear">{subsubsection.content}</p></div></div>
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'Table' && <Table props={subsubsection} />
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'BarChart' && <ChartBar props={subsubsection} />
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'LineChart' && <ChartLine props={subsubsection} />
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'SwarmChart' && <Swarmchart props={subsubsection} />
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'MultiChart' && <MultiChart props={subsubsection} />
                                                                                                            }
                                                                                                            {
                                                                                                                tab == section.name &&
                                                                                                                subsubsection.type == 'content-and-chart' && 
                                                                                                                <>
                                                                                                                    <div className="grid">
                                                                                                                        <div className="grid-item is-content">
                                                                                                                            {
                                                                                                                                subsubsection.title != '' && <><h3 className="is-highlighted">{subsubsection.title}</h3></>
                                                                                                                            }
                                                                                                                            {ReactHtmlParser(subsubsection.content)}
                                                                                                                        </div>
                                                                                                                        {subsubsection.charts && subsubsection.charts.length > 0 &&
                                                                                                                            <div className="grid-item is-chart">
                                                                                                                                {
                                                                                                                                    subsubsection.charts.map((chart,index) =>
                                                                                                                                        <ChartPie props={subsubsection} chartIndex={index} key={index} />
                                                                                                                                    )
                                                                                                                                }
                                                                                                                            </div>
                                                                                                                        }
                                                                                                                        
                                                                                                                    </div>
                                                                                                                    <div className="divider"></div>
                                                                                                                </>
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
                </Protect>
            }
        </>
    )
}

export default CountryPage;