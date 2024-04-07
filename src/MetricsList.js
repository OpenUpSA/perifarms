import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const MetricsList = (props) => {
    const { crop, country, period } = useContext(AppContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(props.props);
        
        Papa.parse(props.props.src, {
            download: true,
            complete: function(results) {
                setData(results.data);
            }
        });
    }, [props]);

    useEffect(() => {



    }, [data]);

    const formatEntry = (entry) => {

        if(entry.includes('[') && entry.includes(']')) {
            // get the part before the bracket
            let metric = entry.split('[')[0];
            // get the part inside the bracket
            let value = entry.split('[')[1].split(']')[0];
            return (
                <>
                    <div className="metric is-small">{metric}</div>
                    <div className="small-value">{value}</div>
                </>
            )
        } else {
            return (
                <div className="metric is-small">{entry}</div>
            )
        }


        
    }
   
    return (
        <>
        <div className="metrics-list">
            {
                data.map((d,index) => {
                    return (
                        <div className={(props.props.headers && index == 0) ? 'is-header metric-wrapper' : 'metric-wrapper'} key={index}>
                            <div className="metric-row" key={index}>
                                {
                                    (props.props.headers && index == 0) && 
                                    <>
                                    {
                                        d.map((entry, i) =>
                                            entry.includes('**') ? <div className="metric-item" key={i}><p className="small-value is-black">{entry.replaceAll('**','')}</p></div> : <div className="metric-item" key={i}><p className="metric-label">{entry}</p></div>
                                        )
                                    }
                                    </>
                                }
                                {
                                    ((props.props.headers && index != 0) || !props.props.headers) && 
                                    <>
                                    {
                                        d.map((entry, i) => {
                                            if (i === 0) {
                                                return (
                                                    <p className="metric-label" key={i}>{entry}</p>
                                                )
                                            } else {
                                                return (
                                                    <div className="metric-item" key={i}>
                                                        {formatEntry(entry)}
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    </>
                                }



                               
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    );

}

export default MetricsList;