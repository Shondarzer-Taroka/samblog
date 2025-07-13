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

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      renderBarCharts();
      renderLineChart();
      renderPieChart();
    }
  }, [data]);

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

      const width = 300;
      const height = 200;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };

      const svg = container
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'rounded-lg shadow-md');

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
        .attr('height', d => y(0) - y(d.count))
        .attr('rx', 4)
        .attr('ry', 4);

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
    if (!data) return;

    const container = d3.select('#trend-chart');
    container.selectAll('*').remove();

    // Mock trend data - in a real app, you'd fetch historical data
    const trendData = [
      { month: 'Jan', users: 120, news: 45, opinions: 30 },
      { month: 'Feb', users: 190, news: 72, opinions: 42 },
      { month: 'Mar', users: 250, news: 95, opinions: 58 },
      { month: 'Apr', users: 320, news: 120, opinions: 75 },
      { month: 'May', users: 400, news: 150, opinions: 90 },
      { month: 'Jun', users: 480, news: 180, opinions: 110 },
    ];

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'rounded-lg shadow-md bg-white');

    const x = d3
      .scaleBand()
      .domain(trendData.map(d => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(trendData, d => Math.max(d.users, d.news, d.opinions)) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<{ month: string; value: number }>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.value));

    // Users line
    svg
      .append('path')
      .datum(trendData.map(d => ({ month: d.month, value: d.users })))
      .attr('fill', 'none')
      .attr('stroke', '#3B82F6') // blue-500
      .attr('stroke-width', 2)
      .attr('d', line);

    // News line
    svg
      .append('path')
      .datum(trendData.map(d => ({ month: d.month, value: d.news })))
      .attr('fill', 'none')
      .attr('stroke', '#10B981') // green-500
      .attr('stroke-width', 2)
      .attr('d', line);

    // Opinions line
    svg
      .append('path')
      .datum(trendData.map(d => ({ month: d.month, value: d.opinions })))
      .attr('fill', 'none')
      .attr('stroke', '#EC4899') // pink-500
      .attr('stroke-width', 2)
      .attr('d', line);

    // Add the X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('class', 'text-xs');

    // Add the Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('class', 'text-xs');

    // Add legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 150},20)`);

    legend
      .append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#3B82F6');

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 10)
      .attr('class', 'text-xs')
      .text('Users');

    legend
      .append('rect')
      .attr('y', 20)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#10B981');

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 30)
      .attr('class', 'text-xs')
      .text('News');

    legend
      .append('rect')
      .attr('y', 40)
      .attr('width', 12)
      .attr('height', 12)
      .attr('fill', '#EC4899');

    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 50)
      .attr('class', 'text-xs')
      .text('Opinions');
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

    const width = 400;
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

    // Add labels
    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('class', 'text-xs font-medium')
      .attr('text-anchor', 'middle')
      .text(d => d.data.value);

    // Add legend
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
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your application metrics</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data && Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 capitalize mb-4">{key}</h3>
            <div id={`${key}-chart`} className="h-48"></div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="bg-blue-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">Day</p>
                <p className="font-bold text-blue-600">{value.day}</p>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">Week</p>
                <p className="font-bold text-green-600">{value.week}</p>
              </div>
              <div className="bg-purple-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">Month</p>
                <p className="font-bold text-purple-600">{value.month}</p>
              </div>
              <div className="bg-yellow-50 p-2 rounded text-center">
                <p className="text-xs text-gray-500">Year</p>
                <p className="font-bold text-yellow-600">{value.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Trends</h3>
          <div id="trend-chart" className="h-80"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Distribution</h3>
          <div id="distribution-chart" className="h-80"></div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-800">{data.users.year}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Total News</p>
              <p className="text-2xl font-bold text-green-800">{data.news.year}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Total Opinions</p>
              <p className="text-2xl font-bold text-purple-800">{data.opinions.year}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600">Engagement</p>
              <p className="text-2xl font-bold text-yellow-800">{data.likes.year + data.comments.year}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;