import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

import Debug from './Debug';

import './chartLine.scss';


const ChartLine = (props) => {

    const { crop, country, period, data } = useContext(AppContext);
    const [allData, setAllData] = useState([]);
    const [chartData, setchartData] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedIndicator, setSelectedIndicator] = useState(props.props.indicator[0]);
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
        offset: props.props.layout == 'vertical' ? -15 : 10,
        fontSize: 13,
        fontWeight: 'bold',
        style: { textAnchor: 'middle' },
        fill: '#000'
    }

    const linedata = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];


    useEffect(() => {



        let filteredData;

        if (props.props.country == 'multiple') {
            filteredData = data[props.props.data_source].filter(item => item.community == item.country);
        } else {
            filteredData = data[props.props.data_source].filter(item => item.country === props.props.country);
        }


        filteredData = filteredData.filter(item => item.crop === props.props.crop);
        filteredData = filteredData.filter(item => props.props.indicator.includes(item.indicator));
        filteredData = filteredData.filter(item => item.year === props.props.year);

        let transformedDataArray = [];

        props.props.indicator.forEach(indicator => {
            let transformedData = [];
            let bins = Array.from(new Set(filteredData.filter(item => item.indicator === indicator).map(d => d.bin)));

            bins.forEach(bin => {
                transformedData.push({ bin: bin });
            });

            filteredData.filter(item => item.indicator === indicator).forEach(item => {
                transformedData.forEach(bin => {
                    if (bin.bin === item.bin) {
                        bin[item[props.props.group]] = parseFloat(props.props.value == 'percentage' ? item.percentage * 100 : item[props.props.value]);
                    }
                });
            });

            transformedDataArray.push({ indicator, transformedData });
        });

        let groups = Array.from(new Set(filteredData.map(d => d[props.props.group])));
        setGroups(groups);

        if (props.props.singular) {
            setSelectedGroups([groups[0]]);
        } else {
            setSelectedGroups(groups);
        }

        setAllData(transformedDataArray);
        setchartData(transformedDataArray[0].transformedData);

    }, [props, crop, country, period]);



    const getColors = (group) => {
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

        let index = groups.indexOf(group);

        return colors[index];
    }

    const handleGroupChange = (group) => {

        if (props.props.singular) {
            setSelectedGroups([group]);
        } else {
            if (selectedGroups.includes(group)) {
                setSelectedGroups(selectedGroups.filter((g) => g !== group));
            } else {
                setSelectedGroups([...selectedGroups, group]);
            }
        }
    };


    const CustomizedLabel = (props) => {
        const { x, y, width, height, value, chartProps } = props;

        if (chartProps.props.layout === 'horizontal') {
            // For vertical bars, position the label above the bar
            return (
                <text x={x + width / 2} y={y} fill="#000" fontSize={10} fontWeight='bold' textAnchor="middle" dy={-6}>
                    {chartProps.props.value === 'percentage' ? `${value.toFixed(0)}%` : value.toFixed(2)}
                </text>
            );
        } else {
            // For horizontal bars, position the label to the right of the bar
            return (
                <text x={x + width + 10} y={y + height / 2} fill="#000" fontSize={10} fontWeight='bold' textAnchor="start" dy={0.35}>
                    {chartProps.props.value === 'percentage' ? `${value.toFixed(0)}%` : value.toFixed(2)}
                </text>
            );
        }
    };

    const handleIndicatorChange = (item) => {

        setSelectedIndicator(item.indicator);
        setchartData(item.transformedData);

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
                <Debug props={props} />
            </header>

            <div className="groups">
                <div className="label">{props.props.legend_text}: </div>

                {

                    groups?.map((group) => {
                        return (
                            <div style={{ backgroundColor: selectedGroups.includes(group) ? getColors(group) : '#fff' }} className={`groupSelect ${selectedGroups.includes(group) && 'selectedGroup'}`} key={group} onClick={() => handleGroupChange(group)}>
                                {group}
                            </div>
                        );
                    })
                }
            </div>

            {
                allData.length > 1 && (
                    <div className="indicators">
                        <div className="label">{props.props.indicator_text}</div>
                        <>
                            {
                                allData.map((item, index) => {
                                    return (
                                        <div key={index} className={selectedIndicator == item.indicator ? `selectedIndicator indicatorSelect` : `indicatorSelect`} onClick={() => handleIndicatorChange(item)}>
                                            {item.indicator}
                                        </div>
                                    );
                                })
                            }
                        </>
                    </div>
                )
            }

            <LineChart
                width={500}
                height={300}
                data={linedata}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>

            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default ChartLine;