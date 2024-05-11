import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';

import Debug from './Debug';

import './chartLine.scss';


const ChartLine = (props) => {

    const { crop, country, period, data } = useContext(AppContext);
    const [chartData, setchartData] = useState([]);
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

        filteredData = data[props.props.data_source];

        filteredData = filteredData.filter(item => item.crop === props.props.crop);
        filteredData = filteredData.filter(item => props.props.indicator.includes(item.indicator));

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
                        bin.indicator = parseFloat(props.props.value == 'percentage' ? item.percentage * 100 : item[props.props.value]);
                    }
                });
            });

            transformedDataArray.push({ indicator, transformedData });
        });


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

    

    const CustomizedLabel = (props) => {
        
          const { x, y, stroke, value } = props;
      
          return (
            <text x={x} y={y} dy={-10} fill={stroke} fontSize={10} textAnchor="middle">
              {value}
            </text>
          );
        
      }

    useEffect(() => {
        console.log(chartData);
    }, [chartData]);



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

            <div className="groups"></div>

            

            
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bin" label={xAxisLabelStyle} tick={{ fontSize: 11, fontWeight: 'bold' }}/>
                    <YAxis label={yAxisLabelStyle} tick={{ fontSize: 11, fontWeight: 'bold' }}/>
                    <Tooltip />
                    <Line type="monotone" strokeWidth={2} dataKey="indicator" stroke={props.props.colors[0]} activeDot={{ r: 8 }}  label={<CustomizedLabel />}/>
                    
                </LineChart>
            </ResponsiveContainer>

            <footer>
                {props.props.caption}
            </footer>
        </div>
    );
};

export default ChartLine;