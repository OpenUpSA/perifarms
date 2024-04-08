import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

import './recharts.scss';


const RechartsBarChartMulti = (props) => {

    const {crop, country, period} = useContext(AppContext);
    const [data, setData] = useState([]);
    const [groups, setGroups] = useState([]);
    const svgRef = useRef(null);
    const xAxisLabelStyle = {
        value: props.props.x_label,
        position: 'insideBottom',
        offset: -15,
        fontSize: 13,
        fontWeight: 'bold',
        tyle: { textAnchor: 'middle' },
        fill: '#000'
    }
    const yAxisLabelStyle = {
        value: props.props.y_label,
        angle: -90,
        position: 'insideLeft',
        offset: 10,
        fontSize: 13,
        fontWeight: 'bold',
        style: { textAnchor: 'middle' },
        fill: '#000'
    }
    const [chartRefresh, setChartRefresh] = useState(0);


    useEffect(() => {
        Papa.parse(props.props.src, {
            download: true,
            header: true,
            complete: function (results) {
                
                var transformedData = [];

                var bins = Array.from(new Set(results.data.map((d) => d[props.props.bin])));

                bins.forEach((bin) => {
                    transformedData.push({
                        bin: bin,
                    });
                })

                results.data.forEach((item) => {
                    
                    transformedData.forEach((bin) => {
                        if (bin.bin === item[props.props.bin]) {
                            bin[item[props.props.group]] = parseFloat(item[props.props.value]);
                        }
                    });
                })
                

                var groups = Array.from(new Set(results.data.map((d) => d[props.props.group])));
                
                setGroups(groups);
                
                setData(transformedData);
                
            }
        });
    }, [props, crop, country, period]);

    useEffect(() => {
    
        console.log(data);
        setChartRefresh(chartRefresh + 1);
    
    },[data]);

    
    const getColors = (group) => {
        let colors = [
            '#e41a1c',
            '#377eb8',
            '#4daf4a',
            '#984ea3',
            '#ff7f00',
            '#ffff33'
        ];
        if(props.props.colors) {
            colors = props.props.colors;
        }

        let index = groups.indexOf(group);

        return colors[index];
    }

    


    

    return (
        <div className="chartContainer">
            <header>
                {
                    props.props.title && <h2>{props.props.title}</h2>
                }
                {
                    props.props.subtitle && <h3>{props.props.subtitle}</h3>
                }
            </header>
           
          
            <div className="multiBarChartContainer">
            {
                groups.map((group) => {
                    return (
                    <div key={group} className="group">
                        
                        <h4>{group}</h4>

                        <BarChart
                            width={document.querySelector('.group')?.offsetWidth}
                            height={150}
                            data={data}
                            layout={props.props.layout}
                            margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                            key={chartRefresh}
                        >
                            <CartesianGrid vertical={true} horizontal={false}/>
                            {
                                props.props.layout == 'vertical' ? <>
                                    <XAxis
                                        type="number"
                                        tick={{ fontSize: 11, fontWeight: 'bold' }}
                                        label={xAxisLabelStyle} />
                                    <YAxis
                                        dataKey="bin"
                                        type="category"
                                        tick={{ fontSize: 11, fontWeight: 'bold' }}
                                        label={yAxisLabelStyle} />
                                </> : <>
                                    <XAxis
                                        dataKey="bin"
                                        type="category"
                                        tick={{ fontSize: 11, fontWeight: 'bold' }}
                                        label={xAxisLabelStyle} />
                                    <YAxis
                                        type="number"
                                        tick={{ fontSize: 11, fontWeight: 'bold' }}
                                        label={yAxisLabelStyle} />
                                </>
                            }

                            <Tooltip />

                            {
                                groups.map((g,i) => {
                                    if(g === group) {
                                        return (
                                            <Bar dataKey={g} key={g} fill={getColors(g)}>
                                                <LabelList dataKey="value" position="top" />
                                            </Bar>
                                        );
                                    }
                                })
                            }


                        </BarChart>


                    </div>)
                })
            }
            </div>
           


            

            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default RechartsBarChartMulti;