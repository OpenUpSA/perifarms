import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './recharts.scss';


const RechartsBarChart = (props) => {

    const {crop, country, period} = useContext(AppContext);
    const [data, setData] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const svgRef = useRef(null);


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
                setSelectedGroups(groups);
                setData(transformedData);
                
            }
        });
    }, [props, crop, country, period]);

    useEffect(() => {
    }, [groups]);

    useEffect(() => {
        
    }, [selectedGroups]);

    useEffect(() => {
    }, [data]);

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

    const handleGroupChange = (group) => {

        if(props.props.singular) {
            setSelectedGroups([group]);
        } else {
            if (selectedGroups.includes(group)) {
                setSelectedGroups(selectedGroups.filter((g) => g !== group));
            } else {
                setSelectedGroups([...selectedGroups, group]);
            }
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
           
            <div className="groups">
                <div className="label">{props.props.legend_text}: </div>
                
                {
                    
                    groups?.map((group) => {
                        return (
                            <div style={{backgroundColor: selectedGroups.includes(group) ?getColors(group) : '#fff'}} className={`groupSelect ${selectedGroups.includes(group) && 'selectedGroup'}`} key={group} onClick={() => handleGroupChange(group)}>
                                {group}
                            </div>
                        );
                    })
                }
                
                
                
            </div>
           
            <BarChart width={document.querySelector('.chartContainer')?.offsetWidth} height={500} data={data} layout={props.props.layout}>
                <CartesianGrid vertical={false} />
                {
                    props.props.layout == 'vertical' ? <>
                        <XAxis type="number" />
                        <YAxis dataKey="bin" type="category" />
                    </> : <>
                        <XAxis dataKey="bin" type="category" />
                        <YAxis type="number" />
                    </>
                }
                <Tooltip />

                {
                    selectedGroups.map((group) => {
                        return (
                            <Bar dataKey={group} key={group} fill={getColors(group)} />
                        );
                    })
                }

                    
            </BarChart>

            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default RechartsBarChart;