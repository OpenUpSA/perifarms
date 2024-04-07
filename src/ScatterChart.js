import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import Papa from 'papaparse';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup, VictoryScatter } from 'victory';

import './charts.scss';


const ScatterChart = (props) => {

    const {crop, country, period} = useContext(AppContext);
    const [data, setData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('Birchenough');
    const [filteredData, setFilteredData] = useState([]);
    const svgRef = useRef(null);


    useEffect(() => {
        Papa.parse(props.props.src, {
            download: true,
            header: true,
            complete: function (results) {
                var transformedData = {};
                results.data.forEach(function(item) {
                    if (!transformedData[item.Region]) {
                        transformedData[item.Region] = {
                            region: item.Region,
                            values: []
                        };
                    }
                    transformedData[item.Region].values.push({
                        x: 500,
                        y: parseFloat(item[props.props.value])
                    });
                });

                transformedData = Object.values(transformedData);

                setData(transformedData);
            }
        });
    }, [props, crop, country, period]);

    useEffect(() => {

        if (props.props.split) {

            let filteredData = [];

            filteredData.push(data.find((d) => d.region === selectedRegion));

            

            setFilteredData(filteredData);


        } else {

            setFilteredData(data);

        }

    }, [data, selectedRegion]);

    useEffect(() => {

        

    }, [filteredData]);

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
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
            {
                props.props.split && 
                <div className="regions">
                    <div className="label">Select a Region: </div>
                    {Array.from(new Set(data.map((d) => d.region))).map((region) => (
                        <div className={`regionSelect ${region == selectedRegion && 'selectedRegion'}`} key={region} onClick={() => handleRegionChange(region)}>
                            {region}
                        </div>
                    ))}
                </div>
            }
            {
                (filteredData?.length > 0 && filteredData[0] != undefined) &&
                <VictoryChart
                    horizontal={props.props.horizontal ? true : false}
                    width={document.querySelector('.chartContainer')?.offsetWidth} height={500}
                    domainPadding={props.props.horizontal ? 50 : 100}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        parent: {
                            paddingLeft: 40,
                            paddingRight: 20
                        }
                    }}
                >
                    <VictoryAxis 
                        label={props.props.x_label}
                        style={{
                        axis: {stroke: "#756f6a", strokeWidth: 0.5},
                        axisLabel: {fontSize: 16, padding: 30, fontWeight: "bold"},
                        }}
                    />

                    <VictoryAxis
                        label={props.props.y_label}
                        style={{
                            axis: {stroke: "#756f6a", strokeWidth: 0.5},
                            axisLabel: {fontSize: 16, padding: 30, fontWeight: "bold"},
                        }}
                        dependentAxis
                        tickFormat={(x) => (`${x}%`)}
                    />

                    <VictoryGroup colorScale={"qualitative"} offset={20}>
                        {/* {
                            filteredData?.map((d,i) => 
                                <VictoryScatter
                                    style={{ data: { fill: "#c43a31" } }}
                                    size={7}
                                    data={filteredData[i].values}
                                />)
                        } */}
                    </VictoryGroup>

                    
                        


                </VictoryChart>
            }
            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default ScatterChart;