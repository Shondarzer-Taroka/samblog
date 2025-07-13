
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: string;
  overview210: number;
  overview310: number;
}

const rawData: DataPoint[] = [
  { date: '2022-03-25', overview210: 100, overview310: 180 },
  { date: '2022-03-26', overview210: 120, overview310: 150 },
  { date: '2022-03-27', overview210: 130, overview310: 160 },
  { date: '2022-03-28', overview210: 200, overview310: 220 },
  { date: '2022-03-29', overview210: 300, overview310: 210 },
  { date: '2022-03-30', overview210: 280, overview310: 250 },
  { date: '2022-03-31', overview210: 320, overview310: 290 },
  { date: '2022-04-01', overview210: 250, overview310: 300 },
  { date: '2022-04-02', overview210: 260, overview310: 310 },
];

const SessionsOverviewChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear before render

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 700 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const parseDate = d3.timeParse('%Y-%m-%d');
    const formatDate = d3.timeFormat('%d %B, %Y');

    const formattedData = rawData.map(d => ({
      date: parseDate(d.date) as Date,
      overview210: d.overview210,
      overview310: d.overview310,
    }));

    const x = d3
      .scaleTime()
      .domain(d3.extent(formattedData, d => d.date) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(formattedData, d => Math.max(d.overview210, d.overview310)) || 0,
      ])
      .nice()
      .range([height, 0]);

    const line1 = d3
      .line<{ date: Date; overview210: number }>()
      .x(d => x(d.date))
      .y(d => y(d.overview210));

    const line2 = d3
      .line<{ date: Date; overview310: number }>()
      .x(d => x(d.date))
      .y(d => y(d.overview310));

    const svgContainer = svg
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`
      )
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    svgContainer
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%d %b')));

    // Y axis
    svgContainer.append('g').call(d3.axisLeft(y).ticks(5));

    // Lines
    svgContainer
      .append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', '#6c5ce7')
      .attr('stroke-width', 2.5)
      .attr('d', line1);

    svgContainer
      .append('path')
      .datum(formattedData)
      .attr('fill', 'none')
      .attr('stroke', '#00b894')
      .attr('stroke-width', 2.5)
      .attr('d', line2);

    // Tooltip
    const tooltip = d3
      .select(svgRef.current?.parentNode as Element)
      .append('div')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '8px 12px')
      .style('border-radius', '6px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    svgContainer
      .append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height)
      .on('mousemove', function (event: MouseEvent) {
        const [xPos] = d3.pointer(event);
        const xDate = x.invert(xPos);

        const closest = formattedData.reduce((a, b) =>
          Math.abs(b.date.getTime() - xDate.getTime()) <
          Math.abs(a.date.getTime() - xDate.getTime())
            ? b
            : a
        );

        tooltip
          .style('opacity', 1)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 40}px`)
          .html(`
            <strong>${formatDate(closest.date)}</strong><br/>
            Overview 210: ${closest.overview210}<br/>
            Overview 310: ${closest.overview310}
          `);
      })
      .on('mouseleave', () => {
        tooltip.style('opacity', 0);
      });
  }, []);

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-80" />
      <div className="mt-4 flex justify-end">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm">
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default SessionsOverviewChart;
