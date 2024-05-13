import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Cell } from 'recharts';

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
            let bins = Array.from(new Set(filteredData.filter(item => item.community === group).map(d => d.bin)));

            let transformedData = [];

            bins.forEach(bin => {
                transformedData.push({ bin: bin });
            })



            filteredData.filter(item => item.community === group).forEach(item => {
                transformedData.forEach((bin,index) => {
                    if (bin.bin === item.bin) {
                        bin.value = parseFloat(props.props.value == 'percentage' ? item.percentage * 100 : item.value);
                    }
                });
            });

            return { group: group, transformedData };
        });


        setAllData(transformedDataArray);


    }, [data]);


    useEffect(() => {



    }, [allData]);

    const getColors = (entry,index) => {

        let colors = [
            '#e41a1c',
            '#377eb8',
            '#4daf4a',
            '#984ea3',
            '#ff7f00',
            '#ffff33'
        ];
        if (props.props.colors) {
            colors = props.props.colors.concat(Array.from({ length: groups.length - props.props.colors.length }, (_, index) => props.props.colors[index % props.props.colors.length]));
        }


        return colors[index];
    }


    const CustomizedLabel = (props) => {
        const { x, y, width, height, value, chartProps } = props;
    
        if (chartProps.props.layout === 'horizontal') {
            // For vertical bars, position the label above the bar
            return (
                <text x={x + width / 2} y={y} fill="#000" fontSize={10} fontWeight='bold' textAnchor="middle" dy={-6}>
                    {chartProps.props.value === 'percentage' ? `${value.toFixed(0)}%` : value.toFixed(0)}
                </text>
            );
        } else {
            // For horizontal bars, position the label to the right of the bar
            return (
                <text x={x + 10} y={y + height / 2} fill="#fff" fontSize={10} fontWeight='bold' textAnchor="start" dy={5}>
                    {chartProps.props.value === 'percentage' ? `${value.toFixed(0)}%` : value.toFixed(0)}
                </text>
            );
        }
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
                                <ResponsiveContainer 
                                    width='100%'
                                    height={130}>
                                <BarChart
                                    layout={props.props.layout}
                                    
                                    data={group.transformedData}
                                    margin={{
                                        top: 20,
                                        right: 0,
                                        left: -35,
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

                                    
                                    
                                    <Bar dataKey="value"  label={<CustomizedLabel chartProps={props} />}>
                                        {
                                            group.transformedData.map((entry, index) => (
                                                <Cell key={index} fill={getColors(entry, index)} />
                                            ))
                                        }
                                    </Bar>
                                   


                                </BarChart>
                                </ResponsiveContainer>

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