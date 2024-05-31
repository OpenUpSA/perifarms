import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import * as d3 from 'd3';

console.log(d3);

// import Debug from './Debug';

import './swarmchart.scss';

const Swarmchart = (props) => {
    const { crop, country, period, data } = useContext(AppContext);


    const uniqueId = `swarmchart-${props.props.indicator[0]}-${props.props.country}`;
    const xAxisId = `swarmchart-${props.props.indicator[0]}-${props.props.country}-xAxis`;
    const [allData, setAllData] = useState([]);
    const [bands, setBands] = useState([]);
    const [chartData, setChartchartData] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [x, setX] = useState(null);
    const [height, setHeight] = useState(350);
    const [svg, setSvg] = useState(null);
    const [circles, setCircles] = useState(null);
    const [xAxis, setXAxis] = useState(null);
    const [width, setWidth] = useState(1080);
    const [draw, setDraw] = useState(false);

    useEffect(() => {
        data.farmers_data.length > 0 &&
        setAllData(data.farmers_data);
   }, [data]);

   useEffect(() => {
        
        let filteredData = allData.filter(item => item.country === props.props.country);
        filteredData = filteredData.filter(item => item.crop === props.props.crop);
        filteredData = filteredData.filter(item => item.year === props.props.year);
        filteredData = filteredData.filter(item => item.indicator === props.props.indicator[0]);

        


        filteredData.forEach((d, i) => {
            d.earnings = parseFloat(d.value);
        })

        let groups = Array.from(new Set(filteredData.map(d => d[props.props.group])));
        
        setGroups(groups);
        setSelectedGroups(groups[0]);

        
    }, [allData, country]);

    useEffect(() => {
        if (!draw) {
            initializeVisualization();
        }
    }, [draw]);
    
    useEffect(() => {
        if (draw) {
            updatechartData(chartData, x, height, svg, circles, xAxis, width);
        }
    }, [chartData, draw, uniqueId]);

    useEffect(() => {
        let filteredData = allData.filter(item => selectedGroups?.includes(item.community)); 
        setChartchartData(filteredData);
        
    }, [selectedGroups]);

    const initializeVisualization = () => {

        // Set up margin and dimensions
        const margin = { top: 20, right: 0, bottom: 30, left: 0 };
        const initialWidth = 1080 - margin.left - margin.right;
        setWidth(initialWidth); 
        const initialHeight = 400 - margin.top - margin.bottom;
        setHeight(initialHeight);

        // Append SVG
        const initialSvg = d3.select(`#${uniqueId}`)
            .attr('width', width + margin.left + margin.right)
            .attr('height', initialHeight + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        setSvg(initialSvg);

        // X scale
        const initialX = d3.scaleLinear().range([0, width]);
        setX(initialX);

        // Apply simulation to spread out circles
        const simulation = d3.forceSimulation(chartData)
            .force('x', d3.forceX((d) => initialX(d.earnings)).strength(1))
            .force('y', d3.forceY(initialHeight / 2))
            .force('collide', d3.forceCollide(5));

        simulation.stop();

        for (let i = 0; i < 120; ++i) simulation.tick();

        // Add circles
        const initialCircles = initialSvg
            .selectAll(`#${uniqueId} .circle`)
            .data(chartData)
            .enter()
            .append('circle')
            .attr('class', 'circle')
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', 5)
            .style('fill', function (d) {
                if (d.earnings < 500) return 'yellow';
                else if (d.earnings < 1000) return 'coral';
                else if (d.earnings < 1500) return 'lightsalmon';
                else return 'lightblue';
            })
            .on('mouseover', function (event, d) {
                d3.select('.swarm-tooltip')
                    .style('opacity', 1)
                    .html('Earnings: $' + d.earnings.toString())
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 20}px`);
            })
            .on('mouseout', function (d) {
                d3.select('.swarm-tooltip').style('opacity', 0);
            });
        setCircles(initialCircles);

        // Add X axis
        const initialXAxis = initialSvg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${initialHeight})`);
        setXAxis(initialXAxis);

        // Remove domain line
        d3.select('.x.axis .domain').remove();

        // Initialize visualization
        updatechartData(chartData, initialX, initialHeight, initialSvg, initialCircles, initialXAxis, initialWidth);
        setDraw(true);
    };

    const updatechartData = (chartData, x, height, svg, circles, xAxis, width) => {
        // Recalculate maximum earnings value
        const maxEarnings = d3.max(chartData, (d) => d.earnings);
        const minEarnings = d3.min(chartData, (d) => d.earnings);

        // Create or update the x scale
        const newX = x || d3.scaleLinear().range([0, width]);
        newX.domain([minEarnings, maxEarnings]);
        setX(newX);

        // Calculate dynamic band ranges based on the new maximum earnings value
        const bandRanges = [
            { start: -2000, end: -1, color: props?.props?.colors[0] },
            { start: 0, end: Math.min(maxEarnings, 499), color: props?.props?.colors[1] },
            { start: 500, end: Math.min(maxEarnings, 999), color: props?.props?.colors[2] },
            { start: 1000, end: Math.min(maxEarnings, 1499), color: props?.props?.colors[3] },
            { start: 1500, end: Math.min(maxEarnings, 1999), color: props?.props?.colors[4] },
            { start: 2000, end: Math.min(maxEarnings, 2499), color: props?.props?.colors[5] },
            { start: 2500, end: Math.min(maxEarnings, 9999), color: props?.props?.colors[5] },
        ];

        updateBands(maxEarnings, newX, height, svg, circles);

        // Recompute simulation
        const simulation = d3.forceSimulation(chartData)
            .force('x', d3.forceX((d) => newX(d.earnings)).strength(1))
            .force('y', d3.forceY(height / 2))
            .force('collide', d3.forceCollide(5));

        simulation.stop();

        for (let i = 0; i < 120; ++i) simulation.tick();

        circles = svg.selectAll(`#${uniqueId} .circle`).data(chartData).join(
            (enter) =>
                enter
                    .append('circle')
                    .attr('class', 'circle')
                    .attr('cx', (d) => d.x)
                    .attr('cy', (d) => d.y)
                    .attr('r', 5)
                    .style('fill', function (d) {
                        const band = bandRanges.find(
                            (b) => d.earnings >= b.start && d.earnings < b.end
                        );
                        return band ? band.color : 'black';
                    }),
            (update) =>
                update
                    .transition()
                    .duration(750)
                    .attr('cx', (d) => d.x)
                    .attr('cy', (d) => d.y)
                    .style('fill', function (d) {
                        const band = bandRanges.find(
                            (b) => d.earnings >= b.start && d.earnings < b.end
                        );
                        return band ? band.color : 'black';
                    }),
            (exit) => exit.remove()
        );

        // Attach event listeners after merging
        circles
            .on('mouseover', function (event, d) {
                d3.select('.swarm-tooltip')
                    .style('opacity', 1)
                    .html(`Earnings: $${d.earnings?.toString()}`)
                    .style('left', `${event.pageX - 500}px`)
                    .style('top', `${event.pageY - 250}px`);
            })
            .on('mouseout', function (d) {
                d3.select('.swarm-tooltip').style('opacity', 0);
            });

        setCircles(circles);

        // Update X axis
        xAxis.transition().duration(750).call(d3.axisBottom(newX));
    };

    const updateBands = (maxEarnings, x, height, svg, circles) => {
        // Clear existing bands
        svg.selectAll('.band').remove();

        // Define background bands based on the max earnings value
        const newBands = [
            { start: -2000, end: -1, color: props?.props?.colors[0] },
            { start: 0, end: Math.min(maxEarnings, 499), color: props?.props?.colors[1] },
            { start: 500, end: Math.min(maxEarnings, 999), color: props?.props?.colors[2] },
            { start: 1000, end: Math.min(maxEarnings, 1499), color: props?.props?.colors[3] },
            { start: 1500, end: Math.min(maxEarnings, 1999), color: props?.props?.colors[4] },
            { start: 2000, end: Math.min(maxEarnings, 2499), color: props?.props?.colors[5] },
            { start: 2500, end: Math.min(maxEarnings, 9999), color: props?.props?.colors[5] },
        ];

        svg
            .selectAll('.band')
            .remove()
            .data(newBands)
            .enter()
            .append('rect')
            .attr('class','band')
            .attr('fill',d => d.color)
            .attr('fill-opacity', '95%')
            .attr('x', (d) => x(d.start))
            .attr('y', 0)
            .attr('width', (d) => x(d.end) - x(d.start))
            .attr('height', height);

        // Ensure circles are on top
        circles.raise();
    };

    const handleGroupChange = (group) => {

        
        setSelectedGroups([group]);
        
        
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
                {/* <Debug props={props} /> */}
            </header>

            <div className="groups">
                <div className="label">{props.props.legend_text}: </div>

                {

                    groups?.map((group) => {
                        return (
                            <div style={{ backgroundColor: selectedGroups.includes(group) ? '#333': '#fff' }} className={`groupSelect ${selectedGroups.includes(group) && 'selectedGroup'}`} key={group} onClick={() => handleGroupChange(group)}>
                                {group}
                            </div>
                        );
                    })
                }
            </div>
            {
                height != null &&
                    <div className="swarmchart">
                        <svg id={uniqueId}>
                            <g id={xAxisId} transform={`translate(0, ${height})`}></g>
                        </svg>
                        <div className="swarm-tooltip" style={{ opacity: 0 }}></div>
                    </div>
            }
        </div>
    );
};

export default Swarmchart;