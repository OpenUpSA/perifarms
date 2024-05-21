import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, LineChart, Line, AreaChart, Area } from 'recharts';

import Debug from './Debug';

import './chart.scss';

const Chart = (props) => {

    const { crop, country, period, data } = useContext(AppContext);
    const [allData, setAllData] = useState([]);
    const [chartData, setchartData] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedIndicator, setSelectedIndicator] = useState(props.props.indicator[0]);
    
    
    const mergeStyles = (defaultStyles, customStyles) => {
        return { ...defaultStyles, ...customStyles };
    };
    
    const defaultStyles = {
        margin: { top: 40, right: 50, left: 20, bottom: 40 },
        x_label: { value: props.props.x_label, position: 'insideBottom', offset: -15, fontSize: 13, fontWeight: 'bold', style: { textAnchor: 'middle' }, fill: '#000' },
        y_label: { value: props.props.y_label, angle: -90, position: 'insideLeft', offset: 0, fontSize: 13, fontWeight: 'bold', style: { textAnchor: 'middle' }, fill: '#000' },
        x_label_tick: { angle: 0, fontSize: 11, fontWeight: 'bold', x: 0, y: 0 },
        y_label_tick: { angle: 0, fontSize: 11, fontWeight: 'bold', x: 0, y: 0 },
        tooltip: { fill: 'rgba(0, 0, 0, 0.05)' },
        default_colors: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33']
    };
    
    const styles = mergeStyles(defaultStyles, props.props.styles || {});
    


    useEffect(() => {

        let filteredData;

        if (props.props.country == 'multiple') {
            filteredData = data[props.props.data_source].filter(item => item.community == item.country);
        } else {
            filteredData = data[props.props.data_source].filter(item => item.country === props.props.country);
        }

        filteredData = filteredData.filter(item => item.crop === props.props.crop);
        filteredData = filteredData.filter(item => props.props.indicator.includes(item.indicator));
        if (props.props.year != '') {
            filteredData = filteredData.filter(item => item.year === props.props.year);
        }

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
                        let value;
                        if (props.props.value == 'percentage') {
                            value = item.percentage * 100;
                        } else {
                            value = item[props.props.value];
                        }
                        if (props.props.value != 'percentage' && props.props.is_percentage) {
                            value = value * 100;
                        }

                        bin[item[props.props.group]] = parseFloat(value);
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
        let colors = styles.default_colors;

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
                    {chartProps.props.value === 'percentage' ? `${value?.toFixed(0)}%` : value?.toFixed(2)}
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

            {
                !props.props.hide_groups &&
                <div className="groups">
                    <div className="label">{props.props.legend_text}</div>

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
            }

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
            <ResponsiveContainer width="100%" height={props.props.styles?.height ? props.props.styles?.height : 300}>
                {
                    props.props.variant == 'Line' ?
                        <LineChart width={document.querySelector('.chartContainer')?.offsetWidth}
                            data={chartData}
                            layout={props.props.layout}
                            margin={styles.margin}
                            animationDuration={500}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="bin"
                                type="category"
                                tick={styles.x_label_tick}
                                label={styles.x_label} />
                            <YAxis
                                type="number"
                                tick={styles.y_label_tick}
                                label={styles.y_label} />
                            <Tooltip cursor={styles.tooltip} />
                            {
                                selectedGroups.map((group, index) => {
                                    return (
                                        <Line type="monotone" dataKey={group} key={index} stroke={getColors(group)} activeDot={{ r: 8 }} />
                                    );
                                })
                            }

                        </LineChart>

                        :
                        props.props.variant == 'Area' ?

                            <AreaChart
                                data={chartData}
                                layout={props.props.layout}
                                margin={styles.margin}
                                animationDuration={500}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="bin"
                                    type="category"
                                    tick={styles.x_label_tick}
                                    label={styles.x_label} />
                                <YAxis
                                    type="number"
                                    tick={styles.y_label_tick}
                                    label={styles.y_label} />
                                <Tooltip
                                    cursor={styles.tooltip}
                                />
                                {
                                    selectedGroups.map((group, index) => {
                                        return (
                                            <Area type="monotone" dataKey={group} key={index} stackId={index} stroke={getColors(group)} fill={getColors(group)} />
                                        );
                                    })
                                }
                            </AreaChart>
                            :
                            <BarChart
                                data={chartData}
                                layout={props.props.layout}
                                margin={styles.margin}
                                animationDuration={500}
                            >
                                <CartesianGrid vertical={props.props.layout == 'vertical' ? true : false} horizontal={props.props.layout == 'vertical' ? false : true} />
                                {
                                    props.props.layout == 'vertical' ? <>
                                        <XAxis
                                            type="number"
                                            tick={styles.x_label_tick}
                                            label={styles.x_label} />
                                        <YAxis
                                            dataKey="bin"
                                            type="category"
                                            tick={styles.y_label_tick}
                                            label={styles.y_label}
                                        />
                                    </> : <>
                                        <XAxis
                                            dataKey="bin"
                                            type="category"
                                            tick={styles.x_label_tick}
                                            label={styles.x_label} />
                                        <YAxis
                                            type="number"
                                            tick={styles.y_label_tick}
                                            label={styles.y_label} />
                                    </>
                                }
                                <Tooltip cursor={styles.tooltip} />
                                {
                                    selectedGroups.map((group, index) => {
                                        return (
                                            <Bar dataKey={group} key={index} fill={getColors(group)} label={<CustomizedLabel chartProps={props} />} />

                                        );
                                    })
                                }


                            </BarChart>
                }
            </ResponsiveContainer>

            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default Chart;