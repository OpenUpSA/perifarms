import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { useLocation } from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import Table from './Table';
import ChartBar from './ChartBar';
import MultiChart from './MultiChart';
import Swarmchart from './Swarmchart';
import ChartLine from './ChartLine';

const CountryComparison = () => {

    const location = useLocation();

    const { content, period, country, setCountry } = useContext(AppContext);

    const [pageContent, setPageContent] = useState(null);
    const [cropInfo, setCropInfo] = useState({});
    const [tab, setTab] = useState('background');



    useEffect(() => {
        getContent();
    }, []);




    useEffect(() => {

    }, [pageContent]);

    const getContent = () => {

        let crop = location.pathname.split('/')[1];

        let period = location.pathname.split('/')[2].split('-');

        let cropInfoGet = content.crops.find(c => c.slug == crop);

        let comparisons = cropInfoGet.comparisons.find(p => p.period[0] == period[0] && p.period[1] == period[1]);

        setCropInfo(cropInfoGet);


        setPageContent(comparisons);



    }






    return (
        <>
            <div className={`countrypage-content`}>
                <div className="padding-global"></div>

                <div className="dashboard-country_info">
                    <div className="country-name">
                        <h1 className="heading-style-h1">Country Comparison</h1>
                        <div className="grid-item_bg" style={{backgroundColor: cropInfo.colour}}></div>
                    </div>
                </div>

                <div data-easing="ease" data-duration-in="300" data-duration-out="100" className="dashboard-content_tabs w-tabs">
                    <div className="tab-contents w-tab-content">
                        <section className="grid-item is-desktop-full">
                            <div className="grid-card">
                                <div className="grid">
                                    <div className="grid-item is-content">
                                        {
                                            pageContent?.sections?.map((section, index) => {
                                                return <div key={index}>
                                                    {
                                                        section.title != '' && <div className="sticky-heading">
                                                            <h2 className="sticky-heading_text">{section.title}</h2>
                                                        </div>
                                                    }
                                                    {
                                                        section.type == 'text' && ReactHtmlParser(section.content?.replace('<h4>', '<h4 className="is-highlighted">'))
                                                    }
                                                    {
                                                        section.type == 'missing' && <div className="missing-chart">{ReactHtmlParser(section.content)}</div>
                                                    }
                                                    {
                                                        section.type == 'cta' && <div className="grid-card is-warning"><div className="warning-content"><img loading="lazy" src="images/chili-exclamation.svg" alt="" className="icon" /><p className="clear">{section.content}</p></div></div>
                                                    }
                                                    {

                                                        section.type == 'Table' && <Table props={section} />
                                                    }
                                                    {
                                                        section.type == 'BarChart' && <ChartBar props={section} />
                                                    }
                                                    {
                                                        section.type == 'LineChart' && <ChartLine props={section} />
                                                    }
                                                    {
                                                        section.type == 'Beeswarm' && <Swarmchart props={section} />
                                                    }
                                                    {
                                                        section.type == 'MultiChart' && <MultiChart props={section} />
                                                    }

                                                    {
                                                        section.type == 'mixed' && <>

                                                            {
                                                                section.sections.map((subsection, i) => {
                                                                    return (
                                                                        <div key={i}>
                                                                            {
                                                                                (subsection.type == 'text' && subsection.title != '') && <><div className="divider"></div><h3 className="is-highlighted">{subsection.title}</h3></>
                                                                            }
                                                                            {
                                                                                subsection.type == 'text' && ReactHtmlParser(subsection.content)
                                                                            }
                                                                            {
                                                                                subsection.type == 'missing' && <div className="missing-chart">{ReactHtmlParser(subsection.content)}</div>
                                                                            }
                                                                            {
                                                                                subsection.type == 'cta' && <div className="grid-card is-warning"><div className="warning-content"><img loading="lazy" src="images/chili-exclamation.svg" alt="" className="icon" /><p className="clear">{subsection.content}</p></div></div>
                                                                            }
                                                                            {
                                                                                subsection.type == 'Table' && <Table props={subsection} />
                                                                            }
                                                                            {
                                                                                subsection.type == 'BarChart' && <ChartBar props={subsection} />
                                                                            }
                                                                            {
                                                                                subsection.type == 'LineChart' && <ChartLine props={subsection} />
                                                                            }
                                                                            {
                                                                                subsection.type == 'Beeswarm' && <Swarmchart props={subsection} />
                                                                            }
                                                                            {
                                                                                subsection.type == 'MultiChart' && <MultiChart props={subsection} />
                                                                            }


                                                                        </div>
                                                                    )
                                                                })

                                                            }
                                                        </>
                                                    }

                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>



        </>
    );

}

export default CountryComparison;