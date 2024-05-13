import { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from './AppContext';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import * as d3 from 'd3';

import Debug from './Debug';

import './chartPie.scss';
import { filter } from 'd3';

const ChartPie = (props) => {

    const { crop, country, period, data } = useContext(AppContext);
    const [chartData, setchartData] = useState([]);

   

    useEffect(() => {

        

        let filteredData;

        if(data[props.props.charts[props.chartIndex].data_source] == undefined) {
            return;
        }

        filteredData = data[props.props.charts[props.chartIndex].data_source].filter(item => item['country'] === props.props.charts[props.chartIndex].country);
        filteredData = filteredData.filter(item => item.crop === props.props.charts[props.chartIndex].crop);
        filteredData = filteredData.filter(item => props.props.charts[props.chartIndex].indicator.includes(item.indicator));
        filteredData = filteredData.filter(item => item.year === props.props.charts[props.chartIndex].year);


       


        let transformedDataArray = [];

        filteredData.forEach(item => {
            transformedDataArray.push({ name: item.bin, value: parseFloat(item.value) * 100 });
        });

        setchartData(transformedDataArray);


       

    }, [props, crop, country, period]);

    const getTotalWidth = (index) => {
        
        // count the number of characters in the string
        let totalWidth = 0;
        let string = chartData[index].name;

        for (let i = 0; i < string.length; i++) {
            let char = string.charAt(i);
            if (char === ' ') {
                totalWidth += 10;
            } else {
                totalWidth += 8;
            }
        }


        return totalWidth;
    }


    const getColors = (index) => {
        let colors = [
            '#e41a1c',
            '#377eb8',
            '#4daf4a',
            '#984ea3',
            '#ff7f00',
            '#ffff33'
        ];
        if (props.props.charts[props.chartIndex].colors) {
            colors = props.props.charts[props.chartIndex].colors;
        }

        return colors[index];
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <>
            <rect 
                x={x - 20} 
                y={y - 15} 
                width={40} 
                height={30} 
                fill="rgba(0, 0, 0, 0.8)" />
            <text 
                x={x} 
                y={y} 
                fill="white"
                fontSize={12} 
                textAnchor='middle' 
                dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
            </text>
            <rect 
                x={x - getTotalWidth(index) / 2}
                y={y + 10}
                width={getTotalWidth(index) + 10} // Add some padding
                height={20} 
                fill="rgba(255, 255, 255, 1)" />
            <text
                className={`pie-text-${index}`} 
                x={x} 
                y={y + 20} 
                fill="#000"
                fontSize={12} 
                textAnchor='middle' 
                dominantBaseline="central">
                    {`${chartData[index].name}`}
            </text>

            </>
        );
    };

    

    return (
        <div className="pieChartContainer">
            {props.props.charts[props.chartIndex].chart_title && <h2>{props.props.charts[props.chartIndex].chart_title}</h2>}
            <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`}  fill={getColors(index)} />
                    ))}
                </Pie>
            </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartPie;