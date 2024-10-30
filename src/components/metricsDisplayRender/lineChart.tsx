import * as d3 from 'd3';
import React, { useState, useEffect, useMemo } from 'react';
import '../../css/linechart.css';
import type { Metric } from './renderMetrics';

interface RenderLineChartProps {
  metrics: Metric[];
}

export const RenderLineChart: React.FC<RenderLineChartProps> = ({
  metrics,
}) => {
  const floatMetrics = metrics.filter(
    (d) => d.dataType === 'float' || d.dataType === 'big-int'
  );
  return (
    <>
      {floatMetrics.map((metric, index) => (
        <LineChart
          key={`${metric.metric._objectname}-${index}`}
          metric={metric}
        />
      ))}
    </>
  );
};

interface LineChartProps {
  metric: Metric;
}

const LineChart: React.FC<LineChartProps> = ({ metric }) => {
  const value = metric.value[1];
  const [dataSet, setDataSet] = useState<[number, string][]>([]);
  const margin = useMemo(
    () => ({ top: 0, right: 20, bottom: 55, left: 45 }),
    []
  );
  const svgRef = React.useRef<SVGSVGElement>(null);
  const totalWidth = svgRef.current?.clientWidth || 450;
  const width = totalWidth - margin.left - margin.right;
  const totalHeight = 150;
  const height = 150 - margin.bottom;

  useEffect(() => {
    const timestamp = parseFloat(metric.value[0] as unknown as string) * 1000;
    if (!isNaN(timestamp) && typeof value === 'string') {
      setDataSet((prev) => {
        const newData = [...prev, [timestamp, value] as [number, string]];
        if (newData.length > 25) newData.shift();
        return newData;
      });
    }
  }, [metric, value]);

  const createXAxis = (scale: d3.ScaleTime<number, number>) => {
    return d3
      .axisBottom(scale)
      .ticks(4)
      .tickFormat((value) => {
        const dateValue = typeof value === 'number' ? value : Number(value);
        const date = new Date(dateValue);
        return d3.timeFormat('%H:%M:%S')(date);
      });
  };

  useEffect(() => {
    const renderChart = (data: [number, string][]) => {
      const trimObjectName = (name: string | undefined) => {
        if (typeof name !== 'string') {
          console.error('Expected a string but got:', name);
          return '';
        }

        const firstIndex = name.indexOf('=');
        return firstIndex !== -1 ? name.slice(firstIndex + 1) : name;
      };
      const trimmedObjectName = trimObjectName(metric.metric._objectname);
      const combinedString = `${metric.metric.instance} ${metric.metric.__name__} ${trimmedObjectName}, value: ${metric.value[1]}`;
      const label = combinedString;
      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      svg.selectAll('*').remove(); // Clear previous content

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Update scales based on data
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => new Date(d[0])) as [Date, Date])
        .range([0, width - margin.left - 15]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => parseFloat(d[1]) / 2.1) || 0,
          d3.max(data, (d) => parseFloat(d[1]) / 2) || 100,
        ])
        .range([height, 0]);

      // Create axes
      const xAxisGroup = g
        .append('g')
        .attr('class', 'axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(createXAxis(xScale))
        .style('opacity', 0.3);

      xAxisGroup.selectAll('text').style('font-size', '7px');

      const formatValue = (
        value: number | { valueOf: () => number }
      ): string => {
        const num = typeof value === 'number' ? value : value.valueOf();
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
      };

      g.append('g')
        .attr('class', 'grid-lines')
        .selectAll('line')
        .data(yScale.ticks(5))
        .join('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', (d: number) => yScale(d))
        .attr('y2', (d: number) => yScale(d))
        .style('stroke', 'lightgrey')
        .style('stroke-width', '1')
        .style('opacity', 0.1)
        .style('stroke-dasharray', '1, 2');

      const yAxisGroup = g
        .append('g')
        .attr('class', 'axis--y')
        .call(d3.axisLeft(yScale).ticks(5).tickFormat(formatValue))
        .style('opacity', 0.3);

      g.append('text')
        .attr('class', 'y-axis-label')
        .attr('y', 30 - margin.left)
        .attr('x', 4 - height / 2)
        .attr('dy', '1em')
        .style('font-size', '6px')
        .style('fill', '#00fcf0')
        .style('opacity', '0.7')
        .text(label);

      yAxisGroup.selectAll('text').style('font-size', '7px');

      // Create line generator
      const line = d3
        .line<[number, string]>()
        .x((d) => xScale(new Date(d[0])))
        .y((d) => yScale(parseFloat(d[1]) / 2))
        .curve(d3.curveLinear);

      const area = d3
        .area<[number, string]>()
        .x((d) => xScale(new Date(d[0])))
        .y0(height)
        .y1((d) => yScale(parseFloat(d[1]) / 2))
        .curve(d3.curveLinear);

      g.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', 'rgba(17, 150, 255, 0.1)');

      // Append the line path
      g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)
        .style('fill', 'none')
        .style('stroke', '#03A062')
        .style('stroke-width', '1');
    };

    renderChart(dataSet); // Render chart when dataSet changes

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const oneMinAgo = new Date(currentTime.getTime() - 60 * 1000);

      const minTimestamp = d3.min(dataSet, (d) => d[0]) ?? oneMinAgo.getTime();
      const maxTimestamp =
        d3.max(dataSet, (d) => d[0]) ?? currentTime.getTime();
      const timeRange = Math.max(2 * 60 * 1000, maxTimestamp - minTimestamp);

      const xScaleDomain = [minTimestamp - timeRange, maxTimestamp + timeRange];

      const xScale = d3
        .scaleTime()
        .domain(xScaleDomain)
        .range([0, width - 10]);

      // Update the x-axis with the new scale
      d3.select<SVGGElement, unknown>('.axis--x')
        .transition()
        .duration(500)
        .call(createXAxis(xScale));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dataSet, metric, width, height, margin]);

  return (
    <svg
      ref={svgRef}
      className='linechart'
      viewBox={`0 0 ${width} ${height}`}
      width={totalWidth}
      height={totalHeight}
    ></svg>
  );
};
