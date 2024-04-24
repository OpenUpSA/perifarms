import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

import './recharts.scss';

const RechartsScatterChart = (props) => {
    const { data } = useContext(AppContext);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const filteredData = data.farmers.filter(item => item.Region === "Birchenough");

        // Group the data by "NET Earnings Bracket ($)"
        const groupedData = filteredData.reduce((acc, curr) => {
            const bracket = curr["NET Earnings Bracket ($)"];
            if (!acc[bracket]) {
                acc[bracket] = [];
            }
            acc[bracket].push(curr);
            return acc;
        }, {});

        // Calculate the number of brackets
        const numBrackets = Object.keys(groupedData).length;

        // Iterate through each bracket and assign y values
        let currentY = 50; // Starting y-value
        const updatedChartData = [];

        Object.values(groupedData).forEach((bracketData, bracketIndex) => {
            const bracketSize = bracketData.length;
            const yOffset = 50 / numBrackets; // Evenly distribute within each bracket
            const bracketYStart = currentY - (yOffset * (bracketSize - 1) / 2);

            bracketData.forEach((item, index) => {
                updatedChartData.push({
                    bracket: item["NET Earnings Bracket ($)"],
                    x: item["NET Earnings ($)"],
                    y: bracketYStart + index * yOffset + bracketIndex * (100 / numBrackets),
                });
            });

            // Increase currentY for next bracket
            currentY += 2 * yOffset;
        });

        setChartData(updatedChartData);

    }, [data]);

    return (
        <div className="chartContainer">
            <ScatterChart
                width={document.querySelector('.chartContainer')?.offsetWidth}
                height={400}
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" domain={[-520, 5000]} ticks={[-500, 0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]} allowDataOverflow={false} />
                <YAxis dataKey="y" domain={[0, 100]} type="number" hide={true} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />

                <Scatter data={chartData} fill="#c1a8a1">
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                            entry.bracket === 'Less than 0' ? '#000' :
                            entry.bracket === '0-499' ? '#c1a8a1' :
                            entry.bracket === '500-999' ? '#c13036' :
                            entry.bracket === '1000-1499' ? '#ed732e' :
                            entry.bracket === '1500-1999' ? '#f3b158#' :
                            '#9ac746'
                        } />
                    ))}
                </Scatter>
            </ScatterChart>
        </div>
    );
};

export default RechartsScatterChart;
