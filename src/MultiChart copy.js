import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

import './charts.scss';


const MultiChart = (props) => {

    const { crop, country, period, data } = useContext(AppContext);
    const [allData, setAllData] = useState([]);
    const [chartData, setchartData] = useState([]);
    const [groups, setGroups] = useState([]);
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
        offset: props.props.layout == 'vertical' ? -15 : 10,
        fontSize: 13,
        fontWeight: 'bold',
        style: { textAnchor: 'middle' },
        fill: '#000'
    }


    useEffect(() => {

        let filteredData = data[props.props.data_source].filter(item => item.country === props.props.country);
        filteredData = filteredData.filter(item => item.crop === props.props.crop);
        filteredData = filteredData.filter(item => props.props.indicator.includes(item.indicator));
        filteredData = filteredData.filter(item => item.year === props.props.year);

        // group by community
        let groups = Array.from(new Set(filteredData.map(d => d.community)));

        let transformedDataArray = [];

        transformedDataArray = groups.map(group => {
            let transformedData = {};
            let bins = Array.from(new Set(filteredData.filter(item => item.community === group).map(d => d.bin)));

            bins.forEach(bin => {
                transformedData[bin] = 0;
            });

            filteredData.filter(item => item.community === group).forEach(item => {
                transformedData[item.bin] = parseFloat(item.percentage * 100);
            });

            return { group: group, data: transformedData };
        });

        setAllData(transformedDataArray);


    }, [data]);


    useEffect(() => {

        console.log(allData);

    }, [allData]);


    const CustomizedLabel = (props) => {
        const { x, y, width, height, value, chartProps } = props;
        console.log(props);
        return (
            <>

                <text x={x} y={y + height / 2} fill="#333" fontSize={10} fontWeight='bold' textAnchor="start" dy={0}>
                    {chartProps.props.value === 'percentage' ? `${value.toFixed(0)}%` : value.toFixed(0)}
                </text>
            </>
        );
    };


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
                    allData.map((group, index) => {
                        return (
                            <div key={index} className="group">
                                <h4>{group.group}</h4>
                                <BarChart
                                    layout={props.props.layout}
                                    width={document.querySelector('.group')?.offsetWidth}
                                    height={300}
                                    data={[group.data]}
                                    margin={{
                                        top: 20,
                                        right: 0,
                                        left: 0,
                                        bottom: 5
                                    }}
                                >
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
                                                label={yAxisLabelStyle}
                                            />
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
                                        Object.keys(group.data).map((bin, index) => {
                                            return (
                                                <Bar key={index} dataKey={bin} fill={props.props.colors[index]} />
                                            );
                                        })

                                    }


                                </BarChart>

                            </div>
                        )
                    })
                }
            </div>

            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default MultiChart;