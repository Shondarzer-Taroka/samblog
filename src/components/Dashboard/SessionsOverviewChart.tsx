



'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

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

const MetricCard = ({ title, value, change }: { title: string; value: string; change: string }) => {
  const days = ['s', 's', 'm', 't', 'w', 't', 'f'];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <span className={`ml-2 text-sm font-medium ${change.includes('↑') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-end space-x-1 h-12">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-3 rounded-t-sm ${index < 5 ? 'bg-blue-500' : 'bg-gray-200'}`}
                style={{ height: `${(index % 7) + 1}0%` }}
              />
              <span className="text-xs text-gray-500 mt-1">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SessionsOverviewCharat = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(data,'dash');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, historicalRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,{credentials:'include'}),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/historical`,{credentials:'include'})
        ]);
        
        if (!dashboardRes.ok || !historicalRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const dashboardData = await dashboardRes.json();
        const historical = await historicalRes.json();
        
        setData(dashboardData);
        setHistoricalData(historical);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 p-4 md:p-6">
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
        {data && Object.entries(data).map(([key, value]) => (
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
        <div className=" hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Trends (Last 6 Months)</h3>
          <div id="trend-chart" className="h-80"></div>
        </div>
        <div className=" hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Distribution (Year)</h3>
          <div id="distribution-chart" className="h-80"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow mt-[120px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats (Year)</h3>
        {data && (
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
        )}
      </div>
    </div>
  );
};

export default  SessionsOverviewCharat;