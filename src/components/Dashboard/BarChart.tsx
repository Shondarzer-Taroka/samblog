'use client'

import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface BarChartProps {
  data: { period: string; count: number }[];
  color: string;
  title: string;
}

export const BarChart = ({ data, color, title }: BarChartProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'rounded-lg shadow-md bg-white');

    const x = d3.scaleBand()
      .domain(data.map(d => d.period))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'text-xs');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .selectAll('text')
      .attr('class', 'text-xs');

    svg.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', color)
      .attr('x', d => x(d.period) || 0)
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.count))
      .attr('rx', 4)
      .attr('ry', 4);

    svg.selectAll('.label')
      .data(data)
      .join('text')
      .attr('class', 'text-xs font-medium fill-current text-gray-800')
      .attr('x', d => (x(d.period) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d.count);

    return () => {
      svg.remove();
    };
  }, [data, color]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 capitalize mb-4">{title}</h3>
      <div ref={ref} className="h-48"></div>
    </div>
  );
};

