import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

const HomePage = () => {

    const [tab, setTab] = useState(null);

    const { homeContent, period } = useContext(AppContext);

    const [periodContent, setPeriodContent] = useState(null);

    useEffect(() => {

        // get the content for the selected period
        const content = homeContent.periods.filter((content) => content.period[0] == period[0] && content.period[1] == period[1]);

        if (content.length > 0) {
            setPeriodContent(content[0]);
            setTab(content[0].sections[0].name);
        }        


    }, [period]);

    return (
        <>
            <div className="dashboard-country_info">
                <div className="country-name"><img src="/images/zim.svg" loading="lazy" alt="" className="country-flag hide" />
                    <h1 className="country-name">Introduction</h1>
                    <div className="grid-item_bg"></div>
                </div>
            </div>
            <div data-current="Background" data-easing="ease" data-duration-in="300" data-duration-out="100" className="dashboard-content_tabs w-tabs">
                
                
                
                <div className="tab-menu w-tab-menu">
                {
                    periodContent?.sections.map((section, index) => {
                        return (
                            <a data-w-tab="Background" onClick={() => setTab(section.name)} className={`tab-link w-inline-block w-tab-link ${tab == section.name && 'w--current'}`} key={index}>
                                <div className="tab-link_text">{section.name}</div>
                                <div className="button-bg is-green"></div>
                            </a>
                        )        
                    })
                }
                </div>
                <div className="tab-contents w-tab-content">
                    {
                        periodContent?.sections.map((section, index) => {
                            return (
                                <div data-w-tab="Background" className={`tab-pane w-tab-pane ${tab == section.name && 'w--tab-active'}`} key={index}>
                                    <div className="padding-section-small">
                                        <div className="grid">
                                            <section id="overview" className="grid-item is-desktop-full">
                                                <div className="grid-card">
                                                    <div className="grid">
                                                        <div className="grid-item is-content">
                                                            <h2 className="section-heading">{section.title}</h2>
                                                            <div className="section-text" dangerouslySetInnerHTML={{__html: section.content}}></div>
                                                            {section.gallery &&
                                                                <div className="image-grid">
                                                                    <div className="image-left"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 32vw, (max-width: 991px) 31vw, 21vw" src={section.gallery[0].image} loading="lazy" alt={section.gallery[0].caption} className="grid-image is-1"/></div>
                                                                    <div className="images-right">
                                                                        <div className="image-right_top"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 58vw, (max-width: 991px) 59vw, 38vw" src={section.gallery[1].image} loading="lazy" alt={section.gallery[1].caption} className="grid-image is-2"/></div>
                                                                        <div className="images-right_bottom">
                                                                            <div className="image-right_bottom-left"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 27vw, (max-width: 991px) 28vw, 18vw" src={section.gallery[2].image} loading="lazy" alt={section.gallery[2].caption} className="grid-image is-3"/></div>
                                                                            <div className="image-right_bottom-right"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 27vw, (max-width: 991px) 28vw, 18vw" src={section.gallery[3].image} loading="lazy" alt={section.gallery[3].caption} className="grid-image is-4"/></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            )        
                        })
                    }


                    
                    
                </div>
            </div>
        </>
    );

}

export default HomePage;