import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Table = (props) => {
   
    const { crop, country, period, data } = useContext(AppContext);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {

        let filteredData = data[props.props.data_source].filter(item => props.props.disaggregate ? item.community === props.props.community : item.community === props.props.country);
        filteredData = filteredData.filter(item => item.crop === props.props.crop);
        filteredData = filteredData.filter(item => props.props.table.includes(item.table));
        filteredData = filteredData.filter(item => item.year === props.props.year);

        setTableData(filteredData);


    }, []);

    useEffect(() => {
        console.log(tableData);
    }, [tableData]);    

    
   
    return (
        <>
        <div className="metrics-list">
            {
                tableData.map((item, index) => {
                    return (
                        <div className='metric-wrapper' key={index}>
                            <div className="metric-row" key={index}>
                                <p className="metric-label">{item.indicator}</p>
                                <div className="metric-item">
                                    <div className="metric is-small">{item.value}</div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
        </>
    );

}

export default Table;