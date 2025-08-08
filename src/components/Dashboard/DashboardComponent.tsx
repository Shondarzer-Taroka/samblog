/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DashboardComponent.tsx
'use client'

import * as d3 from 'd3';
import { useEffect } from 'react';
import MetricCard from './MetricCard';

interface TimePeriodCount {
  day: number;
  week: number;
  month: number;
  year: number;
}

interface DashboardData {
  users: TimePeriodCount;
  news: TimePeriodCount;
  polls: TimePeriodCount;
  epapers: TimePeriodCount;
  opinions: TimePeriodCount;
  comments: TimePeriodCount;
  likes: TimePeriodCount;
}

interface HistoricalDataPoint {
  month: string;
  users: number;
  news: number;
  opinions: number;
  comments: number;
  likes: number;
}

export default function DashboardComponent({ 
  data, 
  historicalData 
}: { 
  data: DashboardData; 
  historicalData: HistoricalDataPoint[] 
}) {
  useEffect(() => {
    if (data && historicalData.length > 0) {
      renderBarCharts();
      renderLineChart();
      renderPieChart();
    }
  }, [data, historicalData]);

  const renderBarCharts = () => {
    if (!data) return;

    const models = [
      { key: 'users', name: 'Users', color: 'bg-blue-500' },
      { key: 'news', name: 'News', color: 'bg-green-500' },
      { key: 'polls', name: 'Polls', color: 'bg-purple-500' },
      { key: 'epapers', name: 'E-Papers', color: 'bg-yellow-500' },
      { key: 'opinions', name: 'Opinions', color: 'bg-pink-500' },
      { key: 'comments', name: 'Comments', color: 'bg-indigo-500' },
      { key: 'likes', name: 'Likes', color: 'bg-red-500' },
    ];

    models.forEach((model) => {
      const container = d3.select(`#${model.key}-chart`);
      container.selectAll('*').remove();

      const modelData = data[model.key as keyof DashboardData];
      const chartData = [
        { period: 'Day', count: modelData.day },
        { period: 'Week', count: modelData.week },
        { period: 'Month', count: modelData.month },
        { period: 'Year', count: modelData.year },
      ];

      const width = (container.node() as HTMLElement)?.getBoundingClientRect().width || 300;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };

      const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'rounded-lg shadow-md bg-white');

      const x = d3
        .scaleBand()
        .domain(chartData.map(d => d.period))
        .range([margin.left, width - margin.right])
        .padding(0.4);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, d => d.count) || 1])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('class', 'text-xs');

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5))
        .selectAll('text')
        .attr('class', 'text-xs');

      svg
        .selectAll('.bar')
        .data(chartData)
        .join('rect')
        .attr('class', model.color)
        .attr('x', d => x(d.period) || 0)
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', (d: { count: any; }) => y(0) - y(d.count))
        .attr('rx', 4)
        .attr('ry', 4)
        .on('mouseover', function() {
          d3.select(this).attr('opacity', 0.8);
        })
        .on('mouseout', function() {
          d3.select(this).attr('opacity', 1);
        });

      svg
        .selectAll('.label')
        .data(chartData)
        .join('text')
        .attr('class', 'text-xs font-medium fill-current text-gray-800')
        .attr('x', d => (x(d.period) || 0) + x.bandwidth() / 2)
        .attr('y', d => y(d.count) - 5)
        .attr('text-anchor', 'middle')
        .text(d => d.count);
    });
  };

  const renderLineChart = () => {
    if (historicalData.length === 0) return;

    const container = d3.select('#trend-chart');
    container.selectAll('*').remove();

    const width = (container.node() as HTMLElement)?.getBoundingClientRect().width  || 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'rounded-lg shadow-md bg-white');

    const x = d3
      .scaleBand()
      .domain(historicalData.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(historicalData, d => Math.max(d.users, d.news, d.opinions, d.comments, d.likes)) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<{ month: string; value: number }>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.value));

    const colors = {
      users: '#3B82F6',
      news: '#10B981',
      opinions: '#EC4899',
      comments: '#8B5CF6',
      likes: '#EF4444'
    };

    ['users', 'news', 'opinions', 'comments', 'likes'].forEach(metric => {
      svg
        .append('path')
        .datum(historicalData.map(d => ({ month: d.month, value: d[metric as keyof HistoricalDataPoint] as number })))
        .attr('fill', 'none')
        .attr('stroke', colors[metric as keyof typeof colors])
        .attr('stroke-width', 2)
        .attr('d', line);
    });

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'text-xs');

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('class', 'text-xs');

    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 180},20)`);

    Object.entries(colors).forEach(([metric, color], i) => {
      const legendItem = legend
        .append('g')
        .attr('transform', `translate(0,${i * 20})`);

      legendItem
        .append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', color);

      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('class', 'text-xs')
        .text(metric.charAt(0).toUpperCase() + metric.slice(1));
    });
  };

  const renderPieChart = () => {
    if (!data) return;

    const container = d3.select('#distribution-chart');
    container.selectAll('*').remove();

    const pieData = [
      { label: 'Users', value: data.users.year, color: '#3B82F6' },
      { label: 'News', value: data.news.year, color: '#10B981' },
      { label: 'Opinions', value: data.opinions.year, color: '#EC4899' },
      { label: 'Comments', value: data.comments.year, color: '#8B5CF6' },
      { label: 'Likes', value: data.likes.year, color: '#EF4444' },
    ];

    const width = (container.node() as HTMLElement)?.getBoundingClientRect().width ||  400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 20;

    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'rounded-lg shadow-md bg-white');

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<{ label: string; value: number; color: string }>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number; color: string }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = g
      .selectAll('.arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .on('mouseover', function() {
        d3.select(this).attr('opacity', 0.8);
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 1);
      });

    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('class', 'text-xs font-medium')
      .attr('text-anchor', 'middle')
      .text(d => d.data.value);

    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 150},20)`);

    pieData.forEach((d, i) => {
      const legendItem = legend
        .append('g')
        .attr('transform', `translate(0,${i * 20})`);

      legendItem
        .append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', d.color);

      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('class', 'text-xs')
        .text(d.label);
    });
  };

  return (
    <div className="bg-gray-50 md:p-6">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your application metrics</p>
      </header>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <MetricCard 
          title="Total Sessions" 
          value="2.4k+" 
          change="↑ 17% last month" 
        />
        <MetricCard 
          title="Time Spent" 
          value="8.49" 
          change="↑ 17% last month" 
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 capitalize mb-4">{key}</h3>
            <div id={`${key}-chart`} className="h-48"></div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="bg-blue-50 p-2 rounded text-center hover:bg-blue-100 transition-colors">
                <p className="text-xs text-gray-500">Day</p>
                <p className="font-bold text-blue-600">{value.day}</p>
              </div>
              <div className="bg-green-50 p-2 rounded text-center hover:bg-green-100 transition-colors">
                <p className="text-xs text-gray-500">Week</p>
                <p className="font-bold text-green-600">{value.week}</p>
              </div>
              <div className="bg-purple-50 p-2 rounded text-center hover:bg-purple-100 transition-colors">
                <p className="text-xs text-gray-500">Month</p>
                <p className="font-bold text-purple-600">{value.month}</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-center hover:bg-yellow-100 transition-colors">
                <p className="text-xs text-gray-500">Year</p>
                <p className="font-bold text-yellow-600">{value.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Trends (Last 6 Months)</h3>
          <div id="trend-chart" className="h-80"></div>
        </div>
        <div className="hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Distribution (Year)</h3>
          <div id="distribution-chart" className="h-80"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow mt-[120px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats (Year)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors">
            <p className="text-sm text-blue-600">Total Users</p>
            <p className="text-2xl font-bold text-blue-800">{data.users.year}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors">
            <p className="text-sm text-green-600">Total News</p>
            <p className="text-2xl font-bold text-green-800">{data.news.year}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors">
            <p className="text-sm text-purple-600">Total Opinions</p>
            <p className="text-2xl font-bold text-purple-800">{data.opinions.year}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors">
            <p className="text-sm text-red-600">Total Engagement</p>
            <p className="text-2xl font-bold text-red-800">{data.likes.year + data.comments.year}</p>
          </div>
        </div>
      </div>
    </div>
  );
}